'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Sparkles, RefreshCw, Check, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import { calculateWealthHealth } from '@/lib/ai/wealth-health-logic'
import { WealthHealthGauge } from '@/components/analytics/WealthHealthGauge'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const QUESTIONS = [
  {
    id: 'age',
    label: 'How old are you?',
    placeholder: 'e.g. 32',
    hint: 'Tailors retirement timelines to your situation.',
    type: 'number',
  },
  {
    id: 'income',
    label: "Annual household income?",
    placeholder: 'e.g. $85,000',
    hint: 'Gross income including salary and side income.',
    type: 'text',
  },
  {
    id: 'assets',
    label: 'Liquid assets?',
    placeholder: 'e.g. $12,500',
    hint: 'Savings, cash, and brokerage accounts.',
    type: 'text',
  },
  {
    id: 'debt',
    label: 'Monthly debt payments?',
    placeholder: 'e.g. $1,200',
    hint: 'Student loans, car, credit cards (exclude mortgage).',
    type: 'text',
  },
  {
    id: 'goal',
    label: "Top financial goal?",
    placeholder: 'e.g. Buy a home, retire early',
    hint: 'Be specific for a better plan.',
    type: 'text',
  },
  {
    id: 'timeline',
    label: 'Target timeline?',
    placeholder: 'e.g. 5 years, by age 50',
    hint: 'Provides context for prioritizing steps.',
    type: 'text',
  },
]

// Custom Markdown Component for Links/Checkboxes
const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-black mt-8 mb-4 text-primary uppercase tracking-tighter print:mt-6 print:mb-2">{children}</h3>,
        h3: ({ children }: { children?: React.ReactNode }) => <h4 className="text-lg font-bold mt-6 mb-3 text-foreground print:mt-4 print:mb-1">{children}</h4>,
        p: ({ children }: { children?: React.ReactNode }) => {
          if (typeof children === 'string' && children.includes('[Link:')) {
            const linkRegex = /\[Link:\s*([\w-]+)\]/g
            const parts = children.split(linkRegex)
            return (
              <p className="text-sm leading-relaxed text-foreground/90 my-2 print:my-1 flex flex-wrap items-center gap-1">
                {parts.map((part, i) => {
                  if (i % 2 === 0) return <span key={i}>{part}</span>
                  return (
                    <Button key={i} size="sm" variant="link" className="h-auto p-0 text-primary font-bold print:hidden" asChild>
                      <Link href={`/calculators/${part}`}>
                         (Use Calculator →)
                      </Link>
                    </Button>
                  )
                })}
              </p>
            )
          }
          return <p className="text-sm leading-relaxed text-foreground/90 my-2 print:my-1">{children}</p>
        },
        li: ({ children }: { children?: React.ReactNode }) => (
          <li className="text-sm my-1.5 flex gap-2 items-start print:my-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0 print:border print:bg-transparent print:border-primary/30" />
            <span className="flex-1">{children}</span>
          </li>
        ),
        strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-black text-primary print:text-foreground">{children}</strong>,
        ul: ({ children }: { children?: React.ReactNode }) => <ul className="space-y-1 my-3 print:my-1 pl-1">{children}</ul>,
        ol: ({ children }: { children?: React.ReactNode }) => <ol className="space-y-1 my-3 print:my-1 list-decimal pl-5">{children}</ol>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const PDFChecklist = ({ plan }: { plan: string }) => {
  // Extract and clean steps for the checklist
  const roadmapMatch = plan.match(/## Prioritized Action Roadmap\n([\s\S]*?)(?=##|$)/)
  if (!roadmapMatch) return null

  const steps = roadmapMatch[1]
    .split('\n')
    .filter(l => l.trim().match(/^[-\d]/))
    .map(l => l.replace(/^[-\d.]+\s*/, '').replace(/\[Link:.*?\]/, '').trim())
    .slice(0, 6)

  if (steps.length === 0) return null

  return (
    <div className="hidden print:block mt-6 pt-4 border-t-2 border-primary/10 break-inside-avoid">
      <div className="flex items-center gap-2 mb-4">
        <Check className="h-4 w-4 text-emerald-600" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Execution Registry</h4>
      </div>
      <div className="grid grid-cols-1 gap-y-3">
         {steps.map((step, i) => (
           <div key={i} className="flex items-start gap-4 border-b border-muted/30 pb-2">
              <div className="w-4 h-4 border border-primary/40 rounded-sm mt-0.5 shrink-0 bg-muted/50" />
              <div className="text-[9px] leading-tight text-foreground/80">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{step}</ReactMarkdown>
              </div>
           </div>
         ))}
      </div>
    </div>
  )
}

export default function PlanPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [plan, setPlan] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [done, setDone] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  // Calculate Wealth-Health Index
  const parseNum = (str: string) => Number(str.replace(/[^0-9.]/g, '')) || 0
  
  const healthData = done ? calculateWealthHealth({
    age: parseNum(answers.age),
    monthlyIncome: parseNum(answers.income) / 12,
    monthlyExpenses: (parseNum(answers.income) / 12) * 0.7 + parseNum(answers.debt), // Estimated expenses + debt
    liquidAssets: parseNum(answers.assets),
    totalMonthlyDebt: parseNum(answers.debt),
    savingsRate: (parseNum(answers.income) > 0) ? (parseNum(answers.income) * 0.15) / parseNum(answers.income) : 0, // Fallback SR
  }) : null

  const q = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1
  const progress = ((step) / QUESTIONS.length) * 100

  useEffect(() => {
    setCurrentAnswer(answers[q?.id] ?? '')
  }, [step, answers, q?.id])

  const handleNext = useCallback(async () => {
    if (!currentAnswer.trim()) return

    const newAnswers = { ...answers, [q.id]: currentAnswer.trim() }
    setAnswers(newAnswers)

    if (!isLast) {
      setStep(s => s + 1)
      return
    }

    setStreaming(true)
    setPlan('')
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      const res = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers }),
        signal: ctrl.signal,
      })
      if (!res.body) throw new Error('No stream')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done: d, value } = await reader.read()
        if (d) break
        setPlan(prev => prev + decoder.decode(value, { stream: true }))
      }
      setDone(true)
    } catch (e) {
      if ((e as Error)?.name !== 'AbortError') {
        setPlan('Unable to generate plan. Please try again.')
      }
    } finally {
      setStreaming(false)
    }
  }, [currentAnswer, answers, q, isLast])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <div className="min-h-screen bg-background print:min-h-0 print:bg-white">
      {/* Premium PDF Header (Print Only) */}
      <div className="hidden print:block mb-4 border-b-2 border-primary pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">WealthPath Strategic Audit</h1>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Official Action Pipeline | Confidential Strategy Document
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
             <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 transform -rotate-12 select-none">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Verified</span>
                </div>
                <Sparkles className="h-8 w-8 text-emerald-500" />
             </div>
             <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest leading-none">ID: WP-STRAT-{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 print:py-0 print:px-0 print:mt-0 print:max-w-none">
        
        <div className="flex items-center justify-between mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">AI Financial Plan Builder</h1>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/calculators">← Back</Link>
          </Button>
        </div>

        {(streaming || done) ? (
          <div className="space-y-6 print:space-y-0">
            <AnimatePresence>
              {healthData && (
                <motion.div 
                  key="health-gauge"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <WealthHealthGauge 
                    score={healthData.score} 
                    status={healthData.status} 
                    pillars={healthData.pillars} 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Card className="border-2 border-primary/10 shadow-none ring-0 print:border-0 print:shadow-none print:bg-transparent print:break-inside-auto">
              <CardHeader className="pb-4 print:pb-1 print:pt-0">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2 print:text-base print:tracking-tight">
                  <Sparkles className="h-4 w-4 print:hidden" />
                  Your Strategic Audit Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="print:p-0">
                <div className="space-y-1 print:space-y-0 text-balance">
                  <MarkdownRenderer content={plan} />
                  {streaming && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mt-4 print:hidden" />}
                </div>
              </CardContent>
            </Card>

            <PDFChecklist plan={plan} />

            {done && (
              <div className="flex flex-col sm:flex-row gap-3 print:hidden">
                <Button className="flex-1" onClick={() => { setStep(0); setPlan(''); setDone(false); setAnswers({}) }}>
                  <RefreshCw className="h-4 w-4 mr-2" /> New Plan
                </Button>
                <Button className="flex-1" onClick={() => window.print()} variant="outline">
                  Save PDF
                </Button>
              </div>
            )}

            {/* Print Only Disclaimer */}
            <div className="hidden print:block mt-8 pt-4 border-t border-muted/50 text-[8px] text-center text-muted-foreground leading-tight">
              Educational Disclaimer: WealthPath AI provides technology-driven insights only. This is not financial advice. 
              Full audit results valid 90 days. wealthpath.ai/verify
            </div>

            <p className="text-[10px] text-center text-muted-foreground print:hidden">
              Educational Disclaimer: WealthPath AI provides technology-driven insights only. Non-advisory service.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                <span>Step {step + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1 dark:bg-muted bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold leading-tight">{q.label}</CardTitle>
                <CardDescription className="italic">{q.hint}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type={q.type}
                  placeholder={q.placeholder}
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="text-lg h-12"
                  autoFocus
                />

                <div className="flex gap-3">
                  {step > 0 && (
                    <Button variant="outline" onClick={() => setStep(s => s - 1)}>
                      Back
                    </Button>
                  )}
                  <Button
                    className="flex-1"
                    onClick={handleNext}
                    disabled={!currentAnswer.trim()}
                  >
                    {isLast ? "Generate Plan" : "Continue"}
                  </Button>
                </div>

                {Object.keys(answers).length > 0 && (
                  <div className="pt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {QUESTIONS.slice(0, step).map(prev => (
                      <div key={prev.id} className="flex items-center gap-2 text-xs">
                        <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                        <span className="text-muted-foreground font-semibold uppercase tracking-tighter">{prev.id}:</span>
                        <span className="text-foreground truncate">{answers[prev.id]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
