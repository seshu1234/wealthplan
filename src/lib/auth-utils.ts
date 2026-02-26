import { cookies } from 'next/headers'
import { verifyToken } from './jwt'
import { createClient } from './supabase/server'
import { AppRole } from './supabase/types'

export interface AuthUser {
  id: string
  email: string | null
  role: AppRole[]
}

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value

  if (!token) return null

  try {
    const payload = await verifyToken(token)
    const userId = (payload as { sub: string }).sub

    const supabase = await createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('id', userId)
      .single()

    if (!profile) return null

    return {
      id: profile.id,
      email: profile.email,
      role: (profile.role || []) as AppRole[],
    }
  } catch (error) {
    console.error('Auth verification failed:', error)
    return null
  }
}
