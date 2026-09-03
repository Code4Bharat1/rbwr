"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, Search } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { certificates } from "@/lib/data/certificates";
import { formatDate } from "@/lib/format";

export default function CertificatesIndexPage() {
  const [query, setQuery] = useState("");
  const filtered = certificates.filter(
    (c) =>
      c.certificateNumber.toLowerCase().includes(query.toLowerCase()) ||
      c.holderName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Official Documents"
        title="RBWR Certificates"
        description="Every certificate is permanently and publicly verifiable via its unique certificate number and QR code."
        align="center"
      />
      <div className="relative mx-auto mt-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by certificate number or holder…"
          className="pl-9"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/certificates/${c.id}`}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover:border-royal/40"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
              <Award className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-navy">{c.holderName}</p>
              <p className="font-mono text-xs text-muted-foreground">{c.certificateNumber}</p>
              <p className="text-xs text-muted-foreground">Issued {formatDate(c.issuedDate)}</p>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No certificates match your search.
          </p>
        )}
      </div>
    </div>
  );
}
