import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getRelated } from '@/lib/calculators-registry'

interface RelatedCalculatorsProps {
  calculatorId: string
}

export function RelatedCalculators({ calculatorId }: RelatedCalculatorsProps) {
  const related = getRelated(calculatorId)
  if (related.length === 0) return null

  return (
    <div className="space-y-3 print:hidden">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        People who used this also used
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map(calc => (
          <Link
            key={calc.id}
            href={`/calculators/${calc.slug}`}
            className="group flex items-start gap-3 rounded-xl border p-4 hover:border-[hsl(var(--accent-brand))] hover:bg-[hsl(var(--accent-brand)/0.04)] transition-all"
          >
            <span className="text-2xl">{calc.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm group-hover:text-[hsl(var(--accent-brand))] transition-colors line-clamp-1">
                {calc.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{calc.description}</p>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5 group-hover:text-[hsl(var(--accent-brand))] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
