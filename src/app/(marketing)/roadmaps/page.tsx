'use client'

import { motion } from 'framer-motion'
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
import { Card, CardContent} from '@/components/ui/card'
import Link from 'next/link'

const roadmaps = [
  {
    title: "Home Ownership Mission",
    description: "Navigate from renting to owning with a structured path for downpayments and mortgage readiness.",
    icon: <Home className="h-6 w-6 text-blue-500" />,
    duration: "1-5 Years",
    steps: 4,
    milestones: ["Survival fund", "Downpayment target", "Mortgage qualification", "Closing cost cushion"],
    href: "/roadmaps/home-ownership",
    badge: "Popular",
    color: "from-blue-500/10 to-transparent"
  },
  {
    title: "The FIRE Framework",
    description: "Financial Independence, Retire Early. The mathematical blueprint for leaving the 9-to-5 behind.",
    icon: <Flame className="h-6 w-6 text-orange-500" />,
    duration: "10-25 Years",
    steps: 6,
    milestones: ["Savings rate optimization", "Total Market indexing", "The 4% Rule", "Coast FIRE reached"],
    href: "/roadmaps/fire",
    badge: "Expert",
    color: "from-orange-500/10 to-transparent"
  },
  {
    title: "Debt Freedom Velocity",
    description: "Clear high-interest debt and build a foundation of growth. Stop paying interest, start earning it.",
    icon: <ShieldAlert className="h-6 w-6 text-emerald-500" />,
    duration: "6-24 Months",
    steps: 3,
    milestones: ["Debt inventory", "Interest avalanche", "Credit score recovery"],
    href: "/roadmaps/debt-freedom",
    badge: "High Impact",
    color: "from-emerald-500/10 to-transparent"
  },
  {
    title: "Generational Legacy",
    description: "Planning for those who come after you. Education funding and inheritance structures.",
    icon: <Users className="h-6 w-6 text-purple-500" />,
    duration: "18+ Years",
    steps: 5,
    milestones: ["529 Plan setup", "Estate foundations", "Long-term compounding"],
    href: "/roadmaps/legacy",
    badge: "Vision",
    color: "from-purple-500/10 to-transparent"
  }
]

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent)] pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <Map className="h-3 w-3" /> Financial Mission Control
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] max-w-4xl mx-auto"
          >
            Goal-Oriented <span className="text-primary">Roadmaps</span> <br /> For Every Lifetime.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto italic"
          >
            Calculators tell you the numbers. Roadmaps tell you the steps. Choose your mission and let WealthPath guide you across the finish line.
          </motion.p>
        </div>
      </section>

      {/* Roadmap Grid */}
      <section className="py-24 container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {roadmaps.map((roadmap, idx) => (
            <motion.div
              key={roadmap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`group h-full border-none bg-gradient-to-br ${roadmap.color} backdrop-blur-xl shadow-2xl shadow-black/5 rounded-[2.5rem] overflow-hidden hover:shadow-primary/5 transition-all duration-500`}>
                <CardContent className="p-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-background shadow-xl flex items-center justify-center">
                      {roadmap.icon}
                    </div>
                    {roadmap.badge && (
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest">
                        {roadmap.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">{roadmap.title}</h3>
                    <p className="text-muted-foreground text-sm italic line-clamp-2">{roadmap.description}</p>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-y border-border/40 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {roadmap.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-primary" />
                      {roadmap.steps} Strategic Steps
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Core Milestones</h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {roadmap.milestones.map((milestone) => (
                        <li key={milestone} className="flex items-center gap-3 text-xs font-bold leading-none">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/10 group-hover:scale-[1.02] transition-transform" asChild>
                    <Link href={roadmap.href}>
                      Initiate Mission <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works bridging section */}
      <section className="py-24 bg-muted/30 border-y border-border/40">
        <div className="container px-4 mx-auto max-w-5xl text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Cross-Calculator Synergy</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm italic">Our roadmaps don&apos;t just use one tool. They bridge our entire engine to give you a continuous view of your progress.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FeatureItem 
              icon={<LinkIcon className="h-5 w-5" />} 
              title="State Synchronization" 
              desc="Values from your Home buying roadmap feed directly into your Retirement projections."
            />
            <FeatureItem 
              icon={<Sparkles className="h-5 w-5" />} 
              title="AI Priority Engine" 
              desc="Dynamic roadmaps that adjust based on your current high-interest debt levels."
            />
            <FeatureItem 
              icon={<Map className="h-5 w-5" />} 
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
    <div className="p-8 rounded-[2rem] bg-background border border-border/50 shadow-lg space-y-4">
      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-black uppercase tracking-tight text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground italic leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
