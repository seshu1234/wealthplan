'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  partner: z.string().min(2, 'Partner name is required'),
  calculator_id: z.string().optional(),
  destination_url: z.string().url('Must be a valid URL'),
  tracking_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  commission_type: z.enum(['cpa', 'cps', 'cpl', 'flat']),
  commission_value: z.coerce.number().min(0),
  status: z.enum(['active', 'paused', 'inactive']),
})

type FormValues = z.infer<typeof schema>

export default function NewAffiliatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      name: '', partner: '', calculator_id: '',
      destination_url: '', tracking_url: '',
      commission_type: 'cpa', commission_value: 0, status: 'active',
    },
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const { error } = await supabase.from('affiliate_links').insert({
        ...values,
        tracking_url: values.tracking_url || null,
        calculator_id: values.calculator_id || null,
        clicks_count: 0, conversions_count: 0,
      })
      if (error) throw error
      toast.success('Affiliate link created')
      router.push('/dashboard/affiliates')
    } catch (e) {
      toast.error('Failed to create affiliate link')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Add Affiliate Link</h1>
        <p className="text-muted-foreground mt-1">Add a new partner referral link to track and monetize</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Link Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Fidelity Roth IRA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="partner" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner</FormLabel>
                    <FormControl><Input placeholder="e.g. Fidelity" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="calculator_id" render={({ field }) => (
                <FormItem>
                  <FormLabel>Associate with Calculator (optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="None — show on all pages" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">All pages</SelectItem>
                      <SelectItem value="compound-interest">Compound Interest Calculator</SelectItem>
                      <SelectItem value="mortgage-calculator">Mortgage Calculator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Contextual links show only on the relevant calculator page</FormDescription>
                </FormItem>
              )} />

              <FormField control={form.control} name="destination_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl><Input placeholder="https://partner.com/landing" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="tracking_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking URL (optional)</FormLabel>
                  <FormControl><Input placeholder="https://partner.com/ref/yourcode" {...field} /></FormControl>
                  <FormDescription>Use this if your affiliate network provides a click-tracking URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Commission & Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="commission_type" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="cpa">CPA (per action)</SelectItem>
                        <SelectItem value="cps">CPS (% of sale)</SelectItem>
                        <SelectItem value="cpl">CPL (per lead)</SelectItem>
                        <SelectItem value="flat">Flat rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="commission_value" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Value ($)</FormLabel>
                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Add Affiliate Link'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
