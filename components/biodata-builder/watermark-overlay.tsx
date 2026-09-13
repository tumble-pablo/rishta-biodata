// A diagonal, tiled "preview" watermark shown over the document whenever the
// visitor hasn't paid yet. Rendered inside the same DOM node that gets
// snapshotted for PDF export, so the exported file and the on-screen preview
// can never drift out of sync — removing the watermark is just toggling
// whether this component is mounted.
export function WatermarkOverlay() {
  const tiles = Array.from({ length: 40 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
    >
      <div className="absolute inset-[-20%] flex rotate-[-30deg] flex-wrap content-center items-center justify-center gap-x-4 gap-y-3">
        {tiles.map((_, index) => (
          <span
            key={index}
            className="whitespace-nowrap text-[9px] font-semibold tracking-[0.15em] text-primary/15 uppercase sm:text-[10px]"
          >
            Preview · rishtabiodata.com
          </span>
        ))}
      </div>
    </div>
  );
}
