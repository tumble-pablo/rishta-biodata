import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Shipping and Exchange Policy — Rishta Biodata",
  description: "Rishta Biodata is a fully digital product — there's nothing to ship or physically exchange.",
  alternates: { canonical: "/shipping-policy" },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      title="Shipping and Exchange Policy"
      lastUpdated="14 September 2026"
      intro="Rishta Biodata is a fully digital product. Nothing is physically shipped, so there's no shipping timeline, courier, or delivery address involved."
      body={[
        { type: "heading", text: "How your biodata is delivered" },
        {
          type: "list",
          items: [
            "A free, watermarked PDF can be downloaded directly in your browser at any time — no payment or shipping required.",
            "After a successful one-time payment, the watermark-free PDF is unlocked instantly and can be downloaded or shared (e.g. on WhatsApp) directly from the site.",
            "If you provide an email address at checkout, we also send a backup copy of your finished PDF to that address as an attachment.",
          ],
        },
        { type: "heading", text: "Exchanges" },
        {
          type: "paragraph",
          text: "Since there's no physical product, there's nothing to exchange. If your download didn't unlock correctly after a successful payment, that's treated as a refund case — see our Cancellation and Refund Policy for how to reach us.",
        },
        { type: "heading", text: "Contact" },
        {
          type: "paragraph",
          text: "Trouble accessing your download? Email us at support@rishtabiodata.com.",
        },
      ]}
    />
  );
}
