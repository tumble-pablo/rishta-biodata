"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioField, SelectField, TextField } from "@/components/biodata-builder/form-fields";
import { getAge, getDayOfWeek, getZodiacSign } from "@/lib/biodata/derive";
import { MANGLIK_OPTIONS, NAKSHATRA_OPTIONS, RASHI_OPTIONS, optionLabel } from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

// Fills Rashi/Nakshatra from the birth date and time already entered in the
// personal step (see lib/biodata/astro.ts). The calculation library is
// loaded only when the button is pressed, keeping it out of the initial
// bundle. Values land in the normal fields, so they stay fully editable.
function MoonSignsHelper() {
  const { getValues, setValue, watch } = useFormContext<BiodataFormValues>();
  const dateOfBirth = watch("personal.dateOfBirth");
  const timeOfBirth = watch("personal.timeOfBirth");
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const fill = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const { moonSignsForIndianBirth } = await import("@/lib/biodata/astro");
      const signs = moonSignsForIndianBirth(getValues("personal.dateOfBirth"), getValues("personal.timeOfBirth"));
      if (!signs || (!signs.rashi && !signs.nakshatra)) {
        setMessage("We couldn't work this out from the birth date alone. Add your time of birth and try again.");
        return;
      }

      const filled: string[] = [];
      if (signs.rashi) {
        setValue("religious.rashi", signs.rashi, { shouldDirty: true });
        filled.push(`Rashi: ${optionLabel(RASHI_OPTIONS, signs.rashi)}`);
      }
      if (signs.nakshatra) {
        setValue("religious.nakshatra", signs.nakshatra, { shouldDirty: true });
        filled.push(`Nakshatra: ${optionLabel(NAKSHATRA_OPTIONS, signs.nakshatra)}`);
      }
      const missing = !signs.nakshatra ? " Add your time of birth to get the nakshatra too." : "";
      setMessage(`Filled in ${filled.join(" and ")}.${missing}`);
    } catch {
      setMessage("Something went wrong. Please fill these in yourself.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-md border border-primary/20 bg-primary/[0.03] px-4 py-3">
      <p className="text-sm font-medium">Don&apos;t know your rashi or nakshatra?</p>
      <p className="mt-0.5 text-[13px] text-muted-foreground">
        We can work them out from your date and time of birth. This uses the Lahiri method that most Indian panchangs use, and assumes you were born in India. Please check with your family pandit if you are unsure.
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        disabled={busy || !dateOfBirth}
        onClick={fill}
      >
        {busy ? <Loader2 className="animate-spin" /> : <Sparkles />}
        Fill from my birth details
      </Button>
      {!dateOfBirth && (
        <p className="mt-2 text-[13px] text-muted-foreground">Add your date of birth in the personal details step first.</p>
      )}
      {dateOfBirth && !timeOfBirth && !message && (
        <p className="mt-2 text-[13px] text-muted-foreground">Tip: add your time of birth for the most accurate result.</p>
      )}
      {message && (
        <p role="status" className="mt-2 text-[13px] text-foreground">
          {message}
        </p>
      )}
    </div>
  );
}

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
        <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Religious & astrological details
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Optional details some families like to include.
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

      <MoonSignsHelper />

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
