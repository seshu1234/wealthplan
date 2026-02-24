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

interface GrowthChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKeyX: string; // e.g. "year"
  dataKeyY: string; // e.g. "balance"
  formatYAxis?: (val: number) => string;
  formatTooltip?: (val: number) => string;
}

export function GrowthChart({
  data,
  dataKeyX,
  dataKeyY,
  formatYAxis = (v) => v.toString(),
  formatTooltip = (v) => v.toString()
}: GrowthChartProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? CHART_COLORS_DARK : CHART_COLORS;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis 
            dataKey={dataKeyX} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: colors.muted }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: colors.muted }} 
            dx={-10}
            tickFormatter={formatYAxis} 
            width={80}
          />
          <Tooltip 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [formatTooltip(Number(value) || 0), "Balance"]}
            labelStyle={{ color: "black" }} // Basic styling, could be enhanced with custom tooltip
          />
          <Area
            type="monotone"
            dataKey={dataKeyY}
            stroke={colors.primary}
            fillOpacity={1}
            fill="url(#colorY)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
