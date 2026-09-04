"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Archive, Eye, Pencil, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { records } from "@/lib/data/records";
import { getCountry } from "@/lib/data/geo";
import { getCategory } from "@/lib/data/categories";
import { formatDateShort } from "@/lib/format";

export default function AdminRecordsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div>
      <PageHeader
        title="Records"
        description="Manage the official RBWR record catalog."
        action={
          selected.size > 0 && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { toast.success(`${selected.size} records published`); setSelected(new Set()); }}>
                <UploadCloud className="h-3.5 w-3.5" /> Publish Selected
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { toast(`${selected.size} records archived`); setSelected(new Set()); }}>
                <Archive className="h-3.5 w-3.5" /> Archive Selected
              </Button>
            </div>
          )
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Record ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Holder</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((r) => {
              const country = getCountry(r.countryId);
              const category = getCategory(r.categoryId);
              return (
                <TableRow key={r.id}>
                  <TableCell>
                    <Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggle(r.id)} />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="max-w-[200px] truncate font-medium">{r.title}</TableCell>
                  <TableCell className="max-w-[160px] truncate text-muted-foreground">{r.holderName}</TableCell>
                  <TableCell className="text-muted-foreground">{category?.name}</TableCell>
                  <TableCell>{country?.name}</TableCell>
                  <TableCell><VerificationBadge status={r.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatDateShort(r.date)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button asChild size="icon" variant="ghost" title="View">
                        <Link href={`/records/${r.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" title="Edit" onClick={() => toast(`Editing ${r.id}`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Archive" onClick={() => toast(`${r.id} archived`)}>
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
