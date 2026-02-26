'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { CalculatorConfig, executeCalculation } from '@/lib/calculator/engine'
import { formatCurrency } from '@/lib/format'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useTheme } from 'next-themes'
import { CHART_COLORS, CHART_COLORS_DARK } from '@/lib/chart-colors'
import { ChevronDown, Sparkles, BookOpen, Quote, HelpCircle, CheckCircle2 } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface DynamicCalculatorProps {
  config: CalculatorConfig
}

const variantClasses: Record<string, string> = {
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-red-500 dark:text-red-400',
  neutral: 'text-foreground',
}

interface ChartTooltipPayload {
  name: string
  value: number
  color: string
  payload: Record<string, number | string>
}

interface ChartTooltipProps {
  active?: boolean
  payload?: ChartTooltipPayload[]
  label?: string | number
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg p-3 text-sm space-y-1">
      <p className="font-semibold text-foreground">Year {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(Number(entry.value))}
        </p>
      ))}
    </div>
  )
}

export function DynamicCalculator({ config }: DynamicCalculatorProps) {
  const { resolvedTheme } = useTheme()
  const themeColors = resolvedTheme === 'dark' ? CHART_COLORS_DARK : CHART_COLORS
  const colorList = [themeColors.primary, themeColors.secondary, themeColors.tertiary, themeColors.negative]

  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {}
    config.inputs?.forEach(input => {
      initial[input.id] = input.defaultValue ?? 0
    })
    return initial
  })

  const results = useMemo(() => {
    return executeCalculation(config, values) as any
  }, [config, values])

  const formatValue = (val: number | string | undefined, format: 'currency' | 'percent' | 'number') => {
    if (val === undefined || val === null) return '—'
    const num = Number(val)
    if (isNaN(num)) return '—'
    if (format === 'currency') return formatCurrency(num)
    if (format === 'percent') return `${num.toFixed(2)}%`
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const bridgeVariable = (text: string | undefined) => {
    if (!text) return ''
    let bridged = text
    config.outputs?.forEach(output => {
      const val = results.outputs[output.id]
      const formatted = formatValue(val, output.format)
      bridged = bridged.replace(new RegExp(`{{${output.id}}}`, 'g'), formatted)
    })
    config.inputs?.forEach(input => {
      const val = values[input.id]
      const formatted = typeof val === 'number' ? val.toLocaleString() : String(val)
      bridged = bridged.replace(new RegExp(`{{${input.id}}}`, 'g'), formatted)
    })
    return bridged
  }

  const content = config.content || {}

  return (
    <div className="space-y-12 my-12">
      {/* Intro Section */}
      {content.intro && (
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
            &ldquo;{bridgeVariable(content.intro)}&rdquo;
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Fields */}
        <Card className="shadow-xl border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-primary/10 text-primary">
                <ChevronDown className="h-5 w-5" />
              </span>
              Customize Your Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {config.inputs?.map((input) => (
              <div key={input.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`calc-${input.id}`} className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {input.label}
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full font-mono text-sm font-bold text-foreground">
                      {(values as any)[input.id]}{input.unit}
                    </span>
                  </div>
                </div>

                {input.type === 'slider' ? (
                  <Slider
                    value={[Number((values as any)[input.id] ?? input.min ?? 0)]}
                    min={input.min ?? 0}
                    max={input.max ?? 100}
                    step={input.step ?? (input.max && input.max > 100 ? 100 : 1)}
                    onValueChange={([v]) => setValues(prev => ({ ...prev, [input.id]: v }))}
                    className="py-4"
                  />
                ) : (
                  <Input
                    id={`calc-${input.id}`}
                    type="number"
                    value={(values as any)[input.id] ?? ''}
                    onChange={(e) =>
                      setValues(prev => ({
                        ...prev,
                        [input.id]: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="h-12 text-lg font-semibold"
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Results & AI Insight */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.outputs?.map((output) => (
              <Card key={output.id} className="relative overflow-hidden group hover:shadow-lg transition-all border-none bg-muted/30">
                <CardContent className="p-6">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">
                    {output.label}
                  </p>
                  <p className={`text-3xl font-black tabular-nums ${variantClasses[output.variant || 'neutral']}`}>
                    {formatValue(results.outputs[output.id], output.format)}
                  </p>
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="h-12 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Insight Bridge Card */}
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">Smart Analysis</h3>
              </div>
              <div className="space-y-4">
                <p className="text-base text-foreground leading-relaxed font-medium">
                  {bridgeVariable(content?.explanation?.title || "Your Financial Outlook")}
                </p>
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-xl border border-primary/10">
                  <Quote className="h-5 w-5 text-primary/40 shrink-0" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    Based on your ${(values as any)[config.inputs?.[0]?.id || ''] || 0} contribution, you are on track to accumulate {formatValue(results.outputs[config.outputs?.[0]?.id || ''], config.outputs?.[0]?.format || 'currency')}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      {config.charts?.map((chart) => (
        <Card key={chart.id} className="shadow-2xl overflow-hidden border-none bg-card">
          <CardHeader className="bg-muted/50 border-b p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">{chart.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 text-emerald-500 font-semibold tracking-wide uppercase">Projection Analytics</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-background border flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 lg:p-12">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.charts[chart.id] || []}>
                  <defs>
                    {chart.series.map((s, i) => (
                      <linearGradient key={s.dataKey} id={`grad-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={s.color || colorList[i % colorList.length]} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={s.color || colorList[i % colorList.length]} stopOpacity={0}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                  <XAxis 
                    dataKey={chart.loopKey} 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `Yr ${val}`}
                    dy={10}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${(Number(val) / 1000).toFixed(0)}k`}
                    dx={-10}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  {chart.series.map((s, i) => (
                    <Area
                      key={s.dataKey}
                      type="monotone"
                      dataKey={s.dataKey}
                      name={s.label}
                      stroke={s.color || colorList[i % colorList.length]}
                      fillOpacity={1}
                      fill={`url(#grad-${s.dataKey})`}
                      strokeWidth={3}
                      animationDuration={1500}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-12 justify-center border-t pt-8">
              {chart.series.map((s, i) => (
                <div key={s.dataKey} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-muted/50 border hover:bg-muted transition-colors cursor-default">
                  <div 
                    className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]" 
                    style={{ backgroundColor: s.color || colorList[i % colorList.length] }} 
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* SEO Article Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t">
        <div className="md:col-span-2 space-y-12">
          {content.explanation?.body && (
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                {bridgeVariable(content.explanation.title || "Deep Understanding")}
              </h2>
              <div className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {bridgeVariable(content.explanation.body)}
              </div>
            </article>
          )}

          {content.howToUse && content.howToUse.length > 0 && (
            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                How to Get the Most from This Tool
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.howToUse?.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/20 border border-border/50">
                    <span className="h-6 w-6 rounded-full bg-background border flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                    <p className="text-sm text-foreground/80 font-medium">{bridgeVariable(step)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.deepDive?.body && (
            <article className="p-8 rounded-3xl bg-muted/30 border border-border/50 space-y-4">
              <h3 className="text-xl font-bold tracking-tight">{bridgeVariable(content.deepDive.title || "Expert Analysis")}</h3>
              <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {bridgeVariable(content.deepDive.body)}
              </div>
            </article>
          )}
        </div>

        {/* Sidebar: Key Numbers & FAQ */}
        <aside className="space-y-12">
          {content.keyNumbers && content.keyNumbers.length > 0 && (
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground">Market Benchmarks</h4>
              <div className="space-y-4">
                {content.keyNumbers?.map((num: { label: string; value: string; source?: string }, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-card border shadow-sm group hover:border-primary/30 transition-colors">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{num.label}</p>
                    <p className="text-2xl font-black text-primary">{num.value}</p>
                    {num.source && <p className="text-[9px] text-muted-foreground mt-2 italic flex items-center gap-1">Source: {num.source}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {content.faq && content.faq.length > 0 && (
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground">Common Questions</h4>
              <Accordion type="single" collapsible className="w-full">
                {content.faq?.map((item: { question: string; answer: string }, i: number) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-0 mb-2">
                    <AccordionTrigger className="text-left text-sm font-bold hover:no-underline p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all">
                      <div className="flex gap-3">
                        <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                        {bridgeVariable(item.question)}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 text-sm text-muted-foreground leading-relaxed">
                      {bridgeVariable(item.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
