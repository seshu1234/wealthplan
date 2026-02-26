'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

const schema = z.object({
  title: z.string().min(3).max(120),
  slug: z.string().min(3).max(120).regex(/^[a-z0-9-]+$/),
  type: z.enum(['blog', 'guide', 'strategy', 'compare', 'state']),
  status: z.enum(['draft', 'published', 'archived']),
  body: z.string().min(10, 'Content body is required'),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
})

type FormValues = z.infer<typeof schema>

export default function NewContentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '', slug: '', type: 'blog', status: 'draft', body: '',
      seo_title: '', seo_description: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      const { error } = await supabase.from('content').insert({
        ...values,
        seo_title: values.seo_title || null,
        seo_description: values.seo_description || null,
        author_id: user?.id,
      }).select().single()

      if (error) throw error
      toast.success('Content created')
      router.push('/dashboard/content')
    } catch (e) {
      toast.error('Failed to create content')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create Content</h1>
        <p className="text-muted-foreground mt-1">Write a new blog post, guide, or strategy</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. The Complete Guide to Compound Interest"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            // Auto-generate slug from title
                            const slug = e.target.value.toLowerCase()
                              .replace(/[^a-z0-9\s-]/g, '')
                              .replace(/\s+/g, '-')
                              .slice(0, 100)
                            form.setValue('slug', slug)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="compound-interest-guide"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        />
                      </FormControl>
                      <FormDescription>yoursite.com/guides/{form.watch('slug') || 'slug-here'}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="type" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="blog">Blog Post</SelectItem>
                            <SelectItem value="guide">Guide</SelectItem>
                            <SelectItem value="strategy">Strategy</SelectItem>
                            <SelectItem value="compare">Comparison</SelectItem>
                            <SelectItem value="state">State Guide</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="status" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Body</CardTitle>
                  <CardDescription>Supports plain text and Markdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField control={form.control} name="body" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="# Your Content Here&#10;&#10;Use Markdown for headings, **bold**, *italic*, lists, etc."
                          className="min-h-[400px] font-mono text-sm resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{field.value?.length || 0} characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField control={form.control} name="seo_title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl><Input placeholder="Title for search results (max 70 chars)" {...field} /></FormControl>
                      <FormDescription>{field.value?.length || 0}/70 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="seo_description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description for search results (max 160 chars)"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{field.value?.length || 0}/160 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving…' : 'Create Content'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
