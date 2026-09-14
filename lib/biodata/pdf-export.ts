// Builds a PDF from a DOM node (the live preview) by snapshotting it as an
// image — see the plan's "PDF approach" decision: this always matches
// exactly what's on screen (including the watermark's presence or absence)
// with zero duplicate template-rendering logic, at the cost of the PDF's
// text not being selectable/searchable.
//
// `html2canvas-pro`/`jsPDF` are dynamically imported inside the function
// (rather than statically at the top of the file) so they're never evaluated
// during server-side rendering — this app renders on Cloudflare Workers,
// which has no `window`/`document` — and this keeps both libraries out of
// the initial client bundle too, loading only when someone actually clicks a
// download/share button.
//
// Uses `html2canvas-pro` rather than plain `html2canvas`: Tailwind v4's
// opacity-modifier utilities (`ring-ring/50`, `bg-primary/10`, etc. — used
// throughout the base shadcn components, not just this feature) compile to
// `color-mix(in oklab, ...)`, which the original html2canvas throws on
// ("Attempting to parse an unsupported color function"). html2canvas-pro is
// an actively maintained fork with the same API that added support for
// oklch/oklab/color-mix, confirmed working here.
//
// `node` is always the fixed A4-aspect `TemplateFrame` element (see
// `template-frame.tsx`), so this is always a single-page export — no
// pagination logic needed. An earlier version paginated a DOM node that grew
// to fit every field (including empty ones and unbounded free-text fields),
// which produced multi-megabyte, dozens-of-pages PDFs; fixing the document
// itself to one page upstream is what keeps this both fast and genuinely
// one page.

const TARGET_CANVAS_WIDTH_PX = 1600; // ~print-quality without being excessive

// `jsPDF`'s type is only available once the dynamic import resolves; this
// captures its instance type without a static (eager) import.
type JsPdfInstance = InstanceType<typeof import("jspdf").jsPDF>;

async function buildPdf(node: HTMLElement): Promise<JsPdfInstance> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  // The preview renders at whatever CSS size its container gives it (small
  // on mobile, larger on desktop) — scale the capture up to a consistent
  // resolution regardless of that on-screen size, rather than a fixed
  // `scale` that would look soft on a small viewport or oversized on a
  // large one.
  const scale = Math.max(1, TARGET_CANVAS_WIDTH_PX / node.offsetWidth);

  const canvas = await html2canvas(node, {
    scale,
    backgroundColor: "#fffefd",
    useCORS: true,
  });

  // JPEG rather than PNG: this is a flat, mostly-solid-color document (no
  // transparency needed, since html2canvas already painted a solid
  // background) — JPEG keeps the file genuinely lightweight and
  // WhatsApp-friendly, as the site's own copy promises.
  const imageData = canvas.toDataURL("image/jpeg", 0.92);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 8;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  // The node is already fixed to the A4 aspect ratio, so this "contain" fit
  // is mostly just matching the PDF page's own margins — it's not doing the
  // heavy lifting of avoiding a squished multi-page document the way it
  // would have to for an unbounded-height node.
  const canvasAspectRatio = canvas.width / canvas.height;
  let renderWidth = maxWidth;
  let renderHeight = renderWidth / canvasAspectRatio;
  if (renderHeight > maxHeight) {
    renderHeight = maxHeight;
    renderWidth = renderHeight * canvasAspectRatio;
  }

  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  doc.addImage(imageData, "JPEG", x, y, renderWidth, renderHeight);
  return doc;
}

export async function exportPreviewAsPdf(node: HTMLElement, filename: string): Promise<void> {
  const doc = await buildPdf(node);
  doc.save(filename);
}

// For emailing a backup copy — the server has no DOM to render from, so the
// client builds the same PDF it would download/share and sends the bytes
// along as base64 (jsPDF's own `"base64"` output, no `data:` prefix, ready
// to drop straight into an email attachment).
export async function getPreviewPdfBase64(node: HTMLElement): Promise<string> {
  const doc = await buildPdf(node);
  return doc.output("base64");
}

export type SharePreviewResult = "shared" | "cancelled" | "downloaded";

// Browsers don't let a web page hand a file directly to a specific named
// app — there's no way to "open WhatsApp with this file attached" from a
// link. The only real mechanism is the OS share sheet (Web Share API with
// files), where the visitor picks WhatsApp themselves; that only works on
// browsers/devices that support sharing files (mobile Safari/Chrome, not
// desktop browsers today). Where it isn't supported, this falls back to a
// plain download so the button always does something useful, but doesn't
// force a download if the person actively cancelled the share sheet.
export async function sharePreviewAsPdf(node: HTMLElement, filename: string): Promise<SharePreviewResult> {
  const doc = await buildPdf(node);

  const nav = typeof navigator === "undefined" ? null : navigator;
  const canShareFiles = Boolean(nav && "share" in nav && "canShare" in nav);

  if (canShareFiles) {
    const blob = doc.output("blob");
    const file = new File([blob], filename, { type: "application/pdf" });
    if (nav!.canShare({ files: [file] })) {
      try {
        await nav!.share({ files: [file], title: "My Biodata" });
        return "shared";
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return "cancelled";
        // Any other share failure falls through to a plain download below.
      }
    }
  }

  doc.save(filename);
  return "downloaded";
}
