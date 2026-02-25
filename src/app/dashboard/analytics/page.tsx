// app/admin/analytics/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/admin/DateRangePicker'
import { AnalyticsOverview } from '@/components/admin/AnalyticsOverview'
import { TopCalculators } from '@/components/admin/TopCalculators'
import { TrafficSources } from '@/components/admin/TrafficSources'
import { UserBehavior } from '@/components/admin/UserBehavior'

export default async function AnalyticsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  // Get analytics data for the last 30 days
  // eslint-disable-next-line react-hooks/purity
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data: events } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', thirtyDaysAgo)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Understand how users interact with your site</p>
        </div>
        <DateRangePicker />
      </div>

      {/* Overview Cards */}
      <AnalyticsOverview events={events || []} />

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculator Usage</CardTitle>
            <CardDescription>Most used calculators this period</CardDescription>
          </CardHeader>
          <CardContent>
            <TopCalculators events={events || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your users are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficSources events={events || []} />
          </CardContent>
        </Card>
      </div>

      {/* User Behavior */}
      <Card>
        <CardHeader>
          <CardTitle>User Behavior Flow</CardTitle>
          <CardDescription>How users navigate through your calculators and content</CardDescription>
        </CardHeader>
        <CardContent>
          <UserBehavior events={events || []} />
        </CardContent>
      </Card>
    </div>
  )
}