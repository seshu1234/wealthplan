import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type Params = { params: Promise<{ id: string }> }

// PATCH /api/affiliates/[id] — update link or record a click
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const body = await req.json()

  // If this is a click increment (no auth required — public action)
  if (body.action === 'click') {
    const { error } = await supabase.rpc('increment_affiliate_click', { link_id: id })
    if (error) {
      // Fallback: manual increment
      const { data: current } = await supabase.from('affiliate_links').select('clicks_count').eq('id', id).single()
      await supabase.from('affiliate_links').update({ clicks_count: (current?.clicks_count || 0) + 1 }).eq('id', id)
    }
    return NextResponse.json({ ok: true })
  }

  // Otherwise it's a full update — require auth
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('affiliate_links')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/affiliates/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase.from('affiliate_links').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
