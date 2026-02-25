// app/admin/calculators/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalculatorPreview } from '@/components/admin/CalculatorPreview'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

const calculatorSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(300),
  category: z.enum(['retirement', 'tax', 'mortgage', 'investing', 'salary', 'loans', 'education']),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
  status: z.enum(['draft', 'published']),
  content: z.record(z.string(), z.unknown()), // Required in schema, provided in defaultValues
})

type CalculatorFormValues = {
  title: string
  slug: string
  description: string
  category: 'retirement' | 'tax' | 'mortgage' | 'investing' | 'salary' | 'loans' | 'education'
  seo_title?: string
  seo_description?: string
  status: 'draft' | 'published'
  content: Record<string, unknown>
}

export default function NewCalculatorPage() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [activeTab, setActiveTab] = useState('basic')

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      category: 'retirement',
      status: 'draft',
      content: {
        inputs: [],
        results: [],
        settings: {},
      },
    },
  })

  async function onSubmit(values: z.infer<typeof calculatorSchema>) {
    try {
      const { data, error } = await supabase
        .from('calculators')
        .insert({
          ...values,
          author_id: (await supabase.auth.getUser()).data.user?.id,
          content: values.content || {},
        })
        .select()
        .single()

      if (error) throw error

      toast.success('Calculator created successfully')
      router.push(`/admin/calculators/${data.id}/edit`)
    } catch (error) {
      toast.error('Failed to create calculator')
      console.error(error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Calculator</h1>
        <p className="text-muted-foreground">Build a new financial calculator for your users</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Set up the fundamental details for your calculator</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 401(k) Calculator" {...field} />
                        </FormControl>
                        <FormDescription>
                          The main title displayed at the top of the calculator page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 401k-calculator" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          The URL-friendly version of the title (e.g., yoursite.com/calculators/401k-calculator)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief description of what this calculator does..." 
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A short description shown below the title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retirement">Retirement</SelectItem>
                            <SelectItem value="tax">Tax</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="investing">Investing</SelectItem>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="loans">Loans</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The category helps organize calculators and improves navigation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Publish Status</FormLabel>
                          <FormDescription>
                            Draft saves as unpublished, Published makes it live immediately
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inputs">
              <Card>
                <CardHeader>
                  <CardTitle>Input Configuration</CardTitle>
                  <CardDescription>Define the input fields for your calculator</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Input builder UI - complex component */}
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Input Field
                    </Button>
                    
                    {/* List of configured inputs */}
                    <div className="space-y-2">
                      {/* Example input row */}
                      <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">Annual Salary</p>
                          <p className="text-sm text-muted-foreground">Number input with currency prefix</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>Required</Badge>
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Result Configuration</CardTitle>
                  <CardDescription>Define what results your calculator shows</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Results builder UI */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                  <CardDescription>Optimize your calculator for search engines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title for search results" {...field} />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/70 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Description for search results" 
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value?.length || 0}/160 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <CalculatorPreview config={form.watch('content')} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <div className="space-x-4">
              <Button variant="outline" type="button" onClick={() => setActiveTab('preview')}>
                Preview
              </Button>
              <Button type="submit">Create Calculator</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}