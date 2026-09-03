"use client";

import { PageHeader } from "@/components/shared/page-header";
import { RecordCard } from "@/components/records/record-card";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getRecordsForUser } from "@/lib/selectors";

export default function MyRecordsPage() {
  const userId = useCurrentParticipantId();
  const records = getRecordsForUser(userId);

  return (
    <div>
      <PageHeader title="My Records" description="Records you currently or previously hold." />
      {records.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {records.map((r) => <RecordCard key={r.id} record={r} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          You don&apos;t hold any records yet.
        </p>
      )}
    </div>
  );
}
