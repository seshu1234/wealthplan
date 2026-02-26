'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Loader2 } from 'lucide-react'

interface LiveRates {
  mortgage30: number
  fedFunds: number
  hysaApprox: number
  treasury10: number
  asOf: string
}

interface LiveRatesBannerProps {
  /** If provided, shows a "Use current rate →" button that calls this */
  onUseRate?: (rate: number) => void
  /** Which rate to highlight — defaults to mortgage30 */
  highlightRate?: keyof Omit<LiveRates, 'asOf'>
}

export function LiveRatesBanner({ onUseRate, highlightRate = 'mortgage30' }: LiveRatesBannerProps) {
  const [rates, setRates] = useState<LiveRates | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/rates')
      .then(r => r.json())
      .then(data => { setRates(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
        <Loader2 className="h-3 w-3 animate-spin" />
        Loading current rates…
      </div>
    )
  }

  if (!rates) return null

  const rateLabels: Record<keyof Omit<LiveRates, 'asOf'>, string> = {
    mortgage30: '30-yr Mortgage',
    fedFunds: 'Fed Funds',
    hysaApprox: 'HYSA (approx)',
    treasury10: '10-yr Treasury',
  }

  const currentRate = rates[highlightRate]

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[hsl(var(--accent-brand)/0.3)] bg-[hsl(var(--accent-brand)/0.05)] px-4 py-2.5 text-sm print:hidden">
      <TrendingUp className="h-4 w-4 text-[hsl(var(--accent-brand))] shrink-0" />

      {/* All rates inline */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {(Object.keys(rateLabels) as (keyof typeof rateLabels)[]).map(key => (
          <span key={key} className={`${key === highlightRate ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            {rateLabels[key]}: <span className="tabular-nums">{rates[key].toFixed(2)}%</span>
          </span>
        ))}
      </div>

      <span className="text-xs text-muted-foreground ml-auto shrink-0">
        via FRED · {rates.asOf}
      </span>

      {onUseRate && (
        <button
          onClick={() => onUseRate(currentRate)}
          className="shrink-0 text-xs font-medium text-[hsl(var(--accent-brand))] hover:underline"
        >
          Use current rate →
        </button>
      )}
    </div>
  )
}
