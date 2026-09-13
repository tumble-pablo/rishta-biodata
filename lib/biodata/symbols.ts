// The 6 Hindu religious symbols people can choose from to decorate their
// biodata header, plus a 7th "skip" tile so no one feels forced to pick one.
// Data only — the actual glyph/icon rendering lives in
// `components/biodata-builder/symbol-glyphs.tsx` so this file stays JSX-free.

export const SYMBOL_IDS = [
  "om",
  "ganesha",
  "swastik",
  "kalash",
  "trishul",
  "lotus",
  "none",
] as const;

export type SymbolId = (typeof SYMBOL_IDS)[number];

export interface SymbolConfig {
  id: SymbolId;
  label: string;
}

export const SYMBOLS: SymbolConfig[] = [
  { id: "om", label: "Om" },
  { id: "ganesha", label: "Ganesha" },
  { id: "swastik", label: "Swastik" },
  { id: "kalash", label: "Kalash" },
  { id: "trishul", label: "Trishul" },
  { id: "lotus", label: "Lotus" },
  { id: "none", label: "Prefer not to say" },
];

export const DEFAULT_SYMBOL_ID: SymbolId = "none";
