import { z } from "zod";

import { SYMBOL_IDS } from "@/lib/biodata/symbols";
import { TEMPLATE_IDS } from "@/lib/biodata/templates";

// Every text-ish field is a plain, always-defined `z.string()` (never
// `.optional()`) defaulting to `""` — this keeps every input controlled from
// the start and avoids react-hook-form's uncontrolled/controlled-input
// warning. "Required" fields add a `.min(...)` message; "optional" fields
// simply allow an empty string through. Enumerated fields are also plain
// strings validated against a fixed option list in the UI, rather than
// `z.enum(...)`, so a field with no sensible default doesn't need one just to
// satisfy TypeScript — `symbolId`/`templateId` are the exception, since their
// values drive actual lookup logic (icon/frame config) and benefit from
// being real literal union types.
const requiredText = (message: string) => z.string().trim().min(1, message);
const optionalText = z.string();
const optionalEmail = z
  .string()
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    "Enter a valid email address."
  );

const symbolSchema = z.object({
  symbolId: z.enum(SYMBOL_IDS),
});

const templateSchema = z.object({
  templateId: z.enum(TEMPLATE_IDS),
});

const personalSchema = z.object({
  profileCreatedFor: requiredText("Let us know who this biodata is for."),
  fullName: requiredText("Enter a full name.").min(2, "Enter a full name."),
  gender: requiredText("Select an option."),
  dateOfBirth: requiredText("Enter a date of birth."),
  timeOfBirth: optionalText,
  placeOfBirth: optionalText,
  height: optionalText,
  weight: optionalText,
  maritalStatus: requiredText("Select an option."),
  motherTongue: optionalText,
  religion: requiredText("Select a religion."),
  complexion: optionalText,
  bodyType: optionalText,
  bloodGroup: optionalText,
  diet: optionalText,
  disabilityStatus: optionalText,
  smokingHabit: optionalText,
  drinkingHabit: optionalText,
  hobbies: optionalText,
  aboutMe: optionalText,
});

const religiousSchema = z.object({
  caste: optionalText,
  subCaste: optionalText,
  gotra: optionalText,
  rashi: optionalText,
  nakshatra: optionalText,
  manglik: optionalText,
});

const familySchema = z.object({
  familyType: optionalText,
  familyStatus: optionalText,
  familyValues: optionalText,
  fatherName: optionalText,
  fatherOccupation: optionalText,
  motherName: optionalText,
  motherOccupation: optionalText,
  siblingsCount: optionalText,
  siblingsMarriedCount: optionalText,
  nativePlace: optionalText,
  familyDescription: optionalText,
});

const educationCareerSchema = z.object({
  highestQualification: requiredText("Select the highest qualification."),
  fieldOfStudy: optionalText,
  college: optionalText,
  employedIn: optionalText,
  occupation: optionalText,
  companyName: optionalText,
  annualIncome: optionalText,
  workLocation: optionalText,
});

const contactSchema = z.object({
  country: requiredText("Select a country."),
  state: optionalText,
  city: requiredText("Enter a city."),
  address: optionalText,
  phoneCountryCode: requiredText("Select a country code."),
  phoneNumber: requiredText("Enter a phone number.").min(6, "Enter a valid phone number."),
  whatsappSameAsPhone: z.boolean(),
  whatsappNumber: optionalText,
  email: optionalEmail,
  contactPersonName: optionalText,
  contactPersonRelation: optionalText,
});

export const biodataSchema = z.object({
  symbol: symbolSchema,
  template: templateSchema,
  personal: personalSchema,
  religious: religiousSchema,
  family: familySchema,
  educationCareer: educationCareerSchema,
  contact: contactSchema,
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;

// A lenient variant used only for parsing a restored localStorage draft:
// every field becomes optional so an older/partial/corrupt draft doesn't get
// thrown away wholesale just because one field is missing or malformed.
export const biodataDraftSchema = biodataSchema.deepPartial();
export type BiodataDraftValues = z.infer<typeof biodataDraftSchema>;
