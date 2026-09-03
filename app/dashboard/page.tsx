"use client";

import Link from "next/link";
import { Award, CalendarClock, FileText, Trophy } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import {
  getApplicationsForUser,
  getAttemptsForApplicant,
  getCertificatesForUser,
  getRecordsForUser,
} from "@/lib/selectors";

export default function ParticipantOverviewPage() {
  const userId = useCurrentParticipantId();
  const user = getUser(userId)!;
  const applications = getApplicationsForUser(userId);
  const attempts = getAttemptsForApplicant(userId);
  const records = getRecordsForUser(userId);
  const certificates = getCertificatesForUser(userId);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="Here's a snapshot of your RBWR journey."
        action={
          <Link href={`/passport/${user.id}`} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm hover:border-royal/40">
            <UserAvatar initials={user.initials} color={user.avatarColor} size="sm" />
            View Passport
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={FileText} label="Applications" value={applications.length} />
        <Metric icon={CalendarClock} label="Attempts" value={attempts.length} />
        <Metric icon={Trophy} label="Records Held" value={records.length} />
        <Metric icon={Award} label="Certificates" value={certificates.length} />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Recent Applications</h2>
        <div className="mt-3 flex flex-col gap-2">
          {applications.map((a) => {
            const record = a.recordId ? getRecord(a.recordId) : undefined;
            return (
              <Link
                key={a.id}
                href={`/applications/${a.id}`}
                className="flex items-center justify-between rounded-xl border border-border p-3 hover:border-royal/40"
              >
                <span className="truncate text-sm font-medium">{record?.title ?? a.proposedTitle}</span>
                <StatusBadge status={a.status} />
              </Link>
            );
          })}
          {applications.length === 0 && <p className="text-sm text-muted-foreground">No applications yet.</p>}
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-royal" />
      <p className="mt-3 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
