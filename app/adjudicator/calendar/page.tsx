"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Calendar } from "@/components/ui/calendar";
import { attempts } from "@/lib/data/attempts";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { getAttemptTitle } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default function AdjudicatorCalendarPage() {
  const mine = attempts.filter((a) => a.adjudicatorId === CURRENT_ADJUDICATOR_ID);
  const dates = mine.map((a) => new Date(a.date));

  return (
    <div>
      <PageHeader title="Calendar" description="Every attempt date you're assigned to across the year." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4 lg:col-span-2">
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={() => {}}
            defaultMonth={dates[0]}
            className="mx-auto"
            classNames={{ day: "text-sm" }}
          />
        </div>
        <div className="flex flex-col gap-3">
          {mine
            .slice()
            .sort((a, b) => (a.date < b.date ? -1 : 1))
            .map((a) => (
              <Link
                key={a.id}
                href={`/adjudicator/attempts/${a.id}`}
                className="rounded-xl border border-border bg-card p-4 hover:border-royal/40"
              >
                <p className="text-xs text-muted-foreground">{formatDate(a.date)}</p>
                <p className="mt-1 text-sm font-medium text-navy">{getAttemptTitle(a)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{a.venue}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
