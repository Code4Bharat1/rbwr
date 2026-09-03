"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RecordWallGrid } from "@/components/records/record-wall-grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { records } from "@/lib/data/records";
import { cities } from "@/lib/data/geo";

export default function RecordWallPage() {
  const [cityId, setCityId] = useState("all");
  const filtered = useMemo(
    () => (cityId === "all" ? records : records.filter((r) => r.cityId === cityId)),
    [cityId]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Hall of Fame"
          title="The Global Record Wall"
          description="Every verified achievement, displayed in one place."
        />
        <Select value={cityId} onValueChange={setCityId}>
          <SelectTrigger className="w-56"><SelectValue placeholder="All Cities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-8">
        <RecordWallGrid records={filtered} />
      </div>
    </div>
  );
}
