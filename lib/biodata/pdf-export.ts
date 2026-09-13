// Exports a DOM node (the live preview) to a downloadable PDF by snapshotting
// it as an image — see the plan's "PDF approach" decision: this always
// matches exactly what's on screen (including the watermark's presence or
// absence) with zero duplicate template-rendering logic, at the cost of the
// PDF's text not being selectable/searchable.
//
// `html2canvas-pro`/`jsPDF` are dynamically imported inside the function
// (rather than statically at the top of the file) so they're never evaluated
// during server-side rendering — this app renders on Cloudflare Workers,
// which has no `window`/`document` — and this keeps both libraries out of
// the initial client bundle too, loading only when someone actually clicks a
// download button.
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

export async function exportPreviewAsPdf(node: HTMLElement, filename: string): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  // The preview renders at whatever CSS size its container gives it (small
  // on mobile, larger on desktop) — scale the capture up to a consistent,
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
  doc.save(filename);
}
