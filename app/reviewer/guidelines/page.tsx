"use client";

import Link from "next/link";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { guidelines } from "@/lib/data/guidelines";
import { getCategory } from "@/lib/data/categories";
import { formatDate } from "@/lib/format";

export default function ReviewerGuidelinesPage() {
  return (
    <div>
      <PageHeader
        title="Guidelines"
        description="Official measurement, safety, and evidence guidelines by category."
        action={
          <Button className="gap-1.5 bg-navy-gradient text-white hover:opacity-90" onClick={() => toast("Draft a new guideline document")}>
            <PlusCircle className="h-4 w-4" /> Issue New Guidelines
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guidelines.map((g) => {
          const category = getCategory(g.categoryId);
          return (
            <Link
              key={g.id}
              href={`/guidelines/${g.categoryId}`}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 hover:border-royal/40"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{category?.group}</span>
              <h3 className="font-display text-base font-semibold text-navy">{category?.name}</h3>
              <p className="text-sm text-muted-foreground">Version {g.version} · Issued {formatDate(g.issuedDate)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
