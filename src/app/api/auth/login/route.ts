import { NextResponse } from 'next/server'
import { signAccessToken, signRefreshToken, COOKIE_OPTIONS } from '@/lib/jwt'
import dns from 'dns'

// Force reliable DNS — must be at module top level
try { dns.setServers(['8.8.8.8', '1.1.1.1']) } catch { /* ignore */ }

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body || {}

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    // Use Supabase REST API directly (avoids SDK DNS resolution issues)
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok || data.error) {
      const msg = data.error_description || data.error?.message || data.msg || 'Invalid email or password'
      console.error('Login API Error:', msg)
      return NextResponse.json({ error: msg }, { status: 401 })
    }

    if (!data.user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Issue our own JWT tokens for session management
    const accessToken = await signAccessToken({ sub: data.user.id })
    const refreshToken = await signRefreshToken({ sub: data.user.id })

    const res = NextResponse.json({ ok: true })
    res.cookies.set('access_token', accessToken, COOKIE_OPTIONS.access)
    res.cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS.refresh)

    return res

  } catch (err) {
    console.error('Login API Exception:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
