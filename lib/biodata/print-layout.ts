import { format, isValid, parseISO } from "date-fns";

import { getAge, getZodiacSign } from "@/lib/biodata/derive";
import {
  ANNUAL_INCOME_OPTIONS,
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  DIET_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  FAMILY_VALUES_OPTIONS,
  HABIT_FREQUENCY_OPTIONS,
  HIGHEST_QUALIFICATION_OPTIONS,
  MANGLIK_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  NAKSHATRA_OPTIONS,
  RASHI_OPTIONS,
  RELIGION_OPTIONS,
  optionLabel,
} from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

// What actually gets PRINTED on the one-page card is a curated subset of the
// full form — matching a real formal biodata document (see the reference
// design this was built from), not a dump of every field. Long free-text
// fields (About me, family description) are deliberately left off the card
// entirely: they have no natural length limit, and printing them is what
// made an earlier version balloon to dozens of pages. They're kept in the
// input form (out of scope to change) but simply don't appear here.
//
// Every row in this curated set is ALWAYS present, whether or not it has a
// value yet — like a printed form's blank lines. Without that, the card
// looks empty/broken the moment someone opens the builder, since nothing
// has been typed yet; showing every label up front (with a blank next to
// it) makes it obvious the document is actively taking shape as they fill
// each field in. This is safe from the earlier bloat problem specifically
// because the set is fixed and small (~28 rows total) — it's not "every
// field in the form," just this same curated list, blank or not.

export interface PrintRow {
  label: string;
  value: string; // "" until filled in — renderers show a blank/placeholder
}

export interface PrintHeader {
  name: string;
  subtitle: string; // "25 Years | 5'4" | Bengaluru", parts omitted if unset
}

export interface PrintSection {
  title: string;
  rows: PrintRow[];
}

export interface PrintLayout {
  header: PrintHeader;
  age: number | null;
  zodiac: string | null;
  personal: PrintSection;
  religion: PrintSection;
  educationCareer: PrintSection;
  lifestyle: PrintSection;
  family: PrintSection;
}

function row(label: string, value: string | null | undefined): PrintRow {
  return { label, value: value?.trim() ?? "" };
}

function habitSummary(habit: string, verb: "Smokes" | "Drinks", nonLabel: string): string | null {
  if (!habit) return null;
  if (habit === "never") return nonLabel;
  return `${verb} ${optionLabel(HABIT_FREQUENCY_OPTIONS, habit).toLowerCase()}`;
}

function habitsSummary(smoking: string, drinking: string): string {
  return [habitSummary(smoking, "Smokes", "Non-smoker"), habitSummary(drinking, "Drinks", "Non-drinker")]
    .filter(Boolean)
    .join(", ");
}

// The form stores DOB as a plain ISO string and time-of-birth as a raw
// `<input type="time">` value ("HH:MM") — both need reformatting for a
// document meant to read like a formal printed biodata.
function formatDate(iso: string): string {
  if (!iso) return "";
  const parsed = parseISO(iso);
  return isValid(parsed) ? format(parsed, "d MMMM yyyy") : iso;
}

function formatTime(time: string): string {
  const match = /^(\d{2}):(\d{2})/.exec(time);
  if (!match) return time;
  const hours = Number(match[1]);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${match[2]} ${period}`;
}

function personName(name: string, occupation: string): string {
  if (name && occupation) return `${name} (${occupation})`;
  return name || occupation;
}

export function buildPrintLayout(values: BiodataFormValues): PrintLayout {
  const { personal, religious, family, educationCareer, contact } = values;

  const age = getAge(personal.dateOfBirth);
  const zodiac = getZodiacSign(personal.dateOfBirth);

  const subtitle = [age !== null ? `${age} Years` : null, personal.height || null, contact.city || null]
    .filter(Boolean)
    .join("  |  ");

  const siblings = (() => {
    if (!family.siblingsCount) return null;
    const married =
      family.siblingsMarriedCount && family.siblingsMarriedCount !== "0"
        ? ` (${family.siblingsMarriedCount} married)`
        : "";
    return `${family.siblingsCount}${married}`;
  })();

  return {
    header: { name: personal.fullName, subtitle },
    age,
    zodiac,
    personal: {
      title: "Personal Details",
      rows: [
        row("Date of Birth", formatDate(personal.dateOfBirth)),
        row("Time of Birth", formatTime(personal.timeOfBirth)),
        row("Place of Birth", personal.placeOfBirth),
        row("Height", personal.height),
        row("Complexion", optionLabel(COMPLEXION_OPTIONS, personal.complexion)),
        row("Body Type", optionLabel(BODY_TYPE_OPTIONS, personal.bodyType)),
      ],
    },
    religion: {
      title: "Religion & Community",
      rows: [
        row("Religion", optionLabel(RELIGION_OPTIONS, personal.religion)),
        row("Mother Tongue", optionLabel(MOTHER_TONGUE_OPTIONS, personal.motherTongue)),
        row("Caste", religious.caste),
        row("Sub Caste", religious.subCaste),
        row("Gotra", religious.gotra),
        row("Rashi", optionLabel(RASHI_OPTIONS, religious.rashi)),
        row("Manglik", optionLabel(MANGLIK_OPTIONS, religious.manglik)),
        row("Nakshatra", optionLabel(NAKSHATRA_OPTIONS, religious.nakshatra)),
      ],
    },
    educationCareer: {
      title: "Education & Career",
      rows: [
        row("Qualification", optionLabel(HIGHEST_QUALIFICATION_OPTIONS, educationCareer.highestQualification)),
        row("University", educationCareer.college),
        row("Occupation", educationCareer.occupation),
        row("Company", educationCareer.companyName),
        row("Annual Income", optionLabel(ANNUAL_INCOME_OPTIONS, educationCareer.annualIncome)),
      ],
    },
    lifestyle: {
      title: "Lifestyle",
      rows: [
        row("Diet", optionLabel(DIET_OPTIONS, personal.diet)),
        row("Hobbies", personal.hobbies),
        row("Habits", habitsSummary(personal.smokingHabit, personal.drinkingHabit)),
      ],
    },
    family: {
      title: "Family Details",
      rows: [
        row("Father", personName(family.fatherName, family.fatherOccupation)),
        row("Family Type", optionLabel(FAMILY_TYPE_OPTIONS, family.familyType)),
        row("Mother", personName(family.motherName, family.motherOccupation)),
        row("Family Value", optionLabel(FAMILY_VALUES_OPTIONS, family.familyValues)),
        row("Siblings", siblings),
        row("Native Place", family.nativePlace),
      ],
    },
  };
}
