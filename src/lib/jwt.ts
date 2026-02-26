import { SignJWT, jwtVerify } from 'jose'

const encoder = new TextEncoder()
const SECRET = process.env.JWT_SECRET
if (!SECRET) {
  console.warn('JWT_SECRET is not set. JWT authentication will fail in production.')
}
const key = SECRET ? encoder.encode(SECRET) : undefined

export async function signAccessToken(payload: Record<string, unknown>) {
  if (!key) throw new Error('Missing JWT_SECRET')
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(key)
}

export async function signRefreshToken(payload: Record<string, unknown>) {
  if (!key) throw new Error('Missing JWT_SECRET')
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)
}

export async function verifyToken(token: string) {
  if (!key) throw new Error('Missing JWT_SECRET')
  const { payload } = await jwtVerify(token, key)
  return payload
}

export const COOKIE_OPTIONS = {
  access: {
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 15, // 15 minutes
  },
  refresh: {
    httpOnly: true,
    path: '/api/auth/refresh',
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

const jwtUtils = {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  COOKIE_OPTIONS,
}

export default jwtUtils
