import type { BiodataFormValues } from "@/lib/biodata/schema";
import { DEFAULT_SYMBOL_ID } from "@/lib/biodata/symbols";
import { DEFAULT_TEMPLATE_ID } from "@/lib/biodata/templates";

// The full set of default values fed into `useForm`. A handful of fields
// come prefilled (but remain editable) because they're true "safe defaults"
// most people share: Country, phone code, marital status, and who the
// profile is for. Sensitive/personal-preference fields (diet, income,
// complexion, family status, etc.) are always left blank — never presumed.
export const DEFAULT_VALUES: BiodataFormValues = {
  symbol: {
    symbolId: DEFAULT_SYMBOL_ID,
  },
  template: {
    templateId: DEFAULT_TEMPLATE_ID,
  },
  personal: {
    profileCreatedFor: "myself",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    height: "",
    weight: "",
    maritalStatus: "never_married",
    motherTongue: "",
    religion: "",
    complexion: "",
    bodyType: "",
    bloodGroup: "",
    diet: "",
    disabilityStatus: "",
    smokingHabit: "",
    drinkingHabit: "",
    hobbies: "",
    aboutMe: "",
  },
  religious: {
    caste: "",
    subCaste: "",
    gotra: "",
    rashi: "",
    nakshatra: "",
    manglik: "",
  },
  family: {
    familyType: "",
    familyStatus: "",
    familyValues: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblingsCount: "",
    siblingsMarriedCount: "",
    nativePlace: "",
    familyDescription: "",
  },
  educationCareer: {
    highestQualification: "",
    fieldOfStudy: "",
    college: "",
    employedIn: "",
    occupation: "",
    companyName: "",
    annualIncome: "",
    workLocation: "",
  },
  contact: {
    country: "india",
    state: "",
    city: "",
    address: "",
    phoneCountryCode: "+91",
    phoneNumber: "",
    whatsappSameAsPhone: true,
    whatsappNumber: "",
    email: "",
    contactPersonName: "",
    contactPersonRelation: "",
  },
};
