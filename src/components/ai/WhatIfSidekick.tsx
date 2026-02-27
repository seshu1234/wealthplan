'use client'

import { useState } from 'react'
import { Send, Brain, Loader2, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface WhatIfSidekickProps {
  calculatorId: string
  inputs: Record<string, unknown>
  results: Record<string, unknown>
}

const SUGGESTIONS = [
  "What if I wait 2 years?",
  "Invest vs Pay Debt?",
  "Should I double my pay?",
  "Is this realistic?"
]

export function WhatIfSidekick({ calculatorId, inputs, results }: WhatIfSidekickProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAsk = async (q = question) => {
    if (!q.trim()) return
    
    setIsAnalyzing(true)
    setAnswer('')
    const currentQuestion = q

    try {
      const response = await fetch('/api/ai/sidekick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion,
          calculatorId,
          inputs,
          results
        })
      })

      if (!response.ok) throw new Error('Sidekick analysis failed')

      const reader = response.body?.getReader()
      const utf8Decoder = new TextDecoder()
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = utf8Decoder.decode(value, { stream: true })
          setAnswer(prev => prev + chunk)
        }
      }
    } catch (error) {
      console.error('Sidekick Error:', error)
      setAnswer('Unable to generate answer. Please try again later.')
    } finally {
      setIsAnalyzing(false)
      setQuestion('')
    }
  }

  return (
    <div className="space-y-4 pt-4 border-t border-dashed">
      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
        <MessageSquare className="size-3" />
        &quot;What-If&quot; Strategy Sidekick
      </div>

      <AnimatePresence mode="wait">
        {answer && !isAnalyzing ? (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl bg-primary/5 border border-primary/10 relative group"
          >
             <div className="absolute top-0 right-0 p-3 opacity-10">
               <Brain size={32} className="text-primary" />
             </div>
             <p className="text-sm leading-relaxed text-foreground font-medium pr-8">
               {answer}
             </p>
             <button 
               onClick={() => setAnswer('')}
               className="mt-3 text-[10px] font-bold text-primary/60 hover:text-primary underline uppercase tracking-widest transition-colors"
             >
               Ask another scenario
             </button>
          </motion.div>
        ) : isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 flex flex-col items-center justify-center gap-3 text-muted-foreground italic rounded-2xl bg-muted/20 border border-dashed"
          >
            <Loader2 className="size-5 animate-spin text-primary" />
            <span className="text-xs font-medium">Sidekick is running the numbers...</span>
          </motion.div>
        ) : (
          <motion.div 
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="relative group">
              <Input
                placeholder="e.g. 'What if interest rates drop to 5%?'"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="h-12 pl-4 pr-12 text-sm font-medium bg-background border-primary/20 group-hover:border-primary/40 focus:border-primary transition-all rounded-xl shadow-inner"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleAsk()}
                disabled={!question.trim() || isAnalyzing}
                className="absolute right-1.5 top-1.5 h-9 w-9 text-primary hover:bg-primary/10 hover:text-primary transition-colors rounded-lg"
              >
                <Send className="size-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleAsk(s)}
                  className="px-3 py-1.5 rounded-full bg-muted border hover:border-primary/40 hover:bg-primary/5 text-[10px] font-bold text-muted-foreground hover:text-primary transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
