"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attempts } from "@/lib/data/attempts";
import { evidence } from "@/lib/data/evidence";
import { getUser } from "@/lib/data/users";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { getAttemptTitle } from "@/lib/selectors";
import { formatDateTime } from "@/lib/format";
import { EvidenceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const typeLabels: Record<EvidenceType, string> = {
  photo: "Photos",
  video: "Videos",
  document: "Documents",
  witness: "Witness Statements",
  measurement: "Measurements",
  "participant-list": "Participant Lists",
};

export default function AdjudicatorEvidencePage() {
  const [tab, setTab] = useState<EvidenceType | "all">("all");
  const myAttemptIds = new Set(attempts.filter((a) => a.adjudicatorId === CURRENT_ADJUDICATOR_ID).map((a) => a.id));
  const myEvidence = evidence.filter((e) => myAttemptIds.has(e.attemptId));
  const filtered = tab === "all" ? myEvidence : myEvidence.filter((e) => e.type === tab);
  const sorted = [...filtered].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return (
    <div>
      <PageHeader title="Evidence Vault" description="Every piece of evidence you've submitted, in immutable order." />
      <Tabs value={tab} onValueChange={(v) => setTab(v as EvidenceType | "all")}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {Object.entries(typeLabels).map(([value, label]) => (
            <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Attempt</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sorted.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-3 font-medium">{e.fileName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {getAttemptTitle(attempts.find((a) => a.id === e.attemptId)!)}
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{e.type.replace("-", " ")}</td>
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
                {sorted.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No evidence in this category.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-display text-sm font-semibold text-navy">Audit Timeline</h3>
          <ol className="mt-4 space-y-4 border-l border-border pl-4">
            {sorted.map((e) => (
              <li key={e.id} className="relative text-sm">
                <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-royal" />
                <p className="text-xs text-muted-foreground">{formatDateTime(e.timestamp)}</p>
                <p className="font-medium">{e.fileName}</p>
                <p className="text-xs text-muted-foreground">by {getUser(e.uploadedByUserId)?.name}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
