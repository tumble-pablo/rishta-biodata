import * as React from "react";

import { cn } from "@/lib/utils";
import { getTemplate, type TemplateId } from "@/lib/biodata/templates";

interface TemplateFrameProps extends React.ComponentPropsWithoutRef<"div"> {
  templateId: TemplateId;
  children: React.ReactNode;
}

// Shared border/frame renderer used both by the full-size live preview and
// the 8 picker-tile mini-previews, so a tile always shows an accurate live
// sample rather than a flat color chip. Reuses the hero mock's existing
// `.document-sheet` / `.document-corner-left/right` visual language
// (app/globals.css) — only the border/frame classes vary per template.
export const TemplateFrame = React.forwardRef<HTMLDivElement, TemplateFrameProps>(
  function TemplateFrame({ templateId, children, className, ...props }, ref) {
    const { frame } = getTemplate(templateId);

    return (
      <div
        ref={ref}
        className={cn(
          "document-sheet relative overflow-hidden bg-card p-5 shadow-[0_28px_64px_rgba(62,21,50,0.13)] sm:p-7",
          frame.sheetBorderClass,
          frame.sheetRadiusClass,
          frame.sheetTintClass,
          className
        )}
        {...props}
      >
        {(frame.cornerVariant === "both" || frame.cornerVariant === "left") && (
          <div aria-hidden="true" className="document-corner document-corner-left" />
        )}
        {(frame.cornerVariant === "both" || frame.cornerVariant === "right") && (
          <div aria-hidden="true" className="document-corner document-corner-right" />
        )}
        {frame.innerFrame ? (
          <div
            className={cn(
              "relative flex flex-col rounded-[16px] px-5 py-6 sm:px-7 sm:py-7",
              frame.innerFrameBorderClass ?? "border border-primary/10"
            )}
          >
            {children}
          </div>
        ) : (
          <div className="relative flex flex-col px-1 py-1">{children}</div>
        )}
      </div>
    );
  }
);
