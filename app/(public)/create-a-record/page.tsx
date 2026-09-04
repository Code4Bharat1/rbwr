import { SectionHeading } from "@/components/shared/section-heading";
import { CreateARecordWizard } from "@/components/wizard/create-a-record-wizard";

export default function CreateARecordPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Create a Record"
        title="Propose a Brand-New Record"
        description="Define your concept, category, and measurement method. RBWR will check it against the existing catalog."
      />
      <div className="mt-8">
        <CreateARecordWizard />
      </div>
    </div>
  );
}
