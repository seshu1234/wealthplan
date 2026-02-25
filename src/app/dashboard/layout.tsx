// app/dashboard/layout.tsx
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
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
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handled by middleware
          }
        },
      },
    }
  )
  const { data: { session } } = await supabase.auth.getSession()

  // We don't need to redirect here as middleware handles it.
  // But we need the session and user data for the header.
  if (!session) return null

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (!adminUser) return null

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={session.user} role={adminUser.role} />
      <div className="flex">
        <AdminSidebar role={adminUser.role} />
        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}