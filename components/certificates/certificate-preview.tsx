import { QRCodeSVG } from "qrcode.react";
import { Trophy } from "lucide-react";
import { Certificate, WorldRecord } from "@/lib/types";
import { getUser } from "@/lib/data/users";
import { getCity, getCountry } from "@/lib/data/geo";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CertificatePreview({
  certificate,
  record,
  className,
}: {
  certificate: Certificate;
  record: WorldRecord;
  className?: string;
}) {
  const adjudicator = getUser(certificate.adjudicatorId);
  const city = getCity(record.cityId);
  const country = getCountry(record.countryId);
  const verifyUrl = `verify.rbwr.org/${record.id}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-[6px] border-double border-gold/50 bg-white p-8 shadow-xl sm:p-12",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-4 rounded-xl border border-gold/30" />
      <div className="relative flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-gradient text-gold-soft">
          <Trophy className="h-7 w-7" />
        </span>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
          Rotary Book of World Records
        </p>
        <h2 className="mt-4 font-display text-lg text-muted-foreground">This certifies that</h2>
        <p className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">{certificate.holderName}</p>
        <h3 className="mt-4 font-display text-lg text-muted-foreground">has officially achieved the record for</h3>
        <p className="mt-2 max-w-xl font-display text-2xl font-semibold text-royal">{record.title}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {record.achievementValue} {record.achievementUnit} · {city?.name}, {country?.name}
        </p>

        <div className="mt-8 grid w-full grid-cols-2 gap-6 border-t border-dashed border-border pt-6 text-left sm:grid-cols-4">
          <Field label="Certificate No." value={certificate.certificateNumber} />
          <Field label="Record ID" value={record.id} mono />
          <Field label="Date" value={formatDate(certificate.issuedDate)} />
          <Field label="Adjudicator" value={adjudicator?.name ?? "—"} />
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 border-t border-dashed border-border pt-6 sm:flex-row">
          <div className="text-left">
            <p className="font-display text-lg italic text-navy">RBWR Verification Board</p>
            <p className="text-xs text-muted-foreground">Authorized Signature</p>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <QRCodeSVG value={`https://${verifyUrl}`} size={84} fgColor="#123667" />
            <p className="font-mono text-[10px] text-muted-foreground">{verifyUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={cn("mt-0.5 text-sm font-medium text-navy", mono && "font-mono text-xs")}>{value}</p>
    </div>
  );
}
