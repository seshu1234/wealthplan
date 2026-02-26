import { Metadata } from 'next'
import Link from 'next/link'
import { VerifyEmailForm } from '@/components/auth/verify-email-form'

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address',
}

export default function VerifyEmailPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500">We&apos;ve sent a verification link to your email</p>
      </div>
      <VerifyEmailForm />
      <div className="text-center text-sm">
        <Link href="/auth/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  )
}
