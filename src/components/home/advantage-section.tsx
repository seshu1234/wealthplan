import { 
  XCircle, 
  CheckCircle2, 
  Target, 
  ShieldCheck, 
  Zap, 
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            The Difference is <span className="text-accent">Precision.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generic tools estimate. We architect. See why meticulous planners choose WealthPath for high-fidelity educational simulations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Comparison Table */}
          <Card className="overflow-hidden border border-primary/10 shadow-sm rounded-xl">
            <div className="grid grid-cols-3 bg-primary text-primary-foreground p-4 text-[10px] font-bold uppercase tracking-wider text-center">
              <div>Capability</div>
              <div className="opacity-70">Generic</div>
              <div className="text-accent underline underline-offset-4">WealthPath</div>
            </div>
            <div className="divide-y bg-background">
              {comparisons.map((c, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 items-center gap-4 text-sm">
                  <div className="font-semibold text-xs">{c.feature}</div>
                  <div className="flex flex-col items-center gap-1 text-center text-[10px] text-muted-foreground">
                    {c.generic.icon}
                    <span>{c.generic.text}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center text-[10px] font-medium">
                    {c.wealthpath.icon}
                    <span>{c.wealthpath.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefit Cards */}
          <div className="grid gap-4">
            <BenefitItem 
              icon={<Target className="size-5" />}
              title="Mathematical Sovereignty"
              desc="You control every variable, from inflation rates to tax brackets, seeing the exact impact of every choice in real-time."
            />
            <BenefitItem 
              icon={<ShieldCheck className="size-5" />}
              title="Privacy by Design"
              desc="Wealth is private. No bank syncs, no data sales. Your simulations stay 100% local to your browser session."
            />
            <BenefitItem 
              icon={<Zap className="size-5" />}
              title="Real-Time Visualization"
              desc="Calculations shouldn't be static. Our engine visualizes your progress as you type, creating an immediate mental model of growth."
            />
            <div className="pt-4">
              <Button variant="cta" size="lg" className="h-12 px-8 font-semibold w-full lg:w-fit" asChild>
                <Link href="/calculators">
                  Explore Tools <ArrowRight className="ml-2 size-4" />
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
    <Card className="p-6 space-y-3 hover:bg-muted transition-colors border-none shadow-sm rounded-xl">
      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-base tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </Card>
  )
}
