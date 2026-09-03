"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { CHART } from "@/lib/chart-theme";

export type StatusDonutDatum = { name: string; value: number; role: "good" | "warning" | "critical" };

const roleColor: Record<StatusDonutDatum["role"], string> = {
  good: CHART.statusGood,
  warning: CHART.statusWarning,
  critical: CHART.statusCritical,
};

const roleIcon = {
  good: CheckCircle2,
  warning: AlertTriangle,
  critical: XCircle,
};

export function StatusDonut({ title, data }: { title: string; data: StatusDonutDatum[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
      <div className="mt-2 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {data.map((d, i) => (
                  <Cell key={i} fill={roleColor[d.role]} stroke={CHART.surface} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: CHART.gridline, fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          {data.map((d) => {
            const Icon = roleIcon[d.role];
            const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
            return (
              <div key={d.name} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4 shrink-0" style={{ color: roleColor[d.role] }} />
                <span className="flex-1 text-foreground/80">{d.name}</span>
                <span className="font-medium text-navy">{d.value}</span>
                <span className="w-10 text-right text-xs text-muted-foreground">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
