"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";

import { getAge, getDayOfWeek, getZodiacSign } from "@/lib/biodata/derive";
import {
  ANNUAL_INCOME_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  BODY_TYPE_OPTIONS,
  COMPLEXION_OPTIONS,
  COUNTRY_OPTIONS,
  DIET_OPTIONS,
  DISABILITY_STATUS_OPTIONS,
  EMPLOYED_IN_OPTIONS,
  FAMILY_STATUS_OPTIONS,
  FAMILY_TYPE_OPTIONS,
  FAMILY_VALUES_OPTIONS,
  GENDER_OPTIONS,
  HABIT_FREQUENCY_OPTIONS,
  HIGHEST_QUALIFICATION_OPTIONS,
  INDIAN_STATE_OPTIONS,
  MANGLIK_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  MOTHER_TONGUE_OPTIONS,
  NAKSHATRA_OPTIONS,
  PROFILE_CREATED_FOR_OPTIONS,
  RASHI_OPTIONS,
  RELIGION_OPTIONS,
  optionLabel,
} from "@/lib/biodata/options";
import type { BiodataFormValues } from "@/lib/biodata/schema";
import { SYMBOL_GLYPHS } from "@/components/biodata-builder/symbol-glyphs";
import { PreviewFieldRow } from "@/components/biodata-builder/preview-field-row";
import { TemplateFrame } from "@/components/biodata-builder/template-frame";
import { WatermarkOverlay } from "@/components/biodata-builder/watermark-overlay";

interface PreviewSectionProps {
  title: string;
  children: React.ReactNode;
}

function PreviewSection({ title, children }: PreviewSectionProps) {
  return (
    <div className="mt-5 border-t border-primary/10 pt-4 first:mt-0 first:border-t-0 first:pt-0">
      <h4 className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-accent-foreground uppercase">
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );
}

interface BiodataPreviewProps {
  hasPaid: boolean;
}

// The live document mock-up — reads the shared react-hook-form instance via
// context so it stays in sync with every step without any prop drilling.
// Forwards its ref to the actual snapshotted node (see `pdf-export.ts`), so
// what gets exported is always exactly what's on screen, watermark included.
export const BiodataPreview = React.forwardRef<HTMLDivElement, BiodataPreviewProps>(
  function BiodataPreview({ hasPaid }, ref) {
    const { watch } = useFormContext<BiodataFormValues>();
    const values = watch();
    const { symbol, template, personal, religious, family, educationCareer, contact } = values;

    // These are cheap pure lookups (a fixed date-range table), so they're
    // computed directly on every render rather than memoized — memoizing
    // them here would depend on `personal.dateOfBirth` narrower than the
    // `personal` object React Compiler can verify from `watch()`'s output.
    const age = getAge(personal.dateOfBirth);
    const zodiac = getZodiacSign(personal.dateOfBirth);
    const dayBorn = getDayOfWeek(personal.dateOfBirth);

    const SymbolGlyph = SYMBOL_GLYPHS[symbol.symbolId];
    const showSymbol = symbol.symbolId !== "none";

    const factsLine = [
      // `age !== null`, not a truthy check — a truthy check would silently
      // drop the age for a biodata created within someone's first year.
      age !== null ? `${age} yrs` : null,
      zodiac,
      personal.gender ? optionLabel(GENDER_OPTIONS, personal.gender) : null,
    ]
      .filter(Boolean)
      .join(" · ");

    const phoneDisplay = contact.phoneNumber
      ? `${contact.phoneCountryCode} ${contact.phoneNumber}`
      : "";

    return (
      <TemplateFrame ref={ref} templateId={template.templateId} className="w-full">
        {!hasPaid && <WatermarkOverlay />}

        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 space-y-2">
            {showSymbol && (
              <div
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-accent/60 text-primary"
              >
                <SymbolGlyph className="size-5" />
              </div>
            )}
            {personal.fullName ? (
              <h3 className="font-heading truncate text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                {personal.fullName}
              </h3>
            ) : (
              <div className="h-7 w-44 rounded-md bg-primary/12 sm:w-56" />
            )}
            {factsLine && <p className="text-xs text-muted-foreground">{factsLine}</p>}
            {dayBorn && (
              <p className="text-[11px] text-muted-foreground">Born on a {dayBorn}</p>
            )}
          </div>
          <div
            aria-hidden="true"
            className="size-14 shrink-0 rounded-full border border-dashed border-primary/20 bg-accent/45 sm:size-16"
          />
        </div>

        <PreviewSection title="Personal">
          <PreviewFieldRow
            label="Created for"
            value={optionLabel(PROFILE_CREATED_FOR_OPTIONS, personal.profileCreatedFor)}
          />
          <PreviewFieldRow
            label="Marital status"
            value={optionLabel(MARITAL_STATUS_OPTIONS, personal.maritalStatus)}
          />
          <PreviewFieldRow label="Date of birth" value={personal.dateOfBirth} />
          <PreviewFieldRow label="Time of birth" value={personal.timeOfBirth} />
          <PreviewFieldRow label="Place of birth" value={personal.placeOfBirth} />
          <PreviewFieldRow label="Height" value={personal.height} />
          <PreviewFieldRow label="Weight" value={personal.weight} />
          <PreviewFieldRow
            label="Mother tongue"
            value={optionLabel(MOTHER_TONGUE_OPTIONS, personal.motherTongue)}
          />
          <PreviewFieldRow
            label="Complexion"
            value={optionLabel(COMPLEXION_OPTIONS, personal.complexion)}
          />
          <PreviewFieldRow label="Body type" value={optionLabel(BODY_TYPE_OPTIONS, personal.bodyType)} />
          <PreviewFieldRow
            label="Blood group"
            value={optionLabel(BLOOD_GROUP_OPTIONS, personal.bloodGroup)}
          />
          <PreviewFieldRow label="Diet" value={optionLabel(DIET_OPTIONS, personal.diet)} />
          <PreviewFieldRow
            label="Disability"
            value={optionLabel(DISABILITY_STATUS_OPTIONS, personal.disabilityStatus)}
          />
          <PreviewFieldRow
            label="Smoking"
            value={optionLabel(HABIT_FREQUENCY_OPTIONS, personal.smokingHabit)}
          />
          <PreviewFieldRow
            label="Drinking"
            value={optionLabel(HABIT_FREQUENCY_OPTIONS, personal.drinkingHabit)}
          />
          <PreviewFieldRow label="Hobbies" value={personal.hobbies} />
          <PreviewFieldRow label="About" value={personal.aboutMe} />
        </PreviewSection>

        <PreviewSection title="Religious & astrological">
          <PreviewFieldRow label="Religion" value={optionLabel(RELIGION_OPTIONS, personal.religion)} />
          <PreviewFieldRow label="Caste" value={religious.caste} />
          <PreviewFieldRow label="Sub-caste" value={religious.subCaste} />
          <PreviewFieldRow label="Gotra" value={religious.gotra} />
          <PreviewFieldRow label="Rashi" value={optionLabel(RASHI_OPTIONS, religious.rashi)} />
          <PreviewFieldRow
            label="Nakshatra"
            value={optionLabel(NAKSHATRA_OPTIONS, religious.nakshatra)}
          />
          <PreviewFieldRow label="Manglik" value={optionLabel(MANGLIK_OPTIONS, religious.manglik)} />
        </PreviewSection>

        <PreviewSection title="Family">
          <PreviewFieldRow
            label="Family type"
            value={optionLabel(FAMILY_TYPE_OPTIONS, family.familyType)}
          />
          <PreviewFieldRow
            label="Family status"
            value={optionLabel(FAMILY_STATUS_OPTIONS, family.familyStatus)}
          />
          <PreviewFieldRow
            label="Family values"
            value={optionLabel(FAMILY_VALUES_OPTIONS, family.familyValues)}
          />
          <PreviewFieldRow label="Father" value={family.fatherName} />
          <PreviewFieldRow label="Father's occupation" value={family.fatherOccupation} />
          <PreviewFieldRow label="Mother" value={family.motherName} />
          <PreviewFieldRow label="Mother's occupation" value={family.motherOccupation} />
          <PreviewFieldRow label="Siblings" value={family.siblingsCount} />
          <PreviewFieldRow label="Siblings married" value={family.siblingsMarriedCount} />
          <PreviewFieldRow label="Native place" value={family.nativePlace} />
          <PreviewFieldRow label="About family" value={family.familyDescription} />
        </PreviewSection>

        <PreviewSection title="Education & career">
          <PreviewFieldRow
            label="Qualification"
            value={optionLabel(HIGHEST_QUALIFICATION_OPTIONS, educationCareer.highestQualification)}
          />
          <PreviewFieldRow label="Field of study" value={educationCareer.fieldOfStudy} />
          <PreviewFieldRow label="College" value={educationCareer.college} />
          <PreviewFieldRow
            label="Employed in"
            value={optionLabel(EMPLOYED_IN_OPTIONS, educationCareer.employedIn)}
          />
          <PreviewFieldRow label="Occupation" value={educationCareer.occupation} />
          <PreviewFieldRow label="Company" value={educationCareer.companyName} />
          <PreviewFieldRow
            label="Annual income"
            value={optionLabel(ANNUAL_INCOME_OPTIONS, educationCareer.annualIncome)}
          />
          <PreviewFieldRow label="Work location" value={educationCareer.workLocation} />
        </PreviewSection>

        <PreviewSection title="Contact">
          <PreviewFieldRow label="City" value={contact.city} />
          <PreviewFieldRow label="State" value={optionLabel(INDIAN_STATE_OPTIONS, contact.state)} />
          <PreviewFieldRow label="Country" value={optionLabel(COUNTRY_OPTIONS, contact.country)} />
          <PreviewFieldRow label="Address" value={contact.address} />
          <PreviewFieldRow label="Phone" value={phoneDisplay} />
          <PreviewFieldRow
            label="WhatsApp"
            value={
              contact.whatsappSameAsPhone
                ? phoneDisplay
                : contact.whatsappNumber
            }
          />
          <PreviewFieldRow label="Email" value={contact.email} />
          <PreviewFieldRow label="Contact person" value={contact.contactPersonName} />
          <PreviewFieldRow label="Relation" value={contact.contactPersonRelation} />
        </PreviewSection>
      </TemplateFrame>
    );
  }
);
