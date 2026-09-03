import Link from "next/link";
import { CalendarClock, ClipboardCheck, Radio, ShieldCheck, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { AttemptCard } from "@/components/attempts/attempt-card";
import { attempts } from "@/lib/data/attempts";
import { adjudicationReports } from "@/lib/data/reports";
import { getAdjudicatorProfile } from "@/lib/data/adjudicators";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { getUser } from "@/lib/data/users";

export default function AdjudicatorOverviewPage() {
  const myAttempts = attempts.filter((a) => a.adjudicatorId === CURRENT_ADJUDICATOR_ID);
  const pendingReports = adjudicationReports.filter(
    (r) => r.adjudicatorId === CURRENT_ADJUDICATOR_ID && r.decision === "pending"
  );
  const upcoming = myAttempts.filter((a) => a.status === "scheduled" || a.status === "live");
  const profile = getAdjudicatorProfile(CURRENT_ADJUDICATOR_ID);
  const user = getUser(CURRENT_ADJUDICATOR_ID);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name.split(" ")[0]}`}
        description="Here's what's on your adjudication schedule."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={ClipboardCheck} label="Assigned Attempts" value={myAttempts.length} />
        <StatCard icon={CalendarClock} label="Upcoming Events" value={upcoming.length} />
        <StatCard icon={Radio} label="Pending Reports" value={pendingReports.length} />
        <StatCard icon={Star} label="Rating" value={profile?.rating.toFixed(1) ?? "—"} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-navy">Assigned Attempts</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {myAttempts.map((a) => (
              <AttemptCard key={a.id} attempt={a} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-royal">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="font-display text-base font-semibold">Certification Status</h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Level</p>
            <p className="text-lg font-semibold text-navy">{profile?.certificationLevel}</p>
            <p className="mt-3 text-sm text-muted-foreground">Completed Attempts</p>
            <p className="text-lg font-semibold text-navy">{profile?.completedAttempts}</p>
            <Link href="/adjudicator/certification" className="mt-4 inline-block text-sm text-royal hover:underline">
              View certification details →
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-base font-semibold text-navy">Performance</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Specialties</dt>
                <dd className="text-right font-medium">{profile?.specialties.join(", ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Languages</dt>
                <dd className="font-medium">{profile?.languages.join(", ")}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Availability</dt>
                <dd className="font-medium">{profile?.availability}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof ClipboardCheck; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-royal" />
      <p className="mt-3 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
