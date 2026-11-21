import { EclipticGeoMoon, MakeTime } from "astronomy-engine";

// Relative (not "@/") so tests/astro.test.mjs can run it under plain Node.
import { NAKSHATRA_OPTIONS, RASHI_OPTIONS } from "./options.ts";

// Works out the Moon sign (rashi) and birth star (nakshatra) from date and
// time of birth, the way an Indian panchang does:
//
//   1. Find the Moon's tropical ecliptic longitude at the birth instant
//      (astronomy-engine, accurate to well under an arc-minute — far finer
//      than the 13°20′ width of a nakshatra).
//   2. Subtract the Lahiri (Chitrapaksha) ayanamsa — the Government of India
//      standard — to get the sidereal longitude.
//   3. Rashi = which 30° slice it falls in; nakshatra = which 13°20′ slice.
//
// Birth time is taken as Indian Standard Time (UTC+5:30), so this is only
// right for births in India; the UI says so. Manglik is deliberately NOT
// computed: it needs the ascendant (exact birthplace coordinates) and its
// rules differ between traditions, so it stays a manual choice.

const IST_OFFSET_MINUTES = 5 * 60 + 30;
const J2000_JD = 2451545.0;
const NAKSHATRA_SPAN = 360 / 27;

/** Lahiri ayanamsa in degrees: 23°51′11″ at J2000, precessing ~50.29″/year. */
export function lahiriAyanamsa(date: Date): number {
  const julianDay = date.getTime() / 86_400_000 + 2440587.5;
  const centuries = (julianDay - J2000_JD) / 36525;
  return 23.853056 + 1.396971 * centuries + 0.000308 * centuries * centuries;
}

/** Moon's sidereal (Lahiri) longitude in degrees, 0 ≤ x < 360. */
export function siderealMoonLongitude(date: Date): number {
  const tropical = EclipticGeoMoon(MakeTime(date)).lon;
  const sidereal = (tropical - lahiriAyanamsa(date)) % 360;
  return sidereal < 0 ? sidereal + 360 : sidereal;
}

/** "YYYY-MM-DD" + "HH:MM" in IST → the UTC instant, or null if invalid. */
export function istBirthInstant(dateOfBirth: string, timeOfBirth: string): Date | null {
  const date = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth);
  const time = /^(\d{2}):(\d{2})/.exec(timeOfBirth);
  if (!date || !time) return null;
  const utcMs =
    Date.UTC(Number(date[1]), Number(date[2]) - 1, Number(date[3]), Number(time[1]), Number(time[2])) -
    IST_OFFSET_MINUTES * 60_000;
  return Number.isNaN(utcMs) ? null : new Date(utcMs);
}

export interface MoonSigns {
  /** RASHI_OPTIONS value, or null when it can't be pinned down. */
  rashi: string | null;
  /** NAKSHATRA_OPTIONS value, or null when it can't be pinned down. */
  nakshatra: string | null;
}

function signsAt(instant: Date): MoonSigns {
  const longitude = siderealMoonLongitude(instant);
  return {
    rashi: RASHI_OPTIONS[Math.floor(longitude / 30)]?.value ?? null,
    nakshatra: NAKSHATRA_OPTIONS[Math.floor(longitude / NAKSHATRA_SPAN)]?.value ?? null,
  };
}

/**
 * Rashi and nakshatra for a birth in India. With a birth time, both are
 * exact. Without one, the Moon is checked at the start and end of that day:
 * whatever didn't change during the day is still certain (the rashi often
 * is, since the Moon spends ~2.5 days in each), and the rest comes back null
 * rather than guessed.
 */
export function moonSignsForIndianBirth(dateOfBirth: string, timeOfBirth: string): MoonSigns | null {
  if (timeOfBirth) {
    const instant = istBirthInstant(dateOfBirth, timeOfBirth);
    return instant ? signsAt(instant) : null;
  }

  const start = istBirthInstant(dateOfBirth, "00:00");
  const end = istBirthInstant(dateOfBirth, "23:59");
  if (!start || !end) return null;
  const atStart = signsAt(start);
  const atEnd = signsAt(end);
  return {
    rashi: atStart.rashi === atEnd.rashi ? atStart.rashi : null,
    nakshatra: atStart.nakshatra === atEnd.nakshatra ? atStart.nakshatra : null,
  };
}
