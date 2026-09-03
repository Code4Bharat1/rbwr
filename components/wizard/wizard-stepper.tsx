import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function WizardStepper({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((label, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "current" : "upcoming";
        const isLast = i === steps.length - 1;
        return (
          <li key={label} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  state === "done" && "border-royal bg-royal text-white",
                  state === "current" && "border-gold bg-gold text-navy-deep",
                  state === "upcoming" && "border-border bg-background text-muted-foreground"
                )}
              >
                {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-center text-[11px] font-medium sm:block",
                  state === "upcoming" ? "text-muted-foreground" : "text-navy"
                )}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <span className={cn("mx-2 h-0.5 flex-1", state === "done" ? "bg-royal" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
