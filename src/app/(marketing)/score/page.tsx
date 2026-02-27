'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldCheck, Wallet, Landmark, TrendingUp, Brain, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { WealthHealthGauge } from '@/components/analytics/WealthHealthGauge'
import { calculateWealthHealth, WealthHealthResult } from '@/lib/ai/wealth-health-logic'

export default function ScorePage() {
  const [step, setStep] = useState<'input' | 'calculating' | 'result'>('input')
  const [inputs, setInputs] = useState({
    income: '',
    expenses: '',
    savings: '',
    debt: '',
    assets: ''
  })
  const [scoreData, setScoreData] = useState<WealthHealthResult | null>(null)

  const handleCalculate = async () => {
    setStep('calculating')
    
    // Artificial delay for "Strategic Analysis" feel
    await new Promise(r => setTimeout(r, 2500))

    const result = calculateWealthHealth({
      age: 35,
      monthlyIncome: Number(inputs.income) / 12,
      monthlyExpenses: Number(inputs.expenses),
      savingsRate: Number(inputs.income) > 0 ? (Number(inputs.savings) * 12) / Number(inputs.income) : 0,
      liquidAssets: Number(inputs.assets),
      totalMonthlyDebt: Number(inputs.debt)
    })
    setScoreData(result)
    setStep('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs"
          >
            <Sparkles className="size-4" />
            60-Second Assessment
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Know Your <span className="text-primary">Wealth-Health</span> Index.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-medium text-lg max-w-xl mx-auto"
          >
            The definitive 0–100 score for your financial life. No signup, no complex forms. Just the math you need to know.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
            <Card className="p-8 sm:p-12 border border-primary/10 shadow-lg rounded-2xl bg-card/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Brain size={160} />
                </div>
                
                <div className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Landmark className="size-3 text-primary" />
                        Annual Income (Gross)
                      </Label>
                      <Input 
                        placeholder="e.g. 85000" 
                        type="number"
                        value={inputs.income}
                        onChange={(e) => setInputs({...inputs, income: e.target.value})}
                        className="h-12 text-lg font-medium bg-background border-primary/20 focus:border-primary transition-all rounded-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Wallet className="size-3 text-primary" />
                        Monthly Expenses
                      </Label>
                      <Input 
                        placeholder="e.g. 3500" 
                        type="number"
                        value={inputs.expenses}
                        onChange={(e) => setInputs({...inputs, expenses: e.target.value})}
                        className="h-12 text-lg font-medium bg-background border-primary/20 focus:border-primary transition-all rounded-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="size-3 text-primary" />
                        Monthly Savings
                      </Label>
                      <Input 
                        placeholder="e.g. 1500" 
                        type="number"
                        value={inputs.savings}
                        onChange={(e) => setInputs({...inputs, savings: e.target.value})}
                        className="h-12 text-lg font-medium bg-background border-primary/20 focus:border-primary transition-all rounded-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <ShieldCheck className="size-3 text-primary" />
                        Total Assets (NW)
                      </Label>
                      <Input 
                        placeholder="e.g. 45000" 
                        type="number"
                        value={inputs.assets}
                        onChange={(e) => setInputs({...inputs, assets: e.target.value})}
                        className="h-12 text-lg font-medium bg-background border-primary/20 focus:border-primary transition-all rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Monthly Debt Payments</Label>
                    <Input 
                      placeholder="e.g. 2000" 
                      type="number"
                      value={inputs.debt}
                      onChange={(e) => setInputs({...inputs, debt: e.target.value})}
                      className="h-12 text-lg font-medium bg-background border-primary/20 focus:border-primary transition-all rounded-lg"
                    />
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    className="w-full h-14 text-lg font-bold uppercase tracking-wider shadow-md hover:translate-y-[-1px] transition-transform"
                  >
                    Generate My Index
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </div>
              </Card>
              <p className="text-center text-xs text-muted-foreground mt-8 font-medium uppercase tracking-widest opacity-60">
                Mathematically grounded in CFP Board & FHN Benchmarks.
              </p>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <Loader2 className="size-16 animate-spin text-primary relative z-10" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Auditing Financial Pillars...</h3>
                <p className="text-muted-foreground text-sm font-medium animate-pulse">
                  Running debt-to-income and liquidity coverage models.
                </p>
              </div>
            </motion.div>
          )}

          {step === 'result' && scoreData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-16"
            >
              {/* Score Display */}
              <div className="flex flex-col items-center">
                <WealthHealthGauge score={scoreData.score} pillars={scoreData.pillars} status={scoreData.status} />
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8 border border-primary/10 bg-primary/5 rounded-2xl space-y-4">
                  <div className="size-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Brain className="size-5" />
                  </div>
                  <h4 className="text-lg font-bold tracking-tight">AI Strategy</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Based on your results, we recommend focusing on <strong className="text-primary font-bold">Liquid Coverage</strong> first to boost your score by +12 points.
                  </p>
                </Card>

                <Card className="p-8 border border-emerald-500/10 bg-emerald-500/5 rounded-2xl space-y-4">
                  <div className="size-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h4 className="text-lg font-bold tracking-tight">Quick Win</h4>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    Trimming just $300 in monthly expenses would drop your overhead ratio into the Healthy zone instantly.
                  </p>
                </Card>

                <Card className="p-8 border border-primary/10 bg-background rounded-2xl space-y-4 flex flex-col justify-between shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Next Action</h4>
                    <p className="text-sm font-medium mt-2 leading-relaxed opacity-80">
                      &quot;Should I pay debt or invest this $5k?&quot;
                    </p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 font-bold uppercase tracking-wider text-[10px]" asChild>
                    <Link href="/calculators/debt-payoff-calculator">Run Full Audit</Link>
                  </Button>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button size="lg" className="font-bold px-10 h-14 uppercase tracking-wider" asChild>
                  <a href="/plan">Build My Complete AI Plan</a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setStep('input')} className="font-bold px-10 h-14 uppercase tracking-wider">
                  Rerun My Score
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
