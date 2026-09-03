import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { RecordsExplorer } from "@/components/records/records-explorer";

export const metadata: Metadata = {
  title: "Explore Records — RBWR",
  description:
    "Search the global RBWR record catalog by title, Record ID, holder, club, city, district, country, and category.",
};

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; group?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Explore"
        title="The Global Record Catalog"
        description="Search, filter, and discover every verified, pending, and historical record on RBWR."
      />
      <div className="mt-8">
        <RecordsExplorer initialQuery={params.q} initialGroup={params.group} />
      </div>
    </div>
  );
}
