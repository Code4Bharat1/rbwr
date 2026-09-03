import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { certificates } from "@/lib/data/certificates";
import { getUser } from "@/lib/data/users";
import { formatDate } from "@/lib/format";

export default function AdminCertificatesPage() {
  return (
    <div>
      <PageHeader title="Certificates" description="Every certificate issued by RBWR." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Certificate No.</th>
              <th className="px-4 py-3">Holder</th>
              <th className="px-4 py-3">Adjudicator</th>
              <th className="px-4 py-3">Issued</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certificates.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <Link href={`/certificates/${c.id}`} className="font-mono text-xs text-royal">{c.certificateNumber}</Link>
                </td>
                <td className="px-4 py-3 max-w-[200px] truncate font-medium">{c.holderName}</td>
                <td className="px-4 py-3 text-muted-foreground">{getUser(c.adjudicatorId)?.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(c.issuedDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
