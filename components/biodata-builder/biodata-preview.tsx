"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { UserRound } from "lucide-react";

import { buildPrintLayout, type PrintRow, type PrintSection } from "@/lib/biodata/print-layout";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { cn } from "@/lib/utils";
import { SYMBOL_GLYPHS } from "@/components/biodata-builder/symbol-glyphs";
import { TemplateFrame } from "@/components/biodata-builder/template-frame";
import { WatermarkOverlay } from "@/components/biodata-builder/watermark-overlay";

function PrintFieldRow({ label, value, wrap = false }: PrintRow & { wrap?: boolean }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1.5 text-[8.5px] leading-snug sm:text-[9.5px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium text-foreground", wrap ? "" : "truncate")}>{value}</span>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="text-[8.5px] font-semibold tracking-[0.08em] text-accent-foreground uppercase sm:text-[9.5px]">
        {title}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

// Full-width section (Personal, Religion, Family): a 2-column grid of field
// rows — matches the reference's dense layout and lets the natural grid flow
// pair rows side by side without any manual row-pairing logic.
function FullWidthSection({ title, rows }: PrintSection) {
  if (rows.length === 0) return null;
  return (
    <div className="mt-2 first:mt-0">
      <SectionHeading title={title} />
      <div className="grid grid-cols-2 gap-x-5 gap-y-0.5">
        {rows.map((r) => (
          <PrintFieldRow key={r.label} {...r} />
        ))}
      </div>
    </div>
  );
}

// Half-width section (Education & Career / Lifestyle side by side): a single
// column of field rows, since the section itself is already half the page.
// Values wrap instead of truncating here — with the narrower column, a
// two-line institution/company name reads better than a hard ellipsis cut.
function HalfWidthSection({ title, rows }: PrintSection) {
  if (rows.length === 0) return null;
  return (
    <div>
      <SectionHeading title={title} />
      <div className="space-y-0.5">
        {rows.map((r) => (
          <PrintFieldRow key={r.label} {...r} wrap />
        ))}
      </div>
    </div>
  );
}

interface BiodataPreviewProps {
  hasPaid: boolean;
}

// The live document — reads the shared react-hook-form instance via context
// so it stays in sync with every step without prop drilling. Forwards its
// ref to the actual snapshotted node (see `pdf-export.ts`), so what gets
// exported is always exactly what's on screen, watermark included.
//
// Fixed to one A4 page by `TemplateFrame` (see there for why) — only fields
// that actually have a value are shown here (no skeleton/ghost placeholder
// rows), matching a real formal biodata document rather than a form dump.
export const BiodataPreview = React.forwardRef<HTMLDivElement, BiodataPreviewProps>(
  function BiodataPreview({ hasPaid }, ref) {
    const { watch } = useFormContext<BiodataFormValues>();
    const values = watch();
    const { symbol, template } = values;
    const layout = buildPrintLayout(values);

    const SymbolGlyph = SYMBOL_GLYPHS[symbol.symbolId];
    const showSymbol = symbol.symbolId !== "none";

    const hasEducationOrLifestyle =
      layout.educationCareer.rows.length > 0 || layout.lifestyle.rows.length > 0;

    return (
      <TemplateFrame ref={ref} templateId={template.templateId} className="w-full">
        {!hasPaid && <WatermarkOverlay />}

        <div className="flex h-full flex-col">
          <div className="text-center">
            {showSymbol && (
              <>
                <SymbolGlyph className="mx-auto size-6 text-primary sm:size-8" />
                <p className="mt-1 text-[8px] tracking-[0.15em] text-primary/70 sm:text-[9px]">
                  || शुभम् भवतु ||
                </p>
              </>
            )}
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-accent-foreground/40" />
              <h2 className="font-heading text-sm font-semibold tracking-[0.03em] text-primary sm:text-base">
                Biodata
              </h2>
              <span className="h-px w-6 bg-accent-foreground/40" />
            </div>
          </div>

          <div className="mt-2.5 flex items-start justify-between gap-3">
            <div className="min-w-0">
              {layout.header.name ? (
                <h3 className="font-heading truncate text-base font-semibold text-foreground sm:text-lg">
                  {layout.header.name}
                </h3>
              ) : (
                <div className="h-4 w-28 rounded bg-primary/10 sm:h-5 sm:w-32" />
              )}
              {layout.header.subtitle && (
                <p className="mt-0.5 text-[8px] text-muted-foreground sm:text-[9px]">
                  {layout.header.subtitle}
                </p>
              )}
            </div>
            <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-1 rounded border border-dashed border-primary/25 bg-muted/40 sm:h-[4.5rem] sm:w-14">
              <UserRound aria-hidden="true" className="size-3.5 text-primary/30 sm:size-4" />
              <span className="text-[6px] font-medium tracking-wide text-primary/40 uppercase sm:text-[6.5px]">
                Photo
              </span>
            </div>
          </div>

          <div className="mt-2 h-px bg-border" />

          <FullWidthSection {...layout.personal} />
          <FullWidthSection {...layout.religion} />

          {hasEducationOrLifestyle && (
            <div className="mt-2 grid grid-cols-2 gap-x-5">
              <HalfWidthSection {...layout.educationCareer} />
              <HalfWidthSection {...layout.lifestyle} />
            </div>
          )}

          <FullWidthSection {...layout.family} />

          <div className="-mx-3.5 -mb-3.5 mt-auto border-t border-accent-foreground/15 bg-accent/25 px-3.5 pt-1.5 pb-2 text-center sm:-mx-5 sm:-mb-4 sm:px-5">
            <p className="text-[7.5px] leading-snug text-accent-foreground/90 italic sm:text-[8.5px]">
              Looking for a kind, understanding and family-oriented partner to build a happy life
              together.
            </p>
          </div>
        </div>
      </TemplateFrame>
    );
  }
);
