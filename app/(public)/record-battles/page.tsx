import Link from "next/link";
import { Swords } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RecordImage } from "@/components/shared/record-image";
import { applications } from "@/lib/data/applications";
import { getRecord } from "@/lib/data/records";
import { getUser } from "@/lib/data/users";
import { formatDateShort } from "@/lib/format";

export default function RecordBattlesPage() {
  const battles = applications.filter(
    (a) => a.type === "break" && (a.status === "scheduled" || a.status === "attempt_live") && a.recordId
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Head-to-Head"
        title="Record Battles"
        description="Active challenges where a defending record holder faces a scheduled attempt to unseat them."
        align="center"
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {battles.map((app) => {
          const record = getRecord(app.recordId!)!;
          const challenger = getUser(app.applicantUserId);
          return (
            <Link
              key={app.id}
              href={`/record-battles/${app.id}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <RecordImage src={record.images[0]} alt={record.title} className="aspect-[16/7] w-full" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-deep">{record.title}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Holder</p>
                    <p className="font-display font-semibold text-navy">{record.holderName}</p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-live/10 text-live">
                    <Swords className="h-4 w-4" />
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Challenger</p>
                    <p className="font-display font-semibold text-navy">{challenger?.name}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Attempt scheduled for {app.proposedDate ? formatDateShort(app.proposedDate) : "TBD"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
