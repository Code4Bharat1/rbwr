"use client";

import {
  Award,
  DollarSign,
  FileText,
  Globe2,
  Radio,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { LineChartCard } from "@/components/charts/line-chart-card";
import { StatusDonut } from "@/components/charts/status-donut";
import { users } from "@/lib/data/users";
import { applications } from "@/lib/data/applications";
import { attempts } from "@/lib/data/attempts";
import { records } from "@/lib/data/records";
import { certificates } from "@/lib/data/certificates";
import { countries } from "@/lib/data/geo";
import { categories } from "@/lib/data/categories";
import { auditLogsSorted } from "@/lib/data/audit-logs";
import { getUser } from "@/lib/data/users";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { formatDateTime } from "@/lib/format";

const monthlyApplications = [
  { name: "Apr", value: 1 },
  { name: "May", value: 2 },
  { name: "Jun", value: 2 },
  { name: "Jul", value: 2 },
  { name: "Aug", value: 4 },
  { name: "Sep", value: 4 },
];

const monthlyAttempts = [
  { name: "Apr", value: 1 },
  { name: "May", value: 1 },
  { name: "Jun", value: 2 },
  { name: "Jul", value: 2 },
  { name: "Aug", value: 3 },
  { name: "Sep", value: 1 },
];

export default function AdminOverviewPage() {
  const overrides = useDemoStore((s) => s.applicationStatusOverrides);
  const effective = applications.map((a) => overrides[a.id] ?? a.status);

  const activeApplications = effective.filter((s) => s !== "verified" && s !== "not_verified" && s !== "withdrawn").length;
  const liveAttempts = attempts.filter((a) => a.status === "live").length;
  const pendingVerification = effective.filter((s) => s === "under_verification").length;
  const verifiedRecords = records.filter((r) => r.status === "current").length;
  const revenue = applications.length * 150 + certificates.length * 75;

  const recordsByCountry = countries
    .map((c) => ({ name: c.code, value: records.filter((r) => r.countryId === c.id).length }))
    .filter((c) => c.value > 0)
    .sort((a, b) => b.value - a.value);

  const recordsByCategoryGroup = (() => {
    const totals = new Map<string, number>();
    for (const r of records) {
      const group = categories.find((c) => c.id === r.categoryId)?.group ?? "Other";
      totals.set(group, (totals.get(group) ?? 0) + 1);
    }
    return [...totals.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  })();

  const verificationStatusData = [
    { name: "Verified", value: effective.filter((s) => s === "verified").length, role: "good" as const },
    { name: "In Progress", value: effective.filter((s) => ["under_verification", "evidence_submitted", "attempt_live"].includes(s)).length, role: "warning" as const },
    { name: "Not Verified / Appeal", value: effective.filter((s) => s === "not_verified" || s === "appeal").length, role: "critical" as const },
  ];

  const activity = auditLogsSorted().slice(0, 8);

  return (
    <div>
      <PageHeader title="Command Center" description="Real-time snapshot of the RBWR platform." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric icon={Users} label="Total Users" value={users.length} />
        <Metric icon={FileText} label="Active Applications" value={activeApplications} />
        <Metric icon={Radio} label="Live Attempts" value={liveAttempts} />
        <Metric icon={ShieldCheck} label="Pending Verification" value={pendingVerification} />
        <Metric icon={Trophy} label="Verified Records" value={verifiedRecords} />
        <Metric icon={Award} label="Certificates Generated" value={certificates.length} />
        <Metric icon={Globe2} label="Countries" value={countries.length} />
        <Metric icon={DollarSign} label="Revenue (sample)" value={`$${revenue.toLocaleString()}`} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LineChartCard title="Application Growth" data={monthlyApplications} />
        <LineChartCard title="Monthly Attempts" data={monthlyAttempts} />
        <BarChartCard title="Records by Country" data={recordsByCountry} layout="vertical" />
        <BarChartCard title="Records by Category" data={recordsByCategoryGroup} layout="vertical" />
      </div>

      <div className="mt-6">
        <StatusDonut title="Application Verification Rate" data={verificationStatusData} />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-display text-base font-semibold text-navy">Platform Activity Feed</h3>
        <ul className="mt-3 divide-y divide-border">
          {activity.map((log) => (
            <li key={log.id} className="flex items-center justify-between py-2.5 text-sm">
              <div>
                <span className="font-medium">{getUser(log.userId)?.name}</span>{" "}
                <span className="text-muted-foreground">{log.action.toLowerCase()}</span>{" "}
                <span className="font-mono text-xs text-muted-foreground">{log.resource}</span>
              </div>
              <span className="text-xs text-muted-foreground">{formatDateTime(log.timestamp)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Icon className="h-5 w-5 text-royal" />
      <p className="mt-3 font-display text-2xl font-semibold text-navy">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
