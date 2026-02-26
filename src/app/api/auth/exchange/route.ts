import { NextResponse } from 'next/server'
import { signAccessToken, signRefreshToken, COOKIE_OPTIONS } from '@/lib/jwt'

/**
 * POST /api/auth/exchange
 * Called by the browser AFTER it has already authenticated with Supabase directly.
 * Receives the user ID from the client and issues our custom JWT cookies.
 * No outbound network call → not affected by server-side DNS issues.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body || {}

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const accessToken = await signAccessToken({ sub: userId })
    const refreshToken = await signRefreshToken({ sub: userId })

    const res = NextResponse.json({ ok: true })
    res.cookies.set('access_token', accessToken, COOKIE_OPTIONS.access)
    res.cookies.set('refresh_token', refreshToken, COOKIE_OPTIONS.refresh)
    return res
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
