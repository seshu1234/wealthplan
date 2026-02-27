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

const SIDEKICK_PROMPT = (question: string, inputs: Record<string, unknown>, results: Record<string, unknown>, calculatorId: string, isAdjusted: boolean, rate: number) => `
You are a "What-If" Financial Sidekick for the ${calculatorId.replace(/-/g, ' ')} calculator.
A user has a specific question about their financial strategy.

Current User Parameters: ${JSON.stringify(inputs)}
Current Engine Results: ${JSON.stringify(results)}
Inflation Mode: ${isAdjusted ? `ACTIVE (${rate}% purchasing power adjustment applied to results)` : `INACTIVE (Results are NOMINAL values)`}

The User's "What-If" Question: "${question}"

Your Goal:
Provide a pithy, analytical, and authoritative answer (2-3 sentences max).
1. Bridge the gap between the user's natural question and the mathematical reality.
2. If the user is in Inflation Mode, acknowledge that these numbers represent "Real" purchasing power.
3. If they are NOT in Inflation Mode, warn them briefly if their long-term project ($X) will be eroded by inflation.
4. Give a clear "Greentick Advice" (Do it / Don't do it / Here's the risk).

Tone: Brutally honest, strategic, and encouraging. No bullet points. No headers. No disclaimers. PURE NARRATIVE.
`

export async function POST(request: NextRequest) {
  try {
    const { question, calculatorId, inputs, results, isInflationAdjusted, inflationRate } = await request.json()

    if (!question) {
      return new Response('Please ask a question.', { status: 400 })
    }

    const ai = getAIClient()

    if (!ai) {
      return new Response(
        "I'm currently off-duty. Please ensure your API keys are configured to enable the AI Sidekick.",
        { status: 200 }
      )
    }

    const prompt = SIDEKICK_PROMPT(question, inputs, results, calculatorId, isInflationAdjusted, inflationRate)

    const stream = await ai.client.chat.completions.create({
      model: ai.model,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      max_tokens: 300,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              controller.enqueue(encoder.encode(content))
            }
          }
        } catch (streamErr) {
          console.error('Sidekick streaming error:', streamErr)
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
    console.error('Sidekick Error:', err)
    return new Response('Unable to answer that right now.', { status: 200 })
  }
}
