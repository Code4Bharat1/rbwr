"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { evidence } from "@/lib/data/evidence";
import { attempts } from "@/lib/data/attempts";
import { getUser } from "@/lib/data/users";
import { getAttemptTitle } from "@/lib/selectors";
import { formatDateTime } from "@/lib/format";
import { EvidenceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeLabels: Record<EvidenceType, string> = {
  photo: "Photos", video: "Videos", document: "Documents",
  witness: "Witness Statements", measurement: "Measurements", "participant-list": "Participant Lists",
};

export default function AdminEvidencePage() {
  const [tab, setTab] = useState<EvidenceType | "all">("all");
  const filtered = tab === "all" ? evidence : evidence.filter((e) => e.type === tab);
  const sorted = [...filtered].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return (
    <div>
      <PageHeader title="Evidence Vault" description="Every piece of evidence submitted across every attempt." />
      <Tabs value={tab} onValueChange={(v) => setTab(v as EvidenceType | "all")}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All ({evidence.length})</TabsTrigger>
          {Object.entries(typeLabels).map(([value, label]) => (
            <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3">Attempt</th>
              <th className="px-4 py-3">Uploaded By</th>
              <th className="px-4 py-3">Timestamp</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sorted.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-3 font-medium">{e.fileName}</td>
                <td className="px-4 py-3 max-w-[200px] truncate text-muted-foreground">
                  {getAttemptTitle(attempts.find((a) => a.id === e.attemptId)!)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{getUser(e.uploadedByUserId)?.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDateTime(e.timestamp)}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      e.verificationStatus === "verified" && "bg-verified/10 text-verified",
                      e.verificationStatus === "pending" && "bg-pending/10 text-pending",
                      e.verificationStatus === "flagged" && "bg-live/10 text-live"
                    )}
                  >
                    {e.verificationStatus}
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
