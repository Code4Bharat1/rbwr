import { Check, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineStepState = "done" | "current" | "upcoming" | "rejected";

export type TimelineStep = {
  label: string;
  date?: string;
  actor?: string;
  notes?: string;
  documents?: string[];
  state: TimelineStepState;
};

export function Timeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  return (
    <ol className={cn("relative", className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px",
                  step.state === "done" ? "bg-royal/40" : "bg-border"
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                step.state === "done" && "border-royal bg-royal text-white",
                step.state === "current" && "border-gold bg-gold text-navy-deep",
                step.state === "upcoming" && "border-border bg-background text-muted-foreground",
                step.state === "rejected" && "border-live bg-live text-white"
              )}
            >
              {step.state === "done" && <Check className="h-4 w-4" />}
              {step.state === "rejected" && <X className="h-4 w-4" />}
              {(step.state === "current" || step.state === "upcoming") && (
                <span className="h-2 w-2 rounded-full bg-current" />
              )}
            </span>
            <div className="flex-1 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p
                  className={cn(
                    "font-medium",
                    step.state === "upcoming" ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.date && <p className="text-xs text-muted-foreground">{step.date}</p>}
              </div>
              {step.actor && <p className="mt-0.5 text-xs text-muted-foreground">{step.actor}</p>}
              {step.notes && <p className="mt-1.5 text-sm text-muted-foreground">{step.notes}</p>}
              {step.documents && step.documents.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {step.documents.map((doc) => (
                    <span
                      key={doc}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                    >
                      <FileText className="h-3 w-3" />
                      {doc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
