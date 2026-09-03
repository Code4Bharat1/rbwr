"use client";

import { use } from "react";
import Link from "next/link";
import { PartyPopper, Swords } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { RecordImage } from "@/components/shared/record-image";
import { Timeline, TimelineStep } from "@/components/shared/timeline";
import { SwitchDemoStatus } from "@/components/applications/switch-demo-status";
import { useApplicationById } from "@/hooks/use-application";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { getRecord } from "@/lib/data/records";
import { getUser } from "@/lib/data/users";
import { getAttempt } from "@/lib/data/attempts";
import { formatDate } from "@/lib/format";

export default function RecordBattleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = useApplicationById(id);
  const effectiveStatus = useApplicationStatus(application) ?? "submitted";

  if (!application || !application.recordId) {
    return <div className="py-20 text-center text-muted-foreground">Battle not found.</div>;
  }

  const record = getRecord(application.recordId)!;
  const challenger = getUser(application.applicantUserId)!;
  const attempt = application.attemptId ? getAttempt(application.attemptId) : undefined;
  const isNewHolder = effectiveStatus === "verified";

  const steps: TimelineStep[] = [
    { label: "Record Created", date: String(record.history[0]?.year ?? ""), state: "done", notes: record.history[0]?.holderName },
    { label: "Current Holder", date: formatDate(record.date), state: "done", notes: record.holderName },
    { label: "Challenge Accepted", date: formatDate(application.createdDate), state: "done", notes: `${challenger.name} applied to break this record` },
    {
      label: isNewHolder ? "Attempt Completed" : "Upcoming Attempt",
      date: application.proposedDate ? formatDate(application.proposedDate) : "TBD",
      state: isNewHolder ? "done" : "current",
      notes: attempt?.venue,
    },
    ...(isNewHolder ? [{ label: "New Record Holder", date: "", state: "current" as const, notes: challenger.name }] : []),
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {isNewHolder && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl bg-gold-gradient p-5 text-navy-deep">
          <PartyPopper className="h-6 w-6" />
          <div>
            <p className="font-display text-lg font-semibold">New Record Holder!</p>
            <p className="text-sm">{challenger.name} has officially unseated {record.history.at(-2)?.holderName ?? "the previous holder"}.</p>
          </div>
        </div>
      )}

      <RecordImage src={record.images[0]} alt={record.title} className="aspect-[21/9] w-full rounded-2xl" />
      <h1 className="mt-6 text-center font-display text-2xl font-semibold text-navy sm:text-3xl">{record.title}</h1>

      <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="text-center">
          <UserAvatar
            initials={isNewHolder ? challenger.initials : record.holderName.slice(0, 2).toUpperCase()}
            color={isNewHolder ? challenger.avatarColor : "navy"}
            size="lg"
            className="mx-auto"
          />
          <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
            {isNewHolder ? "New Holder" : "Current Holder"}
          </p>
          <p className="font-display font-semibold text-navy">{isNewHolder ? challenger.name : record.holderName}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-live/10 text-live">
          <Swords className="h-5 w-5" />
        </span>
        <div className="text-center">
          <UserAvatar initials={challenger.initials} color={challenger.avatarColor} size="lg" className="mx-auto" />
          <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
            {isNewHolder ? "Previous Holder" : "Challenger"}
          </p>
          <p className="font-display font-semibold text-navy">{isNewHolder ? record.holderName : challenger.name}</p>
        </div>
      </div>

      <div className="mt-10">
        <SwitchDemoStatus application={application} />
      </div>

      <div className="mt-10 max-w-xl">
        <Timeline steps={steps} />
      </div>

      <Link href={`/records/${record.id}`} className="mt-8 inline-block text-sm font-medium text-royal hover:underline">
        View full record page →
      </Link>
    </div>
  );
}
