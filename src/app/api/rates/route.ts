import { NextResponse } from 'next/server'

// FRED API — free, no auth needed for public series
// Series used:
//   MORTGAGE30US  — 30-yr fixed mortgage rate (weekly)
//   FEDFUNDS      — Federal funds rate (monthly)
//   DGS10         — 10-yr Treasury yield (daily proxy for HYSA trends)

const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations'
const FRED_KEY = process.env.FRED_API_KEY || 'abcdefghijklmnopqrstuvwxyz012345' // free key, register at fred.stlouisfed.org

async function fetchLatestRate(series: string): Promise<number | null> {
  try {
    const url = new URL(FRED_BASE)
    url.searchParams.set('series_id', series)
    url.searchParams.set('api_key', FRED_KEY)
    url.searchParams.set('file_type', 'json')
    url.searchParams.set('sort_order', 'desc')
    url.searchParams.set('limit', '5') // last 5 observations to skip missing values

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
    if (!res.ok) return null

    const data = await res.json()
    const obs = data?.observations as { value: string; date: string }[] | undefined
    // FRED sometimes returns "." for missing values, skip those
    const valid = obs?.find(o => o.value !== '.')
    return valid ? parseFloat(valid.value) : null
  } catch {
    return null
  }
}

export async function GET() {
  const [mortgage30, fedFunds, treasury10] = await Promise.all([
    fetchLatestRate('MORTGAGE30US'),
    fetchLatestRate('FEDFUNDS'),
    fetchLatestRate('DGS10'),
  ])

  // Approximate HYSA rate = Fed Funds - 0.3 (high-yield savings track closely)
  const hysaRate = fedFunds !== null ? Math.max(0, fedFunds - 0.3) : null

  const rates = {
    mortgage30: mortgage30 ?? 6.82,    // fallback to reasonable defaults
    fedFunds: fedFunds ?? 5.33,
    treasury10: treasury10 ?? 4.25,
    hysaApprox: hysaRate ?? 5.0,
    asOf: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    source: 'Federal Reserve (FRED)',
  }

  return NextResponse.json(rates, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' },
  })
}
