import { NextResponse } from 'next/server'

/**
 * POST /api/auth/logout
 * Clears the JWT cookies so the middleware stops recognising the user.
 * No outbound network calls — safe from ISP DNS issues.
 */
export async function POST() {
  const res = NextResponse.json({ ok: true })

  // Clear access_token (path: '/')
  res.cookies.set('access_token', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  })

  // Clear refresh_token (path: '/api/auth/refresh')
  res.cookies.set('refresh_token', '', {
    httpOnly: true,
    path: '/api/auth/refresh',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  })

  return res
}
