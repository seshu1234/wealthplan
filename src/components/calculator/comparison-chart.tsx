"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import { CHART_COLORS, CHART_COLORS_DARK } from "@/lib/chart-colors";

interface ComparisonChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKeyX: string;
  bars: { key: string; name: string; colorKey: "primary" | "secondary" | "tertiary" | "muted" | "negative" }[];
  formatYAxis?: (val: number) => string;
  formatTooltip?: (val: number) => string;
}

export function ComparisonChart({
  data,
  dataKeyX,
  bars,
  formatYAxis = (v) => v.toString(),
  formatTooltip = (v) => v.toString()
}: ComparisonChartProps) {
  const { theme } = useTheme();
  const colors = theme === "dark" ? CHART_COLORS_DARK : CHART_COLORS;

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
            formatter={(value: any, name: any) => [formatTooltip(Number(value) || 0), name]}
            labelStyle={{ color: "black" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          {bars.map((bar) => (
            <Bar 
              key={bar.key} 
              dataKey={bar.key} 
              name={bar.name} 
              fill={colors[bar.colorKey]} 
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
