"use client";

import { toast } from "sonner";
import { Pencil, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { records } from "@/lib/data/records";

export default function AdminCategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Categories"
        description="The record-type taxonomy used across the platform."
        action={
          <Button className="gap-1.5 bg-navy-gradient text-white hover:opacity-90" onClick={() => toast("New category draft started")}>
            <PlusCircle className="h-4 w-4" /> New Category
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{c.group}</span>
              <Button size="icon" variant="ghost" onClick={() => toast(`Editing ${c.name}`)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
            <h3 className="font-display text-base font-semibold text-navy">{c.name}</h3>
            <p className="text-sm text-muted-foreground">{c.description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {records.filter((r) => r.categoryId === c.id).length} records
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
