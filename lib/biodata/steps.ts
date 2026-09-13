import type { BiodataFormValues } from "@/lib/biodata/schema";

export interface StepConfig {
  id: string;
  title: string;
  description: string;
  /** Top-level field(s) of `BiodataFormValues` to validate before advancing.
   * Passing the nested object path to `form.trigger()` validates every field
   * inside it at once. Empty for the final review/download step. */
  fields: Array<keyof BiodataFormValues>;
}

export const STEPS: StepConfig[] = [
  {
    id: "symbol",
    title: "Choose your symbol",
    description: "Pick a symbol to place at the top of your biodata.",
    fields: ["symbol"],
  },
  {
    id: "template",
    title: "Choose your design",
    description: "Pick a border style for your biodata document.",
    fields: ["template"],
  },
  {
    id: "personal",
    title: "Personal details",
    description: "Share who you are.",
    fields: ["personal"],
  },
  {
    id: "religious",
    title: "Religious & astrological details",
    description: "Optional details some families like to include.",
    fields: ["religious"],
  },
  {
    id: "family",
    title: "Family details",
    description: "Tell us about your family.",
    fields: ["family"],
  },
  {
    id: "educationCareer",
    title: "Education & career",
    description: "Your qualifications and work.",
    fields: ["educationCareer"],
  },
  {
    id: "contact",
    title: "Contact details",
    description: "How families can reach you.",
    fields: ["contact"],
  },
  {
    id: "review",
    title: "Review & download",
    description: "Preview your biodata and download it.",
    fields: [],
  },
];
