"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { AttemptCard } from "@/components/attempts/attempt-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attempts } from "@/lib/data/attempts";
import { CURRENT_ADJUDICATOR_ID } from "@/lib/demo-config";
import { AttemptStatus } from "@/lib/types";

const tabs: { value: AttemptStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
];

export default function AssignedAttemptsPage() {
  const [tab, setTab] = useState<AttemptStatus | "all">("all");
  const mine = attempts.filter((a) => a.adjudicatorId === CURRENT_ADJUDICATOR_ID);
  const filtered = tab === "all" ? mine : mine.filter((a) => a.status === tab);

  return (
    <div>
      <PageHeader title="Assigned Attempts" description="Every attempt you've been assigned to adjudicate." />
      <Tabs value={tab} onValueChange={(v) => setTab(v as AttemptStatus | "all")}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <AttemptCard key={a.id} attempt={a} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No attempts in this category.
          </p>
        )}
      </div>
    </div>
  );
}
