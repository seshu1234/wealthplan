import { notFound } from 'next/navigation'
import { CALCULATORS_REGISTRY } from '@/lib/calculators-registry'
import { CompoundInterestCalc } from '@/components/calculator/compound-interest-calc'
import { MortgageCalc } from '@/components/calculator/mortgage-calc'

// Return correct headers for iframe embedding
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const calc = CALCULATORS_REGISTRY.find(c => c.slug === slug)
  if (!calc) return {}
  return {
    title: calc.name,
    robots: 'noindex', // Don't index embed pages
  }
}

const CALC_COMPONENTS: Record<string, React.ReactNode> = {
  'compound-interest': <CompoundInterestCalc />,
  'mortgage-calculator': <MortgageCalc />,
}

export default async function EmbedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const calc = CALCULATORS_REGISTRY.find(c => c.slug === slug)
  if (!calc) notFound()

  const CalcComponent = CALC_COMPONENTS[slug]
  if (!CalcComponent) notFound()

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
          <p className="font-semibold text-sm">{calc.name}</p>
          <a
            href={`https://wealthpath.com/calculators/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Powered by WealthPath ↗
          </a>
        </div>

        {/* Calculator — no shell, no ads, no CTA */}
        {CalcComponent}
      </div>
    </>
  )
}

// Allow all origins to embed via iframe
export async function generateStaticParams() {
  return CALCULATORS_REGISTRY.map(c => ({ slug: c.slug }))
}
