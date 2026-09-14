// "Email me a backup copy" — sends the same PDF the visitor could download,
// via the server route in app/api/email/send-backup/route.ts (which holds
// the real Resend API key; never exposed to the client). Fired from
// biodata-builder.tsx right after a *real* Razorpay payment is verified
// (see payment.ts) — fire-and-forget, since a failed backup send shouldn't
// block the unlock the visitor already paid for.

export interface EmailBackupResult {
  success: boolean;
}

export interface EmailBackupProvider {
  sendBackupCopy(email: string, pdfBase64: string, filename: string): Promise<EmailBackupResult>;
}

export const resendEmailBackupProvider: EmailBackupProvider = {
  async sendBackupCopy(email, pdfBase64, filename) {
    try {
      const response = await fetch("/api/email/send-backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pdfBase64, filename }),
      });
      if (!response.ok) return { success: false };
      const result = (await response.json()) as EmailBackupResult;
      return result;
    } catch {
      return { success: false };
    }
  },
};

/** Kept for local testing without a Resend key configured — see
 * ACTIVE_EMAIL_BACKUP_PROVIDER in biodata-builder.tsx. Always "succeeds"
 * without ever sending anything. */
export const mockEmailBackupProvider: EmailBackupProvider = {
  async sendBackupCopy() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
