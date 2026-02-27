'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Brain, Loader2, Sparkles, Calculator, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function GlobalSidekick() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { 
      role: 'ai', 
      content: "I'm your WealthPath Sidekick. Ask me anything about your finances, or let me guide you to the right calculator. How can I help you build wealth today?" 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/sidekick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMessage,
          calculatorId: 'global-assistant',
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
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting right now. Please try again in a moment." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="size-6 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Main Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-end p-6 pointer-events-none">
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/20 backdrop-blur-sm pointer-events-auto lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-[440px] h-[600px] max-h-[85vh] pointer-events-auto"
            >
              <Card className="h-full flex flex-col shadow-xl border-primary/20 overflow-hidden rounded-2xl bg-background/95">
                {/* Header */}
                <div className="p-6 bg-primary text-primary-foreground flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Brain className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold tracking-tight">Strategy Sidekick</h3>
                      <div className="flex items-center gap-1.5 opacity-80">
                        <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Active Intelligence</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary/10">
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium leading-relaxed ${
                        m.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-muted border border-border rounded-tl-none shadow-sm'
                      }`}>
                        {m.content || <Loader2 className="size-4 animate-spin opacity-50" />}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1].role === 'user' && (
                    <div className="flex justify-start">
                      <div className="bg-muted border rounded-2xl rounded-tl-none p-4 shadow-sm">
                        <Loader2 className="size-4 animate-spin opacity-50" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Shortcuts */}
                <div className="px-6 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { label: 'Score Me', icon: Sparkles, href: '/score' },
                    { label: 'Plan', icon: ShieldCheck, href: '/plan' },
                    { label: 'Calc', icon: Calculator, href: '/calculators' }
                  ].map((s) => (
                    <Link 
                      key={s.label}
                      href={s.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-tight hover:bg-primary/10 transition-colors shrink-0"
                    >
                      <s.icon className="size-3" />
                      {s.label}
                    </Link>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-6 pt-2 border-t border-dashed">
                  <div className="relative group">
                    <Input 
                      placeholder="Ask your finance question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="h-12 pl-4 pr-12 text-sm font-medium bg-muted/20 border-primary/10 focus:border-primary transition-all rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-1.5 top-1.5 h-9 w-9 text-primary hover:bg-primary/10 hover:text-primary transition-colors rounded-lg"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium uppercase tracking-wider opacity-60">
                    Mathematically verified. Always encrypted. 🔒
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
