import { Progress } from "@/components/ui/progress";
import type { StepConfig } from "@/lib/biodata/steps";

interface BuilderProgressProps {
  steps: StepConfig[];
  currentStepIndex: number;
}

export function BuilderProgress({ steps, currentStepIndex }: BuilderProgressProps) {
  const value = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <Progress value={value} className="h-1.5" />
      <p aria-live="polite" className="mt-3 text-xs font-medium text-muted-foreground">
        Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].title}
      </p>
    </div>
  );
}
