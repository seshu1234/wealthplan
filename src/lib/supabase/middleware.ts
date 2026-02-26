import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request })

  // Determine user from our JWT access token (cookie) — no network call
  let isAuthenticated = false
  try {
    const token = request.cookies.get('access_token')?.value
    if (token) {
      await verifyToken(token)
      isAuthenticated = true
    }
  } catch {
    isAuthenticated = false
  }

  const { pathname } = request.nextUrl

  const isAuthRoute      = pathname.startsWith('/auth')
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isApiAuthRoute   = pathname.startsWith('/api/auth')

  // Let auth API routes always pass through
  if (isApiAuthRoute) return response

  // Unauthenticated user trying to access dashboard → login
  if (isDashboardRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // Authenticated user on auth pages → dashboard
  if (isAuthRoute && isAuthenticated) {
    // Exception: allow access to reset-password even when logged in
    if (pathname === '/auth/reset-password') return response
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}