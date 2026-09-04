"use client";

import { useMemo, useState } from "react";
import { Globe } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Podium } from "@/components/leaderboards/podium";
import { countries } from "@/lib/data/geo";
import {
  getCategoryLeaderboard,
  getCityLeaderboard,
  getClubLeaderboard,
  getCountryLeaderboard,
  getDistrictLeaderboard,
  getIndividualLeaderboard,
} from "@/lib/selectors";

const tabConfig = [
  { value: "individuals", label: "Individuals", data: getIndividualLeaderboard },
  { value: "clubs", label: "Clubs", data: getClubLeaderboard },
  { value: "districts", label: "Districts", data: getDistrictLeaderboard },
  { value: "cities", label: "Cities", data: getCityLeaderboard },
  { value: "countries", label: "Countries", data: getCountryLeaderboard },
  { value: "categories", label: "Categories", data: getCategoryLeaderboard },
] as const;

export default function LeaderboardsPage() {
  const [tab, setTab] = useState<(typeof tabConfig)[number]["value"]>("individuals");
  const [countryFilter, setCountryFilter] = useState("all");

  const active = tabConfig.find((t) => t.value === tab)!;
  const entries = useMemo(() => {
    const all = active.data();
    if (countryFilter === "all") return all;
    const countryName = countries.find((c) => c.id === countryFilter)?.name;
    if (!countryName) return all;
    return all.filter((e) => e.subtitle.includes(countryName) || e.name.includes(countryName));
  }, [active, countryFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Rankings" title="Global Leaderboards" align="center" />

      <div className="mt-8 flex flex-col items-center gap-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList className="flex-wrap">
            {tabConfig.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-56"><SelectValue placeholder="Global" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" /> Global</span>
            </SelectItem>
            {countries.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-10">
        <Podium entries={entries} />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Verified Records</th>
              <th className="px-4 py-3">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((e, i) => (
              <tr key={e.id} className={i < 3 ? "bg-gold/[0.03]" : undefined}>
                <td className="px-4 py-3 font-semibold text-navy">{i + 1}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.subtitle}</p>
                </td>
                <td className="px-4 py-3">{e.recordCount}</td>
                <td className="px-4 py-3 font-medium text-royal">{e.points}</td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No entries match this filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
