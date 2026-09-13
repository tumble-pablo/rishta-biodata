// Shared dropdown/option lists used across the biodata builder's steps.
// Kept as plain data (no JSX, no zod) so both `schema.ts` and the step
// components can import from a single source of truth.

export interface Option {
  value: string;
  label: string;
}

/** Looks up an option's display label by value, falling back to the raw
 * value (or "" for an empty/unselected value) if it isn't found. */
export function optionLabel(options: Option[], value: string): string {
  if (!value) return "";
  return options.find((option) => option.value === value)?.label ?? value;
}

export const PROFILE_CREATED_FOR_OPTIONS: Option[] = [
  { value: "myself", label: "Myself" },
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
  { value: "relative", label: "Relative" },
  { value: "friend", label: "Friend" },
];

export const GENDER_OPTIONS: Option[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

export const MARITAL_STATUS_OPTIONS: Option[] = [
  { value: "never_married", label: "Never Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "awaiting_divorce", label: "Awaiting Divorce" },
];

export const MOTHER_TONGUE_OPTIONS: Option[] = [
  { value: "hindi", label: "Hindi" },
  { value: "english", label: "English" },
  { value: "punjabi", label: "Punjabi" },
  { value: "bengali", label: "Bengali" },
  { value: "gujarati", label: "Gujarati" },
  { value: "marathi", label: "Marathi" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "kannada", label: "Kannada" },
  { value: "malayalam", label: "Malayalam" },
  { value: "urdu", label: "Urdu" },
  { value: "odia", label: "Odia" },
  { value: "assamese", label: "Assamese" },
  { value: "kashmiri", label: "Kashmiri" },
  { value: "konkani", label: "Konkani" },
  { value: "sindhi", label: "Sindhi" },
  { value: "nepali", label: "Nepali" },
  { value: "sanskrit", label: "Sanskrit" },
  { value: "other", label: "Other" },
];

export const RELIGION_OPTIONS: Option[] = [
  { value: "hindu", label: "Hindu" },
  { value: "muslim", label: "Muslim" },
  { value: "christian", label: "Christian" },
  { value: "sikh", label: "Sikh" },
  { value: "jain", label: "Jain" },
  { value: "buddhist", label: "Buddhist" },
  { value: "parsi", label: "Parsi" },
  { value: "jewish", label: "Jewish" },
  { value: "no_religion", label: "No religion" },
  { value: "other", label: "Other" },
];

export const COMPLEXION_OPTIONS: Option[] = [
  { value: "very_fair", label: "Very Fair" },
  { value: "fair", label: "Fair" },
  { value: "wheatish", label: "Wheatish" },
  { value: "wheatish_brown", label: "Wheatish Brown" },
  { value: "dark", label: "Dark" },
];

export const BODY_TYPE_OPTIONS: Option[] = [
  { value: "slim", label: "Slim" },
  { value: "average", label: "Average" },
  { value: "athletic", label: "Athletic" },
  { value: "heavy", label: "Heavy" },
];

export const BLOOD_GROUP_OPTIONS: Option[] = [
  { value: "a_positive", label: "A+" },
  { value: "a_negative", label: "A-" },
  { value: "b_positive", label: "B+" },
  { value: "b_negative", label: "B-" },
  { value: "ab_positive", label: "AB+" },
  { value: "ab_negative", label: "AB-" },
  { value: "o_positive", label: "O+" },
  { value: "o_negative", label: "O-" },
];

export const DIET_OPTIONS: Option[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "non_vegetarian", label: "Non-Vegetarian" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "jain", label: "Jain" },
];

export const DISABILITY_STATUS_OPTIONS: Option[] = [
  { value: "none", label: "None" },
  { value: "physically_challenged", label: "Physically Challenged" },
];

export const HABIT_FREQUENCY_OPTIONS: Option[] = [
  { value: "never", label: "Never" },
  { value: "occasionally", label: "Occasionally" },
  { value: "regularly", label: "Regularly" },
];

export const RASHI_OPTIONS: Option[] = [
  { value: "mesh", label: "Mesh (Aries)" },
  { value: "vrishabh", label: "Vrishabh (Taurus)" },
  { value: "mithun", label: "Mithun (Gemini)" },
  { value: "kark", label: "Kark (Cancer)" },
  { value: "simha", label: "Simha (Leo)" },
  { value: "kanya", label: "Kanya (Virgo)" },
  { value: "tula", label: "Tula (Libra)" },
  { value: "vrishchik", label: "Vrishchik (Scorpio)" },
  { value: "dhanu", label: "Dhanu (Sagittarius)" },
  { value: "makar", label: "Makar (Capricorn)" },
  { value: "kumbh", label: "Kumbh (Aquarius)" },
  { value: "meen", label: "Meen (Pisces)" },
];

export const NAKSHATRA_OPTIONS: Option[] = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
  "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana",
  "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "_"), label }));

export const MANGLIK_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "anshik", label: "Anshik (Partial)" },
  { value: "dont_know", label: "Don't know" },
];

export const FAMILY_TYPE_OPTIONS: Option[] = [
  { value: "nuclear", label: "Nuclear" },
  { value: "joint", label: "Joint" },
];

export const FAMILY_STATUS_OPTIONS: Option[] = [
  { value: "middle_class", label: "Middle Class" },
  { value: "upper_middle_class", label: "Upper Middle Class" },
  { value: "affluent", label: "Affluent" },
  { value: "rich", label: "Rich" },
];

export const FAMILY_VALUES_OPTIONS: Option[] = [
  { value: "traditional", label: "Traditional" },
  { value: "moderate", label: "Moderate" },
  { value: "liberal", label: "Liberal" },
];

export const SIBLING_COUNT_OPTIONS: Option[] = [
  "0", "1", "2", "3", "4", "5", "6+",
].map((label) => ({ value: label, label }));

export const HIGHEST_QUALIFICATION_OPTIONS: Option[] = [
  { value: "high_school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate (PhD)" },
  { value: "professional", label: "Professional (CA/CS/CMA)" },
  { value: "other", label: "Other" },
];

export const EMPLOYED_IN_OPTIONS: Option[] = [
  { value: "private_sector", label: "Private Sector" },
  { value: "government", label: "Government / Public Sector" },
  { value: "business", label: "Business / Self-Employed" },
  { value: "defence", label: "Defence" },
  { value: "not_working", label: "Not Working" },
  { value: "student", label: "Student" },
];

export const ANNUAL_INCOME_OPTIONS: Option[] = [
  { value: "prefer_not_to_say", label: "Prefer not to say" },
  { value: "below_3l", label: "Below ₹3 Lakh" },
  { value: "3_5l", label: "₹3-5 Lakh" },
  { value: "5_10l", label: "₹5-10 Lakh" },
  { value: "10_15l", label: "₹10-15 Lakh" },
  { value: "15_25l", label: "₹15-25 Lakh" },
  { value: "25_50l", label: "₹25-50 Lakh" },
  { value: "above_50l", label: "Above ₹50 Lakh" },
];

export const COUNTRY_OPTIONS: Option[] = [
  { value: "india", label: "India" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "australia", label: "Australia" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "singapore", label: "Singapore" },
  { value: "new_zealand", label: "New Zealand" },
  { value: "germany", label: "Germany" },
  { value: "other", label: "Other" },
];

export const INDIAN_STATE_OPTIONS: Option[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "_"), label }));

export const PHONE_COUNTRY_CODE_OPTIONS: Option[] = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (US/Canada)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+65", label: "+65 (Singapore)" },
  { value: "+64", label: "+64 (New Zealand)" },
  { value: "+49", label: "+49 (Germany)" },
];
