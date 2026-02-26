/**
 * HistoricalContext — one-line purchasing power insight.
 *
 * Example: "Your projected $1.2M in 30 years has the purchasing power of $680K today."
 *
 * Usage:
 *   <HistoricalContext futureValue={1200000} years={30} />
 *   <HistoricalContext futureValue={1200000} years={30} inflationRate={3} />
 */

interface HistoricalContextProps {
  futureValue: number
  years: number
  /** Annual inflation rate as a percentage. Defaults to 2.5 */
  inflationRate?: number
}

function formatShort(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${Math.round(value).toLocaleString()}`
}

export function HistoricalContext({ futureValue, years, inflationRate = 2.5 }: HistoricalContextProps) {
  const realValue = futureValue / Math.pow(1 + inflationRate / 100, years)
  const purchasing = formatShort(realValue)
  const future = formatShort(futureValue)
  const loss = Math.round((1 - realValue / futureValue) * 100)

  return (
    <p className="text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-2 border border-dashed">
      💡 Your projected {future} in {years} years has the purchasing power of{' '}
      <span className="font-semibold text-foreground">{purchasing} in today&apos;s dollars</span>
      {' '}at {inflationRate}% average inflation — a {loss}% reduction in real value.
    </p>
  )
}
