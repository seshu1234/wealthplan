'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Sparkles, RefreshCw, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

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

export default function PlanPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [plan, setPlan] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [done, setDone] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

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

  const renderLine = (line: string, i: number) => {
    const linkRegex = /\[Link:\s*([\w-]+)\]/g
    const parts = line.split(linkRegex)
    
    if (line.startsWith('## ')) {
      return <h3 key={i} className="text-lg font-semibold mt-8 mb-4">{line.slice(3)}</h3>
    }
    
    const isBullet = line.trim().startsWith('- ') || /^\d+\./.test(line)
    
    return (
      <div key={i} className={`flex flex-wrap items-center gap-2 my-2 ${isBullet ? 'pl-4 border-l-2 border-muted' : ''}`}>
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            let cleanPart = part
            if (cleanPart.startsWith('- ')) cleanPart = cleanPart.slice(2)
            if (/^\d+\./.test(cleanPart)) cleanPart = cleanPart.replace(/^\d+\./, '')
            return <span key={index} className="text-sm text-foreground">{cleanPart}</span>
          } else {
            return (
              <Button key={index} size="sm" variant="link" className="h-auto p-0 text-primary font-semibold" asChild>
                <Link href={`/calculators/${part}`}>
                  Calculator →
                </Link>
              </Button>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">AI Financial Plan Builder</h1>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/calculators">← Back</Link>
          </Button>
        </div>

        {(streaming || done) ? (
          <div className="space-y-6">
            <Card className="border-2 border-primary/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Your Audit Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {plan.split('\n').filter(l => l.trim() !== '').map((line, i) => renderLine(line, i))}
                  {streaming && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mt-4" />}
                </div>
              </CardContent>
            </Card>

            {done && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" onClick={() => { setStep(0); setPlan(''); setDone(false); setAnswers({}) }}>
                  <RefreshCw className="h-4 w-4 mr-2" /> New Plan
                </Button>
                <Button className="flex-1" onClick={() => window.print()} variant="outline">
                  Save PDF
                </Button>
              </div>
            )}

            <p className="text-[10px] text-center text-muted-foreground">
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
