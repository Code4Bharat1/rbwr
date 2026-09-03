"use client";

import { use } from "react";
import Link from "next/link";
import { FileText, MapPin, ScrollText, Users } from "lucide-react";
import { useApplicationById } from "@/hooks/use-application";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { StatusBadge } from "@/components/shared/status-badge";
import { SwitchDemoStatus } from "@/components/applications/switch-demo-status";
import { ApplicantActions } from "@/components/applications/applicant-actions";
import { ApplicationTimeline } from "@/components/applications/application-timeline";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { getGuideline } from "@/lib/data/guidelines";
import { getCategory } from "@/lib/data/categories";
import { formatDateShort } from "@/lib/format";

export default function ApplicationTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = useApplicationById(id);
  const effectiveStatus = useApplicationStatus(application) ?? "submitted";

  if (!application) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-navy">Application not found</h1>
        <p className="mt-2 text-muted-foreground">
          We couldn&apos;t find an application with ID <span className="font-mono">{id}</span>.
        </p>
        <Link href="/break-a-record" className="mt-4 inline-block text-royal underline">
          Start a new application
        </Link>
      </div>
    );
  }

  const applicant = getUser(application.applicantUserId);
  const record = application.recordId ? getRecord(application.recordId) : undefined;
  const category = getCategory(application.categoryId);
  const guideline = getGuideline(application.guidelinesId);
  const title = record?.title ?? application.proposedTitle ?? "Untitled Application";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs text-muted-foreground">{application.id}</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {application.type === "break" ? "Breaking an existing record" : "Proposing a new record"} ·{" "}
            {category?.name}
          </p>
        </div>
        <StatusBadge status={effectiveStatus} className="text-sm" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ApplicantActions application={application} effectiveStatus={effectiveStatus} />
      </div>

      <div className="mt-4">
        <SwitchDemoStatus application={application} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard icon={Users} label="Applicant" value={applicant?.name ?? "—"} />
        <InfoCard icon={MapPin} label="Venue" value={`${application.venueCity}, ${application.venueCountry}`} />
        <InfoCard icon={FileText} label="Proposed Date" value={application.proposedDate ? formatDateShort(application.proposedDate) : "—"} />
        <InfoCard icon={ScrollText} label="Expected Participants" value={application.expectedParticipants ? application.expectedParticipants.toLocaleString() : "—"} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-semibold text-navy">Application Timeline</h2>
          <div className="mt-6">
            <ApplicationTimeline application={application} effectiveStatus={effectiveStatus} />
          </div>
        </div>
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold text-navy">Description</h3>
            <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{application.description}</p>
          </div>
          {record && (
            <Link href={`/records/${record.id}`} className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
              <h3 className="font-display text-sm font-semibold text-navy">Related Record</h3>
              <p className="mt-1 text-sm text-royal">{record.title} →</p>
            </Link>
          )}
          {guideline && (
            <Link href={`/guidelines/${guideline.categoryId}`} className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
              <h3 className="font-display text-sm font-semibold text-navy">Guidelines</h3>
              <p className="mt-1 text-sm text-royal">Version {guideline.version} →</p>
            </Link>
          )}
          {application.attemptId && (
            <Link href={`/adjudicator/attempts/${application.attemptId}`} className="rounded-2xl border border-border bg-card p-5 hover:border-royal/40">
              <h3 className="font-display text-sm font-semibold text-navy">Attempt Details</h3>
              <p className="mt-1 text-sm text-royal">View attempt {application.attemptId} →</p>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Icon className="h-4 w-4 text-royal" />
      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-navy">{value}</p>
    </div>
  );
}
