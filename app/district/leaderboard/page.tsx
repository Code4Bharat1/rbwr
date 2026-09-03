import { PageHeader } from "@/components/shared/page-header";
import { getClub, getDistrict } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { CURRENT_DISTRICT_ADMIN_ID } from "@/lib/demo-config";
import { getClubLeaderboard } from "@/lib/selectors";
import { clubs } from "@/lib/data/geo";
import { cn } from "@/lib/utils";

export default function DistrictLeaderboardPage() {
  const admin = getUser(CURRENT_DISTRICT_ADMIN_ID)!;
  const homeClub = getClub(admin.clubId!)!;
  const district = getDistrict(homeClub.districtId)!;
  const districtClubIds = new Set(clubs.filter((c) => c.districtId === district.id).map((c) => c.id));
  const leaderboard = getClubLeaderboard();

  return (
    <div>
      <PageHeader title="Leaderboard" description="Global club leaderboard, with this district's clubs highlighted." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Club</th>
              <th className="px-4 py-3">Records</th>
              <th className="px-4 py-3">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leaderboard.map((e, i) => (
              <tr key={e.id} className={cn(districtClubIds.has(e.id) && "bg-gold/10")}>
                <td className="px-4 py-3 font-semibold text-navy">{i + 1}</td>
                <td className="px-4 py-3">
                  {e.name}
                  {districtClubIds.has(e.id) && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold-deep">
                      District {district.number}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{e.recordCount}</td>
                <td className="px-4 py-3 font-medium text-royal">{e.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
