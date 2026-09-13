"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { biodataSchema, type BiodataFormValues } from "@/lib/biodata/schema";
import { DEFAULT_VALUES } from "@/lib/biodata/defaults";
import { STEPS } from "@/lib/biodata/steps";
import { loadDraft, mergeDraftWithDefaults, saveDraft } from "@/lib/biodata/storage";
import { loadPurchase, savePurchase } from "@/lib/biodata/purchase-storage";
import { mockPaymentProvider, PLACEHOLDER_PRICE_INR } from "@/lib/biodata/payment";
import { BiodataPreview } from "@/components/biodata-builder/biodata-preview";
import { BuilderProgress } from "@/components/biodata-builder/builder-progress";
import { StepContact } from "@/components/biodata-builder/steps/step-contact";
import { StepEducationCareer } from "@/components/biodata-builder/steps/step-education-career";
import { StepFamily } from "@/components/biodata-builder/steps/step-family";
import { StepPersonal } from "@/components/biodata-builder/steps/step-personal";
import { StepReligious } from "@/components/biodata-builder/steps/step-religious";
import { StepReviewDownload } from "@/components/biodata-builder/steps/step-review-download";
import { StepSymbol } from "@/components/biodata-builder/steps/step-symbol";
import { StepTemplate } from "@/components/biodata-builder/steps/step-template";

// One component per data-entry step, in the same order as `STEPS` (minus the
// final "review" entry, which always renders `StepReviewDownload` instead).
const STEP_COMPONENTS = [
  StepSymbol,
  StepTemplate,
  StepPersonal,
  StepReligious,
  StepFamily,
  StepEducationCareer,
  StepContact,
] as const;

const AUTOSAVE_DEBOUNCE_MS = 500;

export function BiodataBuilder() {
  const isMobile = useIsMobile();
  const form = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const [stepIndex, setStepIndex] = React.useState(0);
  const [hasPaid, setHasPaid] = React.useState(false);
  const [isPaying, setIsPaying] = React.useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const previewRef = React.useRef<HTMLDivElement>(null);
  const stepHeadingRef = React.useRef<HTMLDivElement>(null);
  const saveTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore a saved draft/purchase once, after first paint — `useForm` is
  // initialized from static defaults only, so this never causes an
  // SSR/hydration mismatch.
  React.useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      form.reset(mergeDraftWithDefaults(DEFAULT_VALUES, draft));
    }
    setHasPaid(loadPurchase().hasPaid);
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced draft autosave on every change.
  React.useEffect(() => {
    const subscription = form.watch((values) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveDraft(values as BiodataFormValues);
      }, AUTOSAVE_DEBOUNCE_MS);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [form]);

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === STEPS.length - 1;
  const CurrentStepComponent = STEP_COMPONENTS[stepIndex];

  const goToStep = (nextIndex: number) => {
    setStepIndex(nextIndex);
    stepHeadingRef.current?.focus();
  };

  const handleNext = async () => {
    const fieldsToValidate = STEPS[stepIndex].fields;
    const valid =
      fieldsToValidate.length === 0 || (await form.trigger(fieldsToValidate, { shouldFocus: true }));
    if (valid && !isLastStep) goToStep(stepIndex + 1);
  };

  const handleBack = () => {
    if (!isFirstStep) goToStep(stepIndex - 1);
  };

  const handlePurchase = async () => {
    setIsPaying(true);
    try {
      const result = await mockPaymentProvider.startCheckout({
        amountInPaise: PLACEHOLDER_PRICE_INR * 100,
        description: "Rishta Biodata — full download",
      });
      if (result.success) {
        setHasPaid(true);
        savePurchase({ hasPaid: true, token: result.token ?? null, paidAt: new Date().toISOString() });
      }
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <FormProvider {...form}>
      <BuilderProgress steps={STEPS} currentStepIndex={stepIndex} />

      {isMobile && (
        <Collapsible open={isPreviewOpen} onOpenChange={setIsPreviewOpen} className="mb-6">
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full justify-center gap-2">
              <Eye className="size-4" />
              {isPreviewOpen ? "Hide preview" : "Preview your biodata"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="mx-auto max-w-[360px]">
              <BiodataPreview ref={previewRef} hasPaid={hasPaid} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.85fr)] lg:items-start lg:gap-12">
        <div>
          <div ref={stepHeadingRef} tabIndex={-1} className="outline-none">
            {isLastStep ? (
              <StepReviewDownload
                previewRef={previewRef}
                hasPaid={hasPaid}
                isPaying={isPaying}
                onPurchase={handlePurchase}
              />
            ) : (
              <CurrentStepComponent />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button type="button" variant="outline" onClick={handleBack} disabled={isFirstStep}>
              <ChevronLeft className="size-4" />
              Back
            </Button>
            {!isLastStep && (
              <Button type="button" onClick={handleNext}>
                Next
                <ChevronRight className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className="mx-auto w-full max-w-[420px] lg:sticky lg:top-24 lg:self-start">
            <BiodataPreview ref={previewRef} hasPaid={hasPaid} />
          </div>
        )}
      </div>
    </FormProvider>
  );
}
