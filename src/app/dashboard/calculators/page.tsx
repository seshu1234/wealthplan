import { createAdminClient } from '@/lib/supabase/admin'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Search, Plus } from 'lucide-react'
import Link from 'next/link'

interface Calculator {
  id: string
  title: string
  slug: string
  category: string
  status: string
  views_count: number
  updated_at: string
  author?: {
    full_name: string
  }
}

export const dynamic = 'force-dynamic'

export default async function CalculatorsPage() {
  const supabase = createAdminClient()
  
  console.log('Fetching calculators from dashboard...')
  const { data: calculators, error } = await supabase
    .from('calculators')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Database error fetching calculators:', error)
  } else {
    console.log(`Successfully fetched ${calculators?.length || 0} calculators`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calculators</h1>
          <p className="text-muted-foreground">Manage your financial calculators</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/calculators/new">
            <Plus className="h-4 w-4 mr-2" />
            New Calculator
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search calculators..." className="pl-9" />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      {/* Calculators Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculators?.map((calc: Calculator) => (
              <TableRow key={calc.id}>
                <TableCell className="font-medium">{calc.title}</TableCell>
                <TableCell className="text-muted-foreground">{calc.slug}</TableCell>
                <TableCell>
                  <Badge variant="outline">{calc.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={calc.status === 'published' ? 'default' : 'secondary'}>
                    {calc.status}
                  </Badge>
                </TableCell>
                <TableCell>{calc.views_count?.toLocaleString() || 0}</TableCell>
                <TableCell>{calc.author?.full_name || '—'}</TableCell>
                <TableCell>{calc.updated_at ? new Date(calc.updated_at).toLocaleDateString() : '—'}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/calculators/${calc.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/calculators/${calc.slug}`} target="_blank">View Live</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!calculators?.length && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                  No calculators found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}