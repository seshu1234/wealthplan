'use client'

import { useState } from 'react'
import { ArrowRight, Calculator, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Choice {
  label: string
  value: string
}

interface Step {
  question: string
  choices: Choice[]
}

const STEPS: Step[] = [
  {
    question: "What are you trying to figure out?",
    choices: [
      { label: "💰 Growing my savings or investments", value: "grow" },
      { label: "🏠 Buying a home or refinancing", value: "home" },
      { label: "💳 Getting out of debt", value: "debt" },
      { label: "📊 Planning for retirement", value: "retire" },
      { label: "📋 My overall financial picture", value: "overall" },
    ],
  },
  {
    question: "What's most important right now?",
    choices: [
      { label: "⚡ Quick answer / estimate", value: "quick" },
      { label: "📈 Detailed projections & charts", value: "detailed" },
      { label: "🤖 Personalized AI recommendation", value: "ai" },
    ],
  },
]

// Rule-based routing — no AI call needed
const ROUTE_MAP: Record<string, { name: string; href: string; description: string }> = {
  'grow-quick':    { name: 'Compound Interest Calculator', href: '/calculators/compound-interest', description: 'See how your money grows over time' },
  'grow-detailed': { name: 'Compound Interest Calculator', href: '/calculators/compound-interest', description: 'Full year-by-year growth projection' },
  'grow-ai':       { name: 'AI Financial Plan', href: '/plan', description: 'Get a personalized investment action plan' },
  'home-quick':    { name: 'Mortgage Calculator', href: '/calculators/mortgage-calculator', description: 'Instant monthly payment estimate' },
  'home-detailed': { name: 'Mortgage Calculator', href: '/calculators/mortgage-calculator', description: 'Full amortization schedule + tax breakdown' },
  'home-ai':       { name: 'AI Financial Plan', href: '/plan', description: 'Should you buy now vs. wait? Get a plan' },
  'debt-quick':    { name: 'Debt Payoff Calculator', href: '/calculators/compound-interest', description: 'See when you\'ll be debt-free' },
  'debt-detailed': { name: 'Debt Payoff Calculator', href: '/calculators/compound-interest', description: 'Avalanche vs. snowball comparison' },
  'debt-ai':       { name: 'AI Financial Plan', href: '/plan', description: 'Custom debt elimination strategy' },
  'retire-quick':  { name: 'Compound Interest Calculator', href: '/calculators/compound-interest', description: 'How much will you have at retirement?' },
  'retire-detailed':{ name: 'Compound Interest Calculator', href: '/calculators/compound-interest', description: '401k + IRA combined projections' },
  'retire-ai':     { name: 'AI Financial Plan', href: '/plan', description: 'Retirement readiness + action steps' },
  'overall-ai':    { name: 'AI Financial Plan', href: '/plan', description: 'Complete 1-page financial plan' },
  'overall-quick': { name: 'AI Financial Plan', href: '/plan', description: 'Answer 5 questions, get a full plan' },
  'overall-detailed': { name: 'AI Financial Plan', href: '/plan', description: 'Personalized prioritized financial roadmap' },
}

export function CalculatorFinder() {
  const [answers, setAnswers] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<{ name: string; href: string; description: string } | null>(null)

  const handleChoice = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1)
      return
    }

    // Final step — look up route
    const key = newAnswers.join('-')
    const route = ROUTE_MAP[key] ?? ROUTE_MAP[`${newAnswers[0]}-ai`] ?? ROUTE_MAP['overall-ai']
    setResult(route)
  }

  const reset = () => { setAnswers([]); setCurrentStep(0); setResult(null) }

  if (result) {
    return (
      <div className="rounded-xl border bg-gradient-to-br from-[hsl(var(--accent-brand-muted))] to-background p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[hsl(var(--accent-brand))]" />
          <span className="text-sm font-semibold text-[hsl(var(--accent-brand))] uppercase tracking-wide">Your match</span>
        </div>
        <div className="space-y-1">
          <p className="font-bold text-xl">{result.name}</p>
          <p className="text-sm text-muted-foreground">{result.description}</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href={result.href}>
              Open Calculator <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>Start over</Button>
        </div>
      </div>
    )
  }

  const step = STEPS[currentStep]

  return (
    <div className="rounded-xl border p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-[hsl(var(--accent-brand))]" />
        <span className="font-semibold text-sm">Find the right calculator</span>
        <span className="ml-auto text-xs text-muted-foreground">{currentStep + 1}/{STEPS.length}</span>
      </div>

      <p className="font-semibold">{step.question}</p>

      <div className="grid gap-2">
        {step.choices.map(choice => (
          <button
            key={choice.value}
            onClick={() => handleChoice(choice.value)}
            className="text-left w-full px-4 py-3 rounded-lg border hover:border-[hsl(var(--accent-brand))] hover:bg-[hsl(var(--accent-brand)/0.05)] transition-colors text-sm font-medium"
          >
            {choice.label}
          </button>
        ))}
      </div>

      {currentStep > 0 && (
        <button onClick={() => { setCurrentStep(s => s - 1); setAnswers(a => a.slice(0, -1)) }}
          className="text-xs text-muted-foreground hover:text-foreground"
        >← Back</button>
      )}
    </div>
  )
}
