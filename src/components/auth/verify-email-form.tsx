'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export function VerifyEmailForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const resendVerification = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // Try to get the user's email via /api/auth/me, then request resend
      const me = await fetch('/api/auth/me')
      const j = await me.json()
      const email = j?.user?.profile?.email
      if (!email) {
        setMessage('Unable to determine user email')
        setLoading(false)
        return
      }

      const res = await fetch('/api/auth/verify/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const json = await res.json()
      if (!res.ok) {
        setMessage(json.error || 'Error resending verification email')
      } else {
        setMessage('Verification email sent! Check your inbox.')
      }
    } catch {
      setMessage('Error resending verification email')
    }

    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </AlertDescription>
      </Alert>

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={resendVerification}
        disabled={loading}
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {loading ? "Sending..." : "Resend Verification Email"}
      </Button>
    </div>
  )
}
