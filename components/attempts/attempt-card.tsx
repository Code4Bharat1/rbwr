import Link from "next/link";
import { CalendarClock, MapPin, Radio } from "lucide-react";
import { Attempt } from "@/lib/types";
import { getAttemptTitle } from "@/lib/selectors";
import { getCity, getCountry } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";

export function AttemptCard({ attempt, className }: { attempt: Attempt; className?: string }) {
  const title = getAttemptTitle(attempt);
  const city = getCity(attempt.cityId);
  const country = getCountry(attempt.countryId);
  const isLive = attempt.status === "live";

  return (
    <Link
      href={`/adjudicator/attempts/${attempt.id}`}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg",
        isLive ? "border-live/30 bg-live/[0.04]" : "border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
            isLive ? "bg-live text-white" : "bg-gold/15 text-gold-deep"
          )}
        >
          {isLive ? <Radio className="h-3 w-3 animate-pulse" /> : <CalendarClock className="h-3 w-3" />}
          {isLive ? "Live Now" : "Upcoming"}
        </span>
        <span className="text-xs text-muted-foreground">{formatDateShort(attempt.date)}</span>
      </div>
      <h3 className="font-display text-base font-semibold leading-snug text-navy">{title}</h3>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        {attempt.venue}, {city?.name}, {country?.name}
      </div>
      <p className="text-sm text-muted-foreground">
        Adjudicator: <span className="text-foreground">{getUser(attempt.adjudicatorId)?.name}</span>
      </p>
    </Link>
  );
}
