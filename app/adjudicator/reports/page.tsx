import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { adjudicationReports } from "@/lib/data/reports";
import { attempts } from "@/lib/data/attempts";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { getAttemptTitle } from "@/lib/selectors";
import { cn } from "@/lib/utils";

export default function AdjudicatorReportsPage() {
  const myReports = adjudicationReports.filter((r) => r.adjudicatorId === CURRENT_ADJUDICATOR_ID);

  return (
    <div>
      <PageHeader title="Reports" description="Adjudication reports you've filed or have pending." />
      <div className="flex flex-col gap-4">
        {myReports.map((r) => {
          const attempt = attempts.find((a) => a.id === r.attemptId)!;
          return (
            <Link
              key={r.id}
              href={`/adjudicator/attempts/${attempt.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-royal/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-navy">{getAttemptTitle(attempt)}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.notes}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize",
                  r.decision === "recommend-verify" && "bg-verified/10 text-verified",
                  r.decision === "recommend-reject" && "bg-live/10 text-live",
                  r.decision === "pending" && "bg-pending/10 text-pending"
                )}
              >
                {r.decision.replace("-", " ")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
