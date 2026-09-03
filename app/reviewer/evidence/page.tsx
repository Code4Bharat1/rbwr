"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { evidence as evidenceData } from "@/lib/data/evidence";
import { attempts } from "@/lib/data/attempts";
import { getUser } from "@/lib/data/users";
import { getAttemptTitle } from "@/lib/selectors";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Evidence } from "@/lib/types";

export default function ReviewerEvidencePage() {
  const [tab, setTab] = useState<"all" | "pending" | "flagged" | "verified">("all");
  const [overrides, setOverrides] = useState<Record<string, "verified" | "flagged">>({});

  const withStatus: Evidence[] = evidenceData.map((e): Evidence => {
    const verificationStatus = overrides[e.id] ?? e.verificationStatus;
    return { ...e, verificationStatus };
  });
  const filtered = tab === "all" ? withStatus : withStatus.filter((e) => e.verificationStatus === tab);
  const sorted = [...filtered].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return (
    <div>
      <PageHeader title="Evidence Review" description="Review evidence flagged for discrepancies or pending sign-off." />
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Attempt</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.fileName}</TableCell>
                <TableCell className="max-w-[220px] truncate text-muted-foreground">
                  {getAttemptTitle(attempts.find((a) => a.id === e.attemptId)!)}
                </TableCell>
                <TableCell>{getUser(e.uploadedByUserId)?.name}</TableCell>
                <TableCell className="text-muted-foreground">{formatDateTime(e.timestamp)}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell className="text-right">
                  {e.verificationStatus !== "verified" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-verified"
                      onClick={() => {
                        setOverrides((o) => ({ ...o, [e.id]: "verified" }));
                        toast.success(`${e.fileName} marked verified`);
                      }}
                    >
                      Mark Verified
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
