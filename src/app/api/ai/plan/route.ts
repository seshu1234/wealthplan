import { NextRequest } from 'next/server'
import OpenAI from 'openai'

const getAIClient = () => {
  if (process.env.DEEPSEEK_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      }),
      model: 'deepseek-chat',
    }
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      client: new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      }),
      model: 'gpt-4o-mini',
    }
  }
  return null
}

const PLAN_PROMPT = (answers: Record<string, string>) => `
You are a Strategic Financial Auditor AI. Based on the user's data provided below, create a high-authority, prioritized 1-page financial action plan.

User Profile:
- Age: ${answers.age}
- Annual Gross Income: ${answers.income}
- Monthly Debt Obligations: ${answers.debt}
- Current Liquid Assets: ${answers.assets}
- Primary Financial Objective: ${answers.goal}
- Target Timeline: ${answers.timeline}

Structure the plan with these sections:

## Strategic Audit Snapshot
2-3 sentences providing a direct mathematical assessment of their trajectory and identifying the "One Big Win" they should focus on.

## Prioritized Action Roadmap
- Provide 4-6 specific, numbered steps.
- Each step must start with a verb and include a specific mathematical target.
- CRITICAL: For each step, if it relates to a specific financial calculation, you MUST include a link token at the end in this exact format: [Link: slug]
  Relevant Slugs: compound-interest-calculator, 401k-match-calculator, debt-avalanche-calculator, fire-retirement-calculator, investment-calculator, state-tax-matrix.

## High-Leverage Quick Wins
3 bullet points for immediate execution (within 72 hours).

## 12-Month Performance Target
One clear, measurable milestone to hit by this time next year.

Be direct, analytical, and professional. No disclaimers. Use plain language but with high authority.`

const FALLBACK_PLAN = `## Strategic Audit Snapshot\nBased on your inputs, you have a solid foundation to work from. The key is building consistent habits around saving and debt reduction to hit your long-term objectives.\n\n## Prioritized Action Roadmap\n1. Build an emergency fund of at least 3 months of expenses. [Link: compound-interest-calculator]\n2. Maximize your 401(k) employer match immediately. [Link: 401k-match-calculator]\n3. Pay off all high-interest debt (>7%) using the avalanche method. [Link: debt-avalanche-calculator]\n4. Open a Roth IRA and contribute a fixed amount monthly. [Link: fire-retirement-calculator]\n5. Automate your savings workflow to ensure consistency.\n\n## High-Leverage Quick Wins\n- Set up an automatic transfer to savings for your next payday.\n- Check your credit score for free at annualcreditreport.com.\n- Audit and cancel at least two unused monthly subscriptions.\n\n## 12-Month Performance Target\nHave 3 months of expenses fully funded and be contributing at least 15% of your income towards retirement.`;

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json()

    if (!answers) {
      return new Response('Missing answers', { status: 400 })
    }

    const ai = getAIClient()

    if (!ai) {
      return new Response(FALLBACK_PLAN, { headers: { 'Content-Type': 'text/plain' } })
    }

    const stream = await ai.client.chat.completions.create({
      model: ai.model,
      messages: [{ role: 'user', content: PLAN_PROMPT(answers) }],
      stream: true,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) controller.enqueue(encoder.encode(content))
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
      },
    })
  } catch (err: unknown) {
    console.error('Plan API error:', err)
    
    // Handle status codes or specific messages from OpenAI/DeepSeek
    const errorBody = err as { status?: number; message?: string }
    if (errorBody.status === 429 || errorBody.message?.includes('429')) {
      return new Response(
        `## Strategic Audit Snapshot\nOur high-priority AI Auditor is currently reaching its capacity. Below is your **Standard Strategic Roadmap** based on the data provided.\n\n${FALLBACK_PLAN.split('## Strategic Audit Snapshot\n')[1]}`,
        { 
          headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'X-AI-Fallback': 'true'
          } 
        }
      )
    }

    return new Response('Failed to generate plan. Please try again.', { status: 500 })
  }
}
