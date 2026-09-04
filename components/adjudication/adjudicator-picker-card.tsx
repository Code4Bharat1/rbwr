import { Check, ShieldAlert, Star } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { AdjudicatorProfile, User } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AdjudicatorPickerCard({
  user,
  profile,
  location,
  conflictReason,
  selected,
  onSelect,
}: {
  user: User;
  profile: AdjudicatorProfile;
  location: string;
  conflictReason?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const conflicted = Boolean(conflictReason);

  return (
    <button
      type="button"
      disabled={conflicted}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col gap-3 rounded-2xl border p-4 text-left transition-all",
        conflicted && "cursor-not-allowed border-live/30 bg-live/[0.03] opacity-70",
        !conflicted && selected && "border-royal bg-royal/5 ring-1 ring-royal",
        !conflicted && !selected && "border-border bg-card hover:border-royal/40 hover:bg-royal/[0.03]"
      )}
    >
      {selected && !conflicted && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-royal text-white">
          <Check className="h-3 w-3" />
        </span>
      )}

      <div className="flex items-center gap-3">
        <UserAvatar initials={user.initials} color={user.avatarColor} />
        <div className="min-w-0">
          <p className="truncate font-medium text-navy">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{location}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-royal/10 px-2 py-0.5 text-xs font-medium text-royal">
          {profile.certificationLevel}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold-deep">
          <Star className="h-3 w-3" /> {profile.rating.toFixed(1)}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        {profile.languages.join(", ")} · {profile.completedAttempts} attempts · {profile.availability}
      </p>

      {conflicted && (
        <div className="flex items-start gap-1.5 rounded-lg bg-live/10 p-2 text-xs text-live">
          <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{conflictReason}</span>
        </div>
      )}
    </button>
  );
}
