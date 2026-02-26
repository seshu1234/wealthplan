import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const PLAN_PROMPT = (answers: Record<string, string>) => `
You are a certified financial planner AI. Based on the user's situation below, create a concise, personalized 1-page financial action plan with prioritized steps.

User profile:
- Age: ${answers.age}
- Annual income: ${answers.income}
- Monthly debt payments: ${answers.debt}
- Primary financial goal: ${answers.goal}
- Timeline: ${answers.timeline}

Write a financial plan with exactly this structure:

## Your Financial Snapshot
2-3 sentences assessing their overall situation candidly.

## Priority Action Steps
Numbered list of 5-7 specific, actionable steps ordered by urgency. Each step must:
- Start with a verb
- Include a specific number (amount, percentage, or timeframe)
- Be achievable within their timeline

## Quick Wins (Do This Week)
3 bullet points they can act on immediately, no excuses.

## 12-Month Milestone
One concrete, measurable goal to aim for by this time next year.

Be specific to their numbers. No generic advice. No disclaimers. Use plain language.`

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json()

    if (!answers) {
      return new Response('Missing answers', { status: 400 })
    }

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        `## Your Financial Snapshot\nBased on your inputs, you have a solid foundation to work from. The key is building consistent habits around saving and debt reduction.\n\n## Priority Action Steps\n1. Build a 3-month emergency fund of at least $5,000\n2. Maximize your 401(k) employer match — it's a 100% return\n3. Pay off any debt above 7% interest before investing\n4. Open a Roth IRA and contribute $500/month\n5. Automate all savings on payday\n\n## Quick Wins (Do This Week)\n- Set up automatic transfer to savings\n- Check your credit score (free at annualcreditreport.com)\n- Cancel unused subscriptions\n\n## 12-Month Milestone\nHave 3 months of expenses saved and be contributing to at least one retirement account.`,
        { headers: { 'Content-Type': 'text/plain' } }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContentStream(PLAN_PROMPT(answers))

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
  } catch (err) {
    console.error('Plan API error:', err)
    return new Response('Failed to generate plan', { status: 500 })
  }
}
