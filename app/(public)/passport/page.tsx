"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/shared/user-avatar";
import { users } from "@/lib/data/users";
import { getRecordsForUser, getCertificatesForUser } from "@/lib/selectors";

export default function PassportIndexPage() {
  const [query, setQuery] = useState("");
  const holders = users.filter((u) => getRecordsForUser(u.id).length > 0 || getCertificatesForUser(u.id).length > 0);
  const filtered = holders.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Achievement Profiles"
        title="Record Passport"
        description="Every record holder gets a permanent, shareable passport of verified achievements, badges, and certificates."
        align="center"
      />
      <div className="relative mx-auto mt-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search record holders by name…" className="pl-9" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((u) => (
          <Link key={u.id} href={`/passport/${u.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
            <UserAvatar initials={u.initials} color={u.avatarColor} size="lg" />
            <div className="min-w-0">
              <p className="truncate font-medium text-navy">{u.name}</p>
              <p className="text-sm text-muted-foreground">
                {getRecordsForUser(u.id).length} record{getRecordsForUser(u.id).length === 1 ? "" : "s"} ·{" "}
                {getCertificatesForUser(u.id).length} certificate{getCertificatesForUser(u.id).length === 1 ? "" : "s"}
              </p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No record holders match your search.
          </p>
        )}
      </div>
    </div>
  );
}
