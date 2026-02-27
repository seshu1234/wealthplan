'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, Target, Zap, 
  History, Calendar, ArrowUpRight, ArrowDownRight,
  ShieldCheck, AlertCircle, Brain, Sparkles
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

const scoreHistory = [
  { date: '2023-10-01', score: 45, dti: 48, liquidity: 1.2 },
  { date: '2023-11-15', score: 48, dti: 46, liquidity: 1.5 },
  { date: '2023-12-20', score: 52, dti: 44, liquidity: 1.8 },
  { date: '2024-01-30', score: 58, dti: 40, liquidity: 2.2 },
  { date: '2024-03-05', score: 67, dti: 35, liquidity: 3.1 },
]

export default function DashboardScorePage() {
  const currentScore = scoreHistory[scoreHistory.length - 1].score
  const prevScore = scoreHistory[scoreHistory.length - 2].score
  const change = currentScore - prevScore

  return (
    <div className="p-6 sm:p-10 space-y-10 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1">
            Financial Health Index
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
            Score <span className="text-primary">History.</span>
          </h1>
          <p className="text-muted-foreground font-medium">Track your trajectory from vulnerability to absolute legacy wealth.</p>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Index</p>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold">{currentScore}</span>
              <div className={`flex items-center text-[10px] font-bold rounded-full px-2 py-0.5 ${change >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                {change >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {Math.abs(change)} Points
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Chart */}
        <Card className="lg:col-span-8 p-8 border border-primary/10 rounded-2xl shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <History size={150} />
          </div>
          <CardHeader className="px-0 pt-0 pb-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight">Progress Trajectory</CardTitle>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Score Performance over 6 months</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <span className="text-xs font-bold text-muted-foreground">Oct 2023 - Mar 2024</span>
            </div>
          </CardHeader>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreHistory}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 'bold', fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-primary/10 p-4 rounded-xl shadow-lg space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {new Date(payload[0].payload.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                          </p>
                          <p className="text-2xl font-bold text-primary">{payload[0].value}/100</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10b981" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#scoreGradient)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pillar Breakdown */}
        <Card className="lg:col-span-4 p-8 border border-primary/10 rounded-2xl bg-muted/10 space-y-8 h-full">
          <div className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight">Pillar Health</h3>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Current Multiplier Performance</p>
          </div>

          <div className="space-y-10">
             <PillarProgress label="Liquidity" value={65} icon={<ShieldCheck className="size-3" />} />
             <PillarProgress label="Debt Coverage" value={42} icon={<AlertCircle className="size-3" />} />
             <PillarProgress label="Savings Velocity" value={80} icon={<TrendingUp className="size-3" />} />
             <PillarProgress label="Asset Multiplier" value={55} icon={<Target className="size-3" />} />
          </div>

          <div className="pt-8 border-t border-primary/10 space-y-4">
             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                <Brain className="size-4" />
                Strategic Insight
             </div>
             <p className="text-xs font-medium italic leading-relaxed text-muted-foreground selection:bg-primary/20">
               Your <strong className="text-foreground">Debt Coverage</strong> is currently your largest bottleneck. Paying down the high-interest card debt by $2,400 would trigger a <strong className="text-emerald-500">+8 point jump</strong> in your overall index.
             </p>
             <Button className="w-full h-12 gap-2 font-black uppercase tracking-widest bg-primary hover:scale-[1.02] transition-transform">
                Execute Action Plan
                <Zap className="size-4" />
             </Button>
          </div>
        </Card>

      </div>

      {/* Strategic Actions Feed */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Recommended Tactics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <TacticCard 
             title="Aggressive Triage" 
             desc="Move $1,200 from low-yield savings to high-interest debt." 
             impact="+4 Points"
           />
           <TacticCard 
             title="Max the Match" 
             desc="Increase 401(k) to 6% to capture full employer match." 
             impact="+2 Points"
           />
           <TacticCard 
             title="Emergency Bridge" 
             desc="Buffer liquid cash to 3.0 months of primary expenses." 
             impact="+5 Points"
           />
        </div>
      </div>

    </div>
  )
}

function PillarProgress({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
        <span className="flex items-center gap-2 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="text-primary">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  )
}

function TacticCard({ title, desc, impact }: { title: string, desc: string, impact: string }) {
  return (
    <Card className="p-6 border border-primary/10 rounded-2xl bg-card hover:bg-muted/5 transition-colors space-y-4 shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-bold tracking-tight">{title}</h4>
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px] font-bold uppercase px-2 py-0.5">
          {impact}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed font-medium">{desc}</p>
    </Card>
  )
}
