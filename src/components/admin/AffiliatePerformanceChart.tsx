// components/admin/AffiliatePerformanceChart.tsx
'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Mon', revenue: 4000, clicks: 2400 },
  { name: 'Tue', revenue: 3000, clicks: 1398 },
  { name: 'Wed', revenue: 2000, clicks: 9800 },
  { name: 'Thu', revenue: 2780, clicks: 3908 },
  { name: 'Fri', revenue: 1890, clicks: 4800 },
  { name: 'Sat', revenue: 2390, clicks: 3800 },
  { name: 'Sun', revenue: 3490, clicks: 4300 },
]

export function AffiliatePerformanceChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))', 
              borderColor: 'hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
