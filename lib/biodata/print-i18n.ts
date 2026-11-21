// Translations for the PRINTED biodata (preview, PDF, JPG) — not the form
// UI, which stays in English for now. Only the fixed parts change: section
// headings, field labels, and the labels of dropdown choices. Anything the
// person typed (names, places, caste, hobbies…) prints exactly as typed, in
// whatever script they used — the same approach competitors take.
//
// Hindi/Marathi strings are first drafts and need a native-speaker review
// before launch; keep them all in this one file so that review is easy.

export const PRINT_LANGUAGES = ["en", "hi", "mr"] as const;
export type PrintLanguage = (typeof PRINT_LANGUAGES)[number];

export const PRINT_LANGUAGE_OPTIONS: { value: PrintLanguage; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी (Hindi)" },
  { value: "mr", label: "मराठी (Marathi)" },
];

export interface PrintStrings {
  documentTitle: string;
  namePlaceholder: string;
  subtitlePlaceholder: string;
  years: string;
  married: string;
  sections: {
    personal: string;
    religion: string;
    educationCareer: string;
    lifestyle: string;
    family: string;
  };
  labels: {
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
    height: string;
    complexion: string;
    bodyType: string;
    religion: string;
    motherTongue: string;
    caste: string;
    subCaste: string;
    gotra: string;
    rashi: string;
    manglik: string;
    nakshatra: string;
    qualification: string;
    university: string;
    occupation: string;
    company: string;
    annualIncome: string;
    diet: string;
    hobbies: string;
    habits: string;
    father: string;
    familyType: string;
    mother: string;
    familyValues: string;
    siblings: string;
    nativePlace: string;
    contact: string;
  };
  habits: {
    nonSmoker: string;
    nonDrinker: string;
    smokes: Record<"occasionally" | "regularly", string>;
    drinks: Record<"occasionally" | "regularly", string>;
  };
  months: readonly string[];
}

const EN: PrintStrings = {
  documentTitle: "Biodata",
  namePlaceholder: "Full Name",
  subtitlePlaceholder: "Age  |  Height  |  City",
  years: "Years",
  married: "married",
  sections: {
    personal: "Personal Details",
    religion: "Religion & Community",
    educationCareer: "Education & Career",
    lifestyle: "Lifestyle",
    family: "Family Details",
  },
  labels: {
    dateOfBirth: "Date of Birth",
    timeOfBirth: "Time of Birth",
    placeOfBirth: "Place of Birth",
    height: "Height",
    complexion: "Complexion",
    bodyType: "Body Type",
    religion: "Religion",
    motherTongue: "Mother Tongue",
    caste: "Caste",
    subCaste: "Sub Caste",
    gotra: "Gotra",
    rashi: "Rashi",
    manglik: "Manglik",
    nakshatra: "Nakshatra",
    qualification: "Qualification",
    university: "University",
    occupation: "Occupation",
    company: "Company",
    annualIncome: "Annual Income",
    diet: "Diet",
    hobbies: "Hobbies",
    habits: "Habits",
    father: "Father",
    familyType: "Family Type",
    mother: "Mother",
    familyValues: "Family Value",
    siblings: "Siblings",
    nativePlace: "Native Place",
    contact: "Contact",
  },
  habits: {
    nonSmoker: "Non-smoker",
    nonDrinker: "Non-drinker",
    smokes: { occasionally: "Smokes occasionally", regularly: "Smokes regularly" },
    drinks: { occasionally: "Drinks occasionally", regularly: "Drinks regularly" },
  },
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

const HI: PrintStrings = {
  documentTitle: "बायोडाटा",
  namePlaceholder: "पूरा नाम",
  subtitlePlaceholder: "आयु  |  ऊँचाई  |  शहर",
  years: "वर्ष",
  married: "विवाहित",
  sections: {
    personal: "व्यक्तिगत जानकारी",
    religion: "धर्म एवं समुदाय",
    educationCareer: "शिक्षा एवं करियर",
    lifestyle: "जीवनशैली",
    family: "पारिवारिक जानकारी",
  },
  labels: {
    dateOfBirth: "जन्म तिथि",
    timeOfBirth: "जन्म समय",
    placeOfBirth: "जन्म स्थान",
    height: "ऊँचाई",
    complexion: "रंग",
    bodyType: "शारीरिक बनावट",
    religion: "धर्म",
    motherTongue: "मातृभाषा",
    caste: "जाति",
    subCaste: "उपजाति",
    gotra: "गोत्र",
    rashi: "राशि",
    manglik: "मांगलिक",
    nakshatra: "नक्षत्र",
    qualification: "शिक्षा",
    university: "विश्वविद्यालय",
    occupation: "व्यवसाय",
    company: "कंपनी",
    annualIncome: "वार्षिक आय",
    diet: "आहार",
    hobbies: "शौक",
    habits: "आदतें",
    father: "पिता",
    familyType: "परिवार का प्रकार",
    mother: "माता",
    familyValues: "पारिवारिक मूल्य",
    siblings: "भाई-बहन",
    nativePlace: "पैतृक स्थान",
    contact: "संपर्क",
  },
  habits: {
    nonSmoker: "धूम्रपान नहीं",
    nonDrinker: "मद्यपान नहीं",
    smokes: { occasionally: "कभी-कभी धूम्रपान", regularly: "नियमित धूम्रपान" },
    drinks: { occasionally: "कभी-कभी मद्यपान", regularly: "नियमित मद्यपान" },
  },
  months: [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
  ],
};

const MR: PrintStrings = {
  documentTitle: "बायोडेटा",
  namePlaceholder: "पूर्ण नाव",
  subtitlePlaceholder: "वय  |  उंची  |  शहर",
  years: "वर्षे",
  married: "विवाहित",
  sections: {
    personal: "वैयक्तिक माहिती",
    religion: "धर्म व समाज",
    educationCareer: "शिक्षण व नोकरी",
    lifestyle: "जीवनशैली",
    family: "कौटुंबिक माहिती",
  },
  labels: {
    dateOfBirth: "जन्म तारीख",
    timeOfBirth: "जन्म वेळ",
    placeOfBirth: "जन्म ठिकाण",
    height: "उंची",
    complexion: "वर्ण",
    bodyType: "शरीरयष्टी",
    religion: "धर्म",
    motherTongue: "मातृभाषा",
    caste: "जात",
    subCaste: "पोटजात",
    gotra: "गोत्र",
    rashi: "रास",
    manglik: "मंगळ",
    nakshatra: "नक्षत्र",
    qualification: "शिक्षण",
    university: "विद्यापीठ",
    occupation: "नोकरी / व्यवसाय",
    company: "कंपनी",
    annualIncome: "वार्षिक उत्पन्न",
    diet: "आहार",
    hobbies: "छंद",
    habits: "सवयी",
    father: "वडील",
    familyType: "कुटुंब प्रकार",
    mother: "आई",
    familyValues: "कौटुंबिक मूल्ये",
    siblings: "भावंडे",
    nativePlace: "मूळ गाव",
    contact: "संपर्क",
  },
  habits: {
    nonSmoker: "धूम्रपान करत नाही",
    nonDrinker: "मद्यपान करत नाही",
    smokes: { occasionally: "कधीकधी धूम्रपान", regularly: "नियमित धूम्रपान" },
    drinks: { occasionally: "कधीकधी मद्यपान", regularly: "नियमित मद्यपान" },
  },
  months: [
    "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
    "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
  ],
};

export const PRINT_STRINGS: Record<PrintLanguage, PrintStrings> = { en: EN, hi: HI, mr: MR };

// Translated labels for dropdown choices that appear on the printed card,
// keyed by the option's stored `value` (see options.ts). A missing entry
// falls back to the English label, so a new English option never prints
// blank — it just prints untranslated until someone adds it here.
type OptionTranslations = Record<string, { hi: string; mr: string }>;

export const OPTION_TRANSLATIONS: Record<string, OptionTranslations> = {
  complexion: {
    very_fair: { hi: "बहुत गोरा", mr: "अतिशय गोरा" },
    fair: { hi: "गोरा", mr: "गोरा" },
    wheatish: { hi: "गेहुँआ", mr: "गव्हाळ" },
    wheatish_brown: { hi: "गहरा गेहुँआ", mr: "सावळा-गव्हाळ" },
    dark: { hi: "साँवला", mr: "सावळा" },
  },
  bodyType: {
    slim: { hi: "दुबला-पतला", mr: "सडपातळ" },
    average: { hi: "सामान्य", mr: "मध्यम" },
    athletic: { hi: "सुडौल", mr: "पिळदार" },
    heavy: { hi: "भारी", mr: "जाड" },
  },
  religion: {
    hindu: { hi: "हिंदू", mr: "हिंदू" },
    muslim: { hi: "मुस्लिम", mr: "मुस्लिम" },
    christian: { hi: "ईसाई", mr: "ख्रिश्चन" },
    sikh: { hi: "सिख", mr: "शीख" },
    jain: { hi: "जैन", mr: "जैन" },
    buddhist: { hi: "बौद्ध", mr: "बौद्ध" },
    parsi: { hi: "पारसी", mr: "पारशी" },
    jewish: { hi: "यहूदी", mr: "ज्यू" },
    no_religion: { hi: "कोई धर्म नहीं", mr: "धर्म नाही" },
    other: { hi: "अन्य", mr: "इतर" },
  },
  motherTongue: {
    hindi: { hi: "हिंदी", mr: "हिंदी" },
    english: { hi: "अंग्रेज़ी", mr: "इंग्रजी" },
    punjabi: { hi: "पंजाबी", mr: "पंजाबी" },
    bengali: { hi: "बंगाली", mr: "बंगाली" },
    gujarati: { hi: "गुजराती", mr: "गुजराती" },
    marathi: { hi: "मराठी", mr: "मराठी" },
    tamil: { hi: "तमिल", mr: "तमिळ" },
    telugu: { hi: "तेलुगु", mr: "तेलुगू" },
    kannada: { hi: "कन्नड़", mr: "कन्नड" },
    malayalam: { hi: "मलयालम", mr: "मल्याळम" },
    urdu: { hi: "उर्दू", mr: "उर्दू" },
    odia: { hi: "ओड़िया", mr: "ओडिया" },
    assamese: { hi: "असमिया", mr: "आसामी" },
    kashmiri: { hi: "कश्मीरी", mr: "काश्मिरी" },
    konkani: { hi: "कोंकणी", mr: "कोकणी" },
    sindhi: { hi: "सिंधी", mr: "सिंधी" },
    nepali: { hi: "नेपाली", mr: "नेपाळी" },
    sanskrit: { hi: "संस्कृत", mr: "संस्कृत" },
    other: { hi: "अन्य", mr: "इतर" },
  },
  rashi: {
    mesh: { hi: "मेष", mr: "मेष" },
    vrishabh: { hi: "वृषभ", mr: "वृषभ" },
    mithun: { hi: "मिथुन", mr: "मिथुन" },
    kark: { hi: "कर्क", mr: "कर्क" },
    simha: { hi: "सिंह", mr: "सिंह" },
    kanya: { hi: "कन्या", mr: "कन्या" },
    tula: { hi: "तुला", mr: "तूळ" },
    vrishchik: { hi: "वृश्चिक", mr: "वृश्चिक" },
    dhanu: { hi: "धनु", mr: "धनु" },
    makar: { hi: "मकर", mr: "मकर" },
    kumbh: { hi: "कुंभ", mr: "कुंभ" },
    meen: { hi: "मीन", mr: "मीन" },
  },
  nakshatra: {
    ashwini: { hi: "अश्विनी", mr: "अश्विनी" },
    bharani: { hi: "भरणी", mr: "भरणी" },
    krittika: { hi: "कृत्तिका", mr: "कृत्तिका" },
    rohini: { hi: "रोहिणी", mr: "रोहिणी" },
    mrigashira: { hi: "मृगशिरा", mr: "मृग" },
    ardra: { hi: "आर्द्रा", mr: "आर्द्रा" },
    punarvasu: { hi: "पुनर्वसु", mr: "पुनर्वसू" },
    pushya: { hi: "पुष्य", mr: "पुष्य" },
    ashlesha: { hi: "आश्लेषा", mr: "आश्लेषा" },
    magha: { hi: "मघा", mr: "मघा" },
    purva_phalguni: { hi: "पूर्वा फाल्गुनी", mr: "पूर्वा फाल्गुनी" },
    uttara_phalguni: { hi: "उत्तरा फाल्गुनी", mr: "उत्तरा फाल्गुनी" },
    hasta: { hi: "हस्त", mr: "हस्त" },
    chitra: { hi: "चित्रा", mr: "चित्रा" },
    swati: { hi: "स्वाति", mr: "स्वाती" },
    vishakha: { hi: "विशाखा", mr: "विशाखा" },
    anuradha: { hi: "अनुराधा", mr: "अनुराधा" },
    jyeshtha: { hi: "ज्येष्ठा", mr: "ज्येष्ठा" },
    mula: { hi: "मूल", mr: "मूळ" },
    purva_ashadha: { hi: "पूर्वाषाढ़ा", mr: "पूर्वाषाढा" },
    uttara_ashadha: { hi: "उत्तराषाढ़ा", mr: "उत्तराषाढा" },
    shravana: { hi: "श्रवण", mr: "श्रवण" },
    dhanishta: { hi: "धनिष्ठा", mr: "धनिष्ठा" },
    shatabhisha: { hi: "शतभिषा", mr: "शततारका" },
    purva_bhadrapada: { hi: "पूर्वा भाद्रपद", mr: "पूर्वा भाद्रपदा" },
    uttara_bhadrapada: { hi: "उत्तरा भाद्रपद", mr: "उत्तरा भाद्रपदा" },
    revati: { hi: "रेवती", mr: "रेवती" },
  },
  manglik: {
    yes: { hi: "हाँ", mr: "होय" },
    no: { hi: "नहीं", mr: "नाही" },
    anshik: { hi: "आंशिक", mr: "सौम्य" },
    dont_know: { hi: "पता नहीं", mr: "माहीत नाही" },
  },
  qualification: {
    high_school: { hi: "हाई स्कूल", mr: "माध्यमिक शिक्षण" },
    diploma: { hi: "डिप्लोमा", mr: "पदविका" },
    bachelors: { hi: "स्नातक", mr: "पदवीधर" },
    masters: { hi: "स्नातकोत्तर", mr: "पदव्युत्तर" },
    doctorate: { hi: "डॉक्टरेट (पीएचडी)", mr: "डॉक्टरेट (पीएच.डी.)" },
    professional: { hi: "व्यावसायिक (CA/CS/CMA)", mr: "व्यावसायिक (CA/CS/CMA)" },
    other: { hi: "अन्य", mr: "इतर" },
  },
  annualIncome: {
    prefer_not_to_say: { hi: "बताना नहीं चाहते", mr: "सांगू इच्छित नाही" },
    below_3l: { hi: "₹3 लाख से कम", mr: "₹3 लाखांपेक्षा कमी" },
    "3_5l": { hi: "₹3-5 लाख", mr: "₹3-5 लाख" },
    "5_10l": { hi: "₹5-10 लाख", mr: "₹5-10 लाख" },
    "10_15l": { hi: "₹10-15 लाख", mr: "₹10-15 लाख" },
    "15_25l": { hi: "₹15-25 लाख", mr: "₹15-25 लाख" },
    "25_50l": { hi: "₹25-50 लाख", mr: "₹25-50 लाख" },
    above_50l: { hi: "₹50 लाख से अधिक", mr: "₹50 लाखांपेक्षा जास्त" },
  },
  diet: {
    vegetarian: { hi: "शाकाहारी", mr: "शाकाहारी" },
    non_vegetarian: { hi: "मांसाहारी", mr: "मांसाहारी" },
    eggetarian: { hi: "अंडाहारी", mr: "अंडाहारी" },
    vegan: { hi: "वीगन", mr: "वीगन" },
    jain: { hi: "जैन", mr: "जैन" },
  },
  familyType: {
    nuclear: { hi: "एकल परिवार", mr: "विभक्त कुटुंब" },
    joint: { hi: "संयुक्त परिवार", mr: "एकत्र कुटुंब" },
  },
  familyValues: {
    traditional: { hi: "पारंपरिक", mr: "पारंपरिक" },
    moderate: { hi: "मध्यम", mr: "मध्यम" },
    liberal: { hi: "उदार", mr: "उदारमतवादी" },
  },
};
