// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, ContactForm } from "@/lib/db"; // Uses the DB

export const runtime = "nodejs";

// Constants from your old code
const TF_USERNAME = "API";
const TF_API_KEY = process.env.TRUSTEDFORM_API_KEY || "";

// Helper functions from your old code
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

// Main POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const rawTfUrl: string = body.trustedFormCertUrl || body.xxTrustedFormCertUrl || "";
    const ipAddress = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referer = req.headers.get("referer") || "";

    // Connect to the database
    await connectToDatabase();

    const tfUrl = isLikelyTrustedFormUrl(rawTfUrl) ? rawTfUrl : "";

    // Create and save the initial submission
    const submission = new ContactForm({
      ...body,
      trustedFormCertUrl: tfUrl,
      ipAddress,
      userAgent,
      referer,
      submittedAt: new Date(),
    });
    await submission.save();

    let claimSummary: { ok: boolean; status?: number } | null = null;

    // If TF URL and API key exist, attempt to claim it
    if (tfUrl && TF_API_KEY) {
      try {
        const claim = await claimTrustedFormCertificate(tfUrl, {
          reference: submission._id.toString(),
          vendor: "lexclaimconnect.com", // Or your site's vendor name
          email_1: body.email,
          phone_1: body.phone,
        });

        claimSummary = { ok: claim.ok, status: claim.status };

        // Update the submission with claim results
        submission.set({
          trustedFormClaimed: claim.ok,
          trustedFormClaimStatus: claim.status,
          trustedFormClaimResponse: claim.json ?? claim.raw,
          claimedAt: new Date(),
        });
        await submission.save();
      } catch (e) {
        console.error("TrustedForm claim error:", e);
        submission.set({ trustedFormClaimed: false, trustedFormClaimError: String(e) });
        await submission.save();
      }
    }

    // Return a success response
    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        success: true,
        trustedForm: {
          providedUrl: Boolean(tfUrl),
          claimed: claimSummary?.ok ?? false,
          status: claimSummary?.status ?? null,
        },
        id: submission._id,
      },
      { status: 201 } // 201 for "Created"
    );
  } catch (error) {
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