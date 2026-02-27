import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'

/**
 * Cache Service for AI Responses
 * Implements "Bucketing" (rounding) to maximize cache hits for similar profiles.
 */

// Helper to sanitize and round monetary values to nearest $5k
function bucketValue(val: string, bucketSize = 5000): number {
  const num = parseInt(val.replace(/[$,]/g, '')) || 0
  return Math.round(num / bucketSize) * bucketSize
}

// Helper to round age to nearest 5 years
function bucketAge(val: string): number {
  const num = parseInt(val) || 0
  return Math.round(num / 5) * 5
}

/**
 * Generates a stable hash for a user profile using bucketted values.
 */
export function generateProfileHash(answers: Record<string, string>): string {
  const bucketted = {
    age: bucketAge(answers.age),
    income: bucketValue(answers.income, 5000),
    assets: bucketValue(answers.assets, 5000),
    debt: bucketValue(answers.debt, 500), // Debt is more sensitive
    goal: answers.goal.toLowerCase().trim(),
    timeline: answers.timeline.toLowerCase().trim(),
  }
  
  const serialized = JSON.stringify(bucketted)
  return crypto.createHash('sha256').update(serialized).digest('hex')
}

/**
 * Generates a stable hash for a calculator interpretation.
 */
export function generateInterpretHash(calculatorId: string, inputs: Record<string, unknown>, results: Record<string, unknown>): string {
  // We bucket the most significant values in the results to ensure cache hits
  const profile = {
    id: calculatorId,
    // Bucket results to nearest 1% of the final balance/payment
    mainResult: bucketValue(String(results.finalBalance || results.totalMonthlyPayment || 0), 1000),
    annualRate: Math.round((Number(inputs.annualRate) || 0) * 10) / 10,
    years: Number(inputs.years) || 0
  }
  return crypto.createHash('sha256').update(JSON.stringify(profile)).digest('hex')
}

/**
 * Checks if a response exists in the cache.
 */
export async function getCachedResponse(hash: string) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('ai_plan_cache')
    .select('plan_content')
    .eq('input_hash', hash)
    .single()

  if (error || !data) return null
  return data.plan_content
}

/**
 * Saves a response to the cache.
 */
export async function saveResponseToCache(hash: string, content: string, provider: string, model: string) {
  const supabase = createAdminClient()
  await supabase.from('ai_plan_cache').upsert({
    input_hash: hash,
    plan_content: content,
    provider,
    model
  }, { onConflict: 'input_hash' })
}

/**
 * Deterministic Heuristic Layer
 * Instant audits for critical scenarios before calling AI.
 */
export function getHeuristicAudit(answers: Record<string, string>): string | null {
  const income = parseInt(answers.income.replace(/[$,]/g, '')) || 0
  const monthlyDebt = parseInt(answers.debt.replace(/[$,]/g, '')) || 0
  const assets = parseInt(answers.assets.replace(/[$,]/g, '')) || 0
  
  const monthlyIncome = income / 12
  const dti = monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) : 0

  // 1. Critical Debt Crisis Heuristic
  if (dti > 0.45) {
    return `## Strategic Audit Snapshot\nYour current Debt-to-Income ratio is **${Math.round(dti * 100)}%**, which is in the "Critical Risk" zone. This is significantly above the recommended 36% ceiling. Your trajectory is currently stalled by interest seepage.\n\n## Prioritized Action Roadmap\n1. Stop all non-essential spending immediately. [Link: debt-avalanche-calculator]\n2. Request a hardship program or interest rate reduction from your top 3 lenders.\n3. Implement a "Zero-Based Budget" this week. [Link: compound-interest-calculator]\n4. Research "Personal Loan" consolidation if credit score is >680.\n\n## High-Leverage Quick Wins\n- Call credit card companies to ask for an APR reduction.\n- Sell one unused item on Marketplace today for $100.\n- Automate only the "Minimum Payment" until your survival fund hits $1,000.\n\n## 12-Month Performance Target\nReduce DTI to below 35% and build a $2,500 stability fund.`
  }

  // 2. High Income / Zero Assets Heuristic (The "Henry" Problem)
  if (income > 150000 && assets < 5000) {
    return `## Strategic Audit Snapshot\nYou are a "HENRY" (High Earner, Not Rich Yet). With a projected income of **$${income.toLocaleString()}**, your lack of liquid assets suggests a significant "lifestyle creep" or cash flow leakage point.\n\n## Prioritized Action Roadmap\n1. Establish a "Pay Yourself First" automation of $1,000/mo today. [Link: investment-calculator]\n2. Maximize your 401(k) to lower your high tax bracket burden. [Link: 401k-match-calculator]\n3. Build a 6-month Emergency Fund of at least $30k. [Link: compound-interest-calculator]\n4. Audit your last 90 days of banking for "Subtle Subscriptions".\n\n## High-Leverage Quick Wins\n- Move $1,000 to a High-Yield Savings Account (HYSA).\n- Set up 401k contributions to at least 15%.\n- Cancel 3 unused monthly subscriptions.\n\n## 12-Month Performance Target\nReach $50,000 in liquid assets and automate 20% of gross income.`
  }

  return null
}
