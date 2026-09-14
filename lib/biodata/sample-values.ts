import type { BiodataFormValues } from "@/lib/biodata/schema";

// A fully fictional, filled-in example — used only to show what a finished
// biodata actually looks like (e.g. in the homepage hero preview), instead
// of an empty form. Caste/sub-caste/gotra are deliberately left blank: a
// marketing sample doesn't need to invent a specific community, and it
// doubles as a demo of the "blank fields show a dashed line, not a gap"
// behaviour (see biodata-preview.tsx) alongside the filled ones.
export const SAMPLE_BIODATA_VALUES: BiodataFormValues = {
  symbol: { symbolId: "om" },
  template: { templateId: "classic" },
  personal: {
    profileCreatedFor: "myself",
    fullName: "Rahul Sharma",
    gender: "male",
    dateOfBirth: "1997-08-14",
    timeOfBirth: "06:45",
    placeOfBirth: "Jaipur, Rajasthan",
    height: "5'10\"",
    weight: "72 kg",
    maritalStatus: "never_married",
    motherTongue: "hindi",
    religion: "hindu",
    complexion: "wheatish",
    bodyType: "athletic",
    bloodGroup: "b_positive",
    diet: "vegetarian",
    disabilityStatus: "none",
    smokingHabit: "never",
    drinkingHabit: "never",
    hobbies: "Reading, traveling, playing cricket",
    aboutMe: "Software engineer who loves weekend treks and spending time with family.",
  },
  religious: {
    caste: "",
    subCaste: "",
    gotra: "",
    rashi: "mesh",
    nakshatra: "ashwini",
    manglik: "no",
  },
  family: {
    familyType: "nuclear",
    familyStatus: "middle_class",
    familyValues: "moderate",
    fatherName: "Suresh Sharma",
    fatherOccupation: "Retired Bank Manager",
    motherName: "Anita Sharma",
    motherOccupation: "Homemaker",
    siblingsCount: "1",
    siblingsMarriedCount: "1",
    nativePlace: "Jaipur, Rajasthan",
    familyDescription: "A close-knit, supportive family that values education and tradition.",
  },
  educationCareer: {
    highestQualification: "masters",
    fieldOfStudy: "Computer Science",
    college: "IIT Delhi",
    employedIn: "private_sector",
    occupation: "Software Engineer",
    companyName: "A leading tech company",
    annualIncome: "10_15l",
    workLocation: "Bengaluru, Karnataka",
  },
  contact: {
    country: "india",
    state: "rajasthan",
    city: "Jaipur",
    address: "",
    phoneCountryCode: "+91",
    phoneNumber: "98765 43210",
    whatsappSameAsPhone: true,
    whatsappNumber: "",
    email: "",
    contactPersonName: "Suresh Sharma",
    contactPersonRelation: "Father",
  },
};
