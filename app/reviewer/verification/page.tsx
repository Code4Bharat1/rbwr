import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { applications } from "@/lib/data/applications";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";

export default function VerificationListPage() {
  const items = applications.filter(
    (a) => a.status === "under_verification" || a.status === "verified" || a.status === "appeal"
  );

  return (
    <div>
      <PageHeader title="Verification" description="Applications moving through the final RBWR verification pipeline." />
      <div className="flex flex-col gap-3">
        {items.map((app) => {
          const record = app.recordId ? getRecord(app.recordId) : undefined;
          return (
            <Link
              key={app.id}
              href={`/reviewer/verification/${app.id}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-royal/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-navy">{record?.title ?? app.proposedTitle}</p>
                <p className="text-sm text-muted-foreground">{app.id} · {getUser(app.applicantUserId)?.name}</p>
              </div>
              <StatusBadge status={app.status} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
