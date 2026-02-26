import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Prompt templates for each calculator type
const PROMPTS: Record<string, (inputs: Record<string, unknown>, results: Record<string, unknown>) => string> = {
  'compound-interest': (inputs, results) => `
You are a friendly, direct financial advisor AI. A user just ran a compound interest calculation.

Their inputs:
- Initial investment: $${inputs.principal?.toLocaleString()}
- Monthly contribution: $${inputs.monthlyContribution?.toLocaleString()}
- Annual return: ${inputs.annualRate}%
- Time period: ${inputs.years} years
- Compounding: ${inputs.frequency}

Results:
- Final balance: $${Number(results.finalBalance).toLocaleString('en-US', { maximumFractionDigits: 0 })}
- Total contributed: $${Number(results.totalContributions).toLocaleString('en-US', { maximumFractionDigits: 0 })}
- Interest earned: $${Number(results.totalInterest).toLocaleString('en-US', { maximumFractionDigits: 0 })}

Write a 3-4 sentence insight paragraph that:
1. Contextualizes this result (is this good/average/needs improvement?)
2. Gives ONE specific, actionable recommendation to improve their outcome
3. Mentions a concrete number (e.g. "increasing monthly contribution by $200 would add ~$X to your balance")
4. Ends with one encouraging line

Be direct, specific, and human. No bullet points. No headers. No financial disclaimer. Just the paragraph.`,

  'mortgage-calculator': (inputs, results) => `
You are a friendly, direct financial advisor AI. A user just ran a mortgage calculation.

Their inputs:
- Home price: $${Number(inputs.homePrice).toLocaleString()}
- Down payment: ${inputs.downPaymentPercent}% ($${Math.round(Number(inputs.homePrice) * Number(inputs.downPaymentPercent) / 100).toLocaleString()})
- Mortgage rate: ${inputs.annualRate}%
- Loan term: ${inputs.years} years
- Property tax rate: ${inputs.propertyTaxRate}%

Results:
- Monthly payment (total): $${Number(results.totalMonthlyPayment).toLocaleString('en-US', { maximumFractionDigits: 0 })}
- Monthly P&I: $${Number(results.monthlyPrincipalAndInterest).toLocaleString('en-US', { maximumFractionDigits: 0 })}
- Total interest paid: $${Number(results.totalInterestPaid).toLocaleString('en-US', { maximumFractionDigits: 0 })}

Write a 3-4 sentence insight paragraph that:
1. Comments on their rate relative to current market (~6.7% as of early 2026)
2. Notes the total interest cost as a percentage of the home price
3. Gives ONE specific actionable tip (e.g. extra payment strategy, refinance threshold, 15yr vs 30yr tradeoff)
4. Ends with a grounding observation

Be direct, specific, and human. No bullet points. No headers. No financial disclaimer. Just the paragraph.`,
}

const DEFAULT_PROMPT = (inputs: Record<string, unknown>, results: Record<string, unknown>, calculatorId: string) => `
You are a friendly financial advisor AI helping someone understand their ${calculatorId.replace(/-/g, ' ')} calculation.

Their key inputs: ${JSON.stringify(inputs)}
Their results: ${JSON.stringify(results)}

Write a 3-4 sentence paragraph that interprets these results, gives one specific actionable recommendation, and ends encouragingly.
Be direct, specific, and human. No bullet points. No headers. Just the paragraph.`

export async function POST(request: NextRequest) {
  try {
    const { calculatorId, inputs, results } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback if API key not configured
      return new Response(
        "Great calculation! Based on your inputs, you're making solid financial decisions. Consider reviewing your numbers periodically as your situation changes — even small adjustments now can make a significant difference over time.",
        { headers: { 'Content-Type': 'text/plain' } }
      )
    }

    const promptFn = PROMPTS[calculatorId]
    const prompt = promptFn
      ? promptFn(inputs, results)
      : DEFAULT_PROMPT(inputs, results, calculatorId)

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Stream the response
    const result = await model.generateContentStream(prompt)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text()
          if (text) controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })

  } catch (err: unknown) {
    console.error('AI Interpret Error:', err)

    // Gracefully handle quota / rate limit — return 200 with fallback text
    // so the UI shows something useful instead of an error state
    const isQuotaError =
      (err instanceof Error && err.message.includes('429')) ||
      (typeof err === 'object' && err !== null && 'status' in err && (err as { status: number }).status === 429)

    if (isQuotaError) {
      return new Response(
        "AI insights are temporarily unavailable (free-tier quota reached). " +
        "Your numbers look solid — adjust the sliders to explore different scenarios. " +
        "To restore AI insights, upgrade your Gemini API key at ai.google.dev.",
        {
          status: 200,
          headers: { 'Content-Type': 'text/plain', 'X-AI-Fallback': 'quota' },
        }
      )
    }

    return new Response('Unable to generate insight right now.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain', 'X-AI-Fallback': 'error' },
    })
  }
}
