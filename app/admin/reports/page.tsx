"use client";

import {
  Award,
  Building2,
  CalendarClock,
  DollarSign,
  FileText,
  Globe2,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { applications } from "@/lib/data/applications";
import { attempts } from "@/lib/data/attempts";
import { records } from "@/lib/data/records";
import { cities, countries, clubs } from "@/lib/data/geo";
import { adjudicatorProfiles } from "@/lib/data/adjudicators";
import { certificates } from "@/lib/data/certificates";

const growth = [
  { name: "Apr", value: 4 },
  { name: "May", value: 6 },
  { name: "Jun", value: 9 },
  { name: "Jul", value: 11 },
  { name: "Aug", value: 15 },
  { name: "Sep", value: 15 },
];

export default function AdminReportsPage() {
  const revenue = applications.length * 150 + certificates.length * 75;

  const cards = [
    { icon: FileText, label: "Applications", value: applications.length },
    { icon: ShieldCheck, label: "Verified Records", value: records.filter((r) => r.status === "current").length },
    { icon: CalendarClock, label: "Attempts", value: attempts.length },
    { icon: Users, label: "Participation", value: applications.reduce((s, a) => s + a.expectedParticipants, 0).toLocaleString() },
    { icon: MapPin, label: "Cities", value: cities.length },
    { icon: Globe2, label: "Countries", value: countries.length },
    { icon: Building2, label: "Clubs", value: clubs.length },
    { icon: Award, label: "Adjudicators", value: adjudicatorProfiles.length },
    { icon: DollarSign, label: "Revenue (sample)", value: `$${revenue.toLocaleString()}` },
  ];

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="Platform-wide reporting across every major entity."
        action={
          <Select defaultValue="90">
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-4">
            <c.icon className="h-4 w-4 text-royal" />
            <p className="mt-2 font-display text-xl font-semibold text-navy">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <LineChartCard title="Cumulative Verified Records" data={growth} />
      </div>
    </div>
  );
}
