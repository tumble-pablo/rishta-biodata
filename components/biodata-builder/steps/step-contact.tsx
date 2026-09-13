"use client";

import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SelectField, TextField, TextareaField } from "@/components/biodata-builder/form-fields";
import { COUNTRY_OPTIONS, INDIAN_STATE_OPTIONS, PHONE_COUNTRY_CODE_OPTIONS } from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

export function StepContact() {
  const { control, watch } = useFormContext<BiodataFormValues>();
  const whatsappSameAsPhone = watch("contact.whatsappSameAsPhone");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Contact details
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">How families can reach you.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField control={control} name="contact.country" label="Country" options={COUNTRY_OPTIONS} />
        <SelectField
          control={control}
          name="contact.state"
          label="State (optional)"
          options={INDIAN_STATE_OPTIONS}
        />
      </div>

      <TextField control={control} name="contact.city" label="City" placeholder="e.g. Pune" />
      <TextareaField control={control} name="contact.address" label="Address (optional)" />

      <div className="grid gap-5 sm:grid-cols-[minmax(0,10rem)_1fr]">
        <SelectField
          control={control}
          name="contact.phoneCountryCode"
          label="Country code"
          options={PHONE_COUNTRY_CODE_OPTIONS}
        />
        <TextField control={control} name="contact.phoneNumber" label="Phone number" type="tel" />
      </div>

      <FormField
        control={control}
        name="contact.whatsappSameAsPhone"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2.5">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="font-normal">
              My WhatsApp number is the same as my phone number
            </FormLabel>
          </FormItem>
        )}
      />

      {!whatsappSameAsPhone && (
        <TextField control={control} name="contact.whatsappNumber" label="WhatsApp number (optional)" type="tel" />
      )}

      <TextField control={control} name="contact.email" label="Email (optional)" type="email" />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="contact.contactPersonName" label="Contact person (optional)" />
        <TextField control={control} name="contact.contactPersonRelation" label="Relation (optional)" />
      </div>
    </div>
  );
}
