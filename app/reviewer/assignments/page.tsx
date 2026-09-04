import Link from "next/link";
import { ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { getAttempt } from "@/lib/data/attempts";
import { getCity, getCountry } from "@/lib/data/geo";
import { getAssignmentQueue, isAdjudicatorConflicted } from "@/lib/selectors";
import { formatDateShort } from "@/lib/format";

export default function AdjudicatorAssignmentQueuePage() {
  const queue = getAssignmentQueue();

  return (
    <div>
      <PageHeader
        title="Adjudicator Assignment"
        description="Every scheduled or in-progress attempt, and who's running it. Open one to change the adjudicator."
      />
      <div className="flex flex-col gap-3">
        {queue.map((app) => {
          const attempt = getAttempt(app.attemptId!)!;
          const record = app.recordId ? getRecord(app.recordId) : undefined;
          const adjudicator = getUser(attempt.adjudicatorId);
          const city = getCity(attempt.cityId);
          const country = getCountry(attempt.countryId);
          const conflicted = isAdjudicatorConflicted(attempt.adjudicatorId, app, record);

          return (
            <Link
              key={app.id}
              href={`/reviewer/assignments/${app.id}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-royal/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold text-navy">
                  {record?.title ?? app.proposedTitle}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {attempt.venue}, {city?.name}, {country?.name} · {formatDateShort(attempt.date)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {adjudicator && (
                  <div className="flex items-center gap-2">
                    <UserAvatar initials={adjudicator.initials} color={adjudicator.avatarColor} size="sm" />
                    <div className="text-sm">
                      <p className="font-medium leading-tight">{adjudicator.name}</p>
                      <p
                        className={
                          conflicted
                            ? "flex items-center gap-1 text-xs font-medium text-live"
                            : "flex items-center gap-1 text-xs text-verified"
                        }
                      >
                        {conflicted ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                        {conflicted ? "Conflict" : "Clear"}
                      </p>
                    </div>
                  </div>
                )}
                <StatusBadge status={app.status} />
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
        {queue.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No attempts currently need adjudicator assignment.
          </p>
        )}
      </div>
    </div>
  );
}
