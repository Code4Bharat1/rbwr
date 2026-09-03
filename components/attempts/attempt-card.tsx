import Link from "next/link";
import { CalendarClock, Check, MapPin, PenLine, Radio } from "lucide-react";
import { Attempt } from "@/lib/types";
import { getAttemptTitle } from "@/lib/selectors";
import { getCity, getCountry } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";

const statusMeta = {
  live: { label: "Live Now", icon: Radio, badgeClass: "bg-live text-white", cardClass: "border-live/30 bg-live/[0.04]" },
  scheduled: { label: "Upcoming", icon: CalendarClock, badgeClass: "bg-gold/15 text-gold-deep", cardClass: "border-border bg-card" },
  completed: { label: "Completed", icon: Check, badgeClass: "bg-verified/10 text-verified", cardClass: "border-border bg-card" },
  draft: { label: "Draft", icon: PenLine, badgeClass: "bg-secondary text-secondary-foreground", cardClass: "border-border bg-card" },
};

export function AttemptCard({ attempt, className }: { attempt: Attempt; className?: string }) {
  const title = getAttemptTitle(attempt);
  const city = getCity(attempt.cityId);
  const country = getCountry(attempt.countryId);
  const meta = statusMeta[attempt.status];
  const Icon = meta.icon;

  return (
    <Link
      href={`/adjudicator/attempts/${attempt.id}`}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg",
        meta.cardClass,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
            meta.badgeClass
          )}
        >
          <Icon className={cn("h-3 w-3", attempt.status === "live" && "animate-pulse")} />
          {meta.label}
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
