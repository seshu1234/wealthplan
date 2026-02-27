'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const pillars = [
  {
    title: "Fixed-Income Foundations",
    icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
    description: "The base of your pyramid. Before investing a single dollar, you must secure your downside with the 'Survival Fund'.",
    points: [
      "3-6 months of essential expenses in HYSA",
      "High-deductible insurance coverage",
      "Immediate high-interest debt clearance"
    ],
    color: "from-emerald-500/10 to-transparent"
  },
  {
    title: "Passive Alpha",
    icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
    description: "Wealth isn't built by picking stocks; it's built by owning the world. We prioritize broad-market, low-cost indexing.",
    points: [
      "Total Stock Market (VTI) / Total International (VXUS)",
      "Rebalancing twice annually",
      "Ignoring the noise of the nightly news"
    ],
    color: "from-blue-500/10 to-transparent"
  },
  {
    title: "The Tax Shield",
    icon: <Lock className="h-6 w-6 text-purple-500" />,
    description: "It's not what you make; it's what you keep. Tax efficiency is the only 'free lunch' in finance.",
    points: [
      "401(k) Employer Match (100% instant return)",
      "Roth IRA max-out for tax-free growth",
      "HSA: The triple-tax-advantaged powerhouse"
    ],
    color: "from-purple-500/10 to-transparent"
  },
  {
    title: "Debt Velocity",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    description: "Not all debt is created equal. We use the 'Mathematical Avalanche' to vaporize interest-heavy liabilities.",
    points: [
      "Prioritizing APR over balance size",
      "Maintaining 'Good Debt' (Low-rate mortgages)",
      "The 'No New Debt' golden rule"
    ],
    color: "from-orange-500/10 to-transparent"
  }
]

const ladderSteps = [
  { level: 1, title: "Survival Fund", status: "Critical", desc: "Build $1,000 intermediate cushion" },
  { level: 2, title: "The Match", status: "Free Money", desc: "Capture 100% of employer 401(k) match" },
  { level: 3, title: "High-Interest War", status: "Priority", desc: "Pay off debt with APR > 7%" },
  { level: 4, title: "The Fortress", status: "Stability", desc: "Expand to full 6-month Emergency Fund" },
  { level: 5, title: "Tax Optimization", status: "Growth", desc: "Max Roth IRA & HSA contributions" },
  { level: 6, title: "Wealth Acceleration", status: "Freedom", desc: "Invest 15%+ of gross income into Index Funds" }
]

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent)] pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest"
          >
            <Sparkles className="h-3 w-3" /> The WealthPath Methodology
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase max-w-4xl mx-auto leading-[0.9]"
          >
            The Strategy for <span className="text-primary">Permanent</span> Wealth.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto italic"
          >
            WealthPlan isn&apos;t just a suite of tools. It&apos;s a structured philosophy built on mathematical facts, tax efficiency, and the power of patience.
          </motion.p>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-24 container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`h-full border-none bg-gradient-to-br ${pillar.color} backdrop-blur-sm shadow-xl shadow-black/5 rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500`}>
                <CardContent className="p-8 space-y-6">
                  <div className="p-3 rounded-2xl bg-background shadow-lg inline-block">
                    {pillar.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tighter uppercase">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm italic">{pillar.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm font-bold">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Wealth Ladder */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="container px-4 mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">The Wealth Ladder</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm italic">Focus is your greatest asset. Follow the ladder step-by-step. Never skip a level.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {ladderSteps.reverse().map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-background border border-border/50 shadow-lg hover:border-primary/50 transition-all hover:translate-x-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-primary">{ladderSteps.length - idx}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-black uppercase tracking-tight text-lg leading-none">{step.title}</h4>
                      <Badge className="bg-primary/5 text-primary border-none text-[10px] uppercase font-black tracking-widest">{step.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{step.desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-24 container px-4 mx-auto">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-[0.85]">
            Ready to Build Your <br /> <span className="opacity-50">Custom Roadmap?</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto font-medium italic">
            Apply the WealthPath Strategy to your unique situation with our AI Plan Builder. It takes 2 minutes and costs $0.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest shadow-xl" asChild>
              <Link href="/plan">
                Generate My Plan <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className=" bg-transparent h-14 px-8 rounded-2xl font-black uppercase tracking-widest border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="/calculators">
                Browse Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black", className)}>
      {children}
    </span>
  )
}

function cn(...inputs: (string | undefined | null | boolean | number)[]) {
  return inputs.filter(Boolean).join(' ')
}
