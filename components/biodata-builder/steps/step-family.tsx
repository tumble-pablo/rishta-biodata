"use client";

import { useFormContext } from "react-hook-form";

import { RadioField, SelectField, TextField, TextareaField } from "@/components/biodata-builder/form-fields";
import {
  FAMILY_STATUS_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  FAMILY_VALUES_OPTIONS,
  SIBLING_COUNT_OPTIONS,
} from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

export function StepFamily() {
  const { control } = useFormContext<BiodataFormValues>();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Family details
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Tell us about your family.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <RadioField control={control} name="family.familyType" label="Family type (optional)" options={FAMILY_TYPE_OPTIONS} />
        <RadioField
          control={control}
          name="family.familyValues"
          label="Family values (optional)"
          options={FAMILY_VALUES_OPTIONS}
        />
      </div>

      <RadioField
        control={control}
        name="family.familyStatus"
        label="Family status (optional)"
        options={FAMILY_STATUS_OPTIONS}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="family.fatherName" label="Father's name (optional)" />
        <TextField control={control} name="family.fatherOccupation" label="Father's occupation (optional)" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="family.motherName" label="Mother's name (optional)" />
        <TextField control={control} name="family.motherOccupation" label="Mother's occupation (optional)" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="family.siblingsCount"
          label="Siblings (optional)"
          options={SIBLING_COUNT_OPTIONS}
        />
        <SelectField
          control={control}
          name="family.siblingsMarriedCount"
          label="Siblings married (optional)"
          options={SIBLING_COUNT_OPTIONS}
        />
      </div>

      <TextField control={control} name="family.nativePlace" label="Native place (optional)" />
      <TextareaField
        control={control}
        name="family.familyDescription"
        label="About your family (optional)"
        placeholder="A few lines about your family…"
      />
    </div>
  );
}
