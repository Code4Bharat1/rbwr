"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RecordCard } from "@/components/records/record-card";
import { records } from "@/lib/data/records";
import { categories } from "@/lib/data/categories";
import { countries, cities, districts, getClub, getCity } from "@/lib/data/geo";
import { districtIdForRecord } from "@/lib/selectors";
import { CategoryGroup, RecordHolderType, RecordStatus } from "@/lib/types";

const statusOptions: RecordStatus[] = ["current", "broken", "pending", "historical"];
const holderTypeOptions: RecordHolderType[] = ["individual", "group", "club", "corporate"];
const groupOptions = Array.from(new Set(categories.map((c) => c.group))) as CategoryGroup[];

const citiesWithRecords = cities.filter((c) => records.some((r) => r.cityId === c.id));
const districtsWithRecords = districts.filter((d) => records.some((r) => districtIdForRecord(r) === d.id));

export function RecordsExplorer({
  initialQuery = "",
  initialGroup,
}: {
  initialQuery?: string;
  initialGroup?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [group, setGroup] = useState<string>(initialGroup ?? "all");
  const [country, setCountry] = useState<string>("all");
  const [city, setCity] = useState<string>("all");
  const [district, setDistrict] = useState<string>("all");
  const [statuses, setStatuses] = useState<RecordStatus[]>([]);
  const [holderTypes, setHolderTypes] = useState<RecordHolderType[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(Boolean(initialGroup));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((r) => {
      const category = categories.find((c) => c.id === r.categoryId);
      if (group !== "all" && category?.group !== group) return false;
      if (country !== "all" && r.countryId !== country) return false;
      if (city !== "all" && r.cityId !== city) return false;
      if (district !== "all" && districtIdForRecord(r) !== district) return false;
      if (statuses.length > 0 && !statuses.includes(r.status)) return false;
      if (holderTypes.length > 0 && !holderTypes.includes(r.holderType)) return false;
      if (!q) return true;
      const clubName = r.holderClubId ? getClub(r.holderClubId)?.name.toLowerCase() ?? "" : "";
      const cityName = getCity(r.cityId)?.name.toLowerCase() ?? "";
      return (
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.holderName.toLowerCase().includes(q) ||
        clubName.includes(q) ||
        cityName.includes(q)
      );
    });
  }, [query, group, country, city, district, statuses, holderTypes]);

  function toggleStatus(s: RecordStatus) {
    setStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }
  function toggleHolderType(h: RecordHolderType) {
    setHolderTypes((prev) => (prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]));
  }
  function clearFilters() {
    setGroup("all");
    setCountry("all");
    setCity("all");
    setDistrict("all");
    setStatuses([]);
    setHolderTypes([]);
    setQuery("");
  }

  const activeFilterCount =
    (group !== "all" ? 1 : 0) +
    (country !== "all" ? 1 : 0) +
    (city !== "all" ? 1 : 0) +
    (district !== "all" ? 1 : 0) +
    statuses.length +
    holderTypes.length;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, record ID, holder, club, or city…"
            className="pl-9"
          />
        </div>
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            {groupOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced((v) => !v)}
          className="gap-2 whitespace-nowrap"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Advanced Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-royal text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>

      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 gap-6 rounded-2xl border border-border bg-secondary/40 p-5 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Status</p>
            <div className="flex flex-col gap-2">
              {statusOptions.map((s) => (
                <label key={s} className="flex items-center gap-2 text-sm capitalize">
                  <Checkbox checked={statuses.includes(s)} onCheckedChange={() => toggleStatus(s)} />
                  {s === "current" ? "Current Records" : s === "broken" ? "Broken Records" : s === "pending" ? "Pending Verification" : "Historical"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Holder Type</p>
            <div className="flex flex-col gap-2">
              {holderTypeOptions.map((h) => (
                <label key={h} className="flex items-center gap-2 text-sm capitalize">
                  <Checkbox checked={holderTypes.includes(h)} onCheckedChange={() => toggleHolderType(h)} />
                  {h}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Country</p>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">City</p>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {citiesWithRecords.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Rotary District</p>
            <Select value={district} onValueChange={setDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districtsWithRecords.map((d) => (
                  <SelectItem key={d.id} value={d.id}>District {d.number} — {d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
                <X className="h-3.5 w-3.5" /> Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length} record{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RecordCard key={r.id} record={r} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
          No records match your filters. Try clearing some filters or searching a different term.
        </div>
      )}
    </div>
  );
}
