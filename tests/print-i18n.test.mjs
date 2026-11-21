import assert from "node:assert/strict";
import test from "node:test";

import {
  ANNUAL_INCOME_OPTIONS,
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  DIET_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  FAMILY_VALUES_OPTIONS,
  HIGHEST_QUALIFICATION_OPTIONS,
  MANGLIK_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  NAKSHATRA_OPTIONS,
  RASHI_OPTIONS,
  RELIGION_OPTIONS,
} from "../lib/biodata/options.ts";
import { OPTION_TRANSLATIONS, PRINT_STRINGS } from "../lib/biodata/print-i18n.ts";

// Every dropdown whose label is printed on the card, mapped to its
// translation table. If a new option is added in English, these tests fail
// until it has Hindi and Marathi labels too.
const PRINTED_LISTS = {
  complexion: COMPLEXION_OPTIONS,
  bodyType: BODY_TYPE_OPTIONS,
  religion: RELIGION_OPTIONS,
  motherTongue: MOTHER_TONGUE_OPTIONS,
  rashi: RASHI_OPTIONS,
  nakshatra: NAKSHATRA_OPTIONS,
  manglik: MANGLIK_OPTIONS,
  qualification: HIGHEST_QUALIFICATION_OPTIONS,
  annualIncome: ANNUAL_INCOME_OPTIONS,
  diet: DIET_OPTIONS,
  familyType: FAMILY_TYPE_OPTIONS,
  familyValues: FAMILY_VALUES_OPTIONS,
};

test("every printed option has Hindi and Marathi labels", () => {
  for (const [list, options] of Object.entries(PRINTED_LISTS)) {
    const translations = OPTION_TRANSLATIONS[list];
    assert.ok(translations, `missing translation table: ${list}`);
    for (const { value } of options) {
      assert.ok(translations[value]?.hi, `${list}.${value} has no Hindi label`);
      assert.ok(translations[value]?.mr, `${list}.${value} has no Marathi label`);
    }
  }
});

test("translation tables only reference real option values", () => {
  for (const [list, translations] of Object.entries(OPTION_TRANSLATIONS)) {
    const values = new Set(PRINTED_LISTS[list].map((option) => option.value));
    for (const value of Object.keys(translations)) {
      assert.ok(values.has(value), `${list}.${value} is not an option`);
    }
  }
});

test("every print language defines the same non-empty strings", () => {
  const flatten = (object, prefix = "") =>
    Object.entries(object).flatMap(([key, value]) =>
      typeof value === "object" && !Array.isArray(value)
        ? flatten(value, `${prefix}${key}.`)
        : [[`${prefix}${key}`, value]]
    );

  const englishKeys = flatten(PRINT_STRINGS.en).map(([key]) => key).sort();
  for (const language of ["hi", "mr"]) {
    const entries = flatten(PRINT_STRINGS[language]);
    assert.deepEqual(entries.map(([key]) => key).sort(), englishKeys, `${language} keys differ from English`);
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        assert.equal(value.length, 12, `${language}.${key} should have 12 months`);
        value.forEach((month) => assert.ok(month, `${language}.${key} has an empty month`));
      } else {
        assert.ok(value, `${language}.${key} is empty`);
      }
    }
  }
});
