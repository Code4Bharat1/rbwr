import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { getClub } from "@/lib/data/geo";
import { getUser, users } from "@/lib/data/users";
import { CURRENT_CLUB_ADMIN_ID } from "@/lib/demo-config";
import { applications } from "@/lib/data/applications";
import { getRecord } from "@/lib/data/records";

export default function ClubAttemptsPage() {
  const admin = getUser(CURRENT_CLUB_ADMIN_ID)!;
  const club = getClub(admin.clubId!)!;
  const memberIds = new Set(users.filter((u) => u.clubId === club.id).map((u) => u.id));
  const clubApplications = applications.filter((a) => memberIds.has(a.applicantUserId));

  return (
    <div>
      <PageHeader title="Attempts" description={`Every application and attempt submitted by ${club.name} members.`} />
      <div className="flex flex-col gap-3">
        {clubApplications.map((app) => {
          const record = app.recordId ? getRecord(app.recordId) : undefined;
          return (
            <Link
              key={app.id}
              href={`/applications/${app.id}`}
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
        {clubApplications.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No applications on file for this club yet.
          </p>
        )}
      </div>
    </div>
  );
}
