'use client'

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
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const pillars = [
  {
    title: "Foundations First",
    icon: <ShieldCheck className="size-6" />,
    description: "The base of your pyramid. Before investing a single dollar, you must secure your downside with a targeted Survival Fund.",
    points: [
      "3-6 months of essential expenses",
      "Comprehensive risk coverage",
      "High-interest debt elimination"
    ],
  },
  {
    title: "Passive Alpha",
    icon: <TrendingUp className="size-6" />,
    description: "Wealth isn't built by picking stocks; it's built by owning the world. We prioritize broad-market, low-cost indexing.",
    points: [
      "Total Market Indexing (VTI/VXUS)",
      "Strategic semi-annual rebalancing",
      "Long-term, fact-based allocation"
    ],
  },
  {
    title: "The Tax Shield",
    icon: <Lock className="size-6" />,
    description: "It's not what you make; it's what you keep. Tax efficiency is the only legitimate 'free lunch' in finance.",
    points: [
      "Employer Match optimization",
      "Roth IRA / HSA prioritization",
      "Calculated asset location"
    ],
  },
  {
    title: "Debt Velocity",
    icon: <Zap className="size-6" />,
    description: "Not all debt is created equal. We use the 'Mathematical Avalanche' to vaporize interest-heavy liabilities efficiently.",
    points: [
      "Prioritizing APR over balance",
      "Maintaining 'Good Debt' leverage",
      "Mathematical debt sequencing"
    ],
  }
]

const ladderSteps = [
  { level: 1, title: "Survival Fund", status: "Critical", desc: "Build $1,000 intermediate cushion" },
  { level: 2, title: "The Match", status: "Free Money", desc: "Capture 100% of employer match" },
  { level: 3, title: "High-Interest War", status: "Priority", desc: "Pay off debt with APR > 7%" },
  { level: 4, title: "The Fortress", status: "Stability", desc: "Expand to full Emergency Fund" },
  { level: 5, title: "Tax Optimization", status: "Growth", desc: "Max Roth IRA & HSA contributions" },
  { level: 6, title: "Wealth Acceleration", status: "Freedom", desc: "Invest 15%+ into Index Funds" }
]

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="py-24 border-b bg-muted/20">
        <div className="container px-4 mx-auto text-center space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="size-3" /> The WealthPath Methodology
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            The Strategy for <span className="text-accent">Permanent</span> Wealth.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            WealthPlan is a structured philosophy built on mathematical facts, tax efficiency, and the power of patience.
          </p>
        </div>
      </section>

      {/* The Pillars */}
      <section className="py-24 container px-4 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-8 space-y-6 hover:bg-muted/30 transition-colors border shadow-sm">
              <div className="size-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
              <ul className="space-y-3">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* The Wealth Ladder */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container px-4 mx-auto space-y-16 max-w-4xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Wealth Ladder</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Focus is your greatest asset. Follow the step-by-step priority guide.</p>
          </div>

          <div className="space-y-4">
            {ladderSteps.reverse().map((step, idx) => (
              <div key={step.title} className="group relative">
                <div className="flex items-center gap-6 p-6 rounded-xl bg-background border shadow-sm hover:border-accent transition-all">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
                    {ladderSteps.length - idx}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-lg leading-none">{step.title}</h4>
                      <Badge className="bg-emerald-100 text-emerald-800 border-none font-semibold">{step.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{step.desc}</p>
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-24 container px-4 mx-auto max-w-6xl">
        <Card className="bg-primary text-primary-foreground p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-xl border-none">
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Ready to Build Your Custom Roadmap?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto font-medium">
              Apply the WealthPath Strategy to your unique situation with our professional planning engine. It takes 2 minutes and costs $0.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button variant="cta" size="lg" className="h-12 px-8 font-semibold shadow-lg" asChild>
              <Link href="/plan">
                Generate My Plan <Sparkles className="ml-2 size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent h-12 px-8 font-semibold border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/calculators">
                Browse Tools <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </Card>
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
