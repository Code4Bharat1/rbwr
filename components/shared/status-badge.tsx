import { ApplicationStatus, APPLICATION_STATUS_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const palette: Record<ApplicationStatus, string> = {
  submitted: "bg-secondary text-secondary-foreground border-border",
  under_review: "bg-pending/10 text-pending border-pending/25",
  approved: "bg-royal/10 text-royal border-royal/25",
  guidelines_issued: "bg-royal/10 text-royal border-royal/25",
  scheduled: "bg-gold/15 text-gold-deep border-gold/30",
  attempt_live: "bg-live/10 text-live border-live/25 animate-pulse",
  evidence_submitted: "bg-gold/15 text-gold-deep border-gold/30",
  under_verification: "bg-pending/10 text-pending border-pending/25",
  verified: "bg-verified/10 text-verified border-verified/25",
  not_verified: "bg-live/10 text-live border-live/25",
  appeal: "bg-orange-warm/10 text-orange-warm border-orange-warm/25",
  withdrawn: "bg-secondary text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: ApplicationStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        palette[status],
        className
      )}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}
