import { Medal } from "lucide-react";
import { LeaderboardEntry } from "@/lib/selectors";
import { cn } from "@/lib/utils";

export function Podium({ entries }: { entries: LeaderboardEntry[] }) {
  const [first, second, third] = entries;
  if (!first) return null;

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-6">
      <PodiumSpot entry={second} place={2} height="h-24" />
      <PodiumSpot entry={first} place={1} height="h-32" />
      <PodiumSpot entry={third} place={3} height="h-16" />
    </div>
  );
}

function PodiumSpot({ entry, place, height }: { entry?: LeaderboardEntry; place: number; height: string }) {
  if (!entry) return <div className="w-24 sm:w-32" />;
  const medalColor =
    place === 1 ? "text-gold-deep" : place === 2 ? "text-slate-400" : "text-amber-700";
  return (
    <div className="flex w-24 flex-col items-center gap-2 sm:w-32">
      <Medal className={cn("h-8 w-8", medalColor)} strokeWidth={1.75} />
      <p className="truncate text-center text-sm font-semibold text-navy">{entry.name}</p>
      <p className="text-xs text-muted-foreground">{entry.points} pts</p>
      <div
        className={cn(
          "flex w-full items-start justify-center rounded-t-xl pt-2",
          place === 1 ? "bg-gold-gradient" : "bg-secondary",
          height
        )}
      >
        <span className={cn("font-display text-2xl font-bold", place === 1 ? "text-navy-deep" : "text-muted-foreground")}>
          {place}
        </span>
      </div>
    </div>
  );
}
