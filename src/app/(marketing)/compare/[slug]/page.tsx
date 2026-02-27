import { ComparisonEngine } from "@/components/analytics/ComparisonEngine"

export default function ComparePage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <ComparisonEngine slug={params.slug} />
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { slug: 'roth-vs-traditional-ira' },
    { slug: '15-year-vs-30-year-mortgage' },
    { slug: 'rent-vs-buy' },
    { slug: 'debt-avalanche-vs-snowball' },
    { slug: '401k-vs-roth-ira' }
  ]
}
