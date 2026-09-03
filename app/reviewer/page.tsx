import Link from "next/link";
import { AlertTriangle, FileSearch, Inbox, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applications } from "@/lib/data/applications";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { evidence } from "@/lib/data/evidence";

export default function ReviewerQueuePage() {
  const pending = applications.filter((a) => a.status === "submitted" || a.status === "under_review");
  const appeals = applications.filter((a) => a.status === "appeal");
  const verifications = applications.filter((a) => a.status === "under_verification");
  const evidencePending = evidence.filter((e) => e.verificationStatus === "pending");

  return (
    <div>
      <PageHeader title="Application Queue" description="Triage, approve, and route every incoming RBWR application." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={Inbox} label="Applications Pending" value={pending.length} />
        <Metric icon={FileSearch} label="Evidence Pending" value={evidencePending.length} />
        <Metric icon={AlertTriangle} label="Appeals" value={appeals.length} />
        <Metric icon={ShieldCheck} label="Verification Decisions" value={verifications.length} />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Record</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => {
              const applicant = getUser(app.applicantUserId);
              const record = app.recordId ? getRecord(app.recordId) : undefined;
              const reviewer = app.reviewerUserId ? getUser(app.reviewerUserId) : undefined;
              return (
                <TableRow key={app.id} className="cursor-pointer hover:bg-secondary/40">
                  <TableCell>
                    <Link href={`/reviewer/applications/${app.id}`} className="block font-mono text-xs text-royal">
                      {app.id}
                    </Link>
                  </TableCell>
                  <TableCell>{applicant?.name}</TableCell>
                  <TableCell className="max-w-[240px] truncate">{record?.title ?? app.proposedTitle}</TableCell>
                  <TableCell><StatusBadge status={app.status} /></TableCell>
                  <TableCell>{reviewer?.name ?? "Unassigned"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Inbox; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-royal" />
      <p className="mt-3 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
