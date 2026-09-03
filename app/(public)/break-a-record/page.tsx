import { SectionHeading } from "@/components/shared/section-heading";
import { BreakARecordWizard } from "@/components/wizard/break-a-record-wizard";

export default async function BreakARecordPage({
  searchParams,
}: {
  searchParams: Promise<{ record?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Break a Record"
        title="Challenge an Existing World Record"
        description="Select the record you want to break, tell us about yourself, and describe your planned attempt."
      />
      <div className="mt-8">
        <BreakARecordWizard initialRecordId={params.record} />
      </div>
    </div>
  );
}
