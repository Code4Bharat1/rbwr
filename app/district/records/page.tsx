import { PageHeader } from "@/components/shared/page-header";
import { RecordCard } from "@/components/records/record-card";
import { getClub, getDistrict } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { CURRENT_DISTRICT_ADMIN_ID } from "@/lib/demo-config";
import { getRecordsForDistrict } from "@/lib/selectors";

export default function DistrictRecordsPage() {
  const admin = getUser(CURRENT_DISTRICT_ADMIN_ID)!;
  const homeClub = getClub(admin.clubId!)!;
  const district = getDistrict(homeClub.districtId)!;
  const records = getRecordsForDistrict(district.id);

  return (
    <div>
      <PageHeader title="Records" description={`Every record tracked at the District ${district.number} level.`} />
      {records.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((r) => <RecordCard key={r.id} record={r} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No records on file.</p>
      )}
    </div>
  );
}
