import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentTable } from '@/components/admin/ContentTable'
import { ContentStats } from '@/components/admin/ContentStats'
import { ContentFilters } from '@/components/admin/ContentFilters'

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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

  const params = await searchParams
  const activeType = (params.type as string) || 'all'

  const { data: posts } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })

  const filteredPosts = activeType === 'all' 
    ? posts 
    : posts?.filter(p => p.type === activeType)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="text-muted-foreground">Manage your blog posts, guides, and educational content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats Overview */}
      <ContentStats />

      {/* Content Tabs */}
      <Tabs defaultValue={activeType}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" asChild>
            <Link href="/dashboard/content?type=all">All</Link>
          </TabsTrigger>
          <TabsTrigger value="blog" asChild>
            <Link href="/dashboard/content?type=blog">Blog</Link>
          </TabsTrigger>
          <TabsTrigger value="guide" asChild>
            <Link href="/dashboard/content?type=guide">Guides</Link>
          </TabsTrigger>
          <TabsTrigger value="strategy" asChild>
            <Link href="/dashboard/content?type=strategy">Strategies</Link>
          </TabsTrigger>
          <TabsTrigger value="compare" asChild>
            <Link href="/dashboard/content?type=compare">Comparisons</Link>
          </TabsTrigger>
          <TabsTrigger value="state" asChild>
            <Link href="/dashboard/content?type=state">State Guides</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <ContentFilters />

      {/* Content Table */}
      <Card>
        <CardContent className="p-0">
          <ContentTable posts={filteredPosts || []} />
        </CardContent>
      </Card>
    </div>
  )
}