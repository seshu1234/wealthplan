import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

/**
 * POST /api/analytics/track
 *
 * Lightweight event tracking. Called client-side for key user actions.
 * Body: { event_type, calculator_id?, page?, metadata? }
 *
 * Event types used throughout the app:
 *   page_view          — any page load
 *   calculator_use     — calculator inputs changed
 *   affiliate_click    — affiliate CTA clicked
 *   share              — share button clicked
 *   print              — print button clicked
 *   ai_interpreted     — AI interpreter fired
 */
export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } }
    )

    const body = await req.json()
    const { event_type, calculator_id, page, metadata } = body

    if (!event_type) return NextResponse.json({ error: 'event_type required' }, { status: 400 })

    // Get user if logged in (optional)
    const { data: { session } } = await supabase.auth.getSession()

    await supabase.from('analytics_events').insert({
      event_type,
      calculator_id: calculator_id || null,
      page: page || req.headers.get('referer') || null,
      user_id: session?.user.id || null,
      metadata: metadata || null,
      user_agent: req.headers.get('user-agent') || null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Silently fail — never break the user's experience for analytics
    return NextResponse.json({ ok: true })
  }
}

// GET /api/analytics/track — summary for the last N days
export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  )

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const days = parseInt(searchParams.get('days') || '30', 10)
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1000)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
