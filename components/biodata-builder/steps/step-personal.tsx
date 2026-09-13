"use client";

import { useFormContext } from "react-hook-form";
import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  RadioField,
  SelectField,
  TextField,
  TextareaField,
} from "@/components/biodata-builder/form-fields";
import { getAge, getZodiacSign } from "@/lib/biodata/derive";
import {
  BLOOD_GROUP_OPTIONS,
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  DIET_OPTIONS,
  DISABILITY_STATUS_OPTIONS,
  GENDER_OPTIONS,
  HABIT_FREQUENCY_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  PROFILE_CREATED_FOR_OPTIONS,
  RELIGION_OPTIONS,
} from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";

export function StepPersonal() {
  const { control, watch } = useFormContext<BiodataFormValues>();
  const dateOfBirth = watch("personal.dateOfBirth");
  const age = getAge(dateOfBirth);
  const zodiac = getZodiacSign(dateOfBirth);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          Personal details
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Share who you are.</p>
      </div>

      <RadioField
        control={control}
        name="personal.profileCreatedFor"
        label="This biodata is for"
        options={PROFILE_CREATED_FOR_OPTIONS}
      />
      <TextField control={control} name="personal.fullName" label="Full name" placeholder="e.g. Aditi Sharma" />
      <RadioField control={control} name="personal.gender" label="Gender" options={GENDER_OPTIONS} />

      <FormField
        control={control}
        name="personal.dateOfBirth"
        render={({ field }) => {
          const parsedDate = field.value ? parseISO(field.value) : undefined;
          const validDate = parsedDate && isValid(parsedDate) ? parsedDate : undefined;

          return (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button type="button" variant="outline" className="w-full justify-start font-normal">
                      <CalendarIcon className="mr-1" />
                      {validDate ? format(validDate, "PPP") : "Pick a date"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={validDate}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
              {(age !== null || zodiac) && (
                <p className="text-xs text-muted-foreground">
                  {[age !== null ? `${age} years old` : null, zodiac ? `Star sign: ${zodiac}` : null]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="personal.timeOfBirth" label="Time of birth (optional)" type="time" />
        <TextField
          control={control}
          name="personal.placeOfBirth"
          label="Place of birth (optional)"
          placeholder="City, State"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField control={control} name="personal.height" label="Height (optional)" placeholder="e.g. 5 ft 6 in" />
        <TextField control={control} name="personal.weight" label="Weight (optional)" placeholder="e.g. 60 kg" />
      </div>

      <RadioField
        control={control}
        name="personal.maritalStatus"
        label="Marital status"
        options={MARITAL_STATUS_OPTIONS}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="personal.motherTongue"
          label="Mother tongue (optional)"
          options={MOTHER_TONGUE_OPTIONS}
        />
        <SelectField control={control} name="personal.religion" label="Religion" options={RELIGION_OPTIONS} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <RadioField
          control={control}
          name="personal.complexion"
          label="Complexion (optional)"
          options={COMPLEXION_OPTIONS}
        />
        <RadioField
          control={control}
          name="personal.bodyType"
          label="Body type (optional)"
          options={BODY_TYPE_OPTIONS}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          control={control}
          name="personal.bloodGroup"
          label="Blood group (optional)"
          options={BLOOD_GROUP_OPTIONS}
        />
        <RadioField control={control} name="personal.diet" label="Diet (optional)" options={DIET_OPTIONS} />
      </div>

      <RadioField
        control={control}
        name="personal.disabilityStatus"
        label="Disability (optional)"
        options={DISABILITY_STATUS_OPTIONS}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <RadioField
          control={control}
          name="personal.smokingHabit"
          label="Smoking (optional)"
          options={HABIT_FREQUENCY_OPTIONS}
        />
        <RadioField
          control={control}
          name="personal.drinkingHabit"
          label="Drinking (optional)"
          options={HABIT_FREQUENCY_OPTIONS}
        />
      </div>

      <TextareaField
        control={control}
        name="personal.hobbies"
        label="Hobbies (optional)"
        placeholder="Reading, travelling, cooking…"
      />
      <TextareaField
        control={control}
        name="personal.aboutMe"
        label="About me (optional)"
        placeholder="A few lines about yourself…"
      />
    </div>
  );
}
