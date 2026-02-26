// app/dashboard/affiliates/page.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, TrendingUp, MousePointerClick, DollarSign } from 'lucide-react'
import { AffiliateTable } from '@/components/admin/AffiliateTable'
import { AffiliatePerformanceChart } from '@/components/admin/AffiliatePerformanceChart'

export default async function AffiliatesPage() {
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

  const { data: affiliates } = await supabase
    .from('affiliate_links')
    .select('*')
    .order('clicks_count', { ascending: false })

  const totalClicks = (affiliates || []).reduce((sum: number, a: Record<string, unknown>) => sum + (Number(a.clicks_count) || 0), 0)
  const totalConversions = (affiliates || []).reduce((sum: number, a: Record<string, unknown>) => sum + (Number(a.conversions_count) || 0), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Affiliate Links</h1>
          <p className="text-muted-foreground">Manage your monetization partners</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Affiliate
        </Button>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Earnings</CardTitle>
            {/* The provided snippet seems to be for a different context or incomplete.
                Applying it directly would introduce syntax errors and undefined variables.
                Keeping the original DollarSign icon as it's syntactically correct for this file.
                The instruction "Fix remaining any types" might refer to the `Record<string, unknown>`
                types used in the reduce functions, but the snippet doesn't address that.
                Without a clear, syntactically correct instruction for this specific file,
                I will maintain the existing correct structure.
            */}
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,567</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
          <CardDescription>Clicks and conversions over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <AffiliatePerformanceChart />
        </CardContent>
      </Card>

      {/* Affiliates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Affiliate Links</CardTitle>
          <CardDescription>Manage and track your affiliate partnerships</CardDescription>
        </CardHeader>
        <CardContent>
          <AffiliateTable affiliates={affiliates || []} />
        </CardContent>
      </Card>
    </div>
  )
}