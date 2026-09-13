// A diagonal, tiled "preview" watermark shown over the document whenever the
// visitor hasn't paid yet. Rendered inside the same DOM node that gets
// snapshotted for PDF export, so the exported file and the on-screen preview
// can never drift out of sync — removing the watermark is just toggling
// whether this component is mounted.
export function WatermarkOverlay() {
  const tiles = Array.from({ length: 18 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
    >
      <div className="absolute inset-[-20%] flex rotate-[-24deg] flex-wrap content-center items-center justify-center gap-x-10 gap-y-8">
        {tiles.map((_, index) => (
          <span
            key={index}
            className="whitespace-nowrap text-sm font-semibold tracking-[0.2em] text-primary/15 uppercase"
          >
            Preview · rishtabiodata.com
          </span>
        ))}
      </div>
    </div>
  );
}
