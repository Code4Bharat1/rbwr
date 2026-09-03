"use client";

import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";

export default function AdjudicatorProfilePage() {
  const user = getUser(CURRENT_ADJUDICATOR_ID)!;
  const country = getCountry(user.countryId);
  const city = getCity(user.cityId);

  return (
    <div>
      <PageHeader title="Profile" />
      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <UserAvatar initials={user.initials} color={user.avatarColor} size="xl" />
          <div>
            <h2 className="font-display text-xl font-semibold text-navy">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {city?.name}, {country?.name} {country?.flag}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-foreground/80">{user.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.badges.map((b) => (
            <span key={b} className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold-deep">{b}</span>
          ))}
        </div>
        <Button className="mt-6 bg-navy-gradient text-white hover:opacity-90" onClick={() => toast.success("Profile changes saved")}>
          Save Profile
        </Button>
      </div>
    </div>
  );
}
