// app/dashboard/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/jwt'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify identity via JWT cookie (no Supabase network call)
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) {
    redirect('/auth/login')
  }

  let userId: string
  try {
    const payload = await verifyToken(token)
    userId = (payload as { sub: string }).sub
  } catch {
    redirect('/auth/login')
  }

  const user = { id: userId, email: undefined as string | undefined }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} role="admin" />
      <div className="flex pt-16">
        <AdminSidebar role="admin" />
        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}