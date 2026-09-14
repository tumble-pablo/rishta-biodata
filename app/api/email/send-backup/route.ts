import { env } from "cloudflare:workers";

interface SendBackupRequestBody {
  email?: string;
  pdfBase64?: string;
  filename?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generous but not unbounded — these are single-page, JPEG-compressed A4
// documents (see pdf-export.ts), so a legitimate one is a few hundred KB to
// a couple MB. Base64 inflates size by ~33%, so this caps the *decoded*
// attachment around 12MB, well above anything the real export produces.
const MAX_BASE64_LENGTH = 16_000_000;

// "Backup copy" is a courtesy, not a paywall — the free watermarked PDF is
// already downloadable without paying, so the only real risk here is
// spamming an arbitrary inbox with a PDF, not bypassing payment. Basic
// shape validation is enough; this doesn't need to reverify a Razorpay
// signature the way /api/payment/verify does.
export async function POST(request: Request) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ success: false, error: "Email sending isn't configured yet." }, { status: 500 });
  }

  let body: SendBackupRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email, pdfBase64, filename } = body;
  if (!email || !EMAIL_PATTERN.test(email)) {
    return Response.json({ success: false, error: "A valid email address is required." }, { status: 400 });
  }
  if (!pdfBase64 || pdfBase64.length > MAX_BASE64_LENGTH) {
    return Response.json({ success: false, error: "Missing or oversized PDF." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Rishta Biodata <biodata@rishtabiodata.com>",
        to: [email],
        subject: "Your Rishta Biodata backup copy",
        html: "<p>Here's a backup copy of your biodata, attached as a PDF — keep it handy in case a download ever fails.</p>",
        attachments: [
          {
            filename: filename || "biodata.pdf",
            content: pdfBase64,
          },
        ],
      }),
    });
  } catch (error) {
    console.error("[resend] send-backup request failed", error);
    return Response.json({ success: false, error: "Could not reach the email provider." }, { status: 502 });
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[resend] send-backup failed", response.status, detail);
    return Response.json({ success: false, error: "Could not send the backup email." }, { status: 502 });
  }

  return Response.json({ success: true });
}
