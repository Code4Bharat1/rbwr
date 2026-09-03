"use client";

import { toast } from "sonner";
import { AlertTriangle, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { Application, ApplicationStatus } from "@/lib/types";

const TERMINAL: ApplicationStatus[] = ["verified", "not_verified", "appeal", "withdrawn"];

export function ApplicantActions({
  application,
  effectiveStatus,
}: {
  application: Application;
  effectiveStatus: ApplicationStatus;
}) {
  const setApplicationStatus = useDemoStore((s) => s.setApplicationStatus);

  const canWithdraw = !TERMINAL.includes(effectiveStatus);
  const canAppeal = effectiveStatus === "not_verified";

  if (!canWithdraw && !canAppeal) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {canAppeal && (
        <Button
          variant="outline"
          className="gap-1.5 border-orange-warm/40 text-orange-warm hover:bg-orange-warm/10"
          onClick={() => {
            setApplicationStatus(application.id, "appeal");
            toast.success("Appeal submitted — an independent reviewer will re-examine this decision.");
          }}
        >
          <AlertTriangle className="h-4 w-4" /> Appeal This Decision
        </Button>
      )}
      {canWithdraw && (
        <Button
          variant="ghost"
          className="gap-1.5 text-muted-foreground hover:text-live"
          onClick={() => {
            setApplicationStatus(application.id, "withdrawn");
            toast("Application withdrawn");
          }}
        >
          <XOctagon className="h-4 w-4" /> Withdraw Application
        </Button>
      )}
    </div>
  );
}
