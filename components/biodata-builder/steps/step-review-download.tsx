"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Download, Loader2, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exportPreviewAsPdf, sharePreviewAsPdf } from "@/lib/biodata/pdf-export";
import { PLACEHOLDER_PRICE_INR } from "@/lib/biodata/payment";
import type { BiodataFormValues } from "@/lib/biodata/schema";

interface StepReviewDownloadProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  hasPaid: boolean;
  isPaying: boolean;
  onPurchase: (email: string) => void;
}

// Which specific button is mid-action, so only that one shows a spinner
// (not every button on the step) and the rest stay disabled meanwhile.
type BusyAction = "download-free" | "share-free" | "download-paid" | "share-paid" | null;

// The document itself is the same `<BiodataPreview>` already visible in the
// right-hand pane throughout the wizard — `previewRef` points straight at
// it, so a downloaded/shared PDF always matches exactly what's on screen
// (watermark included/excluded) with no separate render path.
//
// Both tiers (free/watermarked and paid/full) offer the same two actions —
// Download and Share on WhatsApp — deliberately: charging again just to
// share the same unlocked file would feel like a bait-and-switch. One
// payment unlocks both actions for the full version.
export function StepReviewDownload({ previewRef, hasPaid, isPaying, onPurchase }: StepReviewDownloadProps) {
  const { watch } = useFormContext<BiodataFormValues>();
  const savedEmail = watch("contact.email");

  // This step unmounts/remounts on every visit (the builder swaps it in only
  // while on the last step), so re-reading `contact.email` here on each
  // mount is enough to pick up a value filled in on the Contact step after
  // an earlier visit — no effect needed to keep it "in sync" separately.
  const [email, setEmail] = React.useState(savedEmail);
  const [busy, setBusy] = React.useState<BusyAction>(null);
  const [shareNotice, setShareNotice] = React.useState<string | null>(null);

  const runAction = async (action: BusyAction, task: () => Promise<void>) => {
    if (!previewRef.current || busy) return;
    setBusy(action);
    setShareNotice(null);
    try {
      await task();
    } finally {
      setBusy(null);
    }
  };

  const handleDownload = (filename: string, action: BusyAction) =>
    runAction(action, () => exportPreviewAsPdf(previewRef.current!, filename));

  const handleShare = (filename: string, action: BusyAction) =>
    runAction(action, async () => {
      const result = await sharePreviewAsPdf(previewRef.current!, filename);
      if (result === "downloaded") {
        setShareNotice(
          "Direct sharing isn't supported on this browser, so we downloaded the PDF instead — attach it to WhatsApp manually."
        );
      }
    });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Review & download
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Check your details in the preview, then download or share your biodata.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-medium">Free preview</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Includes a small watermark. Free anytime.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDownload("biodata-preview.pdf", "download-free")}
            disabled={busy !== null}
          >
            {busy === "download-free" ? <Loader2 className="animate-spin" /> : <Download />}
            Download
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleShare("biodata-preview.pdf", "share-free")}
            disabled={busy !== null}
          >
            {busy === "share-free" ? <Loader2 className="animate-spin" /> : <Share2 />}
            Share on WhatsApp
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/[0.03] p-5">
        <p className="text-sm font-medium">Full biodata</p>
        <p className="mt-0.5 text-xs text-muted-foreground">No watermark. One-time payment.</p>

        {hasPaid ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              onClick={() => handleDownload("biodata.pdf", "download-paid")}
              disabled={busy !== null}
            >
              {busy === "download-paid" ? <Loader2 className="animate-spin" /> : <Download />}
              Download
            </Button>
            <Button
              type="button"
              onClick={() => handleShare("biodata.pdf", "share-paid")}
              disabled={busy !== null}
            >
              {busy === "share-paid" ? <Loader2 className="animate-spin" /> : <Share2 />}
              Share on WhatsApp
            </Button>
            <span className="text-xs text-muted-foreground">No watermark — thank you!</span>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="backup-email">Email (for your backup copy)</Label>
              <Input
                id="backup-email"
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">
                We&apos;ll also send a copy here in case a download ever fails.
              </p>
            </div>
            <Button type="button" onClick={() => onPurchase(email)} disabled={isPaying || !email}>
              {isPaying ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isPaying ? "Processing…" : `Pay ₹${PLACEHOLDER_PRICE_INR} to unlock`}
            </Button>
          </div>
        )}
      </div>

      {shareNotice && <p className="text-xs text-muted-foreground">{shareNotice}</p>}
    </div>
  );
}
