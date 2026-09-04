"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PauseCircle, RefreshCcw, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adjudicatorProfiles } from "@/lib/data/adjudicators";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { cn } from "@/lib/utils";

const pendingApplications = [
  { id: "RBWR-ADJ-2026-3312", name: "Priya Nair", city: "Bengaluru, India", stage: "Assessment" },
  { id: "RBWR-ADJ-2026-3298", name: "Noah Fischer", city: "Chicago, United States", stage: "Training" },
  { id: "RBWR-ADJ-2026-3277", name: "Camila Silva", city: "São Paulo, Brazil", stage: "Application" },
];

export default function AdminAdjudicatorsPage() {
  const [suspended, setSuspended] = useState<Set<string>>(new Set());

  return (
    <div>
      <PageHeader title="Adjudicators" description="Certification pipeline and active adjudicator roster." />

      <h2 className="mb-3 font-display text-base font-semibold text-navy">Pending Certification</h2>
      <div className="mb-10 overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingApplications.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <p className="font-medium">{a.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{a.id}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{a.city}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-pending/10 px-2 py-0.5 text-xs font-medium text-pending">{a.stage}</span>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" className="text-verified" onClick={() => toast.success(`${a.name} advanced to next stage`)}>
                    Advance
                  </Button>
                  <Button size="sm" variant="ghost" className="text-live" onClick={() => toast(`${a.name}'s application rejected`)}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h2 className="mb-3 font-display text-base font-semibold text-navy">Certified Roster</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adjudicatorProfiles.map((p) => {
          const user = getUser(p.userId)!;
          const city = getCity(user.cityId);
          const country = getCountry(user.countryId);
          const isSuspended = suspended.has(p.userId);
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
                    isSuspended && "bg-live/10 text-live",
                    !isSuspended && p.availability === "Available" && "bg-verified/10 text-verified",
                    !isSuspended && p.availability === "Limited" && "bg-pending/10 text-pending",
                    !isSuspended && p.availability === "Unavailable" && "bg-live/10 text-live"
                  )}
                >
                  {isSuspended ? "Suspended" : p.availability}
                </span>
              </div>
              <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                {p.completedAttempts} attempts · {p.rating.toFixed(1)}
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              </p>
              <div className="mt-3 flex gap-1 border-t border-border pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-xs"
                  onClick={() => {
                    setSuspended((s) => {
                      const next = new Set(s);
                      next.has(p.userId) ? next.delete(p.userId) : next.add(p.userId);
                      return next;
                    });
                    toast(isSuspended ? `${user.name} reinstated` : `${user.name} suspended`);
                  }}
                >
                  <PauseCircle className="h-3.5 w-3.5" /> {isSuspended ? "Reinstate" : "Suspend"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 text-xs"
                  onClick={() => toast.success(`${user.name}'s certification renewed for 12 months`)}
                >
                  <RefreshCcw className="h-3.5 w-3.5" /> Renew
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
