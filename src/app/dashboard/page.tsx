// app/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  DollarSign,
  Calculator,
  FileText,
  Link2,
} from 'lucide-react'
import { DashboardChart } from '@/components/admin/DashboardChart'
import { RecentActivity } from '@/components/admin/RecentActivity'

const stats = [
  {
    title: 'Total Calculators',
    value: 0,
    icon: Calculator,
    change: '+12%',
    changeType: 'positive',
  },
  {
    title: 'Content Pieces',
    value: 0,
    icon: FileText,
    change: '+8%',
    changeType: 'positive',
  },
  {
    title: 'Active Affiliates',
    value: 0,
    icon: Link2,
    change: '+5%',
    changeType: 'positive',
  },
  {
    title: 'Views Today',
    value: 0,
    icon: Eye,
    change: '+23%',
    changeType: 'positive',
  },
  {
    title: 'Affiliate Clicks',
    value: 0,
    icon: MousePointerClick,
    change: '+15%',
    changeType: 'positive',
  },
  {
    title: 'Est. Revenue (MTD)',
    value: '$0',
    icon: DollarSign,
    change: '+18%',
    changeType: 'positive',
  },
  {
    title: 'Avg. Session',
    value: '—',
    icon: TrendingUp,
    change: '+2%',
    changeType: 'positive',
  },
  {
    title: 'Active Users',
    value: 0,
    icon: Users,
    change: '+7%',
    changeType: 'positive',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === 'positive' ? 'text-[hsl(var(--accent-brand))]' : 'text-red-500'}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Last 30 days calculator usage</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Calculators</CardTitle>
            <CardDescription>Most used this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: '401(k) Calculator', views: 1234, change: '+12%' },
                { name: 'Mortgage Calculator', views: 987, change: '+8%' },
                { name: 'Roth IRA Calculator', views: 654, change: '+5%' },
                { name: 'Compound Interest', views: 543, change: '+15%' },
                { name: 'Salary Calculator', views: 432, change: '-2%' },
              ].map((calc) => (
                <div key={calc.name} className="flex items-center justify-between">
                  <span className="text-sm">{calc.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{calc.views}</span>
                    <span className={`text-xs ${calc.change.startsWith('+') ? 'text-[hsl(var(--accent-brand))]' : 'text-red-500'}`}>
                      {calc.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions across your site</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:border-[hsl(var(--accent-brand))] transition-colors">
          <CardContent className="p-6">
            <Calculator className="h-8 w-8 mb-4 text-[hsl(var(--accent-brand))]" />
            <h3 className="font-semibold mb-2">Create New Calculator</h3>
            <p className="text-sm text-muted-foreground">Add a new financial calculator to your site</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-[hsl(var(--accent-brand))] transition-colors">
          <CardContent className="p-6">
            <FileText className="h-8 w-8 mb-4 text-[hsl(var(--accent-brand))]" />
            <h3 className="font-semibold mb-2">Write New Guide</h3>
            <p className="text-sm text-muted-foreground">Create educational content for your users</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-[hsl(var(--accent-brand))] transition-colors">
          <CardContent className="p-6">
            <Link2 className="h-8 w-8 mb-4 text-[hsl(var(--accent-brand))]" />
            <h3 className="font-semibold mb-2">Add Affiliate Link</h3>
            <p className="text-sm text-muted-foreground">Monetize your traffic with new partnerships</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}