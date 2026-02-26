import { NextResponse } from 'next/server'
import { signAccessToken, signRefreshToken, COOKIE_OPTIONS } from '@/lib/jwt'
import dns from 'dns'

// Force reliable DNS to bypass ISP hijacking (must be set before any network calls)
try { dns.setServers(['8.8.8.8', '1.1.1.1']) } catch { /* ignore */ }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    const origin = new URL(request.url).origin
    const redirectTo = `${origin}/auth/callback`

    // Use Supabase REST API directly (avoids SDK DNS resolution issues)
    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      }),
    })

    const data = await response.json()

    // Supabase returns 200 even for errors — check for error field
    if (data.error || data.msg) {
      const message = data.error?.message || data.msg || 'Signup failed'
      console.error('Signup Supabase error:', message)
      return NextResponse.json({ error: message }, { status: 400 })
    }

    // If user already exists, Supabase returns user with empty identities
    if (data.id && (!data.identities || data.identities.length === 0)) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in instead.' },
        { status: 400 }
      )
    }

    // Email confirmation DISABLED → Supabase returns a session immediately.
    // Issue our own JWT cookies so the middleware recognises the user,
    // exactly the same as the login route does.
    if (data.access_token && data.user?.id) {
      const accessToken = await signAccessToken({ sub: data.user.id })
      const refreshToken = await signRefreshToken({ sub: data.user.id })

      const res = NextResponse.json({ ok: true, session: true })
      res.cookies.set('access_token', accessToken, COOKIE_OPTIONS.access)
      res.cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS.refresh)
      return res
    }

    // Email confirmation REQUIRED → tell the frontend to show "check email"
    return NextResponse.json({ ok: true, session: null, user: data })

  } catch (err) {
    console.error('Signup API Exception:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
