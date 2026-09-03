import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { getClub, getDistrict, getCity } from "@/lib/data/geo";
import { clubs } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { CURRENT_DISTRICT_ADMIN_ID } from "@/lib/demo-config";
import { getRecordsForClub } from "@/lib/selectors";

export default function DistrictClubsPage() {
  const admin = getUser(CURRENT_DISTRICT_ADMIN_ID)!;
  const homeClub = getClub(admin.clubId!)!;
  const district = getDistrict(homeClub.districtId)!;
  const districtClubs = clubs.filter((c) => c.districtId === district.id);

  return (
    <div>
      <PageHeader title="Clubs" description={`Every chartered club within District ${district.number}.`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {districtClubs.map((c) => {
          const city = getCity(c.cityId);
          const records = getRecordsForClub(c.id);
          return (
            <Link key={c.id} href="/club" className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
              <p className="font-display text-base font-semibold text-navy">{c.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{city?.name} · Founded {c.foundedYear}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span><span className="font-semibold text-navy">{c.memberCount}</span> members</span>
                <span><span className="font-semibold text-navy">{records.length}</span> records</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
