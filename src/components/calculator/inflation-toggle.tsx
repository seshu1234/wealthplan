'use client'

import { useState, useCallback } from 'react'
import { SliderField } from '@/components/calculator/slider-field'
import { HistoricalContext } from '@/components/calculator/historical-context'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface InflationToggleProps {
  /** The nominal (future) value to potentially adjust */
  nominalValue: number
  /** Time horizon in years */
  years: number
  /** Callback receives the display value (nominal or real) */
  children: (displayValue: number, isReal: boolean, inflationRate: number) => React.ReactNode
}

export function InflationToggle({ nominalValue, years, children }: InflationToggleProps) {
  const [showReal, setShowReal] = useState(false)
  const [inflationRate, setInflationRate] = useState(2.5)

  const realValue = nominalValue / Math.pow(1 + inflationRate / 100, years)
  const displayValue = showReal ? realValue : nominalValue

  return (
    <div className="space-y-3">
      {/* Toggle control */}
      <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-3 border">
        <Switch
          id="inflation-toggle"
          checked={showReal}
          onCheckedChange={setShowReal}
        />
        <Label htmlFor="inflation-toggle" className="cursor-pointer text-sm font-medium">
          {showReal ? "Showing today's dollars (inflation-adjusted)" : 'Showing future dollars (nominal)'}
        </Label>
      </div>

      {/* Inflation rate slider — only shown when toggle is on */}
      {showReal && (
        <div className="pl-2 border-l-2 border-[hsl(var(--accent-brand)/0.4)]">
          <SliderField
            label="Assumed Inflation Rate"
            value={inflationRate}
            onChange={setInflationRate}
            min={0} max={8} step={0.1}
            formatValue={(v) => v.toFixed(1) + '%'}
          />
        </div>
      )}

      {/* Render children with display value */}
      {children(displayValue, showReal, inflationRate)}

      {/* Context line */}
      {showReal && (
        <HistoricalContext
          futureValue={nominalValue}
          years={years}
          inflationRate={inflationRate}
        />
      )}
    </div>
  )
}
