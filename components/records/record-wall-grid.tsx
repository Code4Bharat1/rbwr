import { WorldRecord } from "@/lib/types";
import { RecordCard } from "@/components/records/record-card";

export function RecordWallGrid({ records }: { records: WorldRecord[] }) {
  if (records.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No records to display for this selection.
      </p>
    );
  }
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
      {records.map((r) => (
        <RecordCard key={r.id} record={r} />
      ))}
    </div>
  );
}
