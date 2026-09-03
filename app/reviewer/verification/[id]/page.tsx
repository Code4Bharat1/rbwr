"use client";

import { use, useState } from "react";
import { toast } from "sonner";
import { Check, FileWarning, ShieldCheck, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useApplicationById } from "@/hooks/use-application";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { getRecord } from "@/lib/data/records";
import { getAttempt } from "@/lib/data/attempts";
import { getReportForAttempt } from "@/lib/data/reports";
import { cn } from "@/lib/utils";

const pipeline = ["Application", "Attempt", "Evidence", "Adjudicator Report", "Review", "Decision"];

const checklistDefaults = {
  guidelinesFollowed: true,
  evidenceComplete: true,
  measurementVerified: true,
  witnessesVerified: true,
  reportApproved: true,
};

export default function VerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = useApplicationById(id);
  const effectiveStatus = useApplicationStatus(application) ?? "submitted";
  const setApplicationStatus = useDemoStore((s) => s.setApplicationStatus);

  const record = application?.recordId ? getRecord(application.recordId) : undefined;
  const attempt = application?.attemptId ? getAttempt(application.attemptId) : undefined;
  const report = attempt ? getReportForAttempt(attempt.id) : undefined;

  const [checklist, setChecklist] = useState({
    ...checklistDefaults,
    reportApproved: report?.decision === "recommend-verify",
  });

  if (!application) {
    return <div className="py-20 text-center text-muted-foreground">Application not found.</div>;
  }

  const currentStageIndex = effectiveStatus === "verified" ? 5 : 4;
  const allChecked = Object.values(checklist).every(Boolean);

  function decide(status: "verified" | "evidence_submitted" | "rejected", message: string) {
    setApplicationStatus(application!.id, status);
    toast.success(message);
  }

  return (
    <div>
      <PageHeader
        title={record?.title ?? application.proposedTitle ?? "Verification"}
        description={application.id}
      />

      <div className="rounded-2xl border border-border bg-card p-6">
        <ol className="flex flex-wrap items-center gap-y-4">
          {pipeline.map((stage, i) => (
            <li key={stage} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 px-3">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold",
                    i <= currentStageIndex ? "border-royal bg-royal text-white" : "border-border text-muted-foreground"
                  )}
                >
                  {i < currentStageIndex ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className="text-center text-xs font-medium text-navy">{stage}</span>
              </div>
              {i < pipeline.length - 1 && (
                <span className={cn("mx-1 h-0.5 w-8 sm:w-14", i < currentStageIndex ? "bg-royal" : "bg-border")} />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-royal">
            <ShieldCheck className="h-4 w-4" />
            <h2 className="font-display text-base font-semibold">Verification Checklist</h2>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {Object.entries(checklist).map(([key, value]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <Checkbox checked={value} onCheckedChange={(v) => setChecklist((c) => ({ ...c, [key]: Boolean(v) }))} />
                {key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
              </label>
            ))}
          </div>
          {report && (
            <p className="mt-4 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
              Adjudicator recommendation: <span className="font-medium capitalize">{report.decision.replace("-", " ")}</span>
              {" — "}{report.notes}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-display text-base font-semibold text-navy">Decision</h2>
          <Button
            className="gap-1.5 bg-verified text-white hover:bg-verified/90"
            disabled={!allChecked || effectiveStatus === "verified"}
            onClick={() => decide("verified", "Record verified — certificate generated")}
          >
            <Check className="h-4 w-4" /> Verify Record
          </Button>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => decide("evidence_submitted", "More evidence requested from adjudicator")}
          >
            <FileWarning className="h-4 w-4" /> Request More Evidence
          </Button>
          <Button
            variant="destructive"
            className="gap-1.5"
            onClick={() => decide("rejected", "Record application rejected")}
          >
            <XCircle className="h-4 w-4" /> Reject Record
          </Button>
          {effectiveStatus === "verified" && record && (
            <p className="mt-2 text-sm text-verified">
              Verified! View the{" "}
              <a href={`/records/${record.id}`} className="underline">
                public record page
              </a>{" "}
              or the certificate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
