'use client'

import { 
  Home, 
  Flame, 
  ShieldAlert, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Map,
  Compass,
  Link as LinkIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const roadmaps = [
  {
    title: "Home Ownership Mission",
    description: "Navigate from renting to owning with a structured path for downpayments and mortgage readiness.",
    icon: <Home className="size-6 shadow-sm" />,
    duration: "1-5 Years",
    steps: 4,
    milestones: ["Survival fund", "Downpayment target", "Mortgage qualification", "Closing cost cushion"],
    href: "/roadmaps/home-ownership",
    badge: "Popular"
  },
  {
    title: "The FIRE Framework",
    description: "Financial Independence, Retire Early. The mathematical blueprint for leaving the 9-to-5 behind.",
    icon: <Flame className="size-6 shadow-sm" />,
    duration: "10-25 Years",
    steps: 6,
    milestones: ["Savings rate optimization", "Total Market indexing", "The 4% Rule", "Coast FIRE reached"],
    href: "/roadmaps/fire",
    badge: "Expert"
  },
  {
    title: "Debt Freedom Velocity",
    description: "Clear high-interest debt and build a foundation of growth. Stop paying interest, start earning it.",
    icon: <ShieldAlert className="size-6 shadow-sm" />,
    duration: "6-24 Months",
    steps: 3,
    milestones: ["Debt inventory", "Interest avalanche", "Credit score recovery"],
    href: "/roadmaps/debt-freedom",
    badge: "High Impact"
  },
  {
    title: "Generational Legacy",
    description: "Planning for those who come after you. Education funding and inheritance structures.",
    icon: <Users className="size-6 shadow-sm" />,
    duration: "18+ Years",
    steps: 5,
    milestones: ["529 Plan setup", "Estate foundations", "Long-term compounding"],
    href: "/roadmaps/legacy",
    badge: "Vision"
  }
]

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="py-24 border-b bg-muted/20">
        <div className="container px-4 mx-auto text-center space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest text-center">
            <Map className="size-3" /> Financial Mission Control
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Goal-Oriented <span className="text-accent">Roadmaps</span> For Every Lifetime.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Calculators tell you the numbers. Roadmaps tell you the steps. Choose your mission and let WealthPath guide you across the finish line.
          </p>
        </div>
      </section>

      {/* Roadmap Grid */}
      <section className="py-24 container px-4 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.title} className="p-10 space-y-8 flex flex-col border shadow-sm hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-start">
                <div className="size-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center shadow-sm">
                  {roadmap.icon}
                </div>
                {roadmap.badge && (
                  <Badge className="bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-[10px]">
                    {roadmap.badge}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold tracking-tight">{roadmap.title}</h3>
                <p className="text-muted-foreground leading-relaxed italic">{roadmap.description}</p>
              </div>

              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-y py-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-primary" />
                  {roadmap.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-primary" />
                  {roadmap.steps} Strategic Steps
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">Core Milestones</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {roadmap.milestones.map((milestone) => (
                    <li key={milestone} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      {milestone}
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="cta" size="lg" className="w-full h-12 font-bold uppercase tracking-wider shadow-sm" asChild>
                <Link href={roadmap.href}>
                  Initiate Mission <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works bridging section */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container px-4 mx-auto max-w-6xl text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Cross-Calculator Synergy</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed italic">Our roadmaps don&apos;t just use one tool. They bridge our entire engine to give you a continuous view of your progress.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FeatureItem 
              icon={<LinkIcon className="size-5" />} 
              title="State Synchronization" 
              desc="Values from your Home buying roadmap feed directly into your Retirement projections."
            />
            <FeatureItem 
              icon={<Sparkles className="size-5" />} 
              title="AI Priority Engine" 
              desc="Dynamic roadmaps that adjust based on your current high-interest debt levels."
            />
            <FeatureItem 
              icon={<Map className="size-5" />} 
              title="Continuous Journey" 
              desc="Save your progress locally and see exactly where you are on the Wealth Ladder."
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="p-8 space-y-4 border shadow-sm">
      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="font-bold uppercase tracking-tight text-sm text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground italic leading-relaxed">{desc}</p>
      </div>
    </Card>
  )
}
