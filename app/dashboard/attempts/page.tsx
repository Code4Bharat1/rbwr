"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { AttemptCard } from "@/components/attempts/attempt-card";
import { useCurrentParticipantId } from "@/hooks/use-current-participant";
import { getAttemptsForApplicant } from "@/lib/selectors";

export default function MyAttemptsPage() {
  const userId = useCurrentParticipantId();
  const attempts = getAttemptsForApplicant(userId);

  return (
    <div>
      <PageHeader title="My Attempts" description="Every scheduled, live, or completed attempt tied to your applications." />
      {attempts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {attempts.map((a) => <AttemptCard key={a.id} attempt={a} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          No attempts yet. <Link href="/break-a-record" className="text-royal hover:underline">Start an application</Link>.
        </p>
      )}
    </div>
  );
}
