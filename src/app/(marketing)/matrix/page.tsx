'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, Search, Map as MapIcon, 
  ArrowRight, ShieldCheck, Landmark,
  TrendingDown, CreditCard, Brain
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const stateData = [
  { id: 'CA', name: 'California', tax: 'High (1-13.3%)', cost: 'Extreme', rating: 'Vulnerable', insight: 'High tax burden requiring aggressive tax-loss harvesting and municipal bond strategies.' },
  { id: 'TX', name: 'Texas', tax: 'None (0%)', cost: 'Moderate', rating: 'Efficient', insight: 'No state income tax allows for pure compounding. Focus on property tax mitigation.' },
  { id: 'FL', name: 'Florida', tax: 'None (0%)', cost: 'Moderate', rating: 'Efficient', insight: 'Asset protection laws are elite. Great for homesteading and 401(k) shielding.' },
  { id: 'NY', name: 'New York', tax: 'High (4-10.9%)', cost: 'Extreme', rating: 'Vulnerable', insight: 'City tax adds complexity. Prioritize Roth conversions if moving to a low-tax state later.' },
  { id: 'NV', name: 'Nevada', tax: 'None (0%)', cost: 'Moderate', rating: 'Efficient', insight: 'Perfect for retirees. No tax on pensions or Social Security.' },
  { id: 'WA', name: 'Washington', tax: 'None (0%*)', cost: 'High', rating: 'Efficient', insight: 'New capital gains tax (7%) affects high-net-worth investors above $250k.' },
]

export default function StateMatrixPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredStates = stateData.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        
        {/* Header */}
        <div className="space-y-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1">
              Geographic Intelligence
            </Badge>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
              State Tax <span className="text-primary">Matrix.</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium">Your zip code determines your wealth velocity. Compare state-specific tax burdens and AI-driven living strategies.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search State..." 
              className="h-14 pl-12 rounded-xl border-2 border-primary/5 bg-muted/30 focus:bg-background transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* State Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStates.map((state) => (
            <Card key={state.id} className="p-8 border border-primary/10 rounded-2xl bg-card hover:bg-muted/5 transition-all hover:-translate-y-1 group relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MapIcon size={120} />
               </div>
               
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold tracking-tight">{state.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <Globe className="size-3" />
                        Status: <span className={state.rating === 'Efficient' ? 'text-emerald-500' : 'text-primary'}>{state.rating}</span>
                      </div>
                    </div>
                    <div className="size-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center font-bold text-xs border border-primary/10">
                      {state.id}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <StatItem label="State Tax" value={state.tax} icon={<Landmark className="size-3" />} />
                     <StatItem label="Cost of Living" value={state.cost} icon={<TrendingDown className="size-3" />} />
                  </div>

                  <div className="pt-6 border-t border-dashed border-primary/10 space-y-3">
                     <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <Brain className="size-3" />
                        AI Strategic Insight
                     </div>
                     <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        {state.insight}
                     </p>
                  </div>

                  <Button variant="ghost" className="w-full h-12 gap-2 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/10 rounded-xl">
                     View Full Tax Breakdown
                     <ArrowRight className="size-3" />
                  </Button>
               </div>
            </Card>
          ))}
        </div>

        {/* Global Insights Section */}
        <section className="py-24 bg-primary/5 rounded-3xl border border-primary/10 p-8 sm:p-16 space-y-12">
           <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-center">
                The Geography of <span className="text-primary">Freedom.</span>
              </h2>
              <p className="text-muted-foreground font-medium">Moving states can be the single most impactful &quot;Investment&quot; you ever make. Model the impact of geographic arbitrage.</p>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <InsightCard 
                icon={<ShieldCheck className="size-5" />} 
                title="Asset Protection"
                desc="States like NV and FL offer unmatched bankruptcy protections for your primary residence and retirement accounts."
              />
              <InsightCard 
                icon={<CreditCard className="size-5" />} 
                title="Income Arbitrage"
                desc="Remote work allowing for CA-level salaries in TX-level tax environments can accelerate retirement by 7-12 years."
              />
           </div>
        </section>

      </div>
    </main>
  )
}

function StatItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-xs font-semibold truncate">{value}</p>
    </div>
  )
}

function InsightCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <Card className="p-8 border border-primary/10 rounded-2xl bg-card space-y-4 shadow-sm">
       <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
       </div>
       <div className="space-y-2">
          <h4 className="text-xl font-bold tracking-tight">{title}</h4>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">{desc}</p>
       </div>
    </Card>
  )
}
