import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

async function getAuthUserId(): Promise<string | null> {
  try {
    const token = (await cookies()).get('access_token')?.value
    if (!token) return null
    const payload = await verifyToken(token)
    return payload.sub as string
  } catch {
    return null
  }
}

// GET /api/notifications — list notifications
export async function GET(req: NextRequest) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createAdminClient()
  const { searchParams } = new URL(req.url)
  const unreadOnly = searchParams.get('unread') === 'true'

  let query = supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })

  if (unreadOnly) {
    query = query.eq('read', false)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// PATCH /api/notifications — mark all as read
export async function PATCH(req: NextRequest) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId) // Important: only for this user
    .eq('read', false)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
