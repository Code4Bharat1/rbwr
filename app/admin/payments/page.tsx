import { PageHeader } from "@/components/shared/page-header";
import { applications } from "@/lib/data/applications";
import { certificates } from "@/lib/data/certificates";
import { getUser } from "@/lib/data/users";
import { formatDate } from "@/lib/format";

export default function AdminPaymentsPage() {
  const applicationFees = applications.map((a) => ({
    id: `pay-app-${a.id}`,
    label: "Application Fee",
    userId: a.applicantUserId,
    amount: 150,
    date: a.createdDate,
    reference: a.id,
  }));
  const certificateFees = certificates.map((c) => ({
    id: `pay-cert-${c.id}`,
    label: "Certification Fee",
    userId: c.holderUserId,
    amount: 75,
    date: c.issuedDate,
    reference: c.certificateNumber,
  }));
  const transactions = [...applicationFees, ...certificateFees].sort((a, b) => (a.date < b.date ? 1 : -1));
  const total = transactions.reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <PageHeader title="Payments" description="Application and certification fees collected across the platform." />
      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Total Collected (sample data)</p>
        <p className="mt-1 font-display text-3xl font-semibold text-navy">${total.toLocaleString()}</p>
        <p className="mt-1 text-sm text-muted-foreground">{transactions.length} transactions</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 font-mono text-xs">{t.reference}</td>
                <td className="px-4 py-3 text-muted-foreground">{t.label}</td>
                <td className="px-4 py-3">{t.userId ? getUser(t.userId)?.name : "—"}</td>
                <td className="px-4 py-3 font-medium text-navy">${t.amount}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(t.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
