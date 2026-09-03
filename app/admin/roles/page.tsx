import { Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ROLE_LABELS, Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const roles: Role[] = [
  "participant",
  "rotarian",
  "adjudicator",
  "club-admin",
  "district-admin",
  "reviewer",
  "record-manager",
  "super-admin",
];

const permissions: { label: string; allowed: Role[] }[] = [
  { label: "Browse & search records", allowed: roles },
  { label: "Submit applications", allowed: ["participant", "rotarian", "club-admin", "district-admin"] },
  { label: "Conduct live attempts", allowed: ["adjudicator", "super-admin"] },
  { label: "Submit adjudication reports", allowed: ["adjudicator", "super-admin"] },
  { label: "Review applications", allowed: ["reviewer", "super-admin"] },
  { label: "Assign adjudicators", allowed: ["reviewer", "super-admin"] },
  { label: "Verify / reject records", allowed: ["reviewer", "super-admin"] },
  { label: "Issue certificates", allowed: ["reviewer", "record-manager", "super-admin"] },
  { label: "Manage record catalog", allowed: ["record-manager", "super-admin"] },
  { label: "Manage club data", allowed: ["club-admin", "district-admin", "super-admin"] },
  { label: "Manage district data", allowed: ["district-admin", "super-admin"] },
  { label: "Manage users & roles", allowed: ["super-admin"] },
  { label: "View audit logs", allowed: ["super-admin"] },
  { label: "Manage payments", allowed: ["super-admin"] },
];

export default function AdminRolesPage() {
  return (
    <div>
      <PageHeader title="Roles & Permissions" description="The permission matrix governing every RBWR role." />
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="sticky left-0 bg-secondary/60 px-4 py-3">Permission</th>
              {roles.map((r) => (
                <th key={r} className="px-3 py-3 text-center">{ROLE_LABELS[r]}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {permissions.map((p) => (
              <tr key={p.label}>
                <td className="sticky left-0 bg-card px-4 py-2.5 font-medium">{p.label}</td>
                {roles.map((r) => (
                  <td key={r} className="px-3 py-2.5 text-center">
                    {p.allowed.includes(r) && (
                      <Check className={cn("mx-auto h-4 w-4 text-verified")} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
