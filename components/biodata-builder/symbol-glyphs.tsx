import { Flower } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SymbolId } from "@/lib/biodata/symbols";

export interface SymbolGlyphProps {
  className?: string;
}

// Om is rendered as the literal Devanagari glyph rather than a drawn icon —
// simplest, unambiguously correct, and Devanagari is well-supported by
// default system font stacks (no extra font needed).
function OmGlyph({ className }: SymbolGlyphProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("font-heading text-2xl leading-none", className)}
    >
      ॐ
    </span>
  );
}

// Deliberately abstract/geometric line-art, not a realistic deity depiction.
function GaneshaGlyph({ className }: SymbolGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="5.5" cy="10.5" rx="3.2" ry="4.2" />
      <ellipse cx="18.5" cy="10.5" rx="3.2" ry="4.2" />
      <circle cx="12" cy="11" r="6" />
      <path d="M10.5 16c-.6 2.4-2.2 3.2-1.2 5 .7 1.2 2.4.6 2.7-1" />
    </svg>
  );
}

// The traditional four-dot Hindu Swastik form (not the CJK "卐" character,
// which is a different shape/context) — upright, single-color line art.
function SwastikGlyph({ className }: SymbolGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 12V4h4" />
      <path d="M12 12h8v4" />
      <path d="M12 12v8H8" />
      <path d="M12 12H4V8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function KalashGlyph({ className }: SymbolGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8.5 4.5c1.5 1 5.5 1 7 0" />
      <path d="M6 4.5c2 1.5 10 1.5 12 0" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
      <rect x="10" y="5.5" width="4" height="4" rx="1" />
      <path d="M8 9.5c-1.4 1.6-2 3.4-2 5.5 0 3 2.7 5 6 5s6-2 6-5c0-2.1-.6-3.9-2-5.5" />
    </svg>
  );
}

function TrishulGlyph({ className }: SymbolGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2v19" />
      <path d="M12 7c-2-1.5-4-2-5-1.5-1 1.5.5 3.5 2.5 4" />
      <path d="M12 7c2-1.5 4-2 5-1.5 1 1.5-.5 3.5-2.5 4" />
      <path d="M8 21h8" />
    </svg>
  );
}

export const SYMBOL_GLYPHS: Record<SymbolId, React.ComponentType<SymbolGlyphProps>> = {
  om: OmGlyph,
  ganesha: GaneshaGlyph,
  swastik: SwastikGlyph,
  kalash: KalashGlyph,
  trishul: TrishulGlyph,
  lotus: Flower,
  none: () => null,
};
