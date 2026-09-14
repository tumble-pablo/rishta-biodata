import type { Metadata } from "next";

import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy — Rishta Biodata",
  description: "Our policy on cancellations and refunds for the one-time biodata unlock payment.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Cancellation and Refund Policy"
      lastUpdated="14 September 2026"
      intro="Rishta Biodata sells a single digital product: a one-time payment (currently ₹51) that removes the watermark from a biodata you've created, so you can download and share it freely."
      body={[
        { type: "heading", text: "Delivery is instant" },
        {
          type: "paragraph",
          text: "Because the unlock is applied immediately in your browser the moment payment is confirmed, there's no waiting period, order to cancel, or shipment to track — your watermark-free download and download button are available right away.",
        },
        { type: "heading", text: "Cancellations" },
        {
          type: "paragraph",
          text: "You can close the payment window at any point before completing payment with no charge and no consequence — nothing is unlocked until Razorpay confirms your payment succeeded. Once a payment has been completed and your download unlocked, the purchase is final and cannot be cancelled, since the digital product has already been delivered.",
        },
        { type: "heading", text: "Refunds" },
        {
          type: "paragraph",
          text: "Because the unlock is delivered instantly, we don't offer refunds simply for a change of mind after a successful, correctly-unlocked payment. We will issue a full refund if:",
        },
        {
          type: "list",
          items: [
            "Your payment was deducted but the watermark wasn't removed / the download didn't unlock due to an error on our end.",
            "You were charged more than once for the same biodata unlock.",
          ],
        },
        {
          type: "paragraph",
          text: "To request a refund for either of these, email support@rishtabiodata.com within 7 days of the payment with your payment reference or the email address you used at checkout. Approved refunds are issued back to your original payment method via Razorpay, and typically reflect within 5–7 business days depending on your bank or payment provider.",
        },
        { type: "heading", text: "Contact" },
        {
          type: "paragraph",
          text: "Questions about a payment? Reach us at support@rishtabiodata.com.",
        },
      ]}
    />
  );
}
