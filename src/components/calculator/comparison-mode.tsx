'use client'

import { useState, useMemo } from 'react'
import { SliderField } from '@/components/calculator/slider-field'
import { GrowthChart } from '@/components/calculator/growth-chart'
import { Button } from '@/components/ui/button'
import { calculateCompoundInterest } from '@/lib/calculations/compound-interest'
import { formatCurrency } from '@/lib/format'
import { BarChart3, X } from 'lucide-react'

const defaults = {
  principal: 10000,
  monthlyContribution: 500,
  annualRate: 7,
  years: 20,
}

interface Scenario {
  principal: number
  monthlyContribution: number
  annualRate: number
  years: number
}

interface ComparisonDeltaProps {
  a: number
  b: number
  format?: 'currency' | 'percent'
}

function ComparisonDelta({ a, b, format = 'currency' }: ComparisonDeltaProps) {
  const delta = b - a
  if (Math.abs(delta) < 1) return null
  const isPositive = delta > 0
  const label = format === 'currency'
    ? (isPositive ? '+' : '') + formatCurrency(delta)
    : (isPositive ? '+' : '') + delta.toFixed(1) + '%'
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-500/15 text-green-600 dark:text-green-400' : 'bg-red-500/15 text-red-600 dark:text-red-400'}`}>
      {label}
    </span>
  )
}

export function ComparisonMode() {
  const [scenarioA, setA] = useState<Scenario>({ ...defaults })
  const [scenarioB, setB] = useState<Scenario>({ ...defaults, monthlyContribution: 800, annualRate: 8 })
  const [isOpen, setIsOpen] = useState(false)

  const resultsA = useMemo(() => calculateCompoundInterest({ ...scenarioA, frequency: 'monthly' }), [scenarioA])
  const resultsB = useMemo(() => calculateCompoundInterest({ ...scenarioB, frequency: 'monthly' }), [scenarioB])

  const mergedChart = useMemo(() => {
    return resultsA.yearlySchedule.map((d, i) => ({
      name: 'Year ' + d.year,
      'Scenario A': d.balance,
      'Scenario B': resultsB.yearlySchedule[i]?.balance ?? 0,
    }))
  }, [resultsA, resultsB])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-2 print:hidden"
        onClick={() => setIsOpen(true)}
      >
        <BarChart3 className="h-4 w-4" />
        Compare Scenarios
      </Button>
    )
  }

  return (
    <div className="border rounded-xl overflow-hidden print:hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-muted/40 border-b">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <BarChart3 className="h-4 w-4 text-[hsl(var(--accent-brand))]" />
          Scenario Comparison
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Two Input Panels side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        {/* Scenario A */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" />
            <span className="font-semibold text-sm">Scenario A — Baseline</span>
          </div>
          {makeSliders(scenarioA, setA)}
        </div>

        {/* Scenario B */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="font-semibold text-sm">Scenario B — Alternative</span>
          </div>
          {makeSliders(scenarioB, setB)}
        </div>
      </div>

      {/* Results Comparison */}
      <div className="border-t p-5 space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Results Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CompareCard
            label="Final Balance"
            a={resultsA.finalBalance}
            b={resultsB.finalBalance}
            format="currency"
          />
          <CompareCard
            label="Total Contributions"
            a={resultsA.totalContributions}
            b={resultsB.totalContributions}
            format="currency"
          />
          <CompareCard
            label="Interest Earned"
            a={resultsA.totalInterest}
            b={resultsB.totalInterest}
            format="currency"
          />
        </div>

        {/* Combined Chart */}
        <div className="rounded-xl border bg-background p-4 min-h-[300px]">
          <p className="text-sm font-medium mb-4">Growth Over Time — Side by Side</p>
          <GrowthChart
            data={mergedChart}
            dataKeys={[{ key: 'Scenario A', fillOpacity: 0.3 }, { key: 'Scenario B', fillOpacity: 0.6 }]}
            format="currency"
          />
        </div>
      </div>
    </div>
  )
}

function makeSliders(scenario: Scenario, setScenario: (s: Scenario) => void) {
  return (
    <>
      <SliderField
        label="Initial Investment"
        value={scenario.principal}
        onChange={(v) => setScenario({ ...scenario, principal: v })}
        min={0} max={1000000} step={1000}
        formatValue={(v) => formatCurrency(v)}
      />
      <SliderField
        label="Monthly Contribution"
        value={scenario.monthlyContribution}
        onChange={(v) => setScenario({ ...scenario, monthlyContribution: v })}
        min={0} max={10000} step={50}
        formatValue={(v) => formatCurrency(v)}
      />
      <SliderField
        label="Annual Return"
        value={scenario.annualRate}
        onChange={(v) => setScenario({ ...scenario, annualRate: v })}
        min={0} max={20} step={0.1}
        formatValue={(v) => v + '%'}
      />
      <SliderField
        label="Years"
        value={scenario.years}
        onChange={(v) => setScenario({ ...scenario, years: v })}
        min={1} max={50} step={1}
        formatValue={(v) => v + ' years'}
      />
    </>
  )
}

interface CompareCardProps {
  label: string
  a: number
  b: number
  format: 'currency' | 'percent'
}

function CompareCard({ label, a, b, format }: CompareCardProps) {
  return (
    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <div className="flex items-end gap-2 flex-wrap">
        <div>
          <p className="text-xs text-muted-foreground/60">A</p>
          <p className="font-bold text-lg tabular-nums">{formatCurrency(a)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/60">B</p>
          <p className="font-bold text-lg tabular-nums text-[hsl(var(--chart-2))]">{formatCurrency(b)}</p>
        </div>
        <ComparisonDelta a={a} b={b} format={format} />
      </div>
    </div>
  )
}
