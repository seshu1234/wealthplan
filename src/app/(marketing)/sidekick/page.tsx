'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, Brain, Sparkles, ShieldCheck, History,
  PlusCircle, MessageSquare, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface Message {
  role: 'user' | 'ai'
  content: string
}

export default function SidekickPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: "Hello! I'm your WealthPath Sidekick. I can help you interpret calculator results, build a tax-efficient investment strategy, or explain complex financial concepts in simple English. What's on your mind today?" 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return

    const userMessage = text.trim()
    if (!input) setInput('') // Clear if sent from shortcut
    else setInput('')

    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/sidekick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage,
          calculatorId: 'sidekick-page',
          inputs: {},
          results: {}
        })
      })

      if (!response.ok) throw new Error('Failed to fetch AI response')

      const reader = response.body?.getReader()
      const utf8Decoder = new TextDecoder()
      let aiResponse = ''
      
      setMessages(prev => [...prev, { role: 'ai', content: '' }])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = utf8Decoder.decode(value, { stream: true })
          aiResponse += chunk
          setMessages(prev => {
            const next = [...prev]
            next[next.length - 1].content = aiResponse
            return next
          })
        }
      }
    } catch (error) {
      console.error('Sidekick Error:', error)
      setMessages(prev => [...prev, { role: 'ai', content: "I encountered an error. Let's try that again." }])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedScenarios = [
    "How much should I have saved by age 35?",
    "Should I prioritize a Roth IRA or 401(k)?",
    "How does inflation affect my $1M retirement goal?",
    "Is it better to pay off student loans or invest?",
    "Explain the 'Rule of 72' in simple terms."
  ]

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden font-medium">
      {/* Sidebar: History & Discovery */}
      <aside className="hidden lg:flex w-80 border-r bg-muted/30 flex-col">
        <div className="p-6 space-y-6">
          <Button className="w-full h-12 gap-2 font-bold uppercase tracking-widest shadow-lg" onClick={() => setMessages([messages[0]])}>
            <PlusCircle className="size-4" />
            New Strategy
          </Button>

          <div className="space-y-4 pt-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <History className="size-3" />
              Recent Conversations
            </h4>
            <div className="space-y-1">
              {['Roth vs Trad IRA Setup', 'Retirement Timeline Audit', 'Emergency Fund Logic'].map((h) => (
                <button key={h} className="w-full text-left p-2.5 rounded-lg hover:bg-muted transition-colors text-sm opacity-60 hover:opacity-100 line-clamp-1">
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <PlusCircle className="size-3" />
              Strategic Tools
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/score" className="p-3 rounded-xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center gap-3 group">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Sparkles className="size-4" />
                </div>
                <span className="text-xs font-bold">Health Score</span>
              </Link>
              <Link href="/plan" className="p-3 rounded-xl border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center gap-3 group">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <ShieldCheck className="size-4" />
                </div>
                <span className="text-xs font-bold">Custom Plan</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 space-y-8 scrollbar-thin scrollbar-thumb-primary/10">
          <div className="max-w-3xl mx-auto space-y-8">
            <AnimatePresence mode="popLayout">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${
                    m.role === 'ai' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-border'
                  }`}>
                    {m.role === 'ai' ? <Brain className="size-5" /> : <MessageSquare className="size-5" />}
                  </div>
                  <div className={`space-y-2 p-5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm border ${
                    m.role === 'user' 
                      ? 'bg-primary text-primary-foreground border-primary rounded-tr-none' 
                      : 'bg-card border-border rounded-tl-none'
                  }`}>
                    {m.content || (
                      <div className="flex items-center gap-2 italic opacity-60">
                        <Loader2 className="size-4 animate-spin" />
                        Analyzing...
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input & Suggestions */}
        <div className="p-4 sm:p-8 bg-gradient-to-t from-background via-background to-transparent pt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Quick Suggestions (only if few messages) */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedScenarios.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="px-4 py-2 rounded-full border border-primary/10 bg-primary/5 hover:bg-primary hover:text-primary-foreground transition-all text-xs font-bold whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
              <div className="relative flex items-center bg-card border-2 border-primary/20 rounded-xl overflow-hidden shadow-2xl transition-all focus-within:border-primary">
                <Input
                  placeholder="Ask your complex financial question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 h-14 border-none bg-transparent px-6 text-sm focus-visible:ring-0"
                />
                <div className="p-2 gap-2 flex items-center pr-3">
                  <Button 
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="h-10 px-6 gap-2 font-black uppercase tracking-widest shadow-lg"
                  >
                    Ask
                    <Send className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-1"><ShieldCheck className="size-3" /> High-Density Privacy</span>
              <span className="flex items-center gap-1"><Brain className="size-3" /> US Tax Logic Verified</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
