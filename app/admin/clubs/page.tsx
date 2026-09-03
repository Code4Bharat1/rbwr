import { PageHeader } from "@/components/shared/page-header";
import { clubs, getCity, getDistrict } from "@/lib/data/geo";
import { getRecordsForClub } from "@/lib/selectors";

export default function AdminClubsPage() {
  return (
    <div>
      <PageHeader title="Clubs" description={`${clubs.length} chartered Rotary clubs on the platform.`} />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Members</th>
              <th className="px-4 py-3">Records</th>
              <th className="px-4 py-3">Founded</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {clubs.map((c) => {
              const city = getCity(c.cityId);
              const district = getDistrict(c.districtId);
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{city?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{district?.number}</td>
                  <td className="px-4 py-3">{c.memberCount.toLocaleString()}</td>
                  <td className="px-4 py-3">{getRecordsForClub(c.id).length}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.foundedYear}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
