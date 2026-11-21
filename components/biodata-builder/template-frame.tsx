import * as React from "react";

import { cn } from "@/lib/utils";
import { getTemplate, type TemplateConfig, type TemplateId } from "@/lib/biodata/templates";
import {
  ArchTop,
  FloralCorners,
  FlourishCorners,
  MandalaCorners,
} from "@/components/biodata-builder/template-ornaments";

interface TemplateFrameProps extends React.ComponentPropsWithoutRef<"div"> {
  templateId: TemplateId;
  children: React.ReactNode;
  /** Use inside small tiles (picker, homepage gallery) — scales frame
   * lines, ornaments and padding down to suit a ~150px-wide page. */
  compact?: boolean;
}

const SERIF_STACK = 'var(--font-playfair), "Playfair Display", var(--font-devanagari-serif), Georgia, serif';
const SANS_STACK = 'var(--font-sora), "Sora", var(--font-devanagari), system-ui, sans-serif';

// The template's colours as CSS variables, read by biodata-preview.tsx and
// the tile contents (`text-[var(--bd-ink)]` etc.), so one theme object
// drives every surface the biodata appears on.
function themeStyle(template: TemplateConfig): React.CSSProperties {
  const { theme } = template;
  return {
    "--bd-paper": theme.paper,
    "--bd-ink": theme.ink,
    "--bd-muted": theme.muted,
    "--bd-accent": theme.accent,
    "--bd-rule": theme.rule,
    "--bd-frame": theme.frame,
    "--bd-band": theme.band,
    "--bd-watermark": theme.watermark,
    // Header text sits on the coloured band for "band" templates.
    "--bd-header-ink": template.ornament === "band" ? (theme.bandInk ?? theme.ink) : theme.accent,
    "--bd-heading-font": template.font === "serif" ? SERIF_STACK : SANS_STACK,
    backgroundColor: theme.paper,
    color: theme.ink,
  } as React.CSSProperties;
}

function FrameLines({ template, compact }: { template: TemplateConfig; compact: boolean }) {
  const color = template.theme.frame;
  const inset = compact ? 4 : 9;
  switch (template.frame) {
    case "single":
      return <div aria-hidden="true" className="absolute rounded-[3px]" style={{ inset, border: `1px solid ${color}` }} />;
    case "double":
      return (
        <div
          aria-hidden="true"
          className="absolute rounded-[3px]"
          style={{ inset, border: `${compact ? 2 : 3.5}px double ${color}` }}
        />
      );
    case "thick":
      return (
        <>
          <div aria-hidden="true" className="absolute inset-0" style={{ border: `${compact ? 3 : 7}px solid ${color}` }} />
          <div
            aria-hidden="true"
            className="absolute"
            style={{ inset: compact ? 5 : 12, border: `1px solid ${color}`, opacity: 0.55 }}
          />
        </>
      );
    default:
      return null;
  }
}

function OrnamentArt({ template, compact }: { template: TemplateConfig; compact: boolean }) {
  const tint = { color: template.ornament === "band" ? template.theme.band : template.theme.accent };
  switch (template.ornament) {
    case "flourish":
      return (
        <div aria-hidden="true" className="absolute" style={{ ...tint, inset: compact ? 5 : 12 }}>
          <FlourishCorners className={compact ? "size-5" : "size-10 sm:size-12"} />
        </div>
      );
    case "mandala":
      return (
        <div aria-hidden="true" className="absolute inset-0 opacity-80" style={tint}>
          <MandalaCorners className={compact ? "size-9" : "size-20 sm:size-24"} />
        </div>
      );
    case "floral":
      return (
        <div aria-hidden="true" className="absolute opacity-75" style={{ ...tint, inset: compact ? 3 : 8 }}>
          <FloralCorners className={compact ? "size-8" : "size-16 sm:size-20"} />
        </div>
      );
    case "arch":
      return (
        <div aria-hidden="true" className="absolute inset-x-0 top-0" style={{ ...tint, padding: compact ? "6px 6px 0" : "14px 14px 0" }}>
          <div className="relative" style={{ aspectRatio: "210 / 40" }}>
            <ArchTop className="h-full w-full" />
          </div>
        </div>
      );
    case "band":
      return <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[16%]" style={{ backgroundColor: template.theme.band }} />;
    default:
      return null;
  }
}

// Content padding clears the frame and any ornament; arch and band
// templates need extra room at the top for the header to sit inside them.
function contentPadding(template: TemplateConfig, compact: boolean): string {
  const top = template.ornament === "arch" ? (compact ? "pt-4" : "pt-7 sm:pt-8") : "";
  const sides = compact ? "px-2.5 py-2.5" : "px-5 py-4 sm:px-6 sm:py-5";
  return cn(sides, top);
}

// Shared renderer for the live preview, picker tiles, homepage gallery and
// exported PDF/JPG, so every surface shows the same design.
//
// Fixed to an A4 portrait aspect ratio (210:297) with `overflow-hidden` — the
// document is always exactly one page, by construction: there's no
// pagination logic anywhere, content that doesn't fit is simply clipped,
// which is also what keeps the PDF export fast (see `pdf-export.ts`).
export const TemplateFrame = React.forwardRef<HTMLDivElement, TemplateFrameProps>(
  function TemplateFrame({ templateId, children, className, compact = false, style, ...props }, ref) {
    const template = getTemplate(templateId);

    return (
      <div
        ref={ref}
        className={cn(
          "relative aspect-[210/297] w-full overflow-hidden rounded-[4px] shadow-[0_28px_64px_rgba(62,21,50,0.16)]",
          className
        )}
        style={{ ...themeStyle(template), ...style }}
        {...props}
      >
        <OrnamentArt template={template} compact={compact} />
        <FrameLines template={template} compact={compact} />
        <div className={cn("absolute inset-0 flex flex-col overflow-hidden", contentPadding(template, compact))}>
          {children}
        </div>
      </div>
    );
  }
);
