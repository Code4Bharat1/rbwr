import { Building2, TrendingUp, Trophy, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { getClub, getDistrict } from "@/lib/data/geo";
import { clubs } from "@/lib/data/geo";
import { getCategory } from "@/lib/data/categories";
import { getUser } from "@/lib/data/users";
import { CURRENT_DISTRICT_ADMIN_ID } from "@/lib/demo-config";
import { getRecordsForClub, getRecordsForDistrict } from "@/lib/selectors";

export default function DistrictOverviewPage() {
  const admin = getUser(CURRENT_DISTRICT_ADMIN_ID)!;
  const homeClub = getClub(admin.clubId!)!;
  const district = getDistrict(homeClub.districtId)!;
  const districtClubs = clubs.filter((c) => c.districtId === district.id);
  const records = getRecordsForDistrict(district.id);

  const recordsByClub = districtClubs.map((c) => ({ name: c.name.replace("Rotary Club of ", ""), value: getRecordsForClub(c.id).length }));
  const categoryTotals = new Map<string, number>();
  for (const r of records) {
    const group = getCategory(r.categoryId)?.group ?? "Other";
    categoryTotals.set(group, (categoryTotals.get(group) ?? 0) + 1);
  }
  const recordsByCategory = [...categoryTotals.entries()].map(([name, value]) => ({ name, value }));
  const totalMembers = districtClubs.reduce((s, c) => s + c.memberCount, 0);

  return (
    <div>
      <PageHeader title={`District ${district.number} — ${district.name}`} description={`${districtClubs.length} clubs · ${totalMembers.toLocaleString()} members`} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={Trophy} label="District Records" value={records.length} />
        <Metric icon={Building2} label="Clubs" value={districtClubs.length} />
        <Metric icon={Users} label="Members" value={totalMembers.toLocaleString()} />
        <Metric icon={TrendingUp} label="Participation Growth" value="+34%" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChartCard title="Records by Club" data={recordsByClub} layout="vertical" />
        <BarChartCard title="Records by Category" data={recordsByCategory} layout="vertical" />
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
