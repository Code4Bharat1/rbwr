import Link from "next/link";
import { Trophy } from "lucide-react";
import {
  getCityLeaderboard,
  getClubLeaderboard,
  getCountryLeaderboard,
  getIndividualLeaderboard,
} from "@/lib/selectors";

const columns = [
  { title: "Top Individuals", data: getIndividualLeaderboard() },
  { title: "Top Clubs", data: getClubLeaderboard() },
  { title: "Top Cities", data: getCityLeaderboard() },
  { title: "Top Countries", data: getCountryLeaderboard() },
];

export function LeaderboardPreview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title} className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display text-sm font-semibold text-navy">{col.title}</h3>
          <ol className="mt-3 space-y-2.5">
            {col.data.slice(0, 3).map((entry, i) => (
              <li key={entry.id} className="flex items-center gap-2.5">
                <span
                  className={
                    i === 0
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep"
                      : "flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground"
                  }
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">{entry.name}</span>
                <span className="text-xs font-medium text-muted-foreground">{entry.points} pts</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <Link
        href="/leaderboards"
        className="col-span-full flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-royal/30 p-4 text-sm font-medium text-royal hover:bg-royal/5"
      >
        <Trophy className="h-4 w-4" /> View full leaderboards →
      </Link>
    </div>
  );
}
