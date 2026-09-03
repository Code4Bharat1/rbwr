import { PageHeader } from "@/components/shared/page-header";
import { UserAvatar } from "@/components/shared/user-avatar";
import { getClub } from "@/lib/data/geo";
import { getUser, users } from "@/lib/data/users";
import { CURRENT_CLUB_ADMIN_ID } from "@/lib/demo-config";
import { ROLE_LABELS } from "@/lib/types";

export default function ClubMembersPage() {
  const admin = getUser(CURRENT_CLUB_ADMIN_ID)!;
  const club = getClub(admin.clubId!)!;
  const members = users.filter((u) => u.clubId === club.id);

  return (
    <div>
      <PageHeader
        title="Members"
        description={`${club.memberCount.toLocaleString()} total members on record · ${members.length} active platform profiles shown below`}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <UserAvatar initials={m.initials} color={m.avatarColor} />
            <div className="min-w-0">
              <p className="truncate font-medium text-navy">{m.name}</p>
              <p className="truncate text-xs text-muted-foreground">{m.roles.map((r) => ROLE_LABELS[r]).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
