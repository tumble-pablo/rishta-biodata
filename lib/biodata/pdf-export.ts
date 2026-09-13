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

export async function exportPreviewAsPdf(node: HTMLElement, filename: string): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#fffefd",
    useCORS: true,
  });

  // JPEG rather than PNG: this is a flat, mostly-solid-color document (no
  // transparency needed, since html2canvas already painted a solid
  // background), and PNG's lossless encoding of a long, tall page made the
  // very first version of this function produce an ~12 MB file — nowhere
  // near the "lightweight, WhatsApp-ready" PDF this site promises.
  const imageData = canvas.toDataURL("image/jpeg", 0.92);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;
  // Only a top margin is reserved — nothing clips the image at a "bottom
  // margin," only the physical page edge does, so the visible window on
  // every page is actually `pageHeight - margin`. Using that as both the
  // per-page height AND the step between pages keeps consecutive pages
  // meeting exactly, with no gap and no repeated sliver of content.
  const pageContentHeight = pageHeight - margin;

  // A full biodata (5 sections' worth of fields) is almost always taller
  // than a single A4 page. Squeezing the whole image onto one page would
  // shrink a long document down to illegibly small text, so instead this
  // scales the image to the page's width and paginates down its height,
  // redrawing the same image at a shifted offset on each page — the
  // standard technique for multi-page html2canvas/jsPDF exports, since each
  // page only shows the portion of the image that falls within its bounds.
  const imageHeight = (canvas.height * contentWidth) / canvas.width;
  let heightRemaining = imageHeight;
  let renderedHeight = 0;

  doc.addImage(imageData, "JPEG", margin, margin, contentWidth, imageHeight);
  heightRemaining -= pageContentHeight;

  while (heightRemaining > 0) {
    renderedHeight += pageContentHeight;
    doc.addPage();
    doc.addImage(imageData, "JPEG", margin, margin - renderedHeight, contentWidth, imageHeight);
    heightRemaining -= pageContentHeight;
  }

  doc.save(filename);
}
