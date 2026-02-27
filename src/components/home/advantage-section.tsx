'use client'

import { motion } from 'framer-motion'
import { 
  XCircle, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Zap, 
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const comparisons = [
  {
    feature: "Calculation Depth",
    generic: { text: "Basic Compound Interest", icon: <XCircle className="h-4 w-4 text-destructive" /> },
    wealthpath: { text: "IRS-Aware Tax Matrix + Dynamic HSA/401k Logic", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> }
  },
  {
    feature: "Privacy Level",
    generic: { text: "Requires Account & Data Collection", icon: <XCircle className="h-4 w-4 text-destructive" /> },
    wealthpath: { text: "Zero Account. 100% Local Device Encryption", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> }
  },
  {
    feature: 'Strategic "Why"',
    generic: { text: "Static 'Numbers-Only' Output", icon: <XCircle className="h-4 w-4 text-destructive" /> },
    wealthpath: { text: "Personalized Roadmaps + Strategic Goal Sequencing", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> }
  },
  {
    feature: "Tool Ecosystem",
    generic: { text: "Fragmented Standalone Tools", icon: <XCircle className="h-4 w-4 text-destructive" /> },
    wealthpath: { text: "40+ Integrated Engines in One Dashboard", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> }
  }
]

export function AdvantageSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.03),transparent)] pointer-events-none" />
      
      <div className="container px-4 mx-auto max-w-6xl space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <ShieldCheck className="h-3 w-3" /> The WealthPath Advantage
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            The Difference is <span className="text-primary italic">Precision.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic font-medium">
            Generic calculators guess. We architect. See why high-net-worth individuals and meticulous planners choose WealthPath for educational simulations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Comparison Table Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-none bg-muted/30 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
              <CardContent className="p-0">
                <div className="grid grid-cols-3 bg-primary p-6 text-[10px] font-black uppercase tracking-widest text-primary-foreground">
                  <div>Capability</div>
                  <div className="text-center opacity-60 font-bold">Generic Tools</div>
                  <div className="text-center text-white">WealthPath</div>
                </div>
                <div className="divide-y divide-border/40">
                  {comparisons.map((c, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-6 items-center gap-4 hover:bg-primary/5 transition-colors">
                      <div className="text-xs font-black uppercase tracking-tight leading-tight">{c.feature}</div>
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        {c.generic.icon}
                        <span className="text-[10px] text-muted-foreground font-medium italic leading-tight">{c.generic.text}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        {c.wealthpath.icon}
                        <span className="text-[10px] text-foreground font-black uppercase tracking-tighter leading-tight bg-primary/10 px-2 py-1 rounded-md">{c.wealthpath.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefit Cards */}
          <div className="grid gap-6">
            <BenefitItem 
              icon={<Target className="h-6 w-6" />}
              title="Mathematical Sovereignty"
              desc="We don't pull data from cloud black-boxes. You control every variable, from inflation rates to tax brackets, seeing the exact impact of every choice."
            />
            <BenefitItem 
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Identity Preservation"
              desc="Wealth is private. We never ask for your email, bank syncs, or personal identity. Your data stays 100% encrypted in your browser session."
            />
            <BenefitItem 
              icon={<Zap className="h-6 w-6" />}
              title="High-Vitality Projections"
              desc="Calculations shouldn't be static. Our real-time engine visualizes your progress as you type, creating an immediate mental model of your growth."
            />
            <div className="pt-4">
              <Button size="lg" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest w-full lg:w-fit group shadow-xl" asChild>
                <Link href="/calculators">
                  Explore Precision Tools <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2rem] bg-card border border-border/40 shadow-xl shadow-black/5 space-y-4 hover:border-primary/40 transition-colors"
    >
      <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="font-black uppercase tracking-tight text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground italic leading-relaxed font-medium">{desc}</p>
      </div>
    </motion.div>
  )
}
