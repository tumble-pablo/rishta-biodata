"use client";

import { useFormContext } from "react-hook-form";

import { RadioField, SelectField, TextField } from "@/components/biodata-builder/form-fields";
import {
  ANNUAL_INCOME_OPTIONS,
  EMPLOYED_IN_OPTIONS,
  HIGHEST_QUALIFICATION_OPTIONS,
} from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

export function StepEducationCareer() {
  const { control } = useFormContext<BiodataFormValues>();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Education & career
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Your qualifications and work.</p>
      </div>

      <SelectField
        control={control}
        name="educationCareer.highestQualification"
        label="Highest qualification"
        options={HIGHEST_QUALIFICATION_OPTIONS}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="educationCareer.fieldOfStudy" label="Field of study (optional)" />
        <TextField control={control} name="educationCareer.college" label="College / university (optional)" />
      </div>

      <RadioField
        control={control}
        name="educationCareer.employedIn"
        label="Employed in (optional)"
        options={EMPLOYED_IN_OPTIONS}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="educationCareer.occupation" label="Occupation (optional)" />
        <TextField control={control} name="educationCareer.companyName" label="Company (optional)" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="educationCareer.annualIncome"
          label="Annual income (optional)"
          options={ANNUAL_INCOME_OPTIONS}
        />
        <TextField control={control} name="educationCareer.workLocation" label="Work location (optional)" />
      </div>
    </div>
  );
}
