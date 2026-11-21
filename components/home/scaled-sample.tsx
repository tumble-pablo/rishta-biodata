"use client";

import * as React from "react";

import { SampleBiodata } from "@/components/home/sample-biodata";
import type { TemplateId } from "@/lib/biodata/templates";

// The biodata preview uses fixed pixel type sizes (it's a printed page), so
// it can't simply be squeezed into a small tile. Render it at a fixed
// "page" width and scale the whole page down to the tile's width.
const PAGE_WIDTH = 420;

interface ScaledSampleProps {
  templateId: TemplateId;
  profile?: "man" | "woman";
  className?: string;
}

export function ScaledSample({ templateId, profile, className }: ScaledSampleProps) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState<number | null>(null);

  React.useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const update = () => setScale(outer.clientWidth / PAGE_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={className} style={{ aspectRatio: "210 / 297", position: "relative" }}>
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 origin-top-left"
        // Hidden until measured, so the full-size page never flashes in.
        style={{ width: PAGE_WIDTH, transform: `scale(${scale ?? 0})`, visibility: scale ? "visible" : "hidden" }}
      >
        <SampleBiodata templateId={templateId} profile={profile} />
      </div>
    </div>
  );
}
