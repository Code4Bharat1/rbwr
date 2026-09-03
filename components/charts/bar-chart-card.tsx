"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART } from "@/lib/chart-theme";

export function BarChartCard({
  title,
  data,
  dataKey = "value",
  nameKey = "name",
  layout = "vertical",
  height = 280,
}: {
  title: string;
  data: Record<string, string | number>[];
  dataKey?: string;
  nameKey?: string;
  layout?: "vertical" | "horizontal";
  height?: number;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-display text-sm font-semibold text-navy">{title}</h3>
      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout={layout === "vertical" ? "vertical" : "horizontal"}
            margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
          >
            <CartesianGrid stroke={CHART.gridline} horizontal={layout !== "vertical"} vertical={layout === "vertical"} />
            {layout === "vertical" ? (
              <>
                <XAxis type="number" tick={{ fill: CHART.mutedInk, fontSize: 12 }} axisLine={{ stroke: CHART.axis }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey={nameKey}
                  width={140}
                  tick={{ fill: CHART.secondaryInk, fontSize: 12 }}
                  axisLine={{ stroke: CHART.axis }}
                  tickLine={false}
                />
              </>
            ) : (
              <>
                <XAxis dataKey={nameKey} tick={{ fill: CHART.secondaryInk, fontSize: 12 }} axisLine={{ stroke: CHART.axis }} tickLine={false} />
                <YAxis tick={{ fill: CHART.mutedInk, fontSize: 12 }} axisLine={{ stroke: CHART.axis }} tickLine={false} />
              </>
            )}
            <Tooltip
              cursor={{ fill: "rgba(42,120,214,0.08)" }}
              contentStyle={{ borderRadius: 12, borderColor: CHART.gridline, fontSize: 13 }}
            />
            <Bar dataKey={dataKey} fill={CHART.seriesBlue} radius={layout === "vertical" ? [0, 4, 4, 0] : [4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
