// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
// Assuming ContactForm is a Mongoose model, we'll need it to update later
import { connectToDatabase, ContactForm } from "@/lib/db"; 

export const runtime = "nodejs";

const TF_USERNAME = "API";
const TF_API_KEY = process.env.TRUSTEDFORM_API_KEY || "";

// ... (helper functions getClientIp, isLikelyTrustedFormUrl, basicAuthHeader, claimTrustedFormCertificate) ...
function getClientIp(req: NextRequest) {
  const xfwd = req.headers.get("x-forwarded-for");
  if (xfwd) return xfwd.split(",")[0]?.trim();
  return req.headers.get("x-real-ip") || req.cookies.get("client-ip")?.value || "0.0.0.0";
}

function isLikelyTrustedFormUrl(url: string | undefined) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return /(^|\.)trustedform\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function basicAuthHeader(user: string, pass: string) {
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  return `Basic ${token}`;
}

async function claimTrustedFormCertificate(
  certUrl: string,
  payload: { reference?: string; vendor?: string; email_1?: string; phone_1?: string }
) {
  const res = await fetch(certUrl, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(TF_USERNAME, TF_API_KEY),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { ok: res.status === 201, status: res.status, json, raw: text };
}

export async function POST(req: NextRequest) {
  let submission: any = null; // Will hold the Mongoose document if DB save succeeds
  let submissionId: string | null = null; // Will hold the ID if DB save succeeds

  try {
    const body = await req.json();

    const rawTfUrl: string = body.trustedFormCertUrl || body.xxTrustedFormCertUrl || "";
    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referer = req.headers.get("referer") || "";
    const tfUrl = isLikelyTrustedFormUrl(rawTfUrl) ? rawTfUrl : "";

    // --- MODIFICATION START: Database Save Attempt ---
    // We wrap the database logic in its own try...catch block.
    try {
      await connectToDatabase();

      submission = new ContactForm({
        ...body,
        trustedFormCertUrl: tfUrl,
        ipAddress,
        userAgent,
        referer,
        submittedAt: new Date(),
      });
      await submission.save();
      submissionId = submission._id.toString(); // Get the ID for the TF reference
      
    } catch (dbError) {
      console.error("Database save failed. Proceeding with TrustedForm claim.", dbError);
      // We log the error but do NOT stop the function.
      // submission and submissionId will remain null.
    }
    // --- MODIFICATION END ---

    let claimSummary: { ok: boolean; status?: number } | null = null;

    // This block will now run even if the database save failed.
    if (tfUrl && TF_API_KEY) {
      try {
        const claim = await claimTrustedFormCertificate(tfUrl, {
          // MODIFICATION: Use submissionId if it exists, otherwise pass undefined.
          reference: submissionId ?? undefined,
          vendor: "lexclaimconnect.com",
          email_1: body.email,
          phone_1: body.phone,
        });

        claimSummary = { ok: claim.ok, status: claim.status };

        // MODIFICATION: Only try to update the DB document if it was successfully created.
        if (submission) {
          try {
            submission.set({
              trustedFormClaimed: claim.ok,
              trustedFormClaimStatus: claim.status,
              trustedFormClaimResponse: claim.json ?? claim.raw,
              claimedAt: new Date(),
            });
            await submission.save();
          } catch (dbUpdateError) {
             console.error("DB update failed after successful TF claim:", dbUpdateError);
             // Log this error, but don't fail the request, as the claim was successful.
          }
        }
      } catch (e) {
        console.error("TrustedForm claim error:", e);
        
        // MODIFICATION: If DB save worked, try to log the claim error to the DB.
        if (submission) {
          try {
            submission.set({ trustedFormClaimed: false, trustedFormClaimError: String(e) });
            await submission.save();
          } catch (dbUpdateError) {
            console.error("DB update failed while logging TF error:", dbUpdateError);
          }
        }
        
        // If the TF claim fails, we consider the whole operation a failure
        // and throw the error to be caught by the outer catch block.
        throw e; 
      }
    }

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        success: true,
        // MODIFICATION: We now report back whether the DB save was successful.
        databaseSaved: !!submissionId, 
        trustedForm: {
          providedUrl: Boolean(tfUrl),
          claimed: claimSummary?.ok ?? false,
          status: claimSummary?.status ?? null,
        },
        id: submissionId, // Will be null if DB save failed
      },
      { status: 201 }
    );

  } catch (error) {
    // This outer block will now catch:
    // 1. JSON parsing errors (from req.json())
    // 2. Critical TrustedForm claim errors (if we re-threw them)
    // 3. Any other unexpected errors.
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      {
        message: "Error submitting contact form",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}