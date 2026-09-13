"use client";

import * as React from "react";
import { Download, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { exportPreviewAsPdf } from "@/lib/biodata/pdf-export";
import { PLACEHOLDER_PRICE_INR } from "@/lib/biodata/payment";

interface StepReviewDownloadProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  hasPaid: boolean;
  isPaying: boolean;
  onPurchase: () => void;
}

// The final step. The document itself is the same `<BiodataPreview>` already
// visible in the right-hand pane throughout the wizard — `previewRef` points
// straight at it, so a downloaded PDF always matches exactly what's on
// screen (watermark included/excluded) with no separate render path.
export function StepReviewDownload({ previewRef, hasPaid, isPaying, onPurchase }: StepReviewDownloadProps) {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
      await exportPreviewAsPdf(previewRef.current, hasPaid ? "biodata.pdf" : "biodata-preview.pdf");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Review & download
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Check your details in the preview, then download your biodata as a PDF.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
          Download free preview (with watermark)
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          Free to download anytime — it includes a small watermark.
        </p>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/[0.03] p-5">
        {hasPaid ? (
          <>
            <Button type="button" className="w-full" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? <Loader2 className="animate-spin" /> : <Download />}
              Download full biodata (PDF)
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">No watermark — thank you!</p>
          </>
        ) : (
          <>
            <Button type="button" className="w-full" onClick={onPurchase} disabled={isPaying}>
              {isPaying ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isPaying ? "Processing…" : `Pay ₹${PLACEHOLDER_PRICE_INR} to unlock the full download`}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">One-time payment. Removes the watermark.</p>
          </>
        )}
      </div>
    </div>
  );
}
