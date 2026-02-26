'use client'

import { Suspense, useMemo } from 'react'
import { SliderField } from '@/components/calculator/slider-field'
import { ResultGrid } from '@/components/calculator/result-grid'
import { ResultCard } from '@/components/calculator/result-card'
import { GrowthChart } from '@/components/calculator/growth-chart'
import { AIInterpreter } from '@/components/calculator/ai-interpreter'
import { ShareButton } from '@/components/calculator/share-button'
import { ScenarioNarrator } from '@/components/calculator/scenario-narrator'
import { calculateMortgage } from '@/lib/calculations/mortgage'
import { useCalcPersistence } from '@/hooks/use-calc-persistence'
import { formatCurrency } from '@/lib/format'

const defaults = {
  homePrice: 400000,
  downPaymentPercent: 20,
  annualRate: 7,
  years: 30,
  propertyTaxRate: 1.2,
  homeInsuranceAnnual: 1200,
  hoaFeesMonthly: 0,
}

function MortgageCalcInner() {
  const [inputs, update] = useCalcPersistence('calc-mortgage', defaults)

  const results = useMemo(() => calculateMortgage(inputs), [inputs])

  const chartData = useMemo(() => {
    return results.yearlyAmortization.map((data) => ({
      name: 'Year ' + data.year,
      Balance: data.remainingBalance,
      'Interest Paid': data.totalInterestPaid,
      'Principal Paid': data.totalPrincipalPaid,
    }))
  }, [results])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-4 space-y-6 bg-muted/30 p-6 rounded-xl border">
        <SliderField
          label="Home Price"
          value={inputs.homePrice}
          onChange={(val) => update({ homePrice: val })}
          min={50000} max={2000000} step={1000}
          formatValue={(val) => formatCurrency(val)}
        />
        <SliderField
          label="Down Payment %"
          value={inputs.downPaymentPercent}
          onChange={(val) => update({ downPaymentPercent: val })}
          min={0} max={100} step={1}
          formatValue={(val) => `${val}% ($${Math.round(inputs.homePrice * (val / 100)).toLocaleString()})`}
        />
        <SliderField
          label="Mortgage Rate"
          value={inputs.annualRate}
          onChange={(val) => update({ annualRate: val })}
          min={1} max={15} step={0.1}
          formatValue={(val) => val + '%'}
        />
        <SliderField
          label="Loan Term (Years)"
          value={inputs.years}
          onChange={(val) => update({ years: val })}
          min={10} max={40} step={5}
          formatValue={(val) => val + ' years'}
        />
        <h4 className="font-semibold pt-4 border-t">Taxes & Insurance</h4>
        <SliderField
          label="Property Tax Rate (Annual)"
          value={inputs.propertyTaxRate}
          onChange={(val) => update({ propertyTaxRate: val })}
          min={0} max={5} step={0.1}
          formatValue={(val) => val + '%'}
        />
        <SliderField
          label="Home Insurance (Annual)"
          value={inputs.homeInsuranceAnnual}
          onChange={(val) => update({ homeInsuranceAnnual: val })}
          min={0} max={5000} step={50}
          formatValue={(val) => formatCurrency(val)}
        />
        <SliderField
          label="HOA Fees (Monthly)"
          value={inputs.hoaFeesMonthly}
          onChange={(val) => update({ hoaFeesMonthly: val })}
          min={0} max={2000} step={10}
          formatValue={(val) => formatCurrency(val)}
        />
        <ShareButton />

        {/* Scenario Narrator — fires on >10% input change */}
        <ScenarioNarrator
          calculatorId="mortgage-calculator"
          inputs={inputs as unknown as Record<string, unknown>}
          results={results as unknown as Record<string, unknown>}
        />
      </div>

      {/* Results */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <ResultGrid columns={2}>
          <ResultCard
            label="Estimated Monthly Payment"
            value={formatCurrency(results.totalMonthlyPayment)}
            sublabel="Includes P&I, Taxes, Insurance, and HOA."
            variant="positive"
          />
          <ResultCard
            label="Total Interest Paid"
            value={formatCurrency(results.totalInterestPaid)}
            sublabel="Over the entire lifetime of the loan."
            variant="negative"
          />
        </ResultGrid>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg border">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Principal & Interest</p>
            <p className="font-semibold">{formatCurrency(results.monthlyPrincipalAndInterest)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Property Taxes</p>
            <p className="font-semibold">{formatCurrency(results.monthlyPropertyTax)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Home Insurance</p>
            <p className="font-semibold">{formatCurrency(results.monthlyHomeInsurance)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">HOA Fees</p>
            <p className="font-semibold">{formatCurrency(results.monthlyHoaFees)}</p>
          </div>
        </div>

        <AIInterpreter
          calculatorId="mortgage-calculator"
          inputs={inputs as unknown as Record<string, unknown>}
          results={results as unknown as Record<string, unknown>}
        />

        <div className="bg-background rounded-xl p-6 border shadow-sm flex-1 min-h-[400px]">
          <h3 className="text-lg font-semibold mb-6 tracking-tight">Amortization Schedule</h3>
          <p className="text-sm text-muted-foreground mb-4">Watch your loan balance decrease as your principal payments build equity.</p>
          <GrowthChart
            data={chartData}
            dataKeys={[
              { key: 'Balance', fillOpacity: 0.1 },
              { key: 'Total Interest Paid', fillOpacity: 0.6 },
              { key: 'Total Principal Paid', fillOpacity: 0.8 },
            ]}
            format="currency"
          />
        </div>
      </div>
    </div>
  )
}

export function MortgageCalc() {
  return (
    <Suspense fallback={
      <div className="h-96 flex items-center justify-center text-muted-foreground animate-pulse">
        Loading calculator…
      </div>
    }>
      <MortgageCalcInner />
    </Suspense>
  )
}
