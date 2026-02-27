'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, ArrowRight, Sparkles, 
  Brain, HelpCircle, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const featuredQuestions = [
  { 
    q: "How much should I save for retirement by 35?", 
    slug: "retirement-savings-by-35",
    cat: "Retirement"
  },
  { 
    q: "Is a Roth IRA better than a 401(k) with match?", 
    slug: "roth-ira-vs-401k-match",
    cat: "Investing"
  },
  { 
    q: "How does the 'Debt Avalanche' method work?", 
    slug: "debt-avalanche-method-explained",
    cat: "Debt"
  },
  { 
    q: "How do federal tax brackets actually work?", 
    slug: "how-tax-brackets-work",
    cat: "Taxes"
  },
  { 
    q: "Is it better to rent or buy in 2026?", 
    slug: "rent-vs-buy-2026-analysis",
    cat: "Real Estate"
  }
]

export default function AskHub() {
  const [input, setInput] = useState('')
  const router = useRouter()

  const handleAsk = () => {
    if (!input.trim()) return
    const slug = input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    router.push(`/ask/${slug}?q=${encodeURIComponent(input)}`)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-muted/20 border-b">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-wider text-xs"
            >
              <HelpCircle className="size-4" />
              WealthPath Knowledge Base
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Ask <span className="text-primary">Anything.</span><br />
              Get the Math.
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
            <div className="relative flex items-center bg-card border border-primary/20 rounded-xl overflow-hidden shadow-lg transition-all focus-within:border-primary px-2 py-2">
              <Input
                placeholder="How much should I have in my emergency fund?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="flex-1 h-14 border-none bg-transparent px-6 text-sm sm:text-lg font-medium focus-visible:ring-0"
              />
              <Button 
                onClick={handleAsk}
                disabled={!input.trim()}
                className="h-14 px-8 gap-2 font-bold uppercase tracking-wider shadow-md hover:translate-y-[-1px] transition-transform hidden sm:flex"
              >
                Get Answer
                <ArrowRight className="size-4" />
              </Button>
            </div>
            {/* Mobile Button */}
            <Button 
              onClick={handleAsk}
              disabled={!input.trim()}
              className="w-full h-14 mt-4 gap-2 font-bold uppercase tracking-wider shadow-md sm:hidden"
            >
              Get Answer
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Topics & Featured */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Featured Q&A */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  Popular Questions
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {featuredQuestions.map((q) => (
                  <Link key={q.slug} href={`/ask/${q.slug}`}>
                    <Card className="group p-6 border border-primary/10 hover:border-primary/30 rounded-xl bg-card transition-all flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <MessageCircle className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider opacity-60">{q.cat}</p>
                          <h3 className="font-bold tracking-tight group-hover:text-primary transition-colors">{q.q}</h3>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Knowledge Stats */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-8 border border-primary/10 rounded-2xl bg-primary/5 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Brain size={120} className="text-primary" />
                </div>
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-bold tracking-tight">AI Accuracy</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">All answers are cross-referenced with current US tax codes and Federal Reserve historical data.</p>
                </div>
                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Topics Indexed</span>
                    <span className="text-primary">12,400+</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-muted-foreground">Verification Pass</span>
                    <span className="text-emerald-500">99.2%</span>
                  </div>
                </div>
              </Card>

              <div className="p-8 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Browser-Safe Knowledge</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium opacity-80">Our AI uses RAG (Retrieval-Augmented Generation) to ensure that every answer is grounded in factual documentation, not just probabilistic logic.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
