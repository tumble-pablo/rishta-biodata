import * as React from "react";

import { cn } from "@/lib/utils";
import { getTemplate, type TemplateId } from "@/lib/biodata/templates";
import { CornerOrnament } from "@/components/biodata-builder/corner-ornament";

interface TemplateFrameProps extends React.ComponentPropsWithoutRef<"div"> {
  templateId: TemplateId;
  children: React.ReactNode;
  /** Use inside the small picker tiles — scales the corner ornaments and
   * inner padding down so they don't dwarf a ~150px-wide tile the way the
   * full-size preview's proportions would. */
  compact?: boolean;
}

// Shared border/frame renderer used both by the full-size live preview and
// the 8 picker-tile mini-previews, so a tile always shows an accurate live
// sample rather than a flat color chip.
//
// Fixed to an A4 portrait aspect ratio (210:297) with `overflow-hidden` — the
// document is always exactly one page, by construction: there's no
// pagination logic anywhere, content that doesn't fit is simply clipped,
// which is also what keeps the PDF export fast (see `pdf-export.ts`) and
// matches the "clean, simple, one page" brief.
export const TemplateFrame = React.forwardRef<HTMLDivElement, TemplateFrameProps>(
  function TemplateFrame({ templateId, children, className, compact = false, ...props }, ref) {
    const { frame } = getTemplate(templateId);
    const showLeftCorners = frame.cornerVariant === "both" || frame.cornerVariant === "left";
    const showRightCorners = frame.cornerVariant === "both" || frame.cornerVariant === "right";

    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-[210/297] w-full overflow-hidden bg-card shadow-[0_28px_64px_rgba(62,21,50,0.13)]",
          frame.sheetBorderClass,
          frame.sheetRadiusClass,
          frame.sheetTintClass,
          className
        )}
        {...props}
      >
        {showLeftCorners && (
          <>
            <CornerOrnament corner="top-left" className={compact ? "size-3 sm:size-3" : undefined} />
            <CornerOrnament corner="bottom-left" className={compact ? "size-3 sm:size-3" : undefined} />
          </>
        )}
        {showRightCorners && (
          <>
            <CornerOrnament corner="top-right" className={compact ? "size-3 sm:size-3" : undefined} />
            <CornerOrnament corner="bottom-right" className={compact ? "size-3 sm:size-3" : undefined} />
          </>
        )}

        {frame.innerFrame ? (
          <div
            className={cn(
              "absolute flex flex-col overflow-hidden rounded-[10px]",
              compact ? "inset-1.5 px-2 py-2" : "inset-2.5 px-3.5 py-3.5 sm:px-5 sm:py-4",
              frame.innerFrameBorderClass ?? "border border-primary/15"
            )}
          >
            {children}
          </div>
        ) : (
          <div
            className={cn(
              "absolute inset-0 flex flex-col overflow-hidden",
              compact ? "px-2 py-2" : "px-3.5 py-3.5 sm:px-5 sm:py-4"
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
