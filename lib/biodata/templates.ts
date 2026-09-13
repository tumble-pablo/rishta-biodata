// The 8 biodata design choices. Typography, spacing and the brand color
// palette stay identical across all 8 — only the border/frame treatment
// varies, per the brief ("8 design choices, all with different borders").
// `components/biodata-builder/template-frame.tsx` applies these classes and
// is shared between the full preview and the picker tiles' mini-previews.

export const TEMPLATE_IDS = [
  "classic",
  "double",
  "ornate",
  "minimal",
  "bold",
  "dashed",
  "soft-tint",
  "deep-frame",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export type CornerVariant = "none" | "both" | "left" | "right";

export interface TemplateFrameStyle {
  /** Border classes applied to the outer document sheet. */
  sheetBorderClass: string;
  /** Corner-radius class applied to the outer document sheet. */
  sheetRadiusClass: string;
  /** Optional background tint on the outer sheet. */
  sheetTintClass?: string;
  /** Which of the hero's `.document-corner-left/right` decorations to show. */
  cornerVariant: CornerVariant;
  /** Whether to render the nested inner content frame (hero-mock pattern). */
  innerFrame: boolean;
  /** Border classes for the inner frame, when `innerFrame` is true. */
  innerFrameBorderClass?: string;
}

export interface TemplateConfig {
  id: TemplateId;
  label: string;
  description: string;
  frame: TemplateFrameStyle;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "classic",
    label: "Classic Cream",
    description: "A clean single border with soft corner accents.",
    frame: {
      sheetBorderClass: "border border-border",
      sheetRadiusClass: "rounded-[24px]",
      cornerVariant: "both",
      innerFrame: true,
      innerFrameBorderClass: "border border-primary/10",
    },
  },
  {
    id: "double",
    label: "Double Border",
    description: "A traditional double-line frame in maroon.",
    frame: {
      sheetBorderClass: "border-[3px] border-double border-primary/70",
      sheetRadiusClass: "rounded-[20px]",
      cornerVariant: "none",
      innerFrame: true,
      innerFrameBorderClass: "border border-primary/15",
    },
  },
  {
    id: "ornate",
    label: "Ornate Corners",
    description: "Rounded corners with a warm accent tint.",
    frame: {
      sheetBorderClass: "border border-accent-foreground/40",
      sheetRadiusClass: "rounded-[28px]",
      sheetTintClass: "bg-accent/10",
      cornerVariant: "both",
      innerFrame: true,
      innerFrameBorderClass: "border border-accent-foreground/20",
    },
  },
  {
    id: "minimal",
    label: "Modern Minimal",
    description: "A thin, understated border with square corners.",
    frame: {
      sheetBorderClass: "border border-border/60",
      sheetRadiusClass: "rounded-[8px]",
      cornerVariant: "none",
      innerFrame: false,
    },
  },
  {
    id: "bold",
    label: "Bold Maroon",
    description: "A confident solid maroon border.",
    frame: {
      sheetBorderClass: "border-2 border-primary",
      sheetRadiusClass: "rounded-[16px]",
      cornerVariant: "none",
      innerFrame: true,
      innerFrameBorderClass: "border border-primary/25",
    },
  },
  {
    id: "dashed",
    label: "Dashed Kraft",
    description: "A relaxed dashed border on a kraft-toned background.",
    frame: {
      sheetBorderClass: "border-2 border-dashed border-accent-foreground/50",
      sheetRadiusClass: "rounded-[18px]",
      sheetTintClass: "bg-muted/50",
      cornerVariant: "none",
      innerFrame: false,
    },
  },
  {
    id: "soft-tint",
    label: "Soft Rose Tint",
    description: "A gentle rose-tinted sheet with a single accent corner.",
    frame: {
      sheetBorderClass: "border border-border",
      sheetRadiusClass: "rounded-[24px]",
      sheetTintClass: "bg-secondary/60",
      cornerVariant: "left",
      innerFrame: true,
    },
  },
  {
    id: "deep-frame",
    label: "Deep Frame",
    description: "A thick maroon frame for a striking, formal look.",
    frame: {
      sheetBorderClass: "border-4 border-primary/80",
      sheetRadiusClass: "rounded-[12px]",
      cornerVariant: "none",
      innerFrame: true,
      innerFrameBorderClass: "border-2 border-primary/20",
    },
  },
];

export const DEFAULT_TEMPLATE_ID: TemplateId = "classic";

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES.find((template) => template.id === id) ?? TEMPLATES[0];
}
