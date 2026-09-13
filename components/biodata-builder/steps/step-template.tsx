"use client";

import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/ui/form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TemplateFrame } from "@/components/biodata-builder/template-frame";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { TEMPLATES } from "@/lib/biodata/templates";

// A tiny sample "document" rendered inside each tile so the border/frame
// treatment is genuinely visible at a glance, not just implied by a label.
function TemplateMiniPreview() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <div className="size-3 rounded-full bg-accent" />
        <div className="h-1.5 w-10 rounded-full bg-primary/15" />
      </div>
      <div className="h-1 w-full rounded-full bg-primary/[0.08]" />
      <div className="h-1 w-4/5 rounded-full bg-primary/[0.08]" />
      <div className="h-1 w-3/5 rounded-full bg-primary/[0.08]" />
    </div>
  );
}

export function StepTemplate() {
  const { control } = useFormContext<BiodataFormValues>();

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        Choose your design
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Pick a border style for your biodata document. You can change this anytime.
      </p>

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
                      aria-hidden="true"
                      className="pointer-events-none p-3 shadow-none sm:p-3"
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
