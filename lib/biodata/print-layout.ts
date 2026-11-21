import { isValid, parseISO } from "date-fns";

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
import {
  OPTION_TRANSLATIONS,
  PRINT_STRINGS,
  type PrintLanguage,
  type PrintStrings,
} from "@/lib/biodata/print-i18n";
import type { Option } from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

// What actually gets PRINTED on the one-page card is a curated subset of the
// full form — matching a real formal biodata document (see the reference
// design this was built from), not a dump of every field. Long free-text
// fields have no natural length limit, and printing them is what made an
// earlier version balloon to dozens of pages — so the family description
// stays off the card, and "About me" only appears in the closing band,
// clamped to two lines by the preview.
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
  /** Fixed document text (title, placeholders) in the chosen language. */
  strings: PrintStrings;
  header: PrintHeader;
  /** The person's own "About me" lines, printed in the closing band. */
  aboutMe: string;
  age: number | null;
  zodiac: string | null;
  personal: PrintSection;
  religion: PrintSection;
  educationCareer: PrintSection;
  lifestyle: PrintSection;
  family: PrintSection;
  /** "+91 98765 43210  ·  Bengaluru" — deliberately just phone + city, not
   * the full contact step (no email/address), since this line prints on a
   * document that gets forwarded widely. */
  contact: PrintRow;
}

function row(label: string, value: string | null | undefined): PrintRow {
  return { label, value: value?.trim() ?? "" };
}

// Option label in the print language: the translated label when there is
// one, otherwise the English label (see OPTION_TRANSLATIONS for why).
function printOption(
  language: PrintLanguage,
  list: keyof typeof OPTION_TRANSLATIONS,
  options: Option[],
  value: string
): string {
  if (!value) return "";
  if (language !== "en") {
    const translated = OPTION_TRANSLATIONS[list]?.[value]?.[language];
    if (translated) return translated;
  }
  return optionLabel(options, value);
}

function habitSummary(habit: string, kind: "smokes" | "drinks", strings: PrintStrings): string | null {
  if (!habit) return null;
  if (habit === "never") return kind === "smokes" ? strings.habits.nonSmoker : strings.habits.nonDrinker;
  if (habit === "occasionally" || habit === "regularly") return strings.habits[kind][habit];
  return optionLabel(HABIT_FREQUENCY_OPTIONS, habit);
}

function habitsSummary(smoking: string, drinking: string, strings: PrintStrings): string {
  return [habitSummary(smoking, "smokes", strings), habitSummary(drinking, "drinks", strings)]
    .filter(Boolean)
    .join(", ");
}

// The form stores DOB as a plain ISO string and time-of-birth as a raw
// `<input type="time">` value ("HH:MM") — both need reformatting for a
// document meant to read like a formal printed biodata. Month names come
// from the print language (date-fns has no Marathi locale, hence the list).
function formatDate(iso: string, strings: PrintStrings): string {
  if (!iso) return "";
  const parsed = parseISO(iso);
  if (!isValid(parsed)) return iso;
  return `${parsed.getDate()} ${strings.months[parsed.getMonth()]} ${parsed.getFullYear()}`;
}

function formatTime(time: string): string {
  const match = /^(\d{2}):(\d{2})/.exec(time);
  if (!match) return time;
  const hours = Number(match[1]);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${match[2]} ${period}`;
}

// Hard cap on top of the preview's CSS line-clamp: the PDF/JPG are captured
// by html2canvas, which doesn't reliably honour line-clamp, so overly long
// text must never reach the card in the first place.
const ABOUT_ME_MAX_CHARS = 200;

function clampText(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function personName(name: string, occupation: string): string {
  if (name && occupation) return `${name} (${occupation})`;
  return name || occupation;
}

export function buildPrintLayout(values: BiodataFormValues): PrintLayout {
  const { personal, religious, family, educationCareer, contact } = values;
  const language: PrintLanguage = values.template.language ?? "en";
  const strings = PRINT_STRINGS[language];
  const { labels, sections } = strings;
  const option = (list: keyof typeof OPTION_TRANSLATIONS, options: Option[], value: string) =>
    printOption(language, list, options, value);

  const age = getAge(personal.dateOfBirth);
  const zodiac = getZodiacSign(personal.dateOfBirth);

  const subtitle = [age !== null ? `${age} ${strings.years}` : null, personal.height || null, contact.city || null]
    .filter(Boolean)
    .join("  |  ");

  const contactValue = [
    contact.phoneNumber ? `${contact.phoneCountryCode} ${contact.phoneNumber}` : null,
    contact.city || null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  const siblings = (() => {
    if (!family.siblingsCount) return null;
    const married =
      family.siblingsMarriedCount && family.siblingsMarriedCount !== "0"
        ? ` (${family.siblingsMarriedCount} ${strings.married})`
        : "";
    return `${family.siblingsCount}${married}`;
  })();

  return {
    strings,
    header: { name: personal.fullName, subtitle },
    aboutMe: clampText(personal.aboutMe.trim(), ABOUT_ME_MAX_CHARS),
    age,
    zodiac,
    contact: row(labels.contact, contactValue),
    personal: {
      title: sections.personal,
      rows: [
        row(labels.dateOfBirth, formatDate(personal.dateOfBirth, strings)),
        row(labels.timeOfBirth, formatTime(personal.timeOfBirth)),
        row(labels.placeOfBirth, personal.placeOfBirth),
        row(labels.height, personal.height),
        row(labels.complexion, option("complexion", COMPLEXION_OPTIONS, personal.complexion)),
        row(labels.bodyType, option("bodyType", BODY_TYPE_OPTIONS, personal.bodyType)),
      ],
    },
    religion: {
      title: sections.religion,
      rows: [
        row(labels.religion, option("religion", RELIGION_OPTIONS, personal.religion)),
        row(labels.motherTongue, option("motherTongue", MOTHER_TONGUE_OPTIONS, personal.motherTongue)),
        row(labels.caste, religious.caste),
        row(labels.subCaste, religious.subCaste),
        row(labels.gotra, religious.gotra),
        row(labels.rashi, option("rashi", RASHI_OPTIONS, religious.rashi)),
        row(labels.manglik, option("manglik", MANGLIK_OPTIONS, religious.manglik)),
        row(labels.nakshatra, option("nakshatra", NAKSHATRA_OPTIONS, religious.nakshatra)),
      ],
    },
    educationCareer: {
      title: sections.educationCareer,
      rows: [
        row(
          labels.qualification,
          option("qualification", HIGHEST_QUALIFICATION_OPTIONS, educationCareer.highestQualification)
        ),
        row(labels.university, educationCareer.college),
        row(labels.occupation, educationCareer.occupation),
        row(labels.company, educationCareer.companyName),
        row(labels.annualIncome, option("annualIncome", ANNUAL_INCOME_OPTIONS, educationCareer.annualIncome)),
      ],
    },
    lifestyle: {
      title: sections.lifestyle,
      rows: [
        row(labels.diet, option("diet", DIET_OPTIONS, personal.diet)),
        row(labels.hobbies, personal.hobbies),
        row(labels.habits, habitsSummary(personal.smokingHabit, personal.drinkingHabit, strings)),
      ],
    },
    family: {
      title: sections.family,
      rows: [
        row(labels.father, personName(family.fatherName, family.fatherOccupation)),
        row(labels.familyType, option("familyType", FAMILY_TYPE_OPTIONS, family.familyType)),
        row(labels.mother, personName(family.motherName, family.motherOccupation)),
        row(labels.familyValues, option("familyValues", FAMILY_VALUES_OPTIONS, family.familyValues)),
        row(labels.siblings, siblings),
        row(labels.nativePlace, family.nativePlace),
      ],
    },
  };
}
