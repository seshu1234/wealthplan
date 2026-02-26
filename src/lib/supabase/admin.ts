import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase admin client using the SERVICE_ROLE_KEY.
 * Bypasses RLS — only use in API routes that have their own auth checks.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!url || !key) {
    console.error('CRITICAL: Supabase URL or Service Role Key is missing in environment!')
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
