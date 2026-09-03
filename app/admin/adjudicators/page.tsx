import { PageHeader } from "@/components/shared/page-header";
import { UserAvatar } from "@/components/shared/user-avatar";
import { adjudicatorProfiles } from "@/lib/data/adjudicators";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { cn } from "@/lib/utils";

export default function AdminAdjudicatorsPage() {
  return (
    <div>
      <PageHeader title="Adjudicators" description="Every certified adjudicator on the platform." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adjudicatorProfiles.map((p) => {
          const user = getUser(p.userId)!;
          const city = getCity(user.cityId);
          const country = getCountry(user.countryId);
          return (
            <div key={p.userId} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <UserAvatar initials={user.initials} color={user.avatarColor} />
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{city?.name}, {country?.name}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-royal/10 px-2 py-0.5 text-xs font-medium text-royal">{p.certificationLevel}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    p.availability === "Available" && "bg-verified/10 text-verified",
                    p.availability === "Limited" && "bg-pending/10 text-pending",
                    p.availability === "Unavailable" && "bg-live/10 text-live"
                  )}
                >
                  {p.availability}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {p.completedAttempts} attempts · {p.rating.toFixed(1)}★
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
