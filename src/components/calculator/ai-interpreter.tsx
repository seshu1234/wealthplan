'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'

interface AIInterpreterProps {
  calculatorId: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
}

export function AIInterpreter({ calculatorId, inputs, results }: AIInterpreterProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const interpret = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    setText('')
    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/ai/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ calculatorId, inputs, results }),
        signal: ctrl.signal,
      })

      if (!res.ok || !res.body) throw new Error('Failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setText(prev => prev + decoder.decode(value, { stream: true }))
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }, [calculatorId, inputs, results])

  // Debounce: re-interpret 1.2s after inputs settle
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      interpret()
    }, 1200)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(inputs)])

  return (
    <div className="rounded-xl border bg-gradient-to-br from-[hsl(var(--accent-brand-muted))] to-background p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[hsl(var(--accent-brand))] shrink-0" />
          <span className="text-sm font-semibold text-[hsl(var(--accent-brand))] tracking-wide uppercase">
            AI Insight
          </span>
        </div>
        {!loading && (text || error) && (
          <button
            onClick={interpret}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        )}
      </div>

      {loading && !text && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/6" />
        </div>
      )}

      {error && !text && (
        <p className="text-sm text-muted-foreground italic">
          Unable to generate insight right now. Try refreshing.
        </p>
      )}

      {text && (
        <p className="text-sm leading-relaxed text-foreground">
          {text}
          {loading && (
            <span className="inline-block w-1 h-3.5 ml-0.5 bg-[hsl(var(--accent-brand))] animate-pulse rounded-sm" />
          )}
        </p>
      )}
    </div>
  )
}
