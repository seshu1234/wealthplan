"use client";

import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { CHART_COLORS, CHART_COLORS_DARK } from "@/lib/chart-colors";

export interface ChartDataKey {
  key: string;
  fillOpacity?: number;
}

interface GrowthChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKeys?: ChartDataKey[]; // for multiple areas
  dataKeyX?: string; // e.g. "year"
  dataKeyY?: string; // fallback for single area
  format?: "currency" | "number" | "percent";
}

export function GrowthChart({
  data,
  dataKeys,
  dataKeyX = "name",
  dataKeyY = "value",
  format = "number"
}: GrowthChartProps) {
  const { theme } = useTheme();
  // We'll use the primary color for the main/top area, and perhaps a muted version or different shade for others
  // For a beautiful multi-series chart, you'd typically have a palette. For now, we'll use primary and a secondary if available.
  const colors = theme === "dark" ? CHART_COLORS_DARK : CHART_COLORS;

  const yAxisFormatter = (value: number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        notation: "compact", // This shows "10K" instead of "10,000" on the axis
      }).format(value);
    }
    return value.toString();
  };

  const tooltipFormatter = (value: number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toString();
  };

  // If dataKeys is provided, render multiple areas. Otherwise, render one based on dataKeyY
  const areasToRender = dataKeys 
    ? dataKeys 
    : [{ key: dataKeyY, fillOpacity: 1 }];

  // Simple palette logic for multiple series
  const getThemeColor = (idx: number) => {
    if (idx === 0) return colors.primary;
    if (idx === 1) return theme === "dark" ? "#10b981" : "#059669"; // Emerald for money/interest
    if (idx === 2) return theme === "dark" ? "#6366f1" : "#4f46e5"; // Indigo
    return colors.primary;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          // For stacked charts, we can use stackOffset="none" by default, or "expand" etc. if needed
        >
          <defs>
            {areasToRender.map((area, idx) => (
              <linearGradient key={"color-" + idx} id={"color-" + idx} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getThemeColor(idx)} stopOpacity={area.fillOpacity ?? 0.3} />
                <stop offset="95%" stopColor={getThemeColor(idx)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis 
            dataKey={dataKeyX} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: colors.muted }} 
            dy={10}
            minTickGap={30}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: colors.muted }} 
            dx={-10}
            tickFormatter={yAxisFormatter} 
            width={80}
          />
          <Tooltip 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => [tooltipFormatter(Number(value) || 0), name]}
            contentStyle={{ 
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            labelStyle={{ 
              color: theme === 'dark' ? '#94a3b8' : '#64748b',
              marginBottom: '4px',
              fontWeight: 600
            }}
            itemStyle={{
              color: theme === 'dark' ? '#f8fafc' : '#0f172a',
              fontWeight: 500
            }}
          />
          {areasToRender.map((area, idx) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              stroke={getThemeColor(idx)}
              fillOpacity={1}
              fill={"url(#color-" + idx + ")"}
              strokeWidth={2}
              stackId="1" // Stack the areas for total balance
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
