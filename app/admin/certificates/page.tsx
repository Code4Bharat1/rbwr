"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Ban, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { certificates } from "@/lib/data/certificates";
import { getUser } from "@/lib/data/users";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());

  return (
    <div>
      <PageHeader title="Certificates" description="Every certificate issued by RBWR — reissue or cancel as needed." />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Certificate No.</th>
              <th className="px-4 py-3">Holder</th>
              <th className="px-4 py-3">Adjudicator</th>
              <th className="px-4 py-3">Issued</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certificates.map((c) => {
              const isCancelled = cancelled.has(c.id);
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <Link href={`/certificates/${c.id}`} className="font-mono text-xs text-royal">{c.certificateNumber}</Link>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate font-medium">{c.holderName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{getUser(c.adjudicatorId)?.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(c.issuedDate)}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", isCancelled ? "bg-live/10 text-live" : "bg-verified/10 text-verified")}>
                      {isCancelled ? "Cancelled" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-xs"
                      onClick={() => toast.success(`${c.certificateNumber} reissued`)}
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Reissue
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 text-xs text-live"
                      onClick={() => {
                        setCancelled((s) => {
                          const next = new Set(s);
                          next.has(c.id) ? next.delete(c.id) : next.add(c.id);
                          return next;
                        });
                        toast(isCancelled ? `${c.certificateNumber} reactivated` : `${c.certificateNumber} cancelled`);
                      }}
                    >
                      <Ban className="h-3.5 w-3.5" /> {isCancelled ? "Reactivate" : "Cancel"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
