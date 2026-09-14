"use client";

import { FormProvider, useForm } from "react-hook-form";

import { SAMPLE_BIODATA_VALUES } from "@/lib/biodata/sample-values";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { BiodataPreview } from "@/components/biodata-builder/biodata-preview";

// The homepage hero used to show a hand-drawn skeleton-bar mockup with no
// real content. This renders the *actual* preview component the builder
// uses, seeded with a fictional filled-in example — so the hero shows
// exactly what a finished biodata looks like, and can never drift out of
// sync with the real product's design. `hasPaid` is true here since this is
// a finished-looking marketing sample, not something a visitor is meant to
// "unlock".
export function HeroBiodataPreview() {
  const form = useForm<BiodataFormValues>({ defaultValues: SAMPLE_BIODATA_VALUES });

  return (
    <FormProvider {...form}>
      <BiodataPreview hasPaid />
    </FormProvider>
  );
}
