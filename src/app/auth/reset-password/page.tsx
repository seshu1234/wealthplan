import { Metadata } from 'next'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password',
}

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Set new password</h1>
        <p className="text-gray-500">Enter your new password below</p>
      </div>
      <ResetPasswordForm />
    </div>
  )
}
