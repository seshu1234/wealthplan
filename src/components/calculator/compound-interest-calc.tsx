'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SliderField } from '@/components/calculator/slider-field'
import { ResultGrid } from '@/components/calculator/result-grid'
import { ResultCard } from '@/components/calculator/result-card'
import { GrowthChart } from '@/components/calculator/growth-chart'
import { AIInterpreter } from '@/components/calculator/ai-interpreter'
import { ShareButton } from '@/components/calculator/share-button'
import { ScenarioNarrator } from '@/components/calculator/scenario-narrator'
import { InflationToggle } from '@/components/calculator/inflation-toggle'
import { calculateCompoundInterest } from '@/lib/calculations/compound-interest'
import { useCalcPersistence } from '@/hooks/use-calc-persistence'
import { formatCurrency } from '@/lib/format'

type Frequency = 'annually' | 'monthly' | 'daily'

const defaults = {
  principal: 10000,
  monthlyContribution: 500,
  annualRate: 7,
  years: 20,
}

const FREQUENCY_OPTIONS: Frequency[] = ['annually', 'monthly', 'daily']

function CompoundInterestCalcInner() {
  const [inputs, update] = useCalcPersistence('calc-compound-interest', defaults)
  const searchParams = useSearchParams()
  const frequency = (searchParams.get('frequency') as Frequency) ?? 'monthly'

  const fullInputs = useMemo(() => ({
    principal: inputs.principal,
    monthlyContribution: inputs.monthlyContribution,
    annualRate: inputs.annualRate,
    years: inputs.years,
    frequency,
  }), [inputs.principal, inputs.monthlyContribution, inputs.annualRate, inputs.years, frequency])

  const results = useMemo(() => calculateCompoundInterest(fullInputs), [fullInputs])

  const chartData = useMemo(() => {
    return results.yearlySchedule.map((data) => ({
      name: 'Year ' + data.year,
      Total: data.balance,
      Principal: data.totalContributions,
      Interest: data.totalInterest,
    }))
  }, [results])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6 bg-muted/30 p-6 rounded-xl border">
        <SliderField
          label="Initial Investment"
          value={inputs.principal}
          onChange={(val) => update({ principal: val })}
          min={0} max={1000000} step={1000}
          formatValue={(val) => formatCurrency(val)}
        />
        <SliderField
          label="Monthly Contribution"
          value={inputs.monthlyContribution}
          onChange={(val) => update({ monthlyContribution: val })}
          min={0} max={10000} step={50}
          formatValue={(val) => formatCurrency(val)}
        />
        <SliderField
          label="Expected Annual Return"
          value={inputs.annualRate}
          onChange={(val) => update({ annualRate: val })}
          min={0} max={20} step={0.1}
          formatValue={(val) => val + '%'}
        />
        <SliderField
          label="Years to Grow"
          value={inputs.years}
          onChange={(val) => update({ years: val })}
          min={1} max={50} step={1}
          formatValue={(val) => val + ' years'}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium">Compound Frequency</label>
          <select
            value={frequency}
            onChange={(e) => {
              const params = new URLSearchParams(window.location.search)
              params.set('frequency', e.target.value)
              window.history.replaceState(null, '', '?' + params.toString())
            }}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {FREQUENCY_OPTIONS.map(f => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>
        </div>
        <ShareButton />

        {/* Scenario Narrator — fires when inputs change >10% */}
        <ScenarioNarrator
          calculatorId="compound-interest"
          inputs={fullInputs as unknown as Record<string, unknown>}
          results={results as unknown as Record<string, unknown>}
        />
      </div>

      {/* Results */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Inflation Toggle wraps the result grid */}
        <InflationToggle nominalValue={results.finalBalance} years={inputs.years}>
          {(displayValue, isReal) => (
            <ResultGrid columns={3}>
              <ResultCard
                label={isReal ? 'Final Balance (Today\'s Dollars)' : 'Final Balance'}
                value={formatCurrency(displayValue)}
                sublabel={isReal ? 'Inflation-adjusted purchasing power.' : 'Total value after the selected time period.'}
                variant="positive"
              />
              <ResultCard
                label="Total Contributions"
                value={formatCurrency(results.totalContributions)}
                sublabel="Amount you personally contributed."
              />
              <ResultCard
                label="Interest Earned"
                value={formatCurrency(results.totalInterest)}
                sublabel="Money your money made for you."
                variant="positive"
              />
            </ResultGrid>
          )}
        </InflationToggle>

        <AIInterpreter
          calculatorId="compound-interest"
          inputs={fullInputs as unknown as Record<string, unknown>}
          results={results as unknown as Record<string, unknown>}
        />

        <div className="bg-background rounded-xl p-6 border shadow-sm flex-1 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Investment Growth Over Time</h3>
          <GrowthChart
            data={chartData}
            dataKeys={[{ key: 'Principal', fillOpacity: 0.2 }, { key: 'Interest', fillOpacity: 0.8 }]}
            format="currency"
          />
        </div>
      </div>
    </div>
  )
}

export function CompoundInterestCalc() {
  return (
    <Suspense fallback={
      <div className="h-96 flex items-center justify-center text-muted-foreground animate-pulse">
        Loading calculator…
      </div>
    }>
      <CompoundInterestCalcInner />
    </Suspense>
  )
}
