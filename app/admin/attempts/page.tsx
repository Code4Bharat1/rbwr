import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { attempts } from "@/lib/data/attempts";
import { getAttemptTitle } from "@/lib/selectors";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminAttemptsPage() {
  return (
    <div>
      <PageHeader title="Attempts" description="Every scheduled, live, and completed attempt on record." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Attempt</th>
              <th className="px-4 py-3">Venue</th>
              <th className="px-4 py-3">Adjudicator</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {attempts.map((a) => {
              const city = getCity(a.cityId);
              const country = getCountry(a.countryId);
              return (
                <tr key={a.id}>
                  <td className="px-4 py-3">
                    <Link href={`/adjudicator/attempts/${a.id}`} className="max-w-[220px] truncate font-medium text-royal">
                      {getAttemptTitle(a)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{city?.name}, {country?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{getUser(a.adjudicatorId)?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDateShort(a.date)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        a.status === "live" && "bg-live/10 text-live",
                        a.status === "scheduled" && "bg-gold/15 text-gold-deep",
                        a.status === "completed" && "bg-verified/10 text-verified",
                        a.status === "draft" && "bg-secondary text-secondary-foreground"
                      )}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
