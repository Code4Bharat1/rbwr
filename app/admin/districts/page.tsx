import { PageHeader } from "@/components/shared/page-header";
import { districts, clubs } from "@/lib/data/geo";
import { getRecordsForDistrict } from "@/lib/selectors";

export default function AdminDistrictsPage() {
  return (
    <div>
      <PageHeader title="Districts" description={`${districts.length} Rotary districts on the platform.`} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {districts.map((d) => (
          <div key={d.id} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-display text-base font-semibold text-navy">District {d.number}</p>
            <p className="text-sm text-muted-foreground">{d.name}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <span><span className="font-semibold text-navy">{clubs.filter((c) => c.districtId === d.id).length}</span> clubs</span>
              <span><span className="font-semibold text-navy">{d.memberCount.toLocaleString()}</span> members</span>
              <span><span className="font-semibold text-navy">{getRecordsForDistrict(d.id).length}</span> records</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
