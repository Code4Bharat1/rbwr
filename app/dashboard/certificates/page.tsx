"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getCertificatesForUser } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default function MyCertificatesPage() {
  const userId = useCurrentParticipantId();
  const certificates = getCertificatesForUser(userId);

  return (
    <div>
      <PageHeader title="Certificates" description="Official RBWR certificates issued to you." />
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificates.map((c) => (
            <Link key={c.id} href={`/certificates/${c.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-navy">{c.certificateNumber}</p>
                <p className="text-sm text-muted-foreground">Issued {formatDate(c.issuedDate)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No certificates issued yet.</p>
      )}
    </div>
  );
}
