// Placeholder "email me a backup copy" step — mirrors `payment.ts`'s mock
// provider. No email actually gets sent yet: there's no email-sending
// provider (Resend, Postmark, etc.) or server route wired up, and this
// really should be triggered server-side once a payment is *confirmed*
// (not fired from the browser right after a client-side mock success),
// so it's reliable even if the visitor closes the tab immediately after.
//
// Future real implementation would need: a chosen email provider, a server
// route (e.g. `app/api/email/send-backup/route.ts`) that receives the
// generated PDF bytes (or regenerates them server-side) and the address,
// and ideally a trigger tied to real Razorpay payment verification rather
// than this client call. Until then, this only simulates success so the
// rest of the flow (collecting the email, showing a confirmation) is fully
// testable today.

export interface EmailBackupResult {
  success: boolean;
}

export const mockEmailBackupProvider = {
  async sendBackupCopy(email: string): Promise<EmailBackupResult> {
    void email;
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true };
  },
};
