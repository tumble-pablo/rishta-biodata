"use client";

import { useFormContext } from "react-hook-form";

import { RadioField, SelectField, TextField } from "@/components/biodata-builder/form-fields";
import { getAge, getDayOfWeek, getZodiacSign } from "@/lib/biodata/derive";
import { MANGLIK_OPTIONS, NAKSHATRA_OPTIONS, RASHI_OPTIONS } from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

export function StepReligious() {
  const { control, watch } = useFormContext<BiodataFormValues>();
  const dateOfBirth = watch("personal.dateOfBirth");
  const age = getAge(dateOfBirth);
  const zodiac = getZodiacSign(dateOfBirth);
  const dayBorn = getDayOfWeek(dateOfBirth);

  const summaryLine = [
    age !== null ? `${age} years old` : null,
    zodiac ? `Star sign: ${zodiac}` : null,
    dayBorn ? `Born on a ${dayBorn}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Religious & astrological details
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Optional details some families like to include. Rashi and Nakshatra need a birth chart to
          calculate precisely, so please fill these in only if you already know them.
        </p>
      </div>

      {summaryLine && (
        <div className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {summaryLine}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="religious.caste" label="Caste (optional)" />
        <TextField control={control} name="religious.subCaste" label="Sub-caste (optional)" />
      </div>
      <TextField control={control} name="religious.gotra" label="Gotra (optional)" />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField control={control} name="religious.rashi" label="Rashi (optional)" options={RASHI_OPTIONS} />
        <SelectField
          control={control}
          name="religious.nakshatra"
          label="Nakshatra (optional)"
          options={NAKSHATRA_OPTIONS}
        />
      </div>

      <RadioField control={control} name="religious.manglik" label="Manglik (optional)" options={MANGLIK_OPTIONS} />
    </div>
  );
}
