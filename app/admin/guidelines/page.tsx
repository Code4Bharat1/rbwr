import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { guidelines } from "@/lib/data/guidelines";
import { getCategory } from "@/lib/data/categories";
import { formatDate } from "@/lib/format";

export default function AdminGuidelinesPage() {
  return (
    <div>
      <PageHeader title="Guidelines" description="Version-controlled guideline documents by category." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Group</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Issued</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {guidelines.map((g) => {
              const category = getCategory(g.categoryId);
              return (
                <tr key={g.id}>
                  <td className="px-4 py-3">
                    <Link href={`/guidelines/${g.categoryId}`} className="font-medium text-royal">{category?.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{category?.group}</td>
                  <td className="px-4 py-3">{g.version}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(g.issuedDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
