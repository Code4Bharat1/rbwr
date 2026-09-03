import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";

export function WizardSuccess({
  applicationId,
  title,
}: {
  applicationId: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-6 py-14 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
        <PartyPopper className="h-8 w-8" />
      </span>
      <h2 className="font-display text-2xl font-semibold text-navy">Application Submitted</h2>
      <p className="max-w-md text-muted-foreground">{title}</p>
      <div className="rounded-xl border border-dashed border-border bg-secondary/40 px-6 py-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Application ID</p>
        <p className="mt-1 font-mono text-lg font-semibold text-navy">{applicationId}</p>
        <div className="mt-2 flex justify-center">
          <StatusBadge status="submitted" />
        </div>
      </div>
      <Button asChild size="lg" className="mt-2 bg-navy-gradient text-white hover:opacity-90">
        <Link href={`/applications/${applicationId}`}>Track Application</Link>
      </Button>
    </div>
  );
}
