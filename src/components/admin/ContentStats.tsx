// components/admin/ContentStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Eye, MessageSquare, Share2 } from 'lucide-react'

export function ContentStats() {
  const stats = [
    { title: 'Total Articles', value: '156', icon: FileText, change: '+4' },
    { title: 'Total Views', value: '245k', icon: Eye, change: '+18k' },
    { title: 'Comments', value: '892', icon: MessageSquare, change: '+56' },
    { title: 'Shares', value: '1.2k', icon: Share2, change: '+82' },
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
              <span className="text-green-600">{stat.change}</span> this month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
