"use client";

import { FormProvider, useForm } from "react-hook-form";

import { BiodataPreview } from "@/components/biodata-builder/biodata-preview";
import { SAMPLE_BIODATA_VALUES, SAMPLE_BIODATA_VALUES_WOMAN } from "@/lib/biodata/sample-values";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import type { TemplateId } from "@/lib/biodata/templates";

interface SampleBiodataProps {
  templateId: TemplateId;
  profile?: "man" | "woman";
  language?: BiodataFormValues["template"]["language"];
  className?: string;
}

// A finished sample biodata, rendered by the real preview component so the
// homepage shows exactly what the builder produces — the same layout,
// typography and template artwork — rather than a drawing of it.
export function SampleBiodata({ templateId, profile = "man", language = "en", className }: SampleBiodataProps) {
  const base = profile === "woman" ? SAMPLE_BIODATA_VALUES_WOMAN : SAMPLE_BIODATA_VALUES;
  const form = useForm<BiodataFormValues>({
    defaultValues: { ...base, template: { templateId, language } },
  });

  return (
    <div className={className}>
      <FormProvider {...form}>
        <BiodataPreview hasPaid />
      </FormProvider>
    </div>
  );
}
