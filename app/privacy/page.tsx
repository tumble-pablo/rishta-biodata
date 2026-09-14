import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — Rishta Biodata",
  description: "What information Rishta Biodata collects, how it's used, and who it's shared with.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="14 September 2026"
      intro="This explains what information Rishta Biodata collects when you use the site, and how it's used."
      body={[
        { type: "heading", text: "Your biodata content" },
        {
          type: "paragraph",
          text: "The personal, family, education and contact details you enter into the builder are saved as a draft directly in your own browser (localStorage), so you can leave and come back without losing your progress. We do not currently store this content on our own servers — it lives on your device unless and until you download, share, or email it yourself.",
        },
        { type: "heading", text: "Email address" },
        {
          type: "paragraph",
          text: "If you choose to pay to unlock your download, we ask for an email address so we can send you a backup copy of your finished PDF in case a direct download ever fails. That email address, and the PDF sent to it, pass through our email delivery provider, Resend, solely to deliver that message.",
        },
        { type: "heading", text: "Payments" },
        {
          type: "paragraph",
          text: "Payments are processed entirely by Razorpay. We never see or store your full card, UPI, or bank details — Razorpay handles that directly and securely. We only receive confirmation that a payment succeeded, which we use to unlock your download.",
        },
        { type: "heading", text: "Analytics" },
        {
          type: "paragraph",
          text: "We use Google Analytics to understand overall site usage — things like which pages are visited and how people generally navigate the site. This does not include the personal, family, education or contact details you enter into the biodata builder itself, which stay in your browser as described above.",
        },
        { type: "heading", text: "Who we share data with" },
        {
          type: "list",
          items: [
            "Razorpay — to process your payment.",
            "Resend — to deliver the backup-copy email, if you request one.",
            "Google Analytics — for general site-usage analytics.",
            "Cloudflare — our hosting provider, which handles standard web traffic (e.g. IP address, browser type) needed to serve the site.",
          ],
        },
        {
          type: "paragraph",
          text: "We don't sell your data, and we don't use it for advertising.",
        },
        { type: "heading", text: "Your control over your data" },
        {
          type: "paragraph",
          text: "Since your biodata draft lives in your own browser, you can clear it at any time by clearing your browser's site data for rishtabiodata.com. To ask us to delete a backup-copy email we've sent, or for any other privacy question, contact us below.",
        },
        { type: "heading", text: "Children's privacy" },
        {
          type: "paragraph",
          text: "This service is intended for adults creating or helping create a marriage biodata, and isn't directed at children.",
        },
        { type: "heading", text: "Contact" },
        {
          type: "paragraph",
          text: "Questions about this policy or your data? Reach us at support@rishtabiodata.com.",
        },
      ]}
    />
  );
}
