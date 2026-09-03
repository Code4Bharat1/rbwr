"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Laptop, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { MobileAdjudicationPanel } from "@/components/adjudication/mobile-adjudication-panel";
import { getAttempt } from "@/lib/data/attempts";
import { getApplicationForAttempt, getRecordForApplication, getAttemptTitle } from "@/lib/selectors";
import { getCity, getCountry } from "@/lib/data/geo";
import { getUser } from "@/lib/data/users";
import { getEvidenceForAttempt } from "@/lib/data/evidence";
import { getWitnessesForAttempt } from "@/lib/data/witnesses";
import { getReportForAttempt } from "@/lib/data/reports";
import { formatDate, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ApplicationStatus } from "@/lib/types";

export default function AttemptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const attempt = getAttempt(id);
  if (!attempt) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Attempt not found</h1>
      </div>
    );
  }

  const application = getApplicationForAttempt(attempt);
  const record = getRecordForApplication(application);
  const title = getAttemptTitle(attempt);
  const city = getCity(attempt.cityId);
  const country = getCountry(attempt.countryId);
  const adjudicator = getUser(attempt.adjudicatorId);
  const evidence = getEvidenceForAttempt(attempt.id);
  const witnesses = getWitnessesForAttempt(attempt.id);
  const report = getReportForAttempt(attempt.id);

  const statusLabel: ApplicationStatus =
    attempt.status === "live" ? "attempt_live" : attempt.status === "completed" ? "evidence_submitted" : "scheduled";

  return (
    <div>
      <PageHeader
        title={title}
        description={`${attempt.venue}, ${city?.name}, ${country?.name}`}
        action={
          <div className="flex items-center gap-2">
            <StatusBadge status={statusLabel} />
            <div className="flex rounded-lg border border-border p-1">
              <Button
                size="sm"
                variant={view === "desktop" ? "default" : "ghost"}
                className={cn("gap-1.5", view === "desktop" && "bg-navy-gradient text-white")}
                onClick={() => setView("desktop")}
              >
                <Laptop className="h-3.5 w-3.5" /> Desktop
              </Button>
              <Button
                size="sm"
                variant={view === "mobile" ? "default" : "ghost"}
                className={cn("gap-1.5", view === "mobile" && "bg-navy-gradient text-white")}
                onClick={() => setView("mobile")}
              >
                <Smartphone className="h-3.5 w-3.5" /> Mobile Adjudication
              </Button>
            </div>
          </div>
        }
      />

      {view === "mobile" ? (
        <MobileAdjudicationPanel
          attempt={attempt}
          initialChecklist={
            report?.checklist ?? {
              safetyRequirementsMet: false,
              timingVerified: false,
              participantCountVerified: false,
              evidenceCaptured: false,
              witnessSignaturesCollected: false,
            }
          }
          initialWitnesses={witnesses}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-semibold text-navy">Attempt Details</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                <Detail label="Date" value={formatDate(attempt.date)} />
                <Detail label="Time" value={attempt.time} />
                <Detail label="Organizer" value={attempt.organizer} />
                <Detail label="Adjudicator" value={adjudicator?.name ?? "—"} />
                <Detail label="Expected Participants" value={attempt.expectedParticipants.toLocaleString()} />
                <Detail label="Actual Participants" value={attempt.actualParticipants?.toLocaleString() ?? "Pending"} />
              </dl>
              {attempt.measurement && (
                <div className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm">
                  <span className="font-semibold text-navy">{attempt.measurement.value}</span>{" "}
                  {attempt.measurement.unit} — {attempt.measurement.method}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-display text-lg font-semibold text-navy">Evidence</h2>
              {evidence.length > 0 ? (
                <ul className="mt-3 divide-y divide-border">
                  {evidence.map((e) => (
                    <li key={e.id} className="flex items-center justify-between py-2.5 text-sm">
                      <div>
                        <p className="font-medium">{e.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {getUser(e.uploadedByUserId)?.name} · {formatDateTime(e.timestamp)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          e.verificationStatus === "verified" && "bg-verified/10 text-verified",
                          e.verificationStatus === "pending" && "bg-pending/10 text-pending",
                          e.verificationStatus === "flagged" && "bg-live/10 text-live"
                        )}
                      >
                        {e.verificationStatus}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No evidence uploaded yet.</p>
              )}
            </div>

            {report && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold text-navy">Adjudication Report</h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {Object.entries(report.checklist).map(([k, v]) => (
                    <li key={k} className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", v ? "bg-verified" : "bg-border")} />
                      {k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">{report.notes}</p>
                <span
                  className={cn(
                    "mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium",
                    report.decision === "recommend-verify" && "bg-verified/10 text-verified",
                    report.decision === "recommend-reject" && "bg-live/10 text-live",
                    report.decision === "pending" && "bg-pending/10 text-pending"
                  )}
                >
                  {report.decision.replace("-", " ")}
                </span>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-sm font-semibold text-navy">Witnesses</h3>
              <ul className="mt-3 space-y-2">
                {witnesses.map((w) => (
                  <li key={w.id} className="text-sm">
                    <p className="font-medium">{w.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {w.role} · {w.signed ? "Signed" : "Pending"}
                    </p>
                  </li>
                ))}
                {witnesses.length === 0 && <p className="text-sm text-muted-foreground">No witnesses on file.</p>}
              </ul>
            </div>
            {application && (
              <Link href={`/applications/${application.id}`} className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
                <h3 className="font-display text-sm font-semibold text-navy">Application</h3>
                <p className="mt-1 text-sm text-royal">{application.id} →</p>
              </Link>
            )}
            {record && (
              <Link href={`/records/${record.id}`} className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
                <h3 className="font-display text-sm font-semibold text-navy">Record</h3>
                <p className="mt-1 text-sm text-royal">{record.title} →</p>
              </Link>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium text-navy">{value}</p>
    </div>
  );
}
