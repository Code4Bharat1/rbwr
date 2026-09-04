import { SectionHeading } from "@/components/shared/section-heading";
import { FlowNode } from "@/components/flow/flow-node";

function VLine({ className = "" }: { className?: string }) {
  return <div className={`mx-auto h-8 w-px bg-border ${className}`} />;
}

export default function PlatformFlowPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Complete Ecosystem"
        title="Platform Flow"
        description="Every stage of the RBWR lifecycle, connected. Click any node to jump straight into that live screen."
        align="center"
      />

      <div className="mt-12 flex flex-col items-center">
        <FlowNode id="pf-public" label="PUBLIC WEBSITE" href="/" variant="accent" className="w-64" />
        <VLine />
        <div className="relative w-full max-w-xl">
          <div className="absolute left-0 right-0 top-0 h-px bg-border" />
        </div>
        <div className="grid w-full max-w-xl grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-records" label="RECORDS" href="/records" />
          </div>
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-application" label="APPLICATION" href="/break-a-record" />
          </div>
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-adjudicators" label="ADJUDICATORS" href="/adjudicators" />
          </div>
        </div>

        <VLine />
        <FlowNode id="pf-review" label="RBWR REVIEW" href="/reviewer" />
        <VLine />
        <FlowNode id="pf-guidelines" label="GUIDELINES ISSUED" href="/guidelines/cat-mass-formation" />
        <VLine />
        <FlowNode id="pf-schedule" label="SCHEDULE ATTEMPT" href="/reviewer/applications/app-05" />
        <VLine />
        <FlowNode id="pf-assign" label="ADJUDICATOR ASSIGNED" href="/reviewer/assignments/app-08" />
        <VLine />
        <FlowNode id="pf-live" label="LIVE ATTEMPT" href="/adjudicator/attempts/att-04" />
        <VLine />
        <FlowNode id="pf-evidence" label="EVIDENCE VAULT" href="/adjudicator/evidence" />
        <VLine />
        <FlowNode id="pf-report" label="ADJUDICATION REPORT" href="/adjudicator/attempts/att-01" />
        <VLine />
        <FlowNode id="pf-verification" label="VERIFICATION" href="/reviewer/verification/app-11" />

        <VLine />
        <div className="relative w-full max-w-md">
          <div className="absolute left-0 right-0 top-0 h-px bg-border" />
        </div>
        <div className="grid w-full max-w-md grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-verified" label="VERIFIED" href="/applications/app-01" variant="success" />
            <VLine className="h-6" />
            <FlowNode id="pf-certificate" label="CERTIFICATE" href="/certificates/cert-01" variant="success" />
          </div>
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-rejected" label="NOT VERIFIED" href="/reviewer/appeals" variant="critical" />
            <VLine className="h-6" />
            <FlowNode id="pf-appeal" label="APPEAL" href="/reviewer/appeals" variant="critical" />
          </div>
        </div>

        <VLine />
        <FlowNode id="pf-public-record" label="PUBLIC RECORD PAGE" href="/records/RBWR-IND-MH-MUM-2026-00427" variant="accent" className="w-64" />
        <VLine />
        <div className="relative w-full max-w-xl">
          <div className="absolute left-0 right-0 top-0 h-px bg-border" />
        </div>
        <div className="grid w-full max-w-xl grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-passport" label="PASSPORT" href="/passport/u3" />
          </div>
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-leaderboard" label="LEADERBOARD" href="/leaderboards" />
          </div>
          <div className="flex flex-col items-center gap-0">
            <VLine className="h-6" />
            <FlowNode id="pf-history" label="RECORD HISTORY" href="/records/RBWR-IND-MH-MUM-2026-00427" />
          </div>
        </div>
      </div>
    </div>
  );
}
