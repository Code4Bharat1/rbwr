"use client";

import Link from "next/link";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { applications } from "@/lib/data/applications";
import { getUser } from "@/lib/data/users";
import { getRecord } from "@/lib/data/records";
import { useDemoStore } from "@/lib/store/use-demo-store";

export default function AppealsPage() {
  const overrides = useDemoStore((s) => s.applicationStatusOverrides);
  const setApplicationStatus = useDemoStore((s) => s.setApplicationStatus);
  const appeals = applications.filter((a) => (overrides[a.id] ?? a.status) === "appeal");

  return (
    <div>
      <PageHeader title="Appeals" description="Applications where the applicant has requested a re-review after rejection." />
      <div className="flex flex-col gap-4">
        {appeals.map((app) => {
          const record = app.recordId ? getRecord(app.recordId) : undefined;
          const lastEvent = app.timeline[app.timeline.length - 1];
          return (
            <div key={app.id} className="rounded-2xl border border-orange-warm/30 bg-orange-warm/5 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-warm" />
                <div className="flex-1">
                  <p className="font-medium text-navy">{record?.title ?? app.proposedTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {app.id} · {getUser(app.applicantUserId)?.name}
                  </p>
                  <p className="mt-2 text-sm text-foreground/80">{lastEvent?.notes}</p>
                  <div className="mt-3 flex gap-2">
                    <Button
                      size="sm"
                      className="bg-navy-gradient text-white hover:opacity-90"
                      onClick={() => {
                        setApplicationStatus(app.id, "under_verification");
                        toast.success("Appeal accepted — application returned to verification");
                      }}
                    >
                      Accept Appeal
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setApplicationStatus(app.id, "rejected");
                        toast("Appeal denied — original rejection upheld");
                      }}
                    >
                      Uphold Rejection
                    </Button>
                    <Link href={`/applications/${app.id}`} className="ml-auto self-center text-sm text-royal hover:underline">
                      View application →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {appeals.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No applications are currently under appeal.
          </p>
        )}
      </div>
    </div>
  );
}
