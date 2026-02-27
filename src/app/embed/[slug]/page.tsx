import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DynamicCalculator } from '@/components/calculator/dynamic-calculator'
import { CalculatorConfig } from '@/lib/calculator/engine'

interface CalculatorEmbed {
  title: string;
  slug: string;
  config: CalculatorConfig;
  embed_color: string | null;
}

// Return correct headers for iframe embedding
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: calc } = await supabase
    .from('calculators')
    .select('title, slug')
    .eq('slug', slug)
    .eq('embeddable', true)
    .single()

  if (!calc) return {}
  return {
    title: calc.title,
    robots: 'noindex', // Don't index embed pages
  }
}

export default async function EmbedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: calc } = (await supabase
    .from('calculators')
    .select('title, slug, config, embed_color')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('embeddable', true)
    .single()) as unknown as { data: CalculatorEmbed }

  if (!calc) notFound()

  return (
    <>
      {/* Allow embedding in iframes from any origin */}
      <style>{`
        body { margin: 0; overflow: hidden; }
        .no-embed { display: none !important; }
      `}</style>

      <div className="bg-background min-h-screen p-4 pb-10">
        {/* Slim header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
          <p className="font-semibold text-sm">{calc.title}</p>
          <a
            href={`https://wealthplan.com/calculators/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Powered by WealthPlan ↗
          </a>
        </div>

        {/* Dynamic calculator from config */}
        <DynamicCalculator calculatorId={calc.slug} config={calc.config} />
      </div>
    </>
  )
}
