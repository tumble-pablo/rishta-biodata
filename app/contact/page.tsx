import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";

export const metadata: Metadata = {
  title: "Contact Us — Rishta Biodata",
  description: "How to reach Rishta Biodata for support, payment, or privacy questions.",
  alternates: { canonical: "/contact" },
};

const SUPPORT_EMAIL = "support@rishtabiodata.com";

export default function ContactPage() {
  return (
    <LegalPageLayout
      title="Contact Us"
      lastUpdated="14 September 2026"
      intro="Have a question about creating your biodata, a payment, or anything else? We're happy to help."
      body={[
        { type: "heading", text: "Before you write in" },
        {
          type: "list",
          items: [
            "For a payment issue, include your payment reference or the email address you used at checkout — see our Cancellation and Refund Policy.",
            "For a privacy question, see our Privacy Policy for what we collect and how to reach us about it.",
            "We aim to reply within 2 business days.",
          ],
        },
      ]}
    >
      <Button asChild className="mt-2 h-11 rounded-[6px] px-5 text-[13px] font-semibold">
        <a href={`mailto:${SUPPORT_EMAIL}`}>
          <Mail aria-hidden="true" className="size-4" />
          {SUPPORT_EMAIL}
        </a>
      </Button>
    </LegalPageLayout>
  );
}
