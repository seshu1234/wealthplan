import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

interface RelatedCalculatorsProps {
  calculatorId: string
  category?: string
}

export async function RelatedCalculators({ calculatorId, category }: RelatedCalculatorsProps) {
  const supabase = await createClient()

  // Fetch other published calculators in the same category, excluding the current one
  const query = supabase
    .from('calculators')
    .select('id, title, slug, description, category')
    .eq('status', 'published')
    .neq('slug', calculatorId)
    .limit(3)

  if (category) {
    query.eq('category', category as any)
  }

  const { data: related } = await query

  if (!related?.length) return null

  return (
    <div className="space-y-3 print:hidden">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Related Calculators
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map(calc => (
          <Link
            key={calc.id}
            href={`/calculators/${calc.slug}`}
            className="group flex items-start gap-3 rounded-xl border p-4 hover:border-[hsl(var(--accent-brand))] hover:bg-[hsl(var(--accent-brand)/0.04)] transition-all"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm group-hover:text-[hsl(var(--accent-brand))] transition-colors line-clamp-1">
                {calc.title}
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
