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
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  role: 'super_admin' | 'admin' | 'editor' | 'viewer'
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    roles: ['super_admin', 'admin', 'editor', 'viewer'],
  },
  {
    name: 'Calculators',
    href: '/dashboard/calculators',
    icon: Calculator,
    roles: ['super_admin', 'admin', 'editor', 'viewer'],
    children: [
      { name: 'All Calculators', href: '/dashboard/calculators' },
      { name: 'Create New', href: '/dashboard/calculators/new', roles: ['super_admin', 'admin', 'editor'] },
    ],
  },
  {
    name: 'Content',
    href: '/dashboard/content',
    icon: FileText,
    roles: ['super_admin', 'admin', 'editor', 'viewer'],
    children: [
      { name: 'All Content', href: '/dashboard/content' },
      { name: 'Blog Posts', href: '/dashboard/content?type=blog' },
      { name: 'Guides', href: '/dashboard/content?type=guide' },
      { name: 'Create New', href: '/dashboard/content/new', roles: ['super_admin', 'admin', 'editor'] },
    ],
  },
  {
    name: 'Affiliates',
    href: '/dashboard/affiliates',
    icon: Link2,
    roles: ['super_admin', 'admin', 'editor'],
    children: [
      { name: 'All Links', href: '/dashboard/affiliates' },
      { name: 'Add New', href: '/dashboard/affiliates/new' },
    ],
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: TrendingUp,
    roles: ['super_admin', 'admin', 'editor', 'viewer'],
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['super_admin', 'admin'],
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