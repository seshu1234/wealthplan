'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  ArrowUpDown, 
  Info, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Simplified 2024 State Tax Data (Representative Averages)
const stateTaxData = [
  { state: "Alabama", income: "2% - 5%", sales: "4.00%", property: "0.41%", retirement: "B", estate: "No" },
  { state: "Alaska", income: "None", sales: "None", property: "1.18%", retirement: "A", estate: "No" },
  { state: "Arizona", income: "2.50% (Flat)", sales: "5.60%", property: "0.62%", retirement: "B", estate: "No" },
  { state: "Arkansas", income: "2% - 4.4%", sales: "6.50%", property: "0.62%", retirement: "C", estate: "No" },
  { state: "California", income: "1% - 13.3%", sales: "7.25%", property: "0.75%", retirement: "D", estate: "No" },
  { state: "Colorado", income: "4.40% (Flat)", sales: "2.90%", property: "0.51%", retirement: "B", estate: "No" },
  { state: "Connecticut", income: "3% - 6.99%", sales: "6.35%", property: "2.15%", retirement: "F", estate: "Yes" },
  { state: "Delaware", income: "2.2% - 6.6%", sales: "None", property: "0.58%", retirement: "A+", estate: "No" },
  { state: "Florida", income: "None", sales: "6.00%", property: "0.91%", retirement: "A", estate: "No" },
  { state: "Georgia", income: "5.49% (Flat)", sales: "4.00%", property: "0.90%", retirement: "B", estate: "No" },
  { state: "Hawaii", income: "1.4% - 11%", sales: "4.00%", property: "0.29%", retirement: "C", estate: "Yes" },
  { state: "Idaho", income: "5.8% (Flat)", sales: "6.00%", property: "0.63%", retirement: "C", estate: "No" },
  { state: "Illinois", income: "4.95% (Flat)", sales: "6.25%", property: "2.23%", retirement: "F", estate: "Yes" },
  { state: "Indiana", income: "3.15% (Flat)", sales: "7.00%", property: "0.83%", retirement: "C+", estate: "No" },
  { state: "Iowa", income: "4.4% - 5.7%", sales: "6.00%", property: "1.52%", retirement: "C", estate: "Yes" },
  { state: "Kansas", income: "3.1% - 5.7%", sales: "6.50%", property: "1.43%", retirement: "D", estate: "No" },
  { state: "Kentucky", income: "4.5% (Flat)", sales: "6.00%", property: "0.85%", retirement: "C", estate: "Yes" },
  { state: "Louisiana", income: "1.85% - 4.25%", sales: "4.45%", property: "0.56%", retirement: "B", estate: "No" },
  { state: "Maine", income: "5.8% - 7.15%", sales: "5.50%", property: "1.28%", retirement: "D", estate: "Yes" },
  { state: "Maryland", income: "2% - 5.75%", sales: "6.00%", property: "1.07%", retirement: "D", estate: "Yes" },
  { state: "Massachusetts", income: "5.0% - 9.0%", sales: "6.25%", property: "1.20%", retirement: "F", estate: "Yes" },
  { state: "Michigan", income: "4.25% (Flat)", sales: "6.00%", property: "1.48%", retirement: "C", estate: "No" },
  { state: "Minnesota", income: "5.35% - 9.85%", sales: "6.875%", property: "1.11%", retirement: "F", estate: "Yes" },
  { state: "Mississippi", income: "5.0% (Flat)", sales: "7.00%", property: "0.79%", retirement: "B", estate: "No" },
  { state: "Missouri", income: "2% - 4.8%", sales: "4.225%", property: "1.01%", retirement: "C", estate: "No" },
  { state: "Montana", income: "4.7% - 5.9%", sales: "None", property: "0.83%", retirement: "B", estate: "No" },
  { state: "Nebraska", income: "2.46% - 5.84%", sales: "5.50%", property: "1.67%", retirement: "D", estate: "Yes" },
  { state: "Nevada", income: "None", sales: "6.85%", property: "0.55%", retirement: "A", estate: "No" },
  { state: "New Hampshire", income: "None*", sales: "None", property: "1.86%", retirement: "A", estate: "No" },
  { state: "New Jersey", income: "1.4% - 10.75%", sales: "6.625%", property: "2.47%", retirement: "F", estate: "No" },
  { state: "New Mexico", income: "1.7% - 5.9%", sales: "5.125%", property: "0.80%", retirement: "C", estate: "No" },
  { state: "New York", income: "4% - 10.9%", sales: "4.00%", property: "1.73%", retirement: "F", estate: "Yes" },
  { state: "North Carolina", income: "4.5% (Flat)", sales: "4.75%", property: "0.80%", retirement: "B+", estate: "No" },
  { state: "North Dakota", income: "1.1% - 2.9%", sales: "5.00%", property: "0.99%", retirement: "B", estate: "No" },
  { state: "Ohio", income: "2.76% - 3.75%", sales: "5.75%", property: "1.53%", retirement: "C", estate: "No" },
  { state: "Oklahoma", income: "0.25% - 4.75%", sales: "4.50%", property: "0.90%", retirement: "B", estate: "No" },
  { state: "Oregon", income: "4.7% - 9.9%", sales: "None", property: "0.91%", retirement: "C", estate: "Yes" },
  { state: "Pennsylvania", income: "3.07% (Flat)", sales: "6.00%", property: "1.58%", retirement: "B", estate: "Yes" },
  { state: "Rhode Island", income: "3.75% - 5.99%", sales: "7.00%", property: "1.53%", retirement: "D", estate: "Yes" },
  { state: "South Carolina", income: "0% - 7.0%", sales: "6.00%", property: "0.56%", retirement: "B", estate: "No" },
  { state: "South Dakota", income: "None", sales: "4.50%", property: "1.24%", retirement: "A", estate: "No" },
  { state: "Tennessee", income: "None", sales: "7.00%", property: "0.67%", retirement: "A", estate: "No" },
  { state: "Texas", income: "None", sales: "6.25%", property: "1.74%", retirement: "B", estate: "No" },
  { state: "Utah", income: "4.65% (Flat)", sales: "4.85%", property: "0.58%", retirement: "C", estate: "No" },
  { state: "Vermont", income: "3.35% - 8.75%", sales: "6.00%", property: "1.90%", retirement: "F", estate: "Yes" },
  { state: "Virginia", income: "2% - 5.75%", sales: "5.30%", property: "0.82%", retirement: "B", estate: "No" },
  { state: "Washington", income: "None**", sales: "6.50%", property: "0.94%", retirement: "B", estate: "Yes" },
  { state: "West Virginia", income: "3% - 6.5%", sales: "6.00%", property: "0.59%", retirement: "B", estate: "No" },
  { state: "Wisconsin", income: "3.5% - 7.65%", sales: "5.00%", property: "1.73%", retirement: "D", estate: "No" },
  { state: "Wyoming", income: "None", sales: "4.00%", property: "0.61%", retirement: "A+", estate: "No" },
]

type SortField = 'state' | 'income' | 'sales' | 'property' | 'retirement'
type SortOrder = 'asc' | 'desc'

export default function StateTaxMatrixPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('state')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    return stateTaxData
      .filter(item => item.state.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1
        return a[sortField].localeCompare(b[sortField], undefined, { numeric: true }) * factor
      })
  }, [searchTerm, sortField, sortOrder])

  const getFriendlinessColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-500 bg-emerald-500/10'
    if (grade.startsWith('B')) return 'text-blue-500 bg-blue-500/10'
    if (grade.startsWith('C')) return 'text-yellow-500 bg-yellow-500/10'
    if (grade.startsWith('D')) return 'text-orange-500 bg-orange-500/10'
    return 'text-red-500 bg-red-500/10'
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent)] pointer-events-none" />
        <div className="container px-4 mx-auto relative z-10 space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest"
          >
            <TrendingUp className="h-3 w-3" /> State Tax Intelligence
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] max-w-4xl mx-auto">
              Interactive US <span className="text-primary">Tax Matrix</span>.
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic font-medium">
              Analyze and compare the total tax burden across all 50 states. From income brackets to retirement friendliness, see where your wealth grows fastest.
            </p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="Search states (e.g. Florida, Texas...)" 
              className="pl-10 h-12 rounded-2xl bg-muted/50 border-border/40 focus:ring-primary focus:border-primary transition-all text-sm font-bold shadow-xl shadow-black/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Table Content */}
      <section className="py-12 container px-4 mx-auto">
        <div className="bg-card/30 backdrop-blur-xl border border-border/40 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border/40">
                  <TableHeader label="State" field="state" currentSort={sortField} order={sortOrder} onSort={() => handleSort('state')} />
                  <TableHeader label="Income Tax" field="income" currentSort={sortField} order={sortOrder} onSort={() => handleSort('income')} />
                  <TableHeader label="Sales Tax" field="sales" currentSort={sortField} order={sortOrder} onSort={() => handleSort('sales')} />
                  <TableHeader label="Property Tax" field="property" currentSort={sortField} order={sortOrder} onSort={() => handleSort('property')} />
                  <TableHeader label="Retirement Index" field="retirement" currentSort={sortField} order={sortOrder} onSort={() => handleSort('retirement')} />
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estate Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedData.map((row, idx) => (
                    <motion.tr 
                      key={row.state}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-primary/5 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-primary shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                          <span className="text-sm font-black uppercase tracking-tight">{row.state}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-sm font-bold">{row.income}</span>
                        {row.income === 'None' && <Badge variant="secondary" className="ml-2 bg-emerald-500/10 text-emerald-500 border-none text-[9px] uppercase">Tax Free</Badge>}
                      </td>
                      <td className="p-6 text-sm font-medium">{row.sales}</td>
                      <td className="p-6 text-sm font-medium">{row.property}</td>
                      <td className="p-6">
                        <Badge className={`font-black text-xs px-2.5 py-0.5 border-none shadow-sm ${getFriendlinessColor(row.retirement)}`}>
                          {row.retirement}
                        </Badge>
                      </td>
                      <td className="p-6">
                        <span className={`text-xs font-bold ${row.estate === 'Yes' ? 'text-orange-500' : 'text-muted-foreground opacity-60'}`}>
                          {row.estate}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredAndSortedData.length === 0 && (
              <div className="p-20 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground text-sm italic">No states matching "{searchTerm}" found. Try another search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend / Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <InfoCard 
            title="Index Methodology" 
            desc="Our 'Retirement Index' ranks states on 15 factors including cost of living, healthcare access, and social security taxability."
          />
          <InfoCard 
            title="Income Variability" 
            desc="*NH and TN transitioned to 0% interest and dividend tax recently. **WA has a capital gains tax on high-earners."
          />
          <InfoCard 
            title="Update Schedule" 
            desc="Data is updated quarterly based on legislative changes. Always verify localized county surcharges."
          />
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="py-24 container px-4 mx-auto">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-card border border-border/40 p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.05),transparent)] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">
            Calculate the <span className="text-primary">Difference</span>.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium italic">
            Moving states? See how a change in location impacts your long-term wealth projections on our Investment Calculator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest shadow-xl" asChild>
              <Link href="/calculators/investment-calculator">
                Run Simulation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest" asChild>
              <Link href="/roadmaps">
                View Roadmaps
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function TableHeader({ label, field, currentSort, order, onSort }: { label: string, field: string, currentSort: string, order: string, onSort: () => void }) {
  const isActive = currentSort === field
  return (
    <th className="p-6 cursor-pointer group" onClick={onSort}>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
          {label}
        </span>
        <ArrowUpDown className={`h-3 w-3 transition-opacity ${isActive ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-40'}`} />
      </div>
    </th>
  )
}

function InfoCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] bg-card/50 border border-border/40 shadow-xl space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-primary" />
        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground italic leading-relaxed">{desc}</p>
    </div>
  )
}
