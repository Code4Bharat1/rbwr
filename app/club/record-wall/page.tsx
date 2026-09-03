import { PageHeader } from "@/components/shared/page-header";
import { RecordWallGrid } from "@/components/records/record-wall-grid";
import { getClub } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { CURRENT_CLUB_ADMIN_ID } from "@/lib/demo-config";
import { getRecordsForClub } from "@/lib/selectors";

export default function ClubRecordWallPage() {
  const admin = getUser(CURRENT_CLUB_ADMIN_ID)!;
  const club = getClub(admin.clubId!)!;
  const records = getRecordsForClub(club.id);

  return (
    <div>
      <PageHeader title="Record Wall" description={`${club.name}'s digital Hall of Fame.`} />
      <RecordWallGrid records={records} />
    </div>
  );
}
