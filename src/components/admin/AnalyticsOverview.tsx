// components/admin/AnalyticsOverview.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Users, MousePointerClick, Clock } from 'lucide-react'

export function AnalyticsOverview({ events }: { events?: Record<string, unknown>[] }) {
  // Use events to potentially calculate real-time stats in the future
  console.log('Events received:', events?.length)
  const stats = [
    { title: 'Page Views', value: '45,231', icon: Eye, change: '+12.5%' },
    { title: 'Unique Visitors', value: '12,843', icon: Users, change: '+8.2%' },
    { title: 'Bounce Rate', value: '42.3%', icon: MousePointerClick, change: '-3.1%' },
    { title: 'Avg. Session', value: '4m 32s', icon: Clock, change: '+1.4%' },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>{' '}
              vs last period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
