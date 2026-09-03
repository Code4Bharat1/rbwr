import { PageHeader } from "@/components/shared/page-header";
import { RecordCard } from "@/components/records/record-card";
import { getClub } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { CURRENT_CLUB_ADMIN_ID } from "@/lib/demo-config";
import { getRecordsForClub } from "@/lib/selectors";

export default function ClubRecordsPage() {
  const admin = getUser(CURRENT_CLUB_ADMIN_ID)!;
  const club = getClub(admin.clubId!)!;
  const records = getRecordsForClub(club.id);

  return (
    <div>
      <PageHeader title="Records" description={`Every record currently or historically held by ${club.name}.`} />
      {records.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((r) => <RecordCard key={r.id} record={r} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No records on file for this club yet.
        </p>
      )}
    </div>
  );
}
