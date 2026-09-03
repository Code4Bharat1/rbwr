import { CalendarClock, Trophy, Users, Wallet } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { RecordCard } from "@/components/records/record-card";
import { getClub, getDistrict, getCity } from "@/lib/data/geo";
import { CURRENT_CLUB_ADMIN_ID } from "@/lib/demo-config";
import { getUser, users } from "@/lib/data/users";
import { getRecordsForClub, getClubLeaderboard } from "@/lib/selectors";
import { applications } from "@/lib/data/applications";
import { attempts } from "@/lib/data/attempts";

export default function ClubOverviewPage() {
  const admin = getUser(CURRENT_CLUB_ADMIN_ID)!;
  const club = getClub(admin.clubId!)!;
  const district = getDistrict(club.districtId);
  const city = getCity(club.cityId);
  const records = getRecordsForClub(club.id);
  const members = users.filter((u) => u.clubId === club.id);
  const memberIds = new Set(members.map((m) => m.id));
  const clubApplications = applications.filter((a) => memberIds.has(a.applicantUserId));
  const clubAttempts = attempts.filter((a) => clubApplications.some((app) => app.attemptId === a.id));
  const upcoming = clubAttempts.filter((a) => a.status === "scheduled" || a.status === "live");
  const leaderboardPosition = getClubLeaderboard().findIndex((e) => e.id === club.id) + 1;

  return (
    <div>
      <PageHeader title={club.name} description={`District ${district?.number} · ${city?.name} · Founded ${club.foundedYear}`} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={Trophy} label="Club Records" value={records.length} />
        <Metric icon={Users} label="Active Participants" value={club.memberCount} />
        <Metric icon={CalendarClock} label="Upcoming Attempts" value={upcoming.length} />
        <Metric icon={Wallet} label="Leaderboard Position" value={leaderboardPosition > 0 ? `#${leaderboardPosition}` : "—"} />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-navy">Club Records</h2>
        {records.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((r) => <RecordCard key={r.id} record={r} />)}
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
            No records currently held by this club.
          </p>
        )}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Trophy; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-royal" />
      <p className="mt-3 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
