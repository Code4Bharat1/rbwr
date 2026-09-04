"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AlertTriangle, ArrowRight, CalendarClock, CheckCircle2, ScrollText, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ApplicationTimeline } from "@/components/applications/application-timeline";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useApplicationById } from "@/hooks/use-application";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { getCategory } from "@/lib/data/categories";
import { getAttempt } from "@/lib/data/attempts";
import { isAdjudicatorConflicted } from "@/lib/selectors";
import { formatDate, formatDateShort } from "@/lib/format";

export default function ApplicationReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = useApplicationById(id);
  const effectiveStatus = useApplicationStatus(application) ?? "submitted";
  const setApplicationStatus = useDemoStore((s) => s.setApplicationStatus);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const attempt = application?.attemptId ? getAttempt(application.attemptId) : undefined;

  const record = application?.recordId ? getRecord(application.recordId) : undefined;
  const category = application ? getCategory(application.categoryId) : undefined;
  const applicant = application ? getUser(application.applicantUserId) : undefined;
  const assignedAdjudicator = attempt ? getUser(attempt.adjudicatorId) : undefined;
  const conflict = application && attempt ? isAdjudicatorConflicted(attempt.adjudicatorId, application, record) : false;

  if (!application) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Application not found</h1>
      </div>
    );
  }

  const title = record?.title ?? application.proposedTitle ?? "Untitled Application";

  function act(next: Parameters<typeof setApplicationStatus>[1], message: string) {
    setApplicationStatus(application!.id, next);
    toast.success(message);
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={`${application.id} · ${category?.name}`}
        action={<StatusBadge status={effectiveStatus} className="text-sm" />}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* LEFT: application details */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold text-navy">Application Details</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
              <Detail label="Applicant" value={applicant?.name ?? "—"} />
              <Detail label="Type" value={application.type === "break" ? "Break Record" : "Create Record"} />
              <Detail label="Venue" value={`${application.venueCity}, ${application.venueCountry}`} />
              <Detail label="Proposed Date" value={application.proposedDate ? formatDateShort(application.proposedDate) : "—"} />
              <Detail label="Expected Participants" value={application.expectedParticipants ? application.expectedParticipants.toLocaleString() : "—"} />
              <Detail label="Submitted" value={formatDate(application.createdDate)} />
            </dl>
            <p className="mt-4 whitespace-pre-line border-t border-border pt-4 text-sm text-muted-foreground">
              {application.description}
            </p>
            {record && (
              <Link href={`/records/${record.id}`} className="mt-3 inline-block text-sm text-royal hover:underline">
                View record being challenged →
              </Link>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold text-navy">Activity Timeline</h2>
            <div className="mt-4">
              <ApplicationTimeline application={application} effectiveStatus={effectiveStatus} />
            </div>
          </div>
        </div>

        {/* RIGHT: reviewer actions */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold text-navy">Reviewer Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button className="gap-1.5 bg-verified text-white hover:bg-verified/90" onClick={() => act("approved", "Application approved")}>
                <CheckCircle2 className="h-4 w-4" /> Approve
              </Button>
              <Button variant="outline" className="gap-1.5" onClick={() => act("under_review", "Changes requested from applicant")}>
                <AlertTriangle className="h-4 w-4" /> Request Changes
              </Button>
              <Button variant="destructive" className="gap-1.5" onClick={() => act("not_verified", "Application marked Not Verified")}>
                <XCircle className="h-4 w-4" /> Not Verified
              </Button>
              <Button variant="outline" className="gap-1.5 border-gold/40 text-gold-deep hover:bg-gold/10" onClick={() => act("guidelines_issued", "Guidelines issued to applicant")}>
                <ScrollText className="h-4 w-4" /> Issue Guidelines
              </Button>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-sm font-medium text-navy">Reviewer Notes</p>
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a private review note…" rows={3} className="mt-2" />
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => {
                  if (!note.trim()) return;
                  setSavedNotes((n) => [note, ...n]);
                  setNote("");
                }}
              >
                Save Note
              </Button>
              {savedNotes.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {savedNotes.map((n, i) => <li key={i} className="rounded-lg bg-secondary/50 p-2">{n}</li>)}
                </ul>
              )}
            </div>
          </div>

          {attempt && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-royal">
                <CalendarClock className="h-4 w-4" />
                <h3 className="font-display text-base font-semibold">Schedule Attempt</h3>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <Detail label="Date" value={formatDate(attempt.date)} />
                <Detail label="Time" value={attempt.time} />
                <Detail label="Venue" value={attempt.venue} />
                <Detail label="Status" value={attempt.status} />
              </dl>
            </div>
          )}

          {attempt && (
            <Link
              href={`/reviewer/assignments/${application.id}`}
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-royal/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-navy">Adjudicator Assignment</h3>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              {assignedAdjudicator ? (
                <div className="mt-3 flex items-center gap-2.5">
                  <UserAvatar initials={assignedAdjudicator.initials} color={assignedAdjudicator.avatarColor} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">{assignedAdjudicator.name}</p>
                    <p className={conflict ? "flex items-center gap-1 text-xs text-live" : "flex items-center gap-1 text-xs text-verified"}>
                      {conflict ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                      {conflict ? "Conflict — needs reassignment" : "No conflict of interest"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No adjudicator assigned yet</p>
              )}
              <p className="mt-3 text-xs font-medium text-royal">Manage assignment →</p>
            </Link>
          )}
        </div>
      </div>
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
