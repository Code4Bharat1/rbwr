import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applications } from "@/lib/data/applications";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { formatDateShort } from "@/lib/format";

export default function AdminApplicationsPage() {
  return (
    <div>
      <PageHeader title="Applications" description="Every application submitted across the platform." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((a) => {
              const record = a.recordId ? getRecord(a.recordId) : undefined;
              return (
                <TableRow key={a.id}>
                  <TableCell>
                    <Link href={`/reviewer/applications/${a.id}`} className="font-mono text-xs text-royal">{a.id}</Link>
                  </TableCell>
                  <TableCell className="max-w-[220px] truncate font-medium">{record?.title ?? a.proposedTitle}</TableCell>
                  <TableCell className="text-muted-foreground">{getUser(a.applicantUserId)?.name}</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{a.type}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatDateShort(a.createdDate)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
