"use client";

import { PageHeader } from "@/components/shared/page-header";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getAttemptsForApplicant } from "@/lib/selectors";
import { getEvidenceForAttempt } from "@/lib/data/evidence";
import { getUser } from "@/lib/data/users";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function MyEvidencePage() {
  const userId = useCurrentParticipantId();
  const attempts = getAttemptsForApplicant(userId);
  const evidence = attempts.flatMap((a) => getEvidenceForAttempt(a.id));

  return (
    <div>
      <PageHeader title="Evidence" description="Evidence submitted on your behalf by the assigned adjudicator." />
      {evidence.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Uploaded By</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {evidence.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium">{e.fileName}</td>
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
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No evidence on file yet.</p>
      )}
    </div>
  );
}
