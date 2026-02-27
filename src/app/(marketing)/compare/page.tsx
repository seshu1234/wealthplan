'use client'

import { motion } from 'framer-motion'
import { Scale, ArrowRight, Sparkles, Landmark, TrendingUp, Home, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const comparisons = [
  {
    title: 'Roth vs. Traditional IRA',
    slug: 'roth-vs-traditional-ira',
    description: 'The definitive tax-efficiency showdown for your retirement contributions.',
    icon: Landmark,
    category: 'Retirement'
  },
  {
    title: '15-Year vs. 30-Year Mortgage',
    slug: '15-year-vs-30-year-mortgage',
    description: 'Compare total interest paid vs. monthly cash flow flexibility.',
    icon: Home,
    category: 'Real Estate'
  },
  {
    title: 'Rent vs. Buy',
    slug: 'rent-vs-buy',
    description: 'Analyze wealth accumulation over time considering appreciation and maintenance.',
    icon: TrendingUp,
    category: 'Real Estate'
  },
  {
    title: 'Debt Avalanche vs. Snowball',
    slug: 'debt-avalanche-vs-snowball',
    description: 'Which debt repayment strategy mathematically wins for your portfolio?',
    icon: Wallet,
    category: 'Debt'
  },
  {
    title: '401(k) vs. Roth IRA',
    slug: '401k-vs-roth-ira',
    description: 'Optimize where your next dollar of retirement savings should go.',
    icon: Sparkles,
    category: 'Retirement'
  }
]

export default function CompareHub() {
  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold uppercase tracking-wider text-xs"
          >
            <Scale className="size-4" />
            AI Comparison Engine
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            Strategic <span className="text-primary">Trade-offs.</span><br />
            Visualized.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-medium text-lg max-w-xl mx-auto"
          >
            Don&apos;t guess on critical financial decisions. Our AI Comparison Engine runs thousands of simulations based on your specific tax bracket and life goals.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
          {comparisons.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/compare/${c.slug}`}>
                <Card className="group p-8 border border-primary/10 hover:border-primary/30 rounded-2xl bg-card transition-all hover:translate-y-[-2px] h-full flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="size-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <c.icon className="size-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full group-hover:text-foreground transition-colors">
                        {c.category}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">{c.description}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Run Analysis <ArrowRight className="size-3" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  )
}
