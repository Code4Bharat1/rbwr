import { BadgeCheck, Clock, History, XCircle } from "lucide-react";
import { RecordStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const config: Record<RecordStatus, { label: string; icon: typeof BadgeCheck; className: string }> = {
  current: { label: "Verified", icon: BadgeCheck, className: "bg-verified/10 text-verified border-verified/25" },
  pending: { label: "Pending Verification", icon: Clock, className: "bg-pending/10 text-pending border-pending/25" },
  broken: { label: "Broken", icon: XCircle, className: "bg-live/10 text-live border-live/25" },
  historical: { label: "Historical", icon: History, className: "bg-muted text-muted-foreground border-border" },
};

export function VerificationBadge({ status, className }: { status: RecordStatus; className?: string }) {
  const c = config[status];
  const Icon = c.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        c.className,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {c.label}
    </span>
  );
}
