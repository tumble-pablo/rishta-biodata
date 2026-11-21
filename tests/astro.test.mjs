import assert from "node:assert/strict";
import test from "node:test";

import { EclipticGeoMoon, MakeTime } from "astronomy-engine";

import {
  istBirthInstant,
  lahiriAyanamsa,
  moonSignsForIndianBirth,
  siderealMoonLongitude,
} from "../lib/biodata/astro.ts";

test("Moon longitude matches Meeus example 47.a", () => {
  // 1992-04-12 0h TT (≈ 23:59:01 UT the day before): apparent λ = 133.162655°.
  const lon = EclipticGeoMoon(MakeTime(new Date("1992-04-11T23:59:01Z"))).lon;
  assert.ok(Math.abs(lon - 133.162655) < 0.02, `got ${lon}`);
});

test("Lahiri ayanamsa is ~23°51′ at J2000 and ~23°09′ in 1950", () => {
  assert.ok(Math.abs(lahiriAyanamsa(new Date("2000-01-01T12:00:00Z")) - 23.8531) < 0.001);
  assert.ok(Math.abs(lahiriAyanamsa(new Date("1950-01-01T00:00:00Z")) - 23.155) < 0.01);
});

test("IST birth time converts to UTC", () => {
  assert.equal(istBirthInstant("1997-08-14", "06:45")?.toISOString(), "1997-08-14T01:15:00.000Z");
  assert.equal(istBirthInstant("not-a-date", "06:45"), null);
});

test("sidereal longitude stays within 0–360", () => {
  const lon = siderealMoonLongitude(new Date("2024-03-10T00:00:00Z"));
  assert.ok(lon >= 0 && lon < 360);
});

// Widely published charts, as a sanity check against real panchang output.
test("Narendra Modi (17 Sep 1950, 11:00 IST): Vrishchik, Anuradha", () => {
  assert.deepEqual(moonSignsForIndianBirth("1950-09-17", "11:00"), { rashi: "vrishchik", nakshatra: "anuradha" });
});

test("Amitabh Bachchan (11 Oct 1942, 16:00 IST): Tula, Swati", () => {
  assert.deepEqual(moonSignsForIndianBirth("1942-10-11", "16:00"), { rashi: "tula", nakshatra: "swati" });
});

test("without a birth time, only what holds all day is returned", () => {
  const signs = moonSignsForIndianBirth("1950-09-17", "");
  assert.ok(signs);
  // Whatever is returned must agree with the timed result for that day.
  if (signs.rashi) assert.equal(signs.rashi, "vrishchik");
  if (signs.nakshatra) assert.equal(signs.nakshatra, "anuradha");
});
