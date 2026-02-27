'use client'

import { useState, useEffect } from 'react'
import { motion} from 'framer-motion'
import { 
  ArrowLeft, Sparkles, Brain, Loader2,
  CheckCircle2, Compass, Map,
  TrendingUp, ShieldCheck, 
  Wallet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function SalaryRoadmapPage({ params }: { params: { salary: string } }) {
  const salaryNum = parseInt(params.salary.replace(/[^0-9]/g, '')) * (params.salary.includes('k') ? 1000 : 1)
  
  const [roadmap, setRoadmap] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getRoadmap() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/ai/sidekick', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: `Generate a 4-phase wealth-building roadmap for someone earning $${salaryNum.toLocaleString()} annually. Phases: Survival, Foundation, Acceleration, Legacy. Use math-backed benchmarks. Formatting: Use markdown bold for headers, no lists.`,
            calculatorId: 'salary-roadmap-engine',
            inputs: { salaryNum },
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
            setRoadmap(result)
          }
        }
      } catch (err) {
        console.error(err)
        setRoadmap("I'm sorry, I couldn't generate your roadmap right now. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    getRoadmap()
  }, [salaryNum])

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* Navigation */}
        <Link href="/roadmaps" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="size-3" />
          Back to Roadmaps
        </Link>

        {/* Header */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
          >
            <Compass className="size-3" />
            AI-Engineered Wealth Journey
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            The <span className="text-primary">${(salaryNum/1000).toFixed(0)}k</span> Roadmap.
          </motion.h1>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl">A personalized execution plan designed for the mathematical realities of your income bracket.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Roadmap Content */}
          <div className="lg:col-span-8 space-y-12">
            <Card className="p-8 sm:p-12 border border-primary/10 rounded-2xl shadow-lg bg-card/80 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Map size={200} />
               </div>
               <div className="relative z-10 space-y-10">
                  {isLoading && !roadmap ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                        <Loader2 className="size-12 animate-spin text-primary relative z-10" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground animate-pulse">Modeling Income Multipliers...</p>
                    </div>
                  ) : (
                    <div className="space-y-12">
                       {roadmap.split('\n\n').map((para, i) => {
                         const isHeader = para.startsWith('**Ph') || para.startsWith('Phase')
                         return (
                           <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[i*100ms]">
                             {isHeader ? (
                               <div className="flex items-center gap-4 mb-4">
                                  <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">
                                    0{Math.floor(i/2) + 1}
                                  </div>
                                  <h3 className="text-xl font-black uppercase tracking-tighter italic text-primary">{para.replace(/\*\*/g, '')}</h3>
                               </div>
                             ) : (
                               <p className="text-base font-medium leading-loose text-foreground/80 pl-14 italic border-l-2 border-primary/10">
                                 {para}
                               </p>
                             )}
                           </div>
                         )
                       })}
                    </div>
                  )}

                  {!isLoading && (
                    <div className="pt-12 border-t border-primary/10 flex flex-wrap gap-4">
                      <Button className="h-14 px-10 gap-2 font-bold uppercase tracking-wider shadow-lg hover:translate-y-[-1px] transition-transform">
                        Save This Roadmap
                        <CheckCircle2 className="size-4" />
                      </Button>
                      <Button variant="outline" className="h-14 px-10 gap-2 font-bold uppercase tracking-wider">
                        Customize Assumptions
                      </Button>
                    </div>
                  )}
               </div>
            </Card>
          </div>

          {/* Side Intelligence */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="p-8 border border-primary/10 rounded-2xl bg-primary/5 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight">Pillar Allocation</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Target for ${(salaryNum/1000).toFixed(0)}k Income</p>
                </div>
                
                <div className="space-y-6">
                   <AllocationItem label="Essentials" val="50%" icon={<Wallet className="size-3" />} />
                   <AllocationItem label="Strategy (Debt/Inv)" val="25%" icon={<TrendingUp className="size-3" />} />
                   <AllocationItem label="Lifestyle" val="15%" icon={<Sparkles className="size-3" />} />
                   <AllocationItem label="Security (Savings)" val="10%" icon={<ShieldCheck className="size-3" />} />
                </div>

                <div className="pt-6 border-t border-primary/10">
                   <p className="text-[10px] text-muted-foreground font-medium leading-relaxed capitalize">
                     Based on the &quot;50/30/20&quot; expert framework, optimized for your specific bracket constraints.
                   </p>
                </div>
             </Card>

             <Card className="p-8 border border-dashed border-border rounded-2xl bg-muted/30 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                  <Brain className="size-3" />
                  AI Reasoning
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  We&apos;ve prioritized <strong className="text-foreground">Tax-Sheltered Growth</strong> as the primary lever for this income level to maximize long-term velocity.
                </p>
             </Card>
          </div>

        </div>

      </div>
    </main>
  )
}

function AllocationItem({ label, val, icon }: { label: string, val: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-2 text-muted-foreground">{icon} {label}</span>
        <span className="text-primary font-semibold">{val}</span>
      </div>
      <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: val }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-primary rounded-full shadow-sm" 
        />
      </div>
    </div>
  )
}
