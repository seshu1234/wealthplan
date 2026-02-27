'use client'

import { motion } from 'framer-motion'
import { Share2, TrendingUp, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface WealthHealthGaugeProps {
  score: number;
  status: 'Healthy' | 'Coping' | 'Vulnerable';
  pillars: {
    liquidity: number;
    debt: number;
    savings: number;
    assets: number;
  };
}

export function WealthHealthGauge({ score, status, pillars }: WealthHealthGaugeProps) {
  // Map status to colors (Financial Standard)
  const colors = {
    Healthy: '#10b981', // Emerald
    Coping: '#f59e0b',  // Amber
    Vulnerable: '#ef4444' // Crimson
  }

  const activeColor = colors[status]

  const handleShare = async () => {
    const text = `I just got a Wealth-Health Index score of ${score}/100 on WealthPlan! 🏆 Check your financial health score here:`
    const url = window.location.href
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Wealth-Health Score', text, url })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`)
      toast.success('Score link copied to clipboard!')
    }
  }

  // Determine the "Next Best Action" for point gains
  const nextAction = (() => {
    if (pillars.liquidity < 20) return { pillar: 'Liquidity', points: 10, action: 'Save $2,000 to increase your score by 10 points.' }
    if (pillars.debt < 20) return { pillar: 'Debt', points: 15, action: 'Reduce monthly debt by $300 to gain 15 points.' }
    if (pillars.savings < 15) return { pillar: 'Savings', points: 8, action: 'Boost savings rate to 15% for an 8 point gain.' }
    return { pillar: 'Maintenance', points: 5, action: 'Maintain current velocity to lock in your score.' }
  })()

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-primary/5 rounded-2xl border border-primary/10 relative overflow-hidden print:bg-white print:border-primary/20 print:py-4 transition-all hover:bg-primary/[0.08]">
      {/* Social proof badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-600 uppercase tracking-widest print:hidden">
        <Sparkles size={8} />
        Top 12% in your age group
      </div>

      {/* Share Hook */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleShare}
        className="absolute top-4 right-4 h-8 w-8 text-primary/60 hover:text-primary hover:bg-primary/10 print:hidden"
      >
        <Share2 size={16} />
      </Button>

      {/* Background Mesh Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none print:hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center print:w-32 print:h-32">
        {/* SVG Gauge */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-muted/30 print:text-muted/10"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke={activeColor}
            strokeWidth="12"
            fill="transparent"
            strokeDasharray="440"
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (score / 100) * 440 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            strokeLinecap="round"
          />
        </svg>

        {/* Inner Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black tracking-tighter text-foreground print:text-3xl"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Index Score</span>
        </div>
      </div>

      {/* Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 px-4 py-1.5 rounded-full flex items-center gap-2 border bg-white shadow-sm print:shadow-none print:mt-2"
        style={{ borderColor: `${activeColor}40` }}
      >
        {status === 'Healthy' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
        {status === 'Coping' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
        {status === 'Vulnerable' && <XCircle className="h-4 w-4 text-red-500" />}
        <span className="text-xs font-black uppercase tracking-wider" style={{ color: activeColor }}>
          {status}: {score >= 80 ? 'Optimal' : score >= 40 ? 'Fair' : 'Critical'}
        </span>
      </motion.div>

      {/* Pillar Micro-Bars */}
      <div className="grid grid-cols-4 gap-4 mt-8 w-full max-w-sm px-6 print:hidden">
        <PillarBar label="EF" val={pillars.liquidity} max={30} color="#3b82f6" />
        <PillarBar label="DTI" val={pillars.debt} max={30} color={activeColor} />
        <PillarBar label="Save" val={pillars.savings} max={20} color="#10b981" />
        <PillarBar label="Asset" val={pillars.assets} max={20} color="#8b5cf6" />
      </div>

      <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-tighter px-8 text-center print:mt-4 italic">
        Expert Methodology: Financial Health Network (FHN) Algorithm v1.2
      </p>

      {/* Point Gain Flashcard */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-10 w-full max-w-sm p-5 rounded-2xl bg-white border border-primary/10 shadow-xl relative overflow-hidden group print:hidden cursor-default"
      >
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
          <TrendingUp size={48} className="text-primary" />
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="px-2 py-1 rounded bg-primary text-white text-[9px] font-black uppercase tracking-widest">
            +{nextAction.points} Points
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Pillar: {nextAction.pillar}</span>
        </div>
        
        <p className="text-xs font-bold leading-relaxed pr-8">
          {nextAction.action}
        </p>
      </motion.div>
    </div>
  )
}

function PillarBar({ label, val, max, color }: { label: string, val: number, max: number, color: string }) {
  const pct = (val / max) * 100
  return (
    <div className="space-y-1.5 flex flex-col items-center">
      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-[10px] font-black">{Math.round(pct)}%</span>
    </div>
  )
}
