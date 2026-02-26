import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { verifyToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

type Params = { params: Promise<{ id: string }> }

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

// PATCH /api/notifications/[id] — mark as read
export async function PATCH(req: NextRequest, { params }: Params) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/notifications/[id] — delete notification
export async function DELETE(req: NextRequest, { params }: Params) {
  const userId = await getAuthUserId()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
