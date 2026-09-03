import Link from "next/link";
import { Award, ClipboardCheck, Globe2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { adjudicatorProfiles } from "@/lib/data/adjudicators";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { cn } from "@/lib/utils";

export default function AdjudicatorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The People Behind the Records"
        title="RBWR Certified Adjudicators"
        description="A global network of 1,250+ trained professionals who bring integrity and rigor to every attempt."
        align="center"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {adjudicatorProfiles.map((p) => {
          const user = getUser(p.userId)!;
          const city = getCity(user.cityId);
          const country = getCountry(user.countryId);
          return (
            <div key={p.userId} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <UserAvatar initials={user.initials} color={user.avatarColor} size="lg" />
                <div>
                  <p className="font-display font-semibold text-navy">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{city?.name}, {country?.name} {country?.flag}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="flex items-center gap-1 rounded-full bg-royal/10 px-2 py-0.5 text-xs font-medium text-royal">
                  <Award className="h-3 w-3" /> {p.certificationLevel}
                </span>
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
              <p className="text-sm text-muted-foreground">{p.specialties.join(" · ")}</p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><ClipboardCheck className="h-3.5 w-3.5" /> {p.completedAttempts} attempts</span>
                <span className="flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" /> {p.languages.length} languages</span>
                <span>{p.rating.toFixed(1)}★</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-navy-gradient px-6 py-14 text-center sm:px-16">
        <h2 className="max-w-xl font-display text-2xl font-semibold text-white sm:text-3xl">
          Become a Certified RBWR Adjudicator
        </h2>
        <p className="max-w-lg text-white/70">
          Complete our certification program and join the global network responsible for verifying the world's most extraordinary achievements.
        </p>
        <Button asChild size="lg" className="bg-gold-gradient text-navy-deep hover:opacity-90">
          <Link href="/contact">Apply to Become an Adjudicator</Link>
        </Button>
      </div>
    </div>
  );
}
