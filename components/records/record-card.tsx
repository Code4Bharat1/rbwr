import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WorldRecord } from "@/lib/types";
import { getCategory } from "@/lib/data/categories";
import { getCountry } from "@/lib/data/geo";
import { RecordImage } from "@/components/shared/record-image";
import { VerificationBadge } from "@/components/shared/verification-badge";
import { cn } from "@/lib/utils";

export function RecordCard({ record, className }: { record: WorldRecord; className?: string }) {
  const category = getCategory(record.categoryId);
  const country = getCountry(record.countryId);

  return (
    <Link
      href={`/records/${record.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <RecordImage src={record.images[0]} alt={record.title} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gold-deep">
            {category?.group ?? "World"} Record
          </span>
          <VerificationBadge status={record.status} />
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-navy group-hover:underline">
          {record.title}
        </h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">{record.holderName}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            {country?.flag} {country?.name}
          </span>
          <span className="flex items-center gap-1 font-medium text-royal">
            View Record
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
