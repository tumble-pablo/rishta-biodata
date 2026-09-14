"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Download, Loader2, Share2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { exportPreviewAsPdf, sharePreviewAsPdf } from "@/lib/biodata/pdf-export";
import { UNLOCK_PRICE_INR } from "@/lib/biodata/payment";
import type { BiodataFormValues } from "@/lib/biodata/schema";

interface StepReviewDownloadProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  hasPaid: boolean;
  isPaying: boolean;
  onPurchase: (email: string) => Promise<boolean>;
}

// Which specific button is mid-action, so only that one shows a spinner
// (not every button on the step) and the rest stay disabled meanwhile.
type BusyAction = "download-free" | "share-free" | "download-paid" | "share-paid" | null;

// Which action the visitor actually asked for, before we knew whether
// they'd pay — set the moment "Download"/"Share" is clicked (pre-payment),
// read again once the free/paid choice resolves so the right thing happens
// immediately, with no separate re-click needed.
type PendingAction = "download" | "share" | null;

// Deliberately doesn't mention "free" or "watermark" anywhere in the two
// buttons visitors see first — that choice only shows up once someone has
// already committed to downloading or sharing, framed as "which version"
// rather than "do you want to pay". Once `hasPaid` is true there's nothing
// left to choose, so both buttons just produce the unlocked file directly.
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
  const [pendingAction, setPendingAction] = React.useState<PendingAction>(null);

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

  // Entry points: already unlocked visitors go straight through; everyone
  // else sees the version dialog first.
  const handlePrimaryDownload = () => {
    if (hasPaid) {
      handleDownload("biodata.pdf", "download-paid");
      return;
    }
    setPendingAction("download");
  };

  const handlePrimaryShare = () => {
    if (hasPaid) {
      handleShare("biodata.pdf", "share-paid");
      return;
    }
    setPendingAction("share");
  };

  const runPendingAction = (variant: "free" | "paid") => {
    const filename = variant === "paid" ? "biodata.pdf" : "biodata-preview.pdf";
    if (pendingAction === "share") return handleShare(filename, variant === "paid" ? "share-paid" : "share-free");
    return handleDownload(filename, variant === "paid" ? "download-paid" : "download-free");
  };

  const handleChooseFree = async () => {
    await runPendingAction("free");
    setPendingAction(null);
  };

  const handleChoosePaid = async () => {
    const success = await onPurchase(email);
    if (success) {
      await runPendingAction("paid");
      setPendingAction(null);
    }
    // On failure, leave the dialog open — the Razorpay modal already showed
    // its own error/cancellation state, so they can just try again.
  };

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
        <p className="text-sm font-medium">Your biodata is ready</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {hasPaid ? "No watermark — thank you!" : "Download it or share it straight to WhatsApp."}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={handlePrimaryDownload} disabled={busy !== null}>
            {busy === "download-paid" || busy === "download-free" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Download />
            )}
            Download
          </Button>
          <Button type="button" variant="outline" onClick={handlePrimaryShare} disabled={busy !== null}>
            {busy === "share-paid" || busy === "share-free" ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Share2 />
            )}
            Share on WhatsApp
          </Button>
        </div>
      </div>

      {shareNotice && <p className="text-xs text-muted-foreground">{shareNotice}</p>}

      <Dialog open={pendingAction !== null} onOpenChange={(open) => !open && setPendingAction(null)}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Almost there</DialogTitle>
            <DialogDescription>Choose which version to {pendingAction ?? "download"}.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border border-primary/30 bg-primary/[0.03] p-4">
              <p className="text-sm font-medium">Remove the watermark</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                One-time payment. Instant, clean, ready to share.
              </p>

              <div className="mt-3 space-y-1.5">
                <Label htmlFor="dialog-email" className="text-xs">
                  Email (for your backup copy)
                </Label>
                <Input
                  id="dialog-email"
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <Button
                type="button"
                className="mt-3 w-full"
                onClick={handleChoosePaid}
                disabled={isPaying || !email}
              >
                {isPaying ? <Loader2 className="animate-spin" /> : <Sparkles />}
                {isPaying
                  ? "Processing…"
                  : `Pay ₹${UNLOCK_PRICE_INR} & ${pendingAction === "share" ? "Share" : "Download"}`}
              </Button>
            </div>

            <button
              type="button"
              onClick={handleChooseFree}
              disabled={busy !== null || isPaying}
              className="block w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Continue with a watermark instead
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
