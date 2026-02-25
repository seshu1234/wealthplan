// components/admin/AdminSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calculator,
  FileText,
  Link2,
  BarChart3,
  Settings,
  Users,
  TrendingUp,
  DollarSign,
  FileCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  role: 'admin' | 'editor' | 'viewer'
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: BarChart3,
    roles: ['admin', 'editor', 'viewer'],
  },
  {
    name: 'Calculators',
    href: '/admin/calculators',
    icon: Calculator,
    roles: ['admin', 'editor', 'viewer'],
    children: [
      { name: 'All Calculators', href: '/admin/calculators' },
      { name: 'Create New', href: '/admin/calculators/new', roles: ['admin', 'editor'] },
      { name: 'Categories', href: '/admin/calculators/categories' },
      { name: 'Versions', href: '/admin/calculators/versions', roles: ['admin'] },
    ],
  },
  {
    name: 'Content',
    href: '/admin/content',
    icon: FileText,
    roles: ['admin', 'editor', 'viewer'],
    children: [
      { name: 'All Content', href: '/admin/content' },
      { name: 'Blog Posts', href: '/admin/content?type=blog' },
      { name: 'Guides', href: '/admin/content?type=guide' },
      { name: 'Strategies', href: '/admin/content?type=strategy' },
      { name: 'Comparison Pages', href: '/admin/content?type=compare' },
      { name: 'State Guides', href: '/admin/content?type=state' },
      { name: 'Create New', href: '/admin/content/new', roles: ['admin', 'editor'] },
    ],
  },
  {
    name: 'Affiliates',
    href: '/admin/affiliates',
    icon: Link2,
    roles: ['admin', 'editor'],
    children: [
      { name: 'All Links', href: '/admin/affiliates' },
      { name: 'Add New', href: '/admin/affiliates/new' },
      { name: 'Categories', href: '/admin/affiliates/categories' },
      { name: 'Performance', href: '/admin/affiliates/performance' },
    ],
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: TrendingUp,
    roles: ['admin', 'editor', 'viewer'],
    children: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Calculator Usage', href: '/admin/analytics/calculators' },
      { name: 'Content Performance', href: '/admin/analytics/content' },
      { name: 'Affiliate Clicks', href: '/admin/analytics/affiliates' },
      { name: 'User Behavior', href: '/admin/analytics/users' },
    ],
  },
  {
    name: 'SEO',
    href: '/admin/seo',
    icon: FileCheck,
    roles: ['admin', 'editor'],
    children: [
      { name: 'Overview', href: '/admin/seo' },
      { name: 'Keywords', href: '/admin/seo/keywords' },
      { name: 'Sitemap', href: '/admin/seo/sitemap' },
      { name: 'Schema Markup', href: '/admin/seo/schema' },
      { name: 'Bulk Editor', href: '/admin/seo/bulk', roles: ['admin'] },
    ],
  },
  {
    name: 'Monetization',
    href: '/admin/monetization',
    icon: DollarSign,
    roles: ['admin'],
    children: [
      { name: 'Revenue Overview', href: '/admin/monetization' },
      { name: 'Ad Settings', href: '/admin/monetization/ads' },
      { name: 'Affiliate Rules', href: '/admin/monetization/affiliates' },
      { name: 'Digital Products', href: '/admin/monetization/products' },
    ],
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    roles: ['admin'],
    children: [
      { name: 'All Users', href: '/admin/users' },
      { name: 'Roles & Permissions', href: '/admin/users/roles' },
      { name: 'Activity Log', href: '/admin/users/activity' },
    ],
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['admin'],
    children: [
      { name: 'General', href: '/admin/settings' },
      { name: 'Tax Config', href: '/admin/settings/tax' },
      { name: 'State Data', href: '/admin/settings/states' },
      { name: 'API Keys', href: '/admin/settings/api' },
      { name: 'Backup', href: '/admin/settings/backup' },
    ],
  },
]

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-card overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          if (!item.roles.includes(role)) return null

          return (
            <div key={item.name} className="space-y-1">
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
              {item.children && (
                <div className="ml-6 space-y-1">
                  {item.children.map((child) => {
                    if (child.roles && !child.roles.includes(role)) return null
                    
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 text-xs rounded-lg transition-colors',
                          pathname === child.href
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted text-muted-foreground'
                        )}
                      >
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}