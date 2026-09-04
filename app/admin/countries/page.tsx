import { PageHeader } from "@/components/shared/page-header";
import { countries } from "@/lib/data/geo";
import { records } from "@/lib/data/records";

export default function AdminCountriesPage() {
  return (
    <div>
      <PageHeader title="Countries" description={`${countries.length} countries represented on the platform.`} />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Records (sample)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {countries.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.code}</td>
                <td className="px-4 py-3">{records.filter((r) => r.countryId === c.id).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
