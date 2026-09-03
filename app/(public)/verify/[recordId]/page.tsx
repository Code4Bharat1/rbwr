import { BadgeCheck, Calendar, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getRecord } from "@/lib/data/records";
import { getCertificateForRecord } from "@/lib/data/certificates";
import { getCity, getCountry } from "@/lib/data/geo";
import { formatDate, formatDateTime } from "@/lib/format";

export default async function VerifyPage({ params }: { params: Promise<{ recordId: string }> }) {
  const { recordId } = await params;
  const record = getRecord(recordId);

  if (!record) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Record not found</h1>
        <p className="mt-2 text-muted-foreground">This RBWR record ID could not be verified.</p>
      </div>
    );
  }

  const certificate = getCertificateForRecord(record.id);
  const city = getCity(record.cityId);
  const country = getCountry(record.countryId);
  const isActive = record.status === "current";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-center font-mono text-xs text-muted-foreground">verify.rbwr.org/{record.id}</p>

      <div className="mt-6 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verified/10 text-verified">
          <BadgeCheck className="h-8 w-8" />
        </span>
        <p className="mt-4 font-display text-xl font-semibold text-verified">AUTHENTIC RBWR RECORD</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Verification Status:{" "}
          <span className={isActive ? "text-verified" : "text-pending"}>{isActive ? "Active" : record.status}</span>
        </p>

        <div className="mt-8 border-t border-dashed border-border pt-6 text-left">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Record Title</p>
          <p className="mt-1 font-display text-xl font-semibold text-navy">{record.title}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Holder</p>
              <p className="mt-0.5 font-medium">{record.holderName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Record ID</p>
              <p className="mt-0.5 font-mono text-xs font-medium">{record.id}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Achievement</p>
              <p className="mt-0.5 font-medium">{record.achievementValue} {record.achievementUnit}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Certificate No.</p>
              <p className="mt-0.5 font-medium">{certificate?.certificateNumber ?? "Pending issuance"}</p>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>{city?.name}, {country?.name}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Calendar className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
              <span>{formatDate(record.date)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verified at {formatDateTime(new Date().toISOString())}
        </div>

        <Link href={`/records/${record.id}`} className="mt-6 inline-block text-sm font-medium text-royal hover:underline">
          View full public record page →
        </Link>
      </div>
    </div>
  );
}
