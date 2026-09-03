"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getApplicationsForUser } from "@/lib/selectors";
import { getRecord } from "@/lib/data/records";
import { formatDateShort } from "@/lib/format";

export default function MyApplicationsPage() {
  const userId = useCurrentParticipantId();
  const applications = getApplicationsForUser(userId);

  return (
    <div>
      <PageHeader title="My Applications" description="Every record application you've submitted." />
      <div className="flex flex-col gap-3">
        {applications.map((a) => {
          const record = a.recordId ? getRecord(a.recordId) : undefined;
          return (
            <Link
              key={a.id}
              href={`/applications/${a.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-royal/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-navy">{record?.title ?? a.proposedTitle}</p>
                <p className="text-sm text-muted-foreground">{a.id} · Submitted {formatDateShort(a.createdDate)}</p>
              </div>
              <StatusBadge status={a.status} />
            </Link>
          );
        })}
        {applications.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            You haven&apos;t submitted any applications yet.
          </p>
        )}
      </div>
    </div>
  );
}
