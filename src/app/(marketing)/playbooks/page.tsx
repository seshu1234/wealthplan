'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PLAYBOOKS } from '@/lib/playbooks/scenarios'
import { Briefcase, Baby, ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ICONS = {
  briefcase: Briefcase,
  baby: Baby
}

export default function PlaybooksHubPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 border-b bg-muted/20">
        <div className="container px-4 mx-auto text-center space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest text-center">
            <Compass className="size-3" /> Strategic Playbooks
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            High-Stakes <span className="text-primary italic">Life Pivots</span>, Solved with Math.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A calculator shows a number. A playbook shows a future. Choose your scenario and run the exact sequence of tools required to bridge the gap.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 container px-4 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(PLAYBOOKS).map((playbook, idx) => {
            const Icon = ICONS[playbook.icon as keyof typeof ICONS] || Compass
            
            return (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-10 flex flex-col h-full border-2 border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all group overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                     <Icon size={120} />
                   </div>
                   
                   <div className="space-y-6 flex-1 relative z-10">
                     <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                       <Icon className="size-6" />
                     </div>
                     
                     <div className="space-y-3">
                       <h3 className="text-3xl font-black tracking-tighter group-hover:text-primary transition-colors">
                         {playbook.title}
                       </h3>
                       <p className="text-muted-foreground font-medium leading-relaxed italic">
                         {playbook.description}
                       </p>
                     </div>

                     <div className="space-y-4">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Sequence Requirements</h4>
                       <div className="flex flex-wrap gap-2">
                         {playbook.steps.map(step => (
                           <Badge key={step.id} variant="outline" className="bg-background/50 font-bold uppercase text-[9px]">
                             {step.title}
                           </Badge>
                         ))}
                       </div>
                     </div>
                   </div>

                   <div className="pt-10 flex flex-col gap-4">
                     <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                       <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
                       <div className="space-y-1">
                         <p className="text-xs font-bold uppercase">Outcome Guarantee</p>
                         <p className="text-[10px] text-muted-foreground font-medium">{playbook.outcomeDescription}</p>
                       </div>
                     </div>
                     
                     <Button size="lg" className="w-full font-black uppercase tracking-widest shadow-lg group-hover:scale-[1.02] transition-transform" asChild>
                       <Link href={`/playbooks/${playbook.id}`}>
                         Launch Playbook <ArrowRight className="ml-2 size-4" />
                       </Link>
                     </Button>
                   </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Synergistic Footer */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container px-4 mx-auto max-w-4xl text-center space-y-8">
           <div className="flex justify-center">
             <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
               <Sparkles size={24} />
             </div>
           </div>
           <h4 className="text-2xl font-bold tracking-tight italic">&ldquo;Calculators are tactical. Playbooks are strategic.&rdquo;</h4>
           <p className="text-muted-foreground font-medium max-w-xl mx-auto">
             Our Playbook Engine doesn&apos;t just run math; it synthesizes your specific scenario into a single, cohesive action checklist.
           </p>
        </div>
      </section>
    </div>
  )
}
