"use client";

import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/ui/form";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SYMBOL_GLYPHS } from "@/components/biodata-builder/symbol-glyphs";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { SYMBOLS } from "@/lib/biodata/symbols";

export function StepSymbol() {
  const { control } = useFormContext<BiodataFormValues>();

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
        Choose your symbol
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Pick a symbol to place at the top of your biodata — or skip this if you&apos;d rather not include one.
      </p>

      <FormField
        control={control}
        name="symbol.symbolId"
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4"
          >
            {SYMBOLS.map((symbolOption) => {
              const Glyph = SYMBOL_GLYPHS[symbolOption.id];
              const inputId = `symbol-${symbolOption.id}`;

              return (
                <FieldLabel key={symbolOption.id} htmlFor={inputId} className="cursor-pointer">
                  <Field
                    orientation="vertical"
                    className="min-h-11 items-center justify-center gap-2 py-4 text-center"
                  >
                    <RadioGroupItem value={symbolOption.id} id={inputId} className="sr-only" />
                    <span
                      aria-hidden="true"
                      className="flex size-10 items-center justify-center text-primary"
                    >
                      {symbolOption.id === "none" ? (
                        <span className="text-[11px] font-medium text-muted-foreground">Skip</span>
                      ) : (
                        <Glyph className="size-7" />
                      )}
                    </span>
                    <FieldContent className="items-center gap-0">
                      <span className="text-xs font-medium">{symbolOption.label}</span>
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
