'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Scale, ArrowRight, CheckCircle2, 
  TrendingUp, Landmark, ShieldCheck, Sparkles,Brain, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface ComparisonConfig {
  title: string
  description: string
  optionA: { label: string; icon: any }
  optionB: { label: string; icon: any }
  inputs: {
    id: string
    label: string
    type: 'number' | 'select'
    defaultValue: number
    format: 'currency' | 'percent' | 'number'
  }[]
}

const COMPARISON_MAP: Record<string, ComparisonConfig> = {
  'roth-vs-traditional-ira': {
    title: 'Roth vs. Traditional IRA',
    description: 'Determine which retirement account saves you more based on your current and future tax brackets.',
    optionA: { label: 'Roth IRA', icon: Sparkles },
    optionB: { label: 'Traditional IRA', icon: Landmark },
    inputs: [
      { id: 'income', label: 'Annual Income', type: 'number', defaultValue: 85000, format: 'currency' },
      { id: 'currentTax', label: 'Current Tax Rate (%)', type: 'number', defaultValue: 22, format: 'percent' },
      { id: 'retirementTax', label: 'Expected Retirement Tax Rate (%)', type: 'number', defaultValue: 12, format: 'percent' },
      { id: 'contribution', label: 'Annual Contribution', type: 'number', defaultValue: 7000, format: 'currency' },
      { id: 'years', label: 'Years to Retirement', type: 'number', defaultValue: 25, format: 'number' },
    ]
  },
  '15-year-vs-30-year-mortgage': {
    title: '15-Year vs. 30-Year Mortgage',
    description: 'Compare total interest paid and monthly cash flow to see which term fits your goals.',
    optionA: { label: '15-Year', icon: TrendingUp },
    optionB: { label: '30-Year', icon: ShieldCheck },
    inputs: [
      { id: 'loanAmount', label: 'Loan Amount', type: 'number', defaultValue: 450000, format: 'currency' },
      { id: 'interest15', label: '15-Year Interest Rate (%)', type: 'number', defaultValue: 5.8, format: 'percent' },
      { id: 'interest30', label: '30-Year Interest Rate (%)', type: 'number', defaultValue: 6.5, format: 'percent' },
    ]
  }
}

export function ComparisonEngine({ slug }: { slug: string }) {
  const config = COMPARISON_MAP[slug]
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(config?.inputs.map(i => [i.id, i.defaultValue]) || [])
  )
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)

  if (!config) return <div>Comparison not found.</div>

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/ai/sidekick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Analyze ${config.optionA.label} vs ${config.optionB.label} based on these inputs: ${JSON.stringify(values)}. Provide a direct recommendation.`,
          calculatorId: `compare-${slug}`,
          inputs: values,
          results: {}
        })
      })
      const reader = response.body?.getReader()
      const utf8Decoder = new TextDecoder()
      let aiResponse = ''
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        aiResponse += utf8Decoder.decode(value, { stream: true })
        setAnalysis(aiResponse)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
          <Scale className="size-3" />
          Decision Engine
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase italic">{config.title}</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto font-medium">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Inputs */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="p-8 border-2 border-primary/10 rounded-[2rem] shadow-xl bg-card/50 backdrop-blur-md space-y-6">
            <div className="space-y-6">
              {config.inputs.map((input) => (
                <div key={input.id} className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{input.label}</Label>
                  <Input 
                    type="number" 
                    value={values[input.id]}
                    onChange={(e) => setValues({...values, [input.id]: parseFloat(e.target.value) || 0})}
                    className="h-12 text-lg font-bold bg-background/50 border-primary/10 focus:border-primary transition-all rounded-xl shadow-inner"
                  />
                </div>
              ))}
            </div>
            <Button 
              onClick={handleAnalyze}
              className="w-full h-14 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Run Comparative Audit
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Card>
        </div>

        {/* Right: Results & Analysis */}
        <div className="lg:col-span-7 space-y-8">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/10 rounded-[2rem] text-center space-y-4"
              >
                <div className="size-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary/40">
                  <Brain className="size-8" />
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Adjust your numbers and run the audit to receive a specific AI recommendation.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Visual Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-6 border-primary/20 bg-primary/5 rounded-3xl relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                        <config.optionA.icon className="size-5" />
                      </div>
                      <h3 className="font-black uppercase tracking-tighter">{config.optionA.label}</h3>
                    </div>
                    {/* Simplified Math Result Placeholder */}
                    <p className="text-3xl font-black tabular-nums">$---,---</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Projected Outcome</p>
                  </Card>

                  <Card className="p-6 border-accent/20 bg-accent/5 rounded-3xl relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
                        <config.optionB.icon className="size-5" />
                      </div>
                      <h3 className="font-black uppercase tracking-tighter">{config.optionB.label}</h3>
                    </div>
                    <p className="text-3xl font-black tabular-nums">$---,---</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Projected Outcome</p>
                  </Card>
                </div>

                {/* AI Recommendation Card */}
                <Card className="p-8 border-2 border-primary/10 rounded-[2.5rem] shadow-2xl bg-primary/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Sparkles size={120} className="text-primary" />
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                        <Brain className="size-5" />
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tighter italic">Strategic Verdict</h3>
                    </div>
                    <div className="text-sm font-medium leading-relaxed text-foreground space-y-4">
                      {isAnalyzing && !analysis ? (
                        <div className="flex items-center gap-3 opacity-60">
                          <Loader2 className="size-4 animate-spin" />
                          <span>Simulating financial trajectores...</span>
                        </div>
                      ) : (
                        <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 whitespace-pre-wrap leading-loose italic">
                          {analysis}
                        </p>
                      )}
                    </div>
                    {!isAnalyzing && analysis && (
                      <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                          <CheckCircle2 className="size-3" />
                          Optimal Path Identified
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
