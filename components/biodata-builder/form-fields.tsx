"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { Option } from "@/lib/biodata/options";

// Small, shared field renderers for the 5 data-entry steps — keeps each step
// file declarative (a list of fields) instead of repeating the
// FormField/FormItem/FormControl/FormMessage boilerplate for every input.

interface BaseFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
}

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: BaseFieldProps<TFieldValues> & { placeholder?: string; type?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextareaField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: BaseFieldProps<TFieldValues> & { placeholder?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select…",
}: BaseFieldProps<TFieldValues> & { options: Option[]; placeholder?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <NativeSelect {...field}>
              <NativeSelectOption value="">{placeholder}</NativeSelectOption>
              {options.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function RadioField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
}: BaseFieldProps<TFieldValues> & { options: Option[] }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-wrap gap-2"
            >
              {options.map((option) => {
                const inputId = `${String(name)}-${option.value}`;
                return (
                  <label
                    key={option.value}
                    htmlFor={inputId}
                    className={cn(
                      "flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-1.5 text-sm",
                      "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                    )}
                  >
                    <RadioGroupItem value={option.value} id={inputId} className="sr-only" />
                    {option.label}
                  </label>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
