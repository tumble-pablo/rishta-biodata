"use client";

import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/ui/form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioField } from "@/components/biodata-builder/form-fields";
import { TemplateFrame } from "@/components/biodata-builder/template-frame";
import { PRINT_LANGUAGE_OPTIONS } from "@/lib/biodata/print-i18n";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { TEMPLATES } from "@/lib/biodata/templates";

// A tiny sample "document" rendered inside each tile in the template's own
// colours and heading font (TemplateFrame sets them as CSS variables), so
// each tile reads as that design at a glance.
function TemplateMiniPreview() {
  return (
    <div className="space-y-1.5 pt-1">
      <p className="text-center font-[family-name:var(--bd-heading-font)] text-[7px] font-semibold tracking-[0.18em] text-[var(--bd-header-ink)] uppercase">
        Biodata
      </p>
      <div className="mx-auto h-[3px] w-1/2 rounded-full bg-[var(--bd-accent)]" />
      {[0, 1].map((section) => (
        <div key={section} className="space-y-1 pt-0.5">
          <div className="h-[2px] w-1/3 rounded-full bg-[var(--bd-accent)] opacity-70" />
          <div className="h-[2px] w-full rounded-full bg-[var(--bd-rule)]" />
          <div className="h-[2px] w-4/5 rounded-full bg-[var(--bd-rule)]" />
        </div>
      ))}
    </div>
  );
}

export function StepTemplate() {
  const { control } = useFormContext<BiodataFormValues>();

  return (
    <div>
      <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        Choose your design
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Pick a design you like. You can change it any time and see it update straight away.
      </p>

      <div className="mt-6">
        <RadioField
          control={control}
          name="template.language"
          label="Biodata language"
          options={PRINT_LANGUAGE_OPTIONS}
        />
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Headings and choices print in this language. What you type prints as you type it, so you can type in Hindi or Marathi too.
        </p>
      </div>

      <FormField
        control={control}
        name="template.templateId"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {TEMPLATES.map((templateOption) => {
              const inputId = `template-${templateOption.id}`;

              return (
                <FieldLabel key={templateOption.id} htmlFor={inputId} className="cursor-pointer">
                  <Field orientation="vertical" className="gap-2 p-2">
                    <RadioGroupItem value={templateOption.id} id={inputId} className="sr-only" />
                    <TemplateFrame
                      templateId={templateOption.id}
                      compact
                      aria-hidden="true"
                      className="pointer-events-none shadow-none"
                    >
                      <TemplateMiniPreview />
                    </TemplateFrame>
                    <FieldContent className="items-center gap-0">
                      <span className="text-xs font-medium">{templateOption.label}</span>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
        )}
      />
    </div>
  );
}
