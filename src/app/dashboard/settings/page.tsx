import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export const metadata = { title: 'Settings — WealthPath Dashboard' }

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your site configuration and API keys</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Info</CardTitle>
          <CardDescription>Basic information about your WealthPath site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input id="site-name" defaultValue="WealthPath" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site-url">Site URL</Label>
            <Input id="site-url" defaultValue="https://wealthpath.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Contact Email</Label>
            <Input id="contact-email" type="email" defaultValue="hello@wealthpath.com" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Third-party integrations and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Gemini AI</Label>
              <Badge variant={process.env.NEXT_PUBLIC_HAS_GEMINI === 'true' ? 'default' : 'outline'}>
                {process.env.NEXT_PUBLIC_HAS_GEMINI === 'true' ? '✓ Connected' : 'Not configured'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Powers AI Result Interpreter, Scenario Narrator, and Financial Plan Builder.
              Add GEMINI_API_KEY to your .env file.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>FRED API (Federal Reserve Data)</Label>
              <Badge variant="outline">
                {process.env.FRED_API_KEY ? '✓ Connected' : 'Optional'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Live interest rate data for the mortgage calculator banner.
              Free at fred.stlouisfed.org. Add FRED_API_KEY to .env.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Google AdSense</Label>
              <Badge variant="outline">Pending</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Update publisher ID and slot IDs in src/components/calculator/adsense-slot.tsx
              after AdSense approval.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database</CardTitle>
          <CardDescription>Supabase connection status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm">Connected to Supabase</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Run the migration at supabase/migrations/001_dashboard_schema.sql in your
            Supabase SQL Editor to create all required tables.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
