import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { getClubLeaderboard, getCountryLeaderboard, getIndividualLeaderboard } from "@/lib/selectors";

export default function AdminLeaderboardsPage() {
  const columns = [
    { title: "Top Individuals", data: getIndividualLeaderboard() },
    { title: "Top Clubs", data: getClubLeaderboard() },
    { title: "Top Countries", data: getCountryLeaderboard() },
  ];

  return (
    <div>
      <PageHeader
        title="Leaderboards"
        description="Administrative view of ranking computations."
        action={<Link href="/leaderboards" className="text-sm text-royal hover:underline">View public leaderboards →</Link>}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {columns.map((col) => (
          <div key={col.title} className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold text-navy">{col.title}</h3>
            <ol className="mt-3 space-y-2">
              {col.data.slice(0, 5).map((e, i) => (
                <li key={e.id} className="flex items-center justify-between text-sm">
                  <span>{i + 1}. {e.name}</span>
                  <span className="text-muted-foreground">{e.points} pts</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
