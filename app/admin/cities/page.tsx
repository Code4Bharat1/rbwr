import { PageHeader } from "@/components/shared/page-header";
import { cities, getCountry, getDistrict } from "@/lib/data/geo";
import { records } from "@/lib/data/records";

export default function AdminCitiesPage() {
  return (
    <div>
      <PageHeader title="Cities" description={`${cities.length} cities tracked on the platform.`} />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Records</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cities.map((c) => {
              const country = getCountry(c.countryId);
              const district = c.districtId ? getDistrict(c.districtId) : undefined;
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{country?.flag} {country?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{district ? `District ${district.number}` : "—"}</td>
                  <td className="px-4 py-3">{records.filter((r) => r.cityId === c.id).length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
