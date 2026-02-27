import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { getCachedResponse, saveResponseToCache, generateInterpretHash } from '@/lib/ai/cache-service'

const getAIClient = () => {
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      }),
      model: 'deepseek-chat',
      provider: 'deepseek'
    }
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      }),
      model: 'gpt-4o-mini',
      provider: 'openai'
    }
  }
  return null
}

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
You are a Strategic Financial Auditor AI analyzing a ${calculatorId.replace(/-/g, ' ')} projection.
I will give you the user's inputs and the mathematical outputs from our calculation engine.

User Inputs: ${JSON.stringify(inputs)}
Engine Results: ${JSON.stringify(results)}

Your goal is to provide a "Reality Check" insight (3-4 sentences) that:
1. Identifies the most significant mathematical "bottleneck" or "leverage point" in their current setup.
2. Provides ONE professional strategic pivot to optimize their trajectory.
3. Quantifies the impact of a small change (e.g., "Increasing X by 5% would accelerate your goal by Y months").
4. Ends with a high-authority, encouraging summary.

Be direct, analytical, and professional. Use strictly US nomenclature ($ and USD). NEVER use Indian terminology (₹, lakhs, crores). No bullet points. No headers. No disclaimers.`

export async function POST(request: NextRequest) {
  try {
    const { calculatorId, inputs, results } = await request.json()

    // Cache Layer (Persistent Result Reuse)
    const inputHash = generateInterpretHash(calculatorId, inputs, results)
    const cachedResponse = await getCachedResponse(inputHash)
    if (cachedResponse) {
      return new Response(cachedResponse, { 
        headers: { 'Content-Type': 'text/plain', 'X-AI-Strategy': 'cache-hit' } 
      })
    }

    const ai = getAIClient()

    if (!ai) {
      // Graceful fallback if AI key not configured
      return new Response(
        "Great calculation! Based on your inputs, you're making solid financial decisions. Consider reviewing your numbers periodically as your situation changes — even small adjustments now can make a significant difference over time.",
        { headers: { 'Content-Type': 'text/plain', 'X-AI-Strategy': 'fallback' } }
      )
    }

    const promptFn = PROMPTS[calculatorId]
    const prompt = promptFn
      ? promptFn(inputs, results)
      : DEFAULT_PROMPT(inputs, results, calculatorId)

    const stream = await ai.client.chat.completions.create({
      model: ai.model,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    })

    const encoder = new TextEncoder()
    let fullContent = ''
    
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              fullContent += content
              controller.enqueue(encoder.encode(content))
            }
          }
          if (fullContent.length > 30) {
            await saveResponseToCache(inputHash, fullContent, ai.provider, ai.model)
          }
        } catch (streamErr) {
          console.error('Streaming error:', streamErr)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'X-AI-Strategy': 'ai-generation'
      },
    })

  } catch (err: unknown) {
    console.error('AI Interpret Error:', err)

    // Gracefully handle quota / rate limit — return 200 with fallback text
    // so the UI shows something useful instead of an error state
    const errorBody = err as { status?: number; message?: string }
    const isQuotaError = errorBody.status === 429 || errorBody.message?.includes('429')

    if (isQuotaError) {
      return new Response(
        "AI insights are temporarily unavailable (provider quota reached). " +
        "Your numbers look solid — adjust the sliders to explore different scenarios. " +
        "To restore AI insights, ensure your API keys for DeepSeek or OpenAI are active.",
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
