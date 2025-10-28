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
    
    // --- FIX: Ensure database connection and save happens first ---
    // This is now the primary try block. If this fails, the whole operation fails.
    try {
      await connectToDatabase();

      submission = new ContactForm({
        ...body,
        trustedFormCertUrl: tfUrl,
        ipAddress: ipAddress,
        userAgent: userAgent,
        referer: referer,
        submittedAt: new Date(),
      });
      await submission.save();
      submissionId = submission._id.toString(); // Get the ID for the TF reference
      
    } catch (dbError: any) {
      console.error("CRITICAL: Database save failed. Aborting operation.", dbError);
      // If the database save fails, we cannot proceed. Return a server error.
      return NextResponse.json({ message: "Failed to save contact information.", success: false, error: dbError.message }, { status: 500 });
    }

    let claimSummary: { ok: boolean; status?: number } | null = null;

    if (tfUrl && TF_API_KEY) {
      try {
        const claim = await claimTrustedFormCertificate(tfUrl, {
          // Use the submissionId which is now guaranteed to exist.
          reference: submissionId ?? undefined,
          vendor: "lexclaimconnect.com",
          email_1: body.email,
          phone_1: body.phone,
        });

        claimSummary = { ok: claim.ok, status: claim.status };

        // Update the submission with the claim result.
        // We don't need to check if `submission` exists because we would have already exited if it failed.
        submission.set({
          trustedFormClaimed: claim.ok,
          trustedFormClaimStatus: claim.status,
          trustedFormClaimResponse: claim.json ?? claim.raw,
          claimedAt: new Date(),
        });
        await submission.save();

      } catch (e) {
        console.error("TrustedForm claim error:", e);
        
        // Log the claim error to the DB record, but don't fail the entire request,
        // as the primary goal (saving the lead) was successful.
        submission.set({ trustedFormClaimed: false, trustedFormClaimError: String(e) });
        await submission.save();
      }
    }

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        success: true,
        // This will now always be true if we reach this point.
        databaseSaved: true, 
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
    console.error("An unexpected error occurred in the contact form API:", error);
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

