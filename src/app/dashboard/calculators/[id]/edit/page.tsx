'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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
import { toast } from 'sonner'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { InputBuilder } from '@/components/admin/InputBuilder'
import { LogicBuilder } from '@/components/admin/LogicBuilder'
import { OutputBuilder } from '@/components/admin/OutputBuilder'
import { ChartBuilder } from '@/components/admin/ChartBuilder'
import { ContentBuilder, CalculatorContent } from '@/components/admin/ContentBuilder'
import { CalculatorConfig } from '@/lib/calculator/engine'

const calculatorSchema = z.object({
  title: z.string().min(3).max(100),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(10).max(300),
  category: z.enum(['retirement', 'tax', 'mortgage', 'investment', 'savings', 'debt', 'insurance', 'budgeting', 'other']),
  seo_title: z.string().max(70).optional(),
  seo_description: z.string().max(160).optional(),
  status: z.enum(['draft', 'published', 'archived']),
  config: z.object({
    inputs: z.array(z.any()),
    logic: z.object({
      type: z.enum(['formula', 'preset']),
      formula: z.string().optional(),
      presetId: z.string().optional(),
    }),
    outputs: z.array(z.any()),
    charts: z.array(z.any()).optional(),
  }),
  content: z.any().optional(),
})

type CalculatorFormValues = {
  title: string
  slug: string
  description: string
  category: 'retirement' | 'tax' | 'mortgage' | 'investment' | 'savings' | 'debt' | 'insurance' | 'budgeting' | 'other'
  seo_title?: string
  seo_description?: string
  status: 'draft' | 'published' | 'archived'
  config: CalculatorConfig
  content?: CalculatorContent
}

export default function EditCalculatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')
  const [loading, setLoading] = useState(true)

  const form = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      category: 'retirement',
      status: 'draft',
      config: {
        inputs: [],
        logic: {
          type: 'formula',
          formula: '',
        },
        outputs: [],
        charts: [],
      },
    },
  })

  useEffect(() => {
    async function loadCalculator() {
      try {
        const res = await fetch(`/api/calculators/${id}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()

        form.reset({
          title: data.title,
          slug: data.slug,
          description: data.description || '',
          category: data.category as CalculatorFormValues['category'],
          status: data.status as CalculatorFormValues['status'],
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          config: data.config || { inputs: [], logic: { type: 'formula' }, outputs: [], charts: [] },
          content: data.content || { intro: '', howToUse: [], explanation: { title: '', body: '' }, deepDive: { title: '', body: '' }, keyNumbers: [], faq: [] },
        })
      } catch {
        toast.error('Failed to load calculator')
      } finally {
        setLoading(false)
      }
    }

    loadCalculator()
  }, [id, form])

  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(values: CalculatorFormValues) {
    setSubmitting(true)
    const toastId = toast.loading('Saving changes...')

    try {
      const res = await fetch(`/api/calculators/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          toast.error('A calculator with this slug already exists. Choose a different URL slug.', { id: toastId })
        } else if (res.status === 401) {
          toast.error('You must be logged in.', { id: toastId })
        } else {
          toast.error(`Failed to save: ${data.error || 'Unknown error'}`, { id: toastId })
        }
        return
      }

      toast.success('Calculator saved successfully!', { id: toastId })
      router.refresh()
    } catch {
      toast.error('Network error \u2014 please try again', { id: toastId })
    } finally {
      setSubmitting(false)
    }
  }

  const availableVariables = form.watch('config.inputs')?.map(i => i.id) || []
  const inputLabels = form.watch('config.inputs')?.map(i => i.label) || []

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/calculators">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Calculator</h1>
            <p className="text-muted-foreground">{form.watch('title')}</p>
          </div>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={submitting}>
          {submitting ? 'Saving...' : (
            <>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-7 h-12">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="logic">Logic</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
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
                            placeholder="Brief description..." 
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
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
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retirement">Retirement</SelectItem>
                            <SelectItem value="tax">Tax</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="debt">Debt</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="budgeting">Budgeting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
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
                        </div>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
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
                  <CardTitle>Field Definitions</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="config.inputs"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputBuilder value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logic">
              <Card>
                <CardHeader>
                  <CardTitle>Calculation Logic</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="config.logic"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <LogicBuilder 
                            value={field.value} 
                            onChange={field.onChange} 
                            availableVariables={availableVariables}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Result Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="config.outputs"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <OutputBuilder value={field.value} onChange={field.onChange} availableVariables={availableVariables} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="charts">
              <Card>
                <CardHeader>
                  <CardTitle>Chart Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="config.charts"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ChartBuilder 
                            value={field.value} 
                            onChange={field.onChange} 
                            inputs={availableVariables}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Page Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ContentBuilder
                            value={field.value as CalculatorContent}
                            onChange={field.onChange}
                            inputLabels={inputLabels}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
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
                          <Textarea className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  )
}
