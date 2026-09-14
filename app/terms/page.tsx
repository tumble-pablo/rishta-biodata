import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms and Conditions — Rishta Biodata",
  description: "The terms that apply to using Rishta Biodata to create, preview and download a marriage biodata.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms and Conditions"
      lastUpdated="14 September 2026"
      intro="These terms apply when you use Rishta Biodata (rishtabiodata.com) to create, preview, download or share a marriage biodata. By using the site, you agree to them."
      body={[
        { type: "heading", text: "What Rishta Biodata is" },
        {
          type: "paragraph",
          text: "Rishta Biodata is a self-serve tool for creating a marriage biodata document. You enter your own details through a guided form, see a live preview, and download the result as a PDF. It is a document-creation tool only — it is not a matchmaking, dating, or introduction service, and we make no representations about outcomes from using a biodata you create here.",
        },
        { type: "heading", text: "Your content" },
        {
          type: "list",
          items: [
            "You are solely responsible for the accuracy of the personal, family, education and contact details you enter — we do not verify any of it.",
            "You confirm you have the right to include any details you enter, including on behalf of a family member, and that doing so doesn't violate anyone else's privacy.",
            "Your biodata content belongs to you. We claim no ownership over the information you enter or the document you generate from it.",
          ],
        },
        { type: "heading", text: "Free and paid downloads" },
        {
          type: "paragraph",
          text: "You can preview and download a watermarked copy of your biodata for free at any time. Removing the watermark for a given biodata is a one-time paid unlock, currently priced at ₹51, processed securely through Razorpay. See our Cancellation and Refund Policy for how refunds work.",
        },
        { type: "heading", text: "Design templates" },
        {
          type: "paragraph",
          text: "The visual templates, layouts and branding offered in the builder are our intellectual property. Paying to unlock a download gives you a personal-use copy of your own completed biodata document — it doesn't transfer ownership of the underlying template designs.",
        },
        { type: "heading", text: "No warranty, limited liability" },
        {
          type: "paragraph",
          text: "The service is provided \"as is\". We work to keep it accurate and available, but we don't guarantee it will be error-free or uninterrupted. To the extent permitted by law, our liability for any claim relating to the service is limited to the amount you paid us for that biodata.",
        },
        { type: "heading", text: "Governing law" },
        {
          type: "paragraph",
          text: "These terms are governed by the laws of India. Any dispute arising from these terms or your use of the service is subject to the jurisdiction of Indian courts.",
        },
        { type: "heading", text: "Contact" },
        {
          type: "paragraph",
          text: "Questions about these terms? Reach us at support@rishtabiodata.com.",
        },
      ]}
    />
  );
}
