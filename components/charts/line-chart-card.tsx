"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART } from "@/lib/chart-theme";

export function LineChartCard({
  title,
  data,
  dataKey = "value",
  nameKey = "name",
  height = 260,
}: {
  title: string;
  data: Record<string, string | number>[];
  dataKey?: string;
  nameKey?: string;
  height?: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 16, bottom: 4, left: 4 }}>
            <CartesianGrid stroke={CHART.gridline} vertical={false} />
            <XAxis dataKey={nameKey} tick={{ fill: CHART.secondaryInk, fontSize: 12 }} axisLine={{ stroke: CHART.axis }} tickLine={false} />
            <YAxis tick={{ fill: CHART.mutedInk, fontSize: 12 }} axisLine={{ stroke: CHART.axis }} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: CHART.gridline, fontSize: 13 }} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={CHART.seriesBlue}
              strokeWidth={2}
              dot={{ r: 4, fill: CHART.seriesBlue, strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
