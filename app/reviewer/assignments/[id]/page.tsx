"use client";

import { use, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, CalendarClock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { AdjudicatorPickerCard } from "@/components/adjudication/adjudicator-picker-card";
import { useApplicationById } from "@/hooks/use-application";
import { useApplicationStatus } from "@/hooks/use-application-status";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { getAttempt } from "@/lib/data/attempts";
import { getCity, getCountry, getClub } from "@/lib/data/geo";
import { adjudicatorProfiles } from "@/lib/data/adjudicators";
import { isAdjudicatorConflicted } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default function AdjudicatorAssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const application = useApplicationById(id);
  const effectiveStatus = useApplicationStatus(application) ?? "submitted";

  const attempt = application?.attemptId ? getAttempt(application.attemptId) : undefined;
  const [selectedId, setSelectedId] = useState(attempt?.adjudicatorId ?? "");
  const [assigned, setAssigned] = useState(false);

  if (!application || !attempt) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-2xl font-semibold text-navy">Assignment not found</h1>
        <Link href="/reviewer/assignments" className="mt-3 inline-block text-sm text-royal hover:underline">
          ← Back to Adjudicator Assignment
        </Link>
      </div>
    );
  }

  const record = application.recordId ? getRecord(application.recordId) : undefined;
  const city = getCity(attempt.cityId);
  const country = getCountry(attempt.countryId);
  const currentAdjudicator = getUser(attempt.adjudicatorId);
  const title = record?.title ?? application.proposedTitle ?? "Untitled Application";
  const selectedConflicted = isAdjudicatorConflicted(selectedId, application, record);

  return (
    <div>
      <Link href="/reviewer/assignments" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Adjudicator Assignment
      </Link>
      <PageHeader
        title={title}
        description={application.id}
        action={<StatusBadge status={effectiveStatus} className="text-sm" />}
      />

      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-5 text-sm">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" /> {attempt.venue}, {city?.name}, {country?.name}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <CalendarClock className="h-4 w-4" /> {formatDate(attempt.date)} at {attempt.time}
        </span>
        {record?.holderClubId && (
          <span className="text-muted-foreground">
            Organizing club: <span className="font-medium text-navy">{getClub(record.holderClubId)?.name}</span>
          </span>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-royal/30 bg-royal/5 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-royal">Currently Assigned</span>
        {currentAdjudicator ? (
          <div className="flex items-center gap-2">
            <UserAvatar initials={currentAdjudicator.initials} color={currentAdjudicator.avatarColor} size="sm" />
            <span className="text-sm font-medium text-navy">{currentAdjudicator.name}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No adjudicator assigned yet</span>
        )}
      </div>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold text-navy">Choose an Adjudicator</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Cards marked with a conflict cannot be selected — they belong to the club organizing this attempt.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adjudicatorProfiles.map((profile) => {
          const user = getUser(profile.userId)!;
          const city = getCity(user.cityId);
          const country = getCountry(user.countryId);
          const conflicted = isAdjudicatorConflicted(profile.userId, application, record);
          return (
            <AdjudicatorPickerCard
              key={profile.userId}
              user={user}
              profile={profile}
              location={`${city?.name}, ${country?.name}`}
              conflictReason={
                conflicted ? `Belongs to ${getClub(user.clubId ?? "")?.name}, the organizing club` : undefined
              }
              selected={selectedId === profile.userId}
              onSelect={() => setSelectedId(profile.userId)}
            />
          );
        })}
      </div>

      <div className="sticky bottom-6 mt-8 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
        <p className="text-sm text-muted-foreground">
          {!selectedId ? (
            "Select an adjudicator above"
          ) : selectedConflicted ? (
            <span className="text-live">
              <span className="font-medium">{getUser(selectedId)?.name}</span> has a conflict of interest — choose another adjudicator
            </span>
          ) : (
            <>Assigning <span className="font-medium text-navy">{getUser(selectedId)?.name}</span></>
          )}
        </p>
        <Button
          className="bg-navy-gradient text-white hover:opacity-90"
          disabled={!selectedId || selectedConflicted || assigned}
          onClick={() => {
            setAssigned(true);
            toast.success(`${getUser(selectedId)?.name} assigned to this attempt`);
          }}
        >
          {assigned ? "Assigned" : "Assign Adjudicator"}
        </Button>
      </div>
    </div>
  );
}
