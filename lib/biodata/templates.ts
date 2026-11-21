// The biodata designs. Each one is a complete theme — paper and ink
// colours, an accent for headings and rules, a heading typeface, a frame
// style and an ornament — applied by `template-frame.tsx` (frame, ornament,
// colours as CSS variables) and read by `biodata-preview.tsx` (text,
// rules). The same frame renders the live preview, the picker tiles, the
// homepage gallery and the exported PDF/JPG, so they always match.
//
// IDs are stored in saved drafts, so existing IDs must never be removed or
// renamed — restyle them instead. The first eight are the original designs
// (restyled); the rest were added later.

export const TEMPLATE_IDS = [
  "classic",
  "double",
  "ornate",
  "minimal",
  "bold",
  "dashed",
  "soft-tint",
  "deep-frame",
  "peacock",
  "lotus",
  "mehendi",
  "temple",
  "sandalwood",
  "navy",
  "lavender",
  "monochrome",
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export type TemplateStyle = "traditional" | "modern";
export type FrameStyle = "single" | "double" | "thick" | "none";
export type Ornament = "flourish" | "mandala" | "floral" | "arch" | "band" | "none";

export interface TemplateTheme {
  /** Page background. */
  paper: string;
  /** Main text (values, name). */
  ink: string;
  /** Field labels and secondary text. */
  muted: string;
  /** Section headings, symbol, ornaments. */
  accent: string;
  /** Hairlines under headings and between sections. */
  rule: string;
  /** Frame line colour. */
  frame: string;
  /** Background of the closing "About me" band (and the header band). */
  band: string;
  /** Text on the header band, for the "band" ornament. */
  bandInk?: string;
  /** Preview watermark colour — must stay faint on this paper. */
  watermark: string;
}

export interface TemplateConfig {
  id: TemplateId;
  label: string;
  description: string;
  style: TemplateStyle;
  font: "serif" | "sans";
  frame: FrameStyle;
  ornament: Ornament;
  theme: TemplateTheme;
}

const MAROON = "#6B1E2E";
const GOLD = "#B8893B";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "classic",
    label: "Classic Cream",
    description: "Cream paper, maroon text and gold double lines.",
    style: "traditional",
    font: "serif",
    frame: "double",
    ornament: "flourish",
    theme: {
      paper: "#FBF6EA",
      ink: "#2E1A12",
      muted: "#7A6552",
      accent: MAROON,
      rule: "#E3D3B4",
      frame: GOLD,
      band: "#F3E7CC",
      watermark: "rgba(107, 30, 46, 0.12)",
    },
  },
  {
    id: "double",
    label: "Royal Maroon",
    description: "Deep maroon with gold lettering, for a grand look.",
    style: "traditional",
    font: "serif",
    frame: "double",
    ornament: "mandala",
    theme: {
      paper: "#5A1626",
      ink: "#FBEFD8",
      muted: "#E0C79B",
      accent: "#E8C068",
      rule: "rgba(232, 192, 104, 0.35)",
      frame: "#E8C068",
      band: "rgba(0, 0, 0, 0.18)",
      watermark: "rgba(251, 239, 216, 0.14)",
    },
  },
  {
    id: "ornate",
    label: "Ganesh Gold",
    description: "Ivory with ornate gold corners, a classic choice.",
    style: "traditional",
    font: "serif",
    frame: "single",
    ornament: "mandala",
    theme: {
      paper: "#FFF9EC",
      ink: "#33200F",
      muted: "#866A4A",
      accent: "#9A5B12",
      rule: "#EADBB8",
      frame: GOLD,
      band: "#F6EAC9",
      watermark: "rgba(154, 91, 18, 0.12)",
    },
  },
  {
    id: "minimal",
    label: "Modern Minimal",
    description: "Clean white page with a single thin line.",
    style: "modern",
    font: "sans",
    frame: "single",
    ornament: "none",
    theme: {
      paper: "#FFFFFF",
      ink: "#1F2328",
      muted: "#6B7280",
      accent: "#1F2328",
      rule: "#E5E7EB",
      frame: "#D1D5DB",
      band: "#F3F4F6",
      watermark: "rgba(31, 35, 40, 0.09)",
    },
  },
  {
    id: "bold",
    label: "Kumkum Red",
    description: "A bold red frame around warm cream paper.",
    style: "traditional",
    font: "serif",
    frame: "thick",
    ornament: "flourish",
    theme: {
      paper: "#FFF8EE",
      ink: "#2B1410",
      muted: "#7D5F55",
      accent: "#A3171F",
      rule: "#F0D9C6",
      frame: "#A3171F",
      band: "#FBE6D6",
      watermark: "rgba(163, 23, 31, 0.11)",
    },
  },
  {
    id: "dashed",
    label: "Marigold",
    description: "A saffron header band, bright and festive.",
    style: "traditional",
    font: "serif",
    frame: "none",
    ornament: "band",
    theme: {
      paper: "#FFFBF2",
      ink: "#2F1E0C",
      muted: "#866B4A",
      accent: "#C2620A",
      rule: "#F2DDB8",
      frame: "#E9A23B",
      band: "#F4A62A",
      bandInk: "#3A1A02",
      watermark: "rgba(194, 98, 10, 0.12)",
    },
  },
  {
    id: "soft-tint",
    label: "Rose Blossom",
    description: "Soft blush paper with floral corners.",
    style: "modern",
    font: "serif",
    frame: "single",
    ornament: "floral",
    theme: {
      paper: "#FDF1F1",
      ink: "#3A1F27",
      muted: "#8A6A72",
      accent: "#B4426A",
      rule: "#F2D4DC",
      frame: "#E6AFC1",
      band: "#F9E1E7",
      watermark: "rgba(180, 66, 106, 0.11)",
    },
  },
  {
    id: "deep-frame",
    label: "Emerald Gold",
    description: "Rich emerald green with gold, deep and elegant.",
    style: "traditional",
    font: "serif",
    frame: "double",
    ornament: "flourish",
    theme: {
      paper: "#0F3B2E",
      ink: "#F4EAD2",
      muted: "#CDBF96",
      accent: "#E2BE69",
      rule: "rgba(226, 190, 105, 0.33)",
      frame: "#E2BE69",
      band: "rgba(0, 0, 0, 0.18)",
      watermark: "rgba(244, 234, 210, 0.13)",
    },
  },
  {
    id: "peacock",
    label: "Peacock Blue",
    description: "Deep peacock blue with gold mandala corners.",
    style: "traditional",
    font: "serif",
    frame: "double",
    ornament: "mandala",
    theme: {
      paper: "#0E3550",
      ink: "#F2EBDD",
      muted: "#C3CDD3",
      accent: "#E0B95C",
      rule: "rgba(224, 185, 92, 0.32)",
      frame: "#E0B95C",
      band: "rgba(0, 0, 0, 0.18)",
      watermark: "rgba(242, 235, 221, 0.13)",
    },
  },
  {
    id: "lotus",
    label: "Lotus Pink",
    description: "Cream with a pink lotus arch at the top.",
    style: "traditional",
    font: "serif",
    frame: "single",
    ornament: "arch",
    theme: {
      paper: "#FFF8F4",
      ink: "#3A1C25",
      muted: "#8C6872",
      accent: "#C04A72",
      rule: "#F3D7DF",
      frame: "#D98AA6",
      band: "#FBE6EC",
      watermark: "rgba(192, 74, 114, 0.11)",
    },
  },
  {
    id: "mehendi",
    label: "Mehendi Green",
    description: "Soft sage green with leafy corners.",
    style: "modern",
    font: "serif",
    frame: "single",
    ornament: "floral",
    theme: {
      paper: "#F2F5E9",
      ink: "#1F2A17",
      muted: "#66705A",
      accent: "#4F6B2A",
      rule: "#D9E2C5",
      frame: "#A9BB86",
      band: "#E4EBD3",
      watermark: "rgba(79, 107, 42, 0.12)",
    },
  },
  {
    id: "temple",
    label: "Temple Arch",
    description: "A maroon temple arch over ivory paper.",
    style: "traditional",
    font: "serif",
    frame: "thick",
    ornament: "arch",
    theme: {
      paper: "#FFF8EC",
      ink: "#2F1A10",
      muted: "#7E6450",
      accent: MAROON,
      rule: "#EBD9BC",
      frame: MAROON,
      band: "#F5E6CB",
      watermark: "rgba(107, 30, 46, 0.11)",
    },
  },
  {
    id: "sandalwood",
    label: "Sandalwood",
    description: "Warm sandalwood beige with brown lettering.",
    style: "traditional",
    font: "serif",
    frame: "double",
    ornament: "flourish",
    theme: {
      paper: "#F4E7D3",
      ink: "#2E1F12",
      muted: "#7A6047",
      accent: "#7A4A1F",
      rule: "#E1CCAC",
      frame: "#A9814F",
      band: "#EBDABF",
      watermark: "rgba(122, 74, 31, 0.12)",
    },
  },
  {
    id: "navy",
    label: "Navy Modern",
    description: "Crisp white with a navy header band.",
    style: "modern",
    font: "sans",
    frame: "none",
    ornament: "band",
    theme: {
      paper: "#FFFFFF",
      ink: "#14213D",
      muted: "#64748B",
      accent: "#1D3A6E",
      rule: "#E2E8F0",
      frame: "#1D3A6E",
      band: "#1D3A6E",
      bandInk: "#FFFFFF",
      watermark: "rgba(20, 33, 61, 0.09)",
    },
  },
  {
    id: "lavender",
    label: "Lavender",
    description: "Light lavender with a soft purple accent.",
    style: "modern",
    font: "sans",
    frame: "single",
    ornament: "none",
    theme: {
      paper: "#F6F2FC",
      ink: "#271B3A",
      muted: "#776B8C",
      accent: "#6B4BA1",
      rule: "#E4DAF2",
      frame: "#C9B7E6",
      band: "#ECE3F8",
      watermark: "rgba(107, 75, 161, 0.11)",
    },
  },
  {
    id: "monochrome",
    label: "Black & White",
    description: "Simple black and white, prints well anywhere.",
    style: "modern",
    font: "serif",
    frame: "double",
    ornament: "none",
    theme: {
      paper: "#FFFFFF",
      ink: "#111111",
      muted: "#555555",
      accent: "#111111",
      rule: "#DDDDDD",
      frame: "#111111",
      band: "#F2F2F2",
      watermark: "rgba(17, 17, 17, 0.09)",
    },
  },
];

export const DEFAULT_TEMPLATE_ID: TemplateId = "classic";

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES.find((template) => template.id === id) ?? TEMPLATES[0];
}
