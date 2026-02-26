'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Sparkles } from 'lucide-react'

interface ScenarioNarratorProps {
  calculatorId: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
}

// Simple delta detection — returns true if any numeric value changed by >10%
function hasSignificantChange(
  prev: Record<string, unknown>,
  next: Record<string, unknown>
): boolean {
  for (const key of Object.keys(next)) {
    const a = Number(prev[key])
    const b = Number(next[key])
    if (!isNaN(a) && !isNaN(b) && a !== 0) {
      const changePct = Math.abs((b - a) / a)
      if (changePct > 0.1) return true
    }
  }
  return false
}

// Narrator sends inputs to the AI interpreter API in 'narrator' mode
// The prompt is fully assembled server-side

export function ScenarioNarrator({ calculatorId, inputs, results }: ScenarioNarratorProps) {
  const [insight, setInsight] = useState('')
  const [loading, setLoading] = useState(false)
  const prevInputsRef = useRef<Record<string, unknown>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const isFirst = useRef(true)

  const fetchNarration = useCallback(async (prev: Record<string, unknown>) => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setLoading(true)
    try {
      const res = await fetch('/api/ai/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorId: `${calculatorId}-narrator`,
          inputs: { prev, next: inputs, changes: Object.keys(inputs).filter(k => prev[k] !== inputs[k]) },
          results,
          mode: 'narrator',
        }),
        signal: ctrl.signal,
      })
      if (!res.ok || !res.body) return

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
      }
      setInsight(text.trim())
    } catch (e) {
      if ((e as Error)?.name !== 'AbortError') setInsight('')
    } finally {
      setLoading(false)
    }
  }, [calculatorId, inputs, results])

  useEffect(() => {
    // Skip very first render
    if (isFirst.current) {
      isFirst.current = false
      prevInputsRef.current = inputs
      return
    }

    const prev = prevInputsRef.current
    const significant = hasSignificantChange(prev, inputs)
    prevInputsRef.current = inputs

    if (!significant) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => fetchNarration(prev), 1500)

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(inputs)])

  if (!insight && !loading) return null

  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/40 border px-4 py-2.5 text-sm animate-in fade-in-0 slide-in-from-bottom-2 print:hidden">
      <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent-brand))] shrink-0" />
      {loading ? (
        <span className="text-muted-foreground italic text-xs animate-pulse">Analyzing change…</span>
      ) : (
        <span className="text-foreground">{insight}</span>
      )}
    </div>
  )
}
