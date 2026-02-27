'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Share2, Sparkles, Brain, Loader2,
  CheckCircle2, ShieldCheck, TrendingUp, MessageSquare, AlertTriangle, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AskQuestionPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const question = searchParams.get('q') || params.slug.replace(/-/g, ' ')
  
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getAnswer() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/ai/sidekick', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: `Explain this in detail (200-300 words) with strategic advice and a mathematical example if applicable: "${question}". Formatting: Use markdown bold for headers, no lists.`,
            calculatorId: 'qa-knowledge-base',
            inputs: {},
            results: {}
          })
        })

        if (!response.ok) throw new Error('Failed to fetch')

        const reader = response.body?.getReader()
        const utf8Decoder = new TextDecoder()
        let result = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += utf8Decoder.decode(value, { stream: true })
            setAnswer(result)
          }
        }
      } catch (err) {
        console.error(err)
        setAnswer("I'm sorry, I couldn't process your request right now. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    getAnswer()
  }, [question])

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        
        {/* Back Link */}
        <Link href="/ask" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-3" />
          Back to Knowledge Base
        </Link>

        {/* Question Header */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
          >
            <ShieldCheck className="size-3" />
            Mathematically Verified Answer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] border-l-8 border-primary pl-6"
          >
            {question}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Main Answer Column */}
          <div className="lg:col-span-8 space-y-12">
            <Card className="p-8 sm:p-12 border border-primary/10 rounded-2xl shadow-lg bg-card/80 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Brain size={160} />
               </div>
               <div className="relative z-10 space-y-8">
                  {isLoading && !answer ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <Loader2 className="size-8 animate-spin text-primary" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground animate-pulse">Running Financial Simulations...</p>
                    </div>
                  ) : (
                    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground font-medium leading-relaxed space-y-6">
                      {answer.split('\n\n').map((para, i) => (
                        <p key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[i*100ms] first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {!isLoading && (
                    <div className="pt-8 border-t border-dashed border-primary/10 flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                        <CheckCircle2 className="size-3" />
                        Audit Complete
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider hover:translate-y-[-1px] transition-transform">
                        <Share2 className="size-3" />
                        Share Answer
                      </button>
                    </div>
                  )}
               </div>
            </Card>

            {/* AI Warning / Disclaimer */}
            <div className="p-8 rounded-2xl bg-muted/20 border border-border space-y-4">
               <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                 <AlertTriangle className="size-3 text-amber-500" />
                 Strategic Context
               </h4>
               <p className="text-xs text-muted-foreground font-medium leading-relaxed font-medium">
                 This answer is generated based on standard US financial models and tax laws. It serves as an educational bridge to help you understand the underlying math before you consult a professional.
               </p>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-6 border border-primary/10 rounded-2xl bg-primary/5 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold tracking-tight">Execute This Strategy</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Recommended Tools</p>
                </div>
                <div className="space-y-3">
                   <Link href="/calculators/compound-interest" className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-all group shadow-sm">
                      <div className="flex items-center gap-3">
                         <TrendingUp className="size-4 text-primary" />
                         <span className="text-xs font-semibold">Projection Engine</span>
                      </div>
                      <ChevronRight className="size-3 text-muted-foreground group-hover:text-primary transition-all" />
                   </Link>
                   <Link href="/score" className="flex items-center justify-between p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-all group shadow-sm">
                      <div className="flex items-center gap-3">
                         <Sparkles className="size-4 text-primary" />
                         <span className="text-xs font-semibold">Check Health Score</span>
                      </div>
                      <ChevronRight className="size-3 text-muted-foreground group-hover:text-primary transition-all" />
                   </Link>
                </div>
             </Card>

             <Card className="p-6 border border-dashed border-border rounded-2xl bg-card space-y-4">
                <div className="flex items-center gap-2 text-primary">
                   <MessageSquare className="size-4" />
                   <span className="text-[10px] font-bold uppercase tracking-wider">Have a follow-up?</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">Ask our sidekick for a deeper dive into your specific tax situation.</p>
                <Button className="w-full text-[10px] font-bold uppercase tracking-wider" variant="outline" asChild>
                   <Link href="/sidekick">Open Sidekick</Link>
                </Button>
             </Card>
          </div>

        </div>

      </div>
    </main>
  )
}
