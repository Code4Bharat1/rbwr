"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auditLogsSorted } from "@/lib/data/audit-logs";
import { getUser } from "@/lib/data/users";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminAuditPage() {
  const [status, setStatus] = useState<"all" | "SUCCESS" | "FAILED">("all");
  const logs = auditLogsSorted().filter((l) => status === "all" || l.status === status);

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Immutable record of every security-relevant action on the platform."
        action={
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="SUCCESS">Success</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3 text-muted-foreground">{formatDateTime(l.timestamp)}</td>
                <td className="px-4 py-3 font-medium">{getUser(l.userId)?.name}</td>
                <td className="px-4 py-3">{l.action}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.resource}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", l.status === "SUCCESS" ? "bg-verified/10 text-verified" : "bg-live/10 text-live")}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
