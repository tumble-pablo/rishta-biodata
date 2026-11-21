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

// Every curated row always renders — see print-layout.ts for why. A blank
// value shows a short dashed "fill this in" line rather than disappearing,
// so the document's structure (every heading it'll eventually have) is
// visible from the very first render, before anything's been typed.
function PrintFieldRow({ label, value, wrap = false }: PrintRow & { wrap?: boolean }) {
  const hasValue = value.length > 0;
  return (
    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1.5 text-[8.5px] leading-snug sm:text-[9.5px]">
      <span className="text-[var(--bd-muted)]">{label}</span>
      {hasValue ? (
        <span className={cn("font-medium text-[var(--bd-ink)]", wrap ? "" : "truncate")}>{value}</span>
      ) : (
        <span
          aria-hidden="true"
          className="h-px w-10 self-center border-b border-dashed border-[var(--bd-rule)] sm:w-14"
        />
      )}
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-1 flex items-center gap-2">
      <span className="font-[family-name:var(--bd-heading-font)] text-[9px] font-semibold tracking-[0.08em] text-[var(--bd-accent)] uppercase sm:text-[10px]">
        {title}
      </span>
      <span className="h-px flex-1 bg-[var(--bd-rule)]" />
    </div>
  );
}

// Full-width section (Personal, Religion, Family): a 2-column grid of field
// rows — matches the reference's dense layout and lets the natural grid flow
// pair rows side by side without any manual row-pairing logic. Rows are
// always the same fixed curated set (see print-layout.ts), so there's
// nothing to gate on — the section itself always renders.
function FullWidthSection({ title, rows }: PrintSection) {
  return (
    <div className="mt-1.5 first:mt-0">
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
// Fixed to one A4 page by `TemplateFrame` (see there for why). Every
// curated field's label always renders, blank until filled — see
// print-layout.ts for why that's safe (a small fixed set, not the full
// form) — so the document reads as "actively taking shape," not empty.
export const BiodataPreview = React.forwardRef<HTMLDivElement, BiodataPreviewProps>(
  function BiodataPreview({ hasPaid }, ref) {
    const { watch } = useFormContext<BiodataFormValues>();
    const values = watch();
    const { symbol, template } = values;
    const layout = buildPrintLayout(values);

    const SymbolGlyph = SYMBOL_GLYPHS[symbol.symbolId];
    const showSymbol = symbol.symbolId !== "none";

    return (
      <TemplateFrame ref={ref} templateId={template.templateId} className="w-full">
        {!hasPaid && <WatermarkOverlay />}

        <div className="flex h-full flex-col">
          <div className="text-center">
            {showSymbol && (
              <>
                <SymbolGlyph className="mx-auto size-6 text-[var(--bd-header-ink)] sm:size-8" />
                <p className="mt-1 text-[8px] tracking-[0.15em] text-[var(--bd-header-ink)] opacity-80 sm:text-[9px]">
                  || शुभम् भवतु ||
                </p>
              </>
            )}
            <div className="mt-1.5 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-[var(--bd-header-ink)] opacity-50" />
              {/* Styled text, not a heading: this preview sits inside the
                  homepage, where an h2/h3 here would pollute its outline. */}
              <p className="font-[family-name:var(--bd-heading-font)] text-sm font-semibold tracking-[0.18em] text-[var(--bd-header-ink)] uppercase sm:text-base">
                {layout.strings.documentTitle}
              </p>
              <span className="h-px w-8 bg-[var(--bd-header-ink)] opacity-50" />
            </div>
          </div>

          <div className="mt-2 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={cn(
                  "font-[family-name:var(--bd-heading-font)] truncate text-base font-semibold sm:text-xl",
                  layout.header.name ? "text-[var(--bd-accent)]" : "text-[var(--bd-muted)] opacity-50"
                )}
              >
                {layout.header.name || layout.strings.namePlaceholder}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[8px] sm:text-[9px]",
                  layout.header.subtitle ? "text-[var(--bd-muted)]" : "text-[var(--bd-muted)] opacity-50"
                )}
              >
                {layout.header.subtitle || layout.strings.subtitlePlaceholder}
              </p>
            </div>
            {values.personal.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- local data URL; must be a plain <img> so html2canvas captures it in the PDF
              <img
                src={values.personal.photo}
                alt=""
                className="h-14 w-12 shrink-0 rounded-[3px] border-2 border-[var(--bd-frame)] object-cover sm:h-[4.5rem] sm:w-14"
              />
            ) : (
              <div className="flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-1 rounded-[3px] border border-dashed border-[var(--bd-frame)] opacity-60 sm:h-[4.5rem] sm:w-14">
                <UserRound aria-hidden="true" className="size-3.5 text-[var(--bd-muted)] sm:size-4" />
                <span className="text-[6px] font-medium tracking-wide text-[var(--bd-muted)] uppercase sm:text-[6.5px]">
                  Photo
                </span>
              </div>
            )}
          </div>

          <div className="mt-1.5 h-px bg-[var(--bd-rule)]" />

          <FullWidthSection {...layout.personal} />
          <FullWidthSection {...layout.religion} />

          <div className="mt-1.5 grid grid-cols-2 gap-x-5">
            <HalfWidthSection {...layout.educationCareer} />
            <HalfWidthSection {...layout.lifestyle} />
          </div>

          <FullWidthSection {...layout.family} />

          <div className="mt-1.5 border-t border-[var(--bd-rule)] pt-1">
            <PrintFieldRow {...layout.contact} />
          </div>

          {/* The person's own words, never a stock line: an earlier version
              printed the same "looking for a partner…" sentence on every
              biodata. Clamped to two lines to keep the card one page. */}
          {layout.aboutMe && (
            <div className="mt-auto rounded-[3px] bg-[var(--bd-band)] px-3 py-1.5 text-center">
              <p className="line-clamp-2 font-[family-name:var(--bd-heading-font)] text-[7.5px] leading-snug text-[var(--bd-accent)] italic sm:text-[8.5px]">
                {layout.aboutMe}
              </p>
            </div>
          )}
        </div>
      </TemplateFrame>
    );
  }
);
