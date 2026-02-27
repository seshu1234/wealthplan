'use client'

import { useState, useEffect } from 'react'
import { PlaybookScenario } from '@/lib/playbooks/scenarios'
import { DynamicCalculator } from '@/components/calculator/dynamic-calculator'
import { CalculatorConfig } from '@/lib/calculator/engine'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PlaybookWizardProps {
  scenario: PlaybookScenario
}

export function PlaybookWizard({ scenario }: PlaybookWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [config, setConfig] = useState<CalculatorConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const step = scenario.steps[currentStepIndex]

  useEffect(() => {
    async function fetchConfig() {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('calculators')
        .select('*')
        .eq('slug', step.calculatorId)
        .single()

      if (!error && data) {
        const raw = data as Record<string, unknown>
        const rawConfig = (raw.config || {}) as Record<string, unknown>
        setConfig({ ...rawConfig, content: raw.content as Record<string, unknown> } as unknown as CalculatorConfig)
      }
      setLoading(false)
    }
    fetchConfig()
  }, [step.calculatorId])

  const handleNext = () => {
    setCompletedSteps(prev => new Set(prev).add(step.id))
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Completed all steps
      setCurrentStepIndex(scenario.steps.length)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (currentStepIndex === scenario.steps.length) {
    return <PlaybookSuccess scenario={scenario} />
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 pb-24 pt-12">
      {/* Progress Track */}
      <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
        {scenario.steps.map((s, idx) => (
          <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              idx === currentStepIndex 
                ? 'bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20' 
                : completedSteps.has(s.id) 
                ? 'bg-emerald-500 text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {completedSteps.has(s.id) ? <CheckCircle2 className="size-4" /> : idx + 1}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter text-center hidden sm:block ${
              idx === currentStepIndex ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Step Info */}
      <motion.div 
        key={step.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <Badge variant="outline" className="text-primary font-bold uppercase tracking-widest text-[10px]">
          Step {currentStepIndex + 1} of {scenario.steps.length}
        </Badge>
        <h2 className="text-3xl font-black tracking-tighter">{step.title}</h2>
        <p className="text-muted-foreground font-medium max-w-xl mx-auto italic">
          {step.description}
        </p>
      </motion.div>

      {/* Calculator Area */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[400px] flex flex-col items-center justify-center gap-4 text-muted-foreground italic"
          >
            <Loader2 className="size-8 animate-spin text-primary" />
            <span>Assembling Strategic Engine...</span>
          </motion.div>
        ) : (
          config && (
            <motion.div
              key={step.id + "-content"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <DynamicCalculator 
                calculatorId={step.calculatorId}
                config={config}
              />
              
              <div className="mt-12 flex items-center justify-between border-t pt-8">
                <Button 
                  variant="ghost" 
                  onClick={handleBack} 
                  disabled={currentStepIndex === 0}
                  className="font-bold uppercase tracking-widest text-xs"
                >
                  <ArrowLeft className="mr-2 size-4" /> Back
                </Button>
                
                <Button 
                  onClick={handleNext}
                  className="px-8 h-12 font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform"
                >
                  {currentStepIndex === scenario.steps.length - 1 ? 'Finalize Strategy' : 'Next Step'} 
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  )
}

function Badge({ children, variant, className }: { children: React.ReactNode, variant?: 'outline', className?: string }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
      variant === 'outline' ? 'border border-primary/20 bg-primary/5 text-primary' : ''
    } ${className}`}>
      {children}
    </span>
  )
}

function PlaybookSuccess({ scenario }: { scenario: PlaybookScenario }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto px-4 py-24 text-center space-y-10"
    >
      <div className="size-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 size={40} />
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Mission Accomplished.</h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto">
          {scenario.outcomeDescription}
        </p>
      </div>

      <Card className="bg-primary text-primary-foreground p-8 rounded-[2rem] shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl font-bold tracking-tight italic">Ready to execute?</h3>
          <p className="text-primary-foreground/80 font-medium">
            Your decisions across these {scenario.steps.length} modules have been synthesized. 
            Check your dashboard for the final amalgamated roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button variant="secondary" className="font-black h-12 uppercase tracking-widest px-8" asChild>
               <a href="/plan">Get My Detailed Plan</a>
             </Button>
             <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-black h-12 uppercase tracking-widest px-8" asChild>
               <a href="/playbooks">Explore Other Playbooks</a>
             </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
