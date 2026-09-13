// Pure, framework-agnostic functions that derive display-only facts from a
// date of birth. Nothing here is stored in form state or localStorage — it's
// recomputed at render time wherever `personal.dateOfBirth` is read.
//
// Note: this computes the Western/tropical zodiac sign, not the Vedic Rashi
// (moon sign) — a real Rashi needs birth time and place plus a sidereal
// ephemeris, which is far too complex/inaccurate to fake from a date alone.
// Rashi and Nakshatra stay manual, optional fields in the religious step.

export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

interface ZodiacRange {
  sign: ZodiacSign;
  startMonth: number; // 1-12
  startDay: number;
  endMonth: number;
  endDay: number;
}

// Standard tropical Western zodiac date ranges.
const ZODIAC_RANGES: ZodiacRange[] = [
  { sign: "Capricorn", startMonth: 1, startDay: 1, endMonth: 1, endDay: 19 },
  { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 12, endDay: 31 },
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Parses a `yyyy-MM-dd` string into { year, month, day } without timezone
 * shifting (avoids `new Date("yyyy-MM-dd")`'s UTC-midnight parsing, which can
 * land on the previous day in negative-UTC-offset timezones). */
function parseIsoDateParts(
  isoDate: string
): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

export function getZodiacSign(
  isoDate: string | null | undefined
): ZodiacSign | null {
  if (!isoDate) return null;
  const parts = parseIsoDateParts(isoDate);
  if (!parts) return null;
  const { month, day } = parts;

  const range = ZODIAC_RANGES.find(({ startMonth, startDay, endMonth, endDay }) => {
    if (startMonth === endMonth) return month === startMonth && day >= startDay && day <= endDay;
    // Range spans two months (every case here except the Dec 22-31 entry).
    return (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    );
  });

  return range?.sign ?? null;
}

export function getAge(
  isoDate: string | null | undefined,
  referenceDate: Date = new Date()
): number | null {
  if (!isoDate) return null;
  const parts = parseIsoDateParts(isoDate);
  if (!parts) return null;

  let age = referenceDate.getFullYear() - parts.year;
  const hasHadBirthdayThisYear =
    referenceDate.getMonth() + 1 > parts.month ||
    (referenceDate.getMonth() + 1 === parts.month && referenceDate.getDate() >= parts.day);
  if (!hasHadBirthdayThisYear) age -= 1;

  return age >= 0 ? age : null;
}

export function getDayOfWeek(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null;
  const parts = parseIsoDateParts(isoDate);
  if (!parts) return null;
  // Noon UTC sidesteps any DST/timezone edge case affecting the weekday.
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12));
  return DAY_NAMES[date.getUTCDay()];
}
