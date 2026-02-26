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
import { ChevronDown, Sparkles, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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

function AnimatedNumber({ value }: { value: number | string }) {
  const num = Number(value)
  if (isNaN(num)) return <span>{value}</span>
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      key={num}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {num.toLocaleString('en-US', { maximumFractionDigits: 0 })}
    </motion.span>
  )
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

  // Sync state if config changes (avoiding useEffect for synchronous updates)
  const [prevConfig, setPrevConfig] = useState(config)
  if (config !== prevConfig) {
    setPrevConfig(config)
    const initial: Record<string, number | string> = {}
    config.inputs?.forEach(input => {
      initial[input.id] = input.defaultValue ?? 0
    })
    setValues(initial)
  }

  const results = useMemo(() => {
    return executeCalculation(config, values)
  }, [config, values])

  const formatValue = (val: number | string | undefined, format: 'currency' | 'percent' | 'number') => {
    if (val === undefined || val === null) return '—'
    const num = Number(val)
    if (isNaN(num)) return '—'
    if (format === 'currency') return <span>$<AnimatedNumber value={num} /></span>
    if (format === 'percent') return <span><AnimatedNumber value={num} />%</span>
    return <AnimatedNumber value={num} />
  }

  const bridgeVariable = (text: string | undefined) => {
    if (!text) return ''
    let bridged = text
    
    // Merge inputs and results for bridging
    const allVars: Record<string, string | number> = { ...values, ...results.outputs }
    
    Object.entries(allVars).forEach(([id, val]) => {
      // Find output config for formatting if it exists
      const outputConfig = config.outputs?.find(o => o.id === id)
      const formatted = outputConfig 
        ? formatValue(val, outputConfig.format)
        : (typeof val === 'number' ? val.toLocaleString() : String(val))
      
      // Use case-insensitive and space-flexible regex
      const regex = new RegExp(`\\{\\{\\s*${id}\\s*\\}\\}`, 'gi')
      bridged = bridged.replace(regex, formatted)
    })

    return bridged
  }

  const content = config.content || {}

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-12"
    >
      {/* Main Interactive Section - Combined Card */}
      <Card className="border shadow-lg overflow-hidden backdrop-blur-sm bg-card/95">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x">
          {/* Left: Input Parameters */}
          <div className="lg:col-span-5 bg-muted/5 p-6 sm:p-8 space-y-8">
            <div className="flex items-center gap-2 pb-2 border-b">
              <ChevronDown className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Parameters</h2>
            </div>
            <div className="space-y-8">
              {config.inputs?.map((input) => (
                <div key={input.id} className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <Label htmlFor={`calc-${input.id}`} className="text-xs font-semibold leading-none">
                      {input.label}
                    </Label>
                    <span className="text-sm font-bold tabular-nums text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                      {values[input.id]}{input.unit}
                    </span>
                  </div>

                  {input.type === 'slider' ? (
                    <Slider
                      value={[Number(values[input.id] ?? input.min ?? 0)]}
                      min={input.min ?? 0}
                      max={input.max ?? 100}
                      step={input.step ?? (input.max && input.max > 100 ? 1 : 0.1)}
                      onValueChange={([v]) => setValues(prev => ({ ...prev, [input.id]: v }))}
                      className="py-1"
                    />
                  ) : (
                    <Input
                      id={`calc-${input.id}`}
                      type="number"
                      value={values[input.id] ?? ''}
                      onChange={(e) =>
                        setValues(prev => ({
                          ...prev,
                          [input.id]: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="h-10 px-4 text-sm font-medium bg-background"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Real-time Results & Summary */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-8 bg-card">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Calculated Projection</h2>
            </div>

            {/* Results Grid - High Visibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.outputs?.map((output) => (
                <div key={output.id} className="p-5 rounded-xl border bg-muted/10 space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    {output.label}
                  </p>
                  <p className={`text-2xl sm:text-3xl font-bold tabular-nums tracking-tight ${variantClasses[output.variant || 'neutral']}`}>
                    {formatValue(results.outputs[output.id], output.format)}
                  </p>
                </div>
              ))}
            </div>

            {/* Insight Title/Body */}
            {(content?.explanation?.title || content?.explanation?.body) && (
              <div className="space-y-4 pt-4 border-t border-dashed">
                <h3 className="text-lg font-bold tracking-tight">
                  {bridgeVariable(content?.explanation?.title || "Insight")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {bridgeVariable(content?.explanation?.body || "")}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Narrative Impact Section - Standalone between results and chart */}
      {content.intro && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative py-12 px-8 rounded-[2rem] bg-gradient-to-br from-primary/10 via-background/40 to-primary/5 border border-primary/20 shadow-[0_8px_32px_0_rgba(var(--primary-rgb),0.05)] backdrop-blur-md overflow-hidden text-center max-w-4xl mx-auto"
        >
          <div className="absolute -top-6 -left-6 opacity-[0.03] rotate-12">
            <Quote size={120} />
          </div>
          <div className="absolute -bottom-6 -right-6 opacity-[0.03] -rotate-12">
            <Quote size={120} />
          </div>
          <p className="text-xl sm:text-2xl leading-relaxed text-foreground italic font-semibold relative z-10 tracking-tight">
            &ldquo;{bridgeVariable(content.intro)}&rdquo;
          </p>
        </motion.div>
      )}

      {/* Projection Chart Section */}
      {config.charts?.map((chart) => (
        <motion.div
          key={chart.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border shadow-lg overflow-hidden bg-card/95 backdrop-blur-sm">
            <CardHeader className="py-4 px-6 border-b bg-muted/20">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {chart.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-8 sm:pt-12">
              <div className="min-h-[300px] sm:min-h-[400px] h-[300px] sm:h-[400px] w-full px-4 sm:px-8 min-w-0 relative">
                {results.charts[chart.id] && results.charts[chart.id].length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.charts[chart.id]} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey={chart.loopKey} 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => `Yr ${val}`}
                        dy={10}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => `$${(Number(val) / 1000).toFixed(0)}k`}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      {chart.series.map((s, i) => (
                        <Area
                          key={s.dataKey}
                          type="monotone"
                          dataKey={s.dataKey}
                          name={s.label}
                          stroke={s.color || colorList[i % colorList.length]}
                          fill={s.color || colorList[i % colorList.length]}
                          fillOpacity={0.08}
                          strokeWidth={3}
                          animationDuration={1500}
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm italic">
                    Calculating projections...
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-6 p-6 sm:p-8 justify-center border-t bg-muted/5 mt-8">
                {chart.series.map((s, i) => (
                  <div key={s.dataKey} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm" 
                      style={{ backgroundColor: s.color || colorList[i % colorList.length] }} 
                    />
                    {s.label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

        {/* Expertise & Context Section - Full Width Vertical Flow */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-16 pt-12 border-t"
        >
          {/* 2. Strategic Takeaways - High Impact Consultative Box */}
          {results.outputs && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-primary text-primary-foreground shadow-2xl relative overflow-hidden group"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Executive Summary</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Your Path to Financial Mastery
                </h3>
                <p className="text-primary-foreground/80 text-lg font-medium leading-relaxed max-w-xl">
                  Based on your current numbers, here are the three critical pillars that will define your wealth trajectory over the coming years.
                </p>
              </div>

              <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 shrink-0">
                {[
                  { icon: "01", label: "Capital Efficiency", text: "Maximizing yield on every unit of input." },
                  { icon: "02", label: "Temporal Strategy", text: "Leveraging the exponential math of time." },
                  { icon: "03", label: "Risk Mitigation", text: "Ensuring structural integrity of your plan." }
                ].map((pill, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm min-w-[240px]">
                    <span className="text-xl font-black opacity-30 tabular-nums">{pill.icon}</span>
                    <div>
                      <p className="text-sm font-bold tracking-tight">{pill.label}</p>
                      <p className="text-xs opacity-70 leading-relaxed">{pill.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* 3. Deep Dive - Main Narrative Stage */}
        <div className="space-y-16">
          {/* Expert Analysis Section */}
          {content.deepDive?.body && (
            <section className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-4 text-center">
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter">
                  {bridgeVariable(content.deepDive.title || "Deep Analysis")}
                </h3>
                <div className="h-1.5 w-16 bg-primary mx-auto rounded-full" />
              </div>
              <div className="text-lg sm:text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap prose prose-slate dark:prose-invert max-w-none prose-p:mb-8 text-center sm:text-left selection:bg-primary/20">
                {bridgeVariable(content.deepDive.body)}
              </div>
            </section>
          )}

          {/* Practical Action Steps Grid */}
          {content.howToUse && content.howToUse.length > 0 && (
            <section className="space-y-10 pt-16 border-t border-dashed">
              <div className="flex flex-col items-center text-center space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Execution Roadmap</p>
                <h3 className="text-2xl font-bold tracking-tight">Three steps to lock in your success</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.howToUse?.slice(0, 3).map((step: string, i: number) => (
                  <div key={i} className="flex flex-col gap-6 p-8 border rounded-[2rem] bg-card hover:border-primary/50 transition-all shadow-sm group hover:shadow-xl hover:-translate-y-1 duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-base font-bold leading-relaxed">{bridgeVariable(step)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. Full-Width FAQ Stage - Highly Optimized 2-Column Grid */}
          {content.faq && content.faq.length > 0 && (
            <section className="space-y-12 pt-16 border-t">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <h4 className="font-black text-2xl tracking-tight text-foreground">Strategic Clarity</h4>
                  <p className="text-muted-foreground font-medium italic">Answering your top questions on this projection.</p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-border/50 mx-8 mb-3" />
                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0 self-start md:self-auto">
                  <ChevronDown className="h-3.5 w-3.5 text-primary" />
                  <span>FAQ Compendium</span>
                </div>
              </div>

              <div className="max-w-3xl mx-auto w-full">
                <Accordion type="multiple" className="w-full space-y-4">
                  {content.faq?.map((item: { question: string; answer: string }, i: number) => (
                    <AccordionItem key={`faq-${i}`} value={`faq-${i}`} className="border rounded-2xl px-6 bg-card/50 hover:bg-card transition-colors shadow-sm border-border/50 overflow-hidden">
                      <AccordionTrigger className="text-left text-sm font-bold hover:no-underline py-5 group">
                        <span className="group-hover:text-primary transition-colors">{bridgeVariable(item.question)}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 pt-2 border-t border-dashed mt-2">
                        {bridgeVariable(item.answer)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          )}
        </div>

        {/* 5. Wealth Transformation Journey Roadmap - Final Visual Anchor */}
        <section className="pt-24 pb-8">
          <div className="p-10 rounded-[3rem] bg-muted/40 border border-border/50 relative overflow-hidden text-center space-y-10 group">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
             
             <div className="space-y-2">
              <h4 className="font-bold text-[10px] uppercase tracking-[0.4em] text-primary">Transformation Journey</h4>
              <p className="text-2xl font-black tracking-tight">Building Legacy, One Decision At A Time.</p>
             </div>

             <div className="relative max-w-4xl mx-auto py-8">
               {/* Timeline track */}
               <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/60 -translate-y-1/2 hidden sm:block" />
               
               <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 relative z-10">
                 {[
                   { label: "Foundation", text: "Locking goal parameters" },
                   { label: "Execution", text: "Consistency is your leverage" },
                   { label: "Accumulation", text: "The power of compounding" },
                   { label: "Dominance", text: "Financial freedom achieved" }
                 ].map((milestone, idx) => (
                   <div key={idx} className="space-y-3">
                     <div className="w-10 h-10 rounded-full bg-background border-4 border-primary mx-auto flex items-center justify-center font-black text-xs shadow-lg group-hover:scale-110 transition-transform duration-500">
                      {idx + 1}
                     </div>
                     <div className="space-y-1">
                       <p className="text-xs font-black uppercase tracking-widest">{milestone.label}</p>
                       <p className="text-[10px] text-muted-foreground font-medium">{milestone.text}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </section>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 1cm; size: auto; }
          body { background: white !important; font-size: 10pt !important; }
          .no-print, header, footer, aside, button, .accordion-trigger svg { display: none !important; }
          
          /* Forced Layout Stacking & Size */
          .grid { display: block !important; width: 100% !important; }
          .lg\\:col-span-12, .lg\\:col-span-5, .lg\\:col-span-7, .lg\\:col-span-8, .lg\\:col-span-4 { width: 100% !important; margin-bottom: 0.5rem !important; page-break-inside: avoid; }
          
          /* Typography & Spacing Reduction */
          .space-y-12, .space-y-16, .space-y-8 { margin-top: 1rem !important; margin-bottom: 1rem !important; gap: 0.5rem !important; }
          .pt-12, .py-12, .p-8, .p-6 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
          .text-3xl, .text-4xl, .text-2xl { font-size: 14pt !important; line-height: 1.2 !important; }
          
          /* Chart Optimization */
          .recharts-responsive-container { height: 300px !important; width: 100% !important; }
          .h-\\[300px\\], .h-\\[400px\\], .min-h-\\[300px\\], .min-h-\\[400px\\] { height: 250px !important; min-height: 250px !important; }
          
          /* Force Visibility of Charts/Cards */
          .border { border: 1px solid #eee !important; border-radius: 8px !important; }
          .bg-muted, .bg-card { background: #fafafa !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .text-primary { color: #000 !important; font-weight: bold; }
          
          /* Density: Result Grid */
          .grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; display: grid !important; }
          .rounded-xl, .rounded-2xl { border-radius: 4px !important; }
          
          /* Bridge Section */
          .rounded-\\[2rem\\] { border-radius: 8px !important; border: 1px solid #ddd !important; }
        }
      `}} />
    </motion.div>
  )
}
