'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Primitive = string | number | boolean

/**
 * useCalcPersistence — generic hook for calculator state persistence.
 *
 * Priority: URL params > localStorage > defaultValues
 *
 * @param storageKey  Unique key, e.g. "calc-compound-interest"
 * @param defaults    Default values for the calculator inputs
 * @param urlKeys     Keys to serialize into the URL (usually all keys)
 */
export function useCalcPersistence<T extends Record<string, Primitive>>(
  storageKey: string,
  defaults: T,
  urlKeys: (keyof T)[] = Object.keys(defaults) as (keyof T)[]
): [T, (updates: Partial<T>) => void, () => string] {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  // 1. Build initial state: URL > localStorage > defaults
  const getInitialState = (): T => {
    // Check URL params first
    const hasUrlParams = urlKeys.some(k => searchParams.has(String(k)))

    if (hasUrlParams) {
      const fromUrl = { ...defaults }
      for (const key of urlKeys) {
        const raw = searchParams.get(String(key))
        if (raw !== null) {
          const def = defaults[key]
          if (typeof def === 'number') {
            const n = parseFloat(raw)
            if (!isNaN(n)) (fromUrl as Record<string, Primitive>)[String(key)] = n
          } else if (typeof def === 'boolean') {
            (fromUrl as Record<string, Primitive>)[String(key)] = raw === 'true'
          } else {
            (fromUrl as Record<string, Primitive>)[String(key)] = raw
          }
        }
      }
      return fromUrl
    }

    // Then localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) {
          const parsed = JSON.parse(saved)
          return { ...defaults, ...parsed }
        }
      } catch { /* ignore */ }
    }

    return defaults
  }

  const [state, setState] = useState<T>(getInitialState)

  // 2. Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch { /* ignore */ }
  }, [state, storageKey])

  // 3. Sync to URL (debounced, skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const params = new URLSearchParams()
    for (const key of urlKeys) {
      params.set(String(key), String(state[key]))
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  // 4. Update function — merges partial updates
  const update = (updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  // 5. Share URL builder
  const getShareUrl = (): string => {
    if (typeof window === 'undefined') return ''
    const params = new URLSearchParams()
    for (const key of urlKeys) {
      params.set(String(key), String(state[key]))
    }
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`
  }

  return [state, update, getShareUrl]
}
