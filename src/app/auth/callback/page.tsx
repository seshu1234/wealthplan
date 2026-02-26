'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Handles Supabase email confirmation and OAuth callbacks.
 *
 * Why client-side?
 * The server (Node.js) cannot reach Supabase due to ISP-level DNS blocking
 * in India. The browser has no such restriction. We let the browser SDK
 * exchange the code, then POST the resulting user ID to /api/auth/exchange
 * to issue our custom JWT cookies — which have no outbound network requirement.
 */
export default function AuthCallbackPage() {
  const router = useRouter()
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true

    async function handleCallback() {
      const supabase = createClient()

      // The Supabase browser SDK automatically picks up the `code` or
      // `access_token` from the URL fragment/query and exchanges it.
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session?.user) {
        // Code exchange failed or no session — send to login
        router.replace('/auth/login')
        return
      }

      // Exchange the Supabase user ID for our custom JWT cookies
      const res = await fetch('/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id }),
      })

      if (!res.ok) {
        router.replace('/auth/login')
        return
      }

      router.replace('/dashboard')
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  )
}
