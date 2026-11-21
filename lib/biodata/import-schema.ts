import * as z from "zod/v4";

import {
  ANNUAL_INCOME_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  DIET_OPTIONS,
  EMPLOYED_IN_OPTIONS,
  FAMILY_STATUS_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  FAMILY_VALUES_OPTIONS,
  GENDER_OPTIONS,
  HIGHEST_QUALIFICATION_OPTIONS,
  MANGLIK_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  NAKSHATRA_OPTIONS,
  RASHI_OPTIONS,
  RELIGION_OPTIONS,
  SIBLING_COUNT_OPTIONS,
  type Option,
} from "@/lib/biodata/options";

// The shape the "Bring your old biodata" import asks Claude to fill in
// (structured output, see app/api/biodata-import/route.ts). It mirrors the
// builder's form sections, but every field is required and uses "" for
// "not in the document" — structured outputs need a closed schema, and an
// explicit empty string is easier to merge than a missing key.
//
// Dropdown fields are enums of the form's own option values, so whatever
// comes back can be written straight into the form with no re-mapping.
// Shared by the server route (schema) and the client (merging).

function choice(options: Option[]) {
  return z.enum(["", ...options.map((option) => option.value)] as [string, ...string[]]);
}

const text = (description?: string) => (description ? z.string().describe(description) : z.string());

export const IMPORT_LANGUAGES = ["en", "hi", "mr", "other"] as const;

export const importedBiodataSchema = z.object({
  isBiodata: z.boolean().describe("false if the file is clearly not a biodata or profile of a person"),
  documentLanguage: z.enum(IMPORT_LANGUAGES).describe("main language of the document's headings"),
  personal: z.object({
    fullName: text(),
    gender: choice(GENDER_OPTIONS),
    dateOfBirth: text("YYYY-MM-DD, or empty"),
    timeOfBirth: text("24-hour HH:MM, or empty"),
    placeOfBirth: text(),
    height: text("as written, e.g. 5'6\" or 168 cm"),
    weight: text(),
    maritalStatus: choice(MARITAL_STATUS_OPTIONS),
    motherTongue: choice(MOTHER_TONGUE_OPTIONS),
    religion: choice(RELIGION_OPTIONS),
    complexion: choice(COMPLEXION_OPTIONS),
    bodyType: choice(BODY_TYPE_OPTIONS),
    bloodGroup: choice(BLOOD_GROUP_OPTIONS),
    diet: choice(DIET_OPTIONS),
    hobbies: text(),
    aboutMe: text("the person's own description of themselves, if any"),
  }),
  religious: z.object({
    caste: text(),
    subCaste: text(),
    gotra: text(),
    rashi: choice(RASHI_OPTIONS),
    nakshatra: choice(NAKSHATRA_OPTIONS),
    manglik: choice(MANGLIK_OPTIONS),
  }),
  family: z.object({
    familyType: choice(FAMILY_TYPE_OPTIONS),
    familyStatus: choice(FAMILY_STATUS_OPTIONS),
    familyValues: choice(FAMILY_VALUES_OPTIONS),
    fatherName: text(),
    fatherOccupation: text(),
    motherName: text(),
    motherOccupation: text(),
    siblingsCount: choice(SIBLING_COUNT_OPTIONS),
    siblingsMarriedCount: text("a number as digits, or empty"),
    nativePlace: text(),
    familyDescription: text(),
  }),
  educationCareer: z.object({
    highestQualification: choice(HIGHEST_QUALIFICATION_OPTIONS),
    fieldOfStudy: text(),
    college: text(),
    employedIn: choice(EMPLOYED_IN_OPTIONS),
    occupation: text(),
    companyName: text(),
    annualIncome: choice(ANNUAL_INCOME_OPTIONS),
    workLocation: text(),
  }),
  contact: z.object({
    city: text(),
    state: text(),
    phoneNumber: text("digits only, without country code, or empty"),
    email: text(),
    contactPersonName: text(),
    contactPersonRelation: text(),
  }),
});

export type ImportedBiodata = z.infer<typeof importedBiodataSchema>;

export const IMPORT_SECTIONS = ["personal", "religious", "family", "educationCareer", "contact"] as const;

// Light format checks before a value is written into the form — the model
// is told the formats, but these fields feed date pickers and validation,
// so a malformed value is dropped rather than half-filled.
const FIELD_FORMATS: Record<string, RegExp> = {
  "personal.dateOfBirth": /^\d{4}-\d{2}-\d{2}$/,
  "personal.timeOfBirth": /^\d{2}:\d{2}$/,
  "family.siblingsMarriedCount": /^\d{1,2}$/,
  "contact.phoneNumber": /^\d{6,15}$/,
};

/** Flattens an import result into [form path, value] pairs worth writing:
 * non-empty, and in the right format for fields that need one. */
export function importedFieldEntries(imported: ImportedBiodata): [string, string][] {
  const entries: [string, string][] = [];
  for (const section of IMPORT_SECTIONS) {
    for (const [field, raw] of Object.entries(imported[section])) {
      const value = String(raw).trim();
      const path = `${section}.${field}`;
      if (!value) continue;
      if (FIELD_FORMATS[path] && !FIELD_FORMATS[path].test(value)) continue;
      entries.push([path, value]);
    }
  }
  return entries;
}
