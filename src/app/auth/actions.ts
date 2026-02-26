'use server'

import { redirect } from 'next/navigation'

export async function signout() {
  await fetch('/api/auth/logout', { method: 'POST' })
  redirect('/auth/login')
}
