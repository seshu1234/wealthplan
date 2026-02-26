'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { CalculatorConfig, executeCalculation } from '@/lib/calculator/engine'
import { formatCurrency } from '@/lib/format'

interface CalculatorPreviewProps {
  config: CalculatorConfig
}

const variantColors: Record<string, string> = {
  positive: 'text-emerald-600',
  negative: 'text-red-500',
  neutral: '',
}

export function CalculatorPreview({ config }: CalculatorPreviewProps) {
  const initialValues = useMemo(() => {
    const initial: Record<string, number | string> = {}
    config.inputs?.forEach(input => {
      initial[input.id] = input.defaultValue ?? 0
    })
    return initial
  }, [config.inputs])

  const [values, setValues] = useState<Record<string, number | string>>(initialValues)

  // Sync state when inputs change (e.g. new fields added)
  const inputKeys = config.inputs?.map(i => i.id).join(',') || ''
  useMemo(() => {
    setValues(initialValues)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputKeys])

  const results = useMemo(() => {
    if (!config.inputs?.length) return { outputs: {}, charts: {} }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Inputs Panel */}
      <Card className="lg:col-span-5 border-2 border-dashed">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Calculator Inputs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {config.inputs?.map((input) => (
            <div key={input.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={input.id} className="text-sm font-medium">{input.label}</Label>
                {input.unit && <span className="text-xs text-muted-foreground font-mono">{input.unit}</span>}
              </div>

              {input.type === 'slider' ? (
                <div className="space-y-2">
                  <Slider
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={[Number((values as any)[input.id] ?? input.min ?? 0)]}
                    min={input.min ?? 0}
                    max={input.max ?? 100}
                    step={input.step ?? 1}
                    onValueChange={([v]) => setValues(prev => ({ ...prev, [input.id]: v }))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{input.min ?? 0}</span>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <span className="font-semibold text-foreground">{(values as any)[input.id]}</span>
                    <span>{input.max ?? 100}</span>
                  </div>
                </div>
              ) : (
                <Input
                  id={input.id}
                  type="number"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(values as any)[input.id] ?? ''}
                  onChange={(e) => setValues(prev => ({ ...prev, [input.id]: parseFloat(e.target.value) || 0 }))}
                  className="tabular-nums"
                />
              )}
            </div>
          ))}
          {!config.inputs?.length && (
            <p className="text-sm text-muted-foreground text-center py-4">No inputs configured yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Results Panel */}
      <Card className="lg:col-span-7 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-primary">
            Calculated Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.outputs?.map((output) => (
              <div key={output.id} className="p-5 rounded-xl bg-background border shadow-sm">
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  {output.label}
                </p>
                <p className={`text-2xl font-bold tabular-nums ${variantColors[output.variant || 'neutral']}`}>
                  {formatValue(results.outputs?.[output.id], output.format)}
                </p>
                {output.formula && (
                  <p className="text-[10px] font-mono text-muted-foreground/60 mt-2 truncate">
                    = {output.formula}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!config.outputs?.length && (
            <p className="text-sm text-muted-foreground text-center py-8">Configure outputs to see results.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
