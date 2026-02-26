'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Sparkles, RefreshCw, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'age',
    label: 'How old are you?',
    placeholder: 'e.g. 32',
    hint: 'We use this to tailor retirement timelines to your situation.',
    type: 'number',
  },
  {
    id: 'income',
    label: "What's your annual household income?",
    placeholder: 'e.g. $85,000',
    hint: 'Include salary, freelance, side income — gross is fine.',
    type: 'text',
  },
  {
    id: 'debt',
    label: 'How much do you pay toward debt each month?',
    placeholder: 'e.g. $1,200 (student loans, car, credit cards)',
    hint: 'Exclude your mortgage if you own — that comes later.',
    type: 'text',
  },
  {
    id: 'goal',
    label: "What's your #1 financial goal right now?",
    placeholder: 'e.g. Pay off student loans, buy a home, retire early, build an emergency fund',
    hint: 'Be specific — the more detail you give, the better your plan.',
    type: 'text',
  },
  {
    id: 'timeline',
    label: 'What timeline are you working with?',
    placeholder: 'e.g. 5 years, by age 50, within 18 months',
    hint: 'No right answer — just gives us context for prioritizing steps.',
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

  // Pre-fill if going back — intentionally only reacts to step change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCurrentAnswer(answers[q?.id] ?? '')
  }, [step])

  const handleNext = useCallback(async () => {
    if (!currentAnswer.trim()) return

    const newAnswers = { ...answers, [q.id]: currentAnswer.trim() }
    setAnswers(newAnswers)

    if (!isLast) {
      setStep(s => s + 1)
      return
    }

    // Final step — generate plan
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
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-5 w-5 text-[hsl(var(--accent-brand))]" />
          <span className="font-bold text-lg">AI Financial Plan Builder</span>
          <Link href="/calculators" className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to calculators
          </Link>
        </div>

        {/* Plan result page */}
        {(streaming || done) ? (
          <div className="space-y-6">
            <div className="rounded-xl border p-6 space-y-4 bg-gradient-to-br from-[hsl(var(--accent-brand-muted))] to-background">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[hsl(var(--accent-brand))]" />
                <span className="font-semibold text-sm text-[hsl(var(--accent-brand))] uppercase tracking-wide">Your Personalized Financial Plan</span>
                {streaming && (
                  <span className="ml-auto text-xs text-muted-foreground animate-pulse">Generating…</span>
                )}
              </div>

              {/* Render markdown-ish plan with simple formatting */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {plan.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} className="text-base font-bold mt-4 mb-1">{line.slice(3)}</h2>
                  if (line.startsWith('- ')) return <p key={i} className="text-sm ml-3 my-0.5">• {line.slice(2)}</p>
                  if (/^\d+\./.test(line)) return <p key={i} className="text-sm ml-3 my-0.5 font-medium">{line}</p>
                  if (line.trim() === '') return <div key={i} className="h-2" />
                  return <p key={i} className="text-sm my-1">{line}</p>
                })}
                {streaming && (
                  <span className="inline-block w-1 h-4 bg-[hsl(var(--accent-brand))] animate-pulse rounded-sm" />
                )}
              </div>
            </div>

            {done && (
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => { setStep(0); setPlan(''); setDone(false); setAnswers({}) }}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Start Over
                </Button>
                <Button onClick={() => window.print()} variant="outline">
                  🖨 Print / Save PDF
                </Button>
                <Button asChild>
                  <Link href="/calculators">Explore Calculators →</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          /* Question wizard */
          <div className="space-y-8">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Question {step + 1} of {QUESTIONS.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[hsl(var(--accent-brand))] rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <div className="rounded-xl border p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <Label className="text-xl font-semibold leading-snug">{q.label}</Label>
                <p className="text-sm text-muted-foreground">{q.hint}</p>
              </div>

              <Input
                type={q.type}
                placeholder={q.placeholder}
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-base h-12"
                autoFocus
              />

              <div className="flex gap-3">
                {step > 0 && (
                  <Button variant="outline" onClick={() => setStep(s => s - 1)}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                )}
                <Button
                  className="flex-1"
                  onClick={handleNext}
                  disabled={!currentAnswer.trim()}
                >
                  {isLast ? (
                    <><Sparkles className="h-4 w-4 mr-2" /> Generate My Plan</>
                  ) : (
                    <>Next <ArrowRight className="h-4 w-4 ml-2" /></>
                  )}
                </Button>
              </div>

              {/* Answered questions summary */}
              {Object.keys(answers).length > 0 && (
                <div className="pt-4 border-t space-y-1">
                  {QUESTIONS.slice(0, step).map(prev => (
                    <div key={prev.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3 w-3 text-green-500 shrink-0" />
                      <span className="font-medium">{prev.label.split('?')[0]}?</span>
                      <span className="text-foreground ml-auto">{answers[prev.id]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
