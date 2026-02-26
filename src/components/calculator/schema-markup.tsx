/**
 * SchemaMarkup — renders JSON-LD structured data as a <script> tag.
 *
 * Supports FAQPage, HowTo, and Article schemas.
 *
 * Usage (server component safe):
 *   <SchemaMarkup type="FAQPage" data={faqItems} url="https://Wealthplan.com/calculators/compound-interest" />
 */

interface FAQItem {
  question: string
  answer: string
}

interface SchemaMarkupProps {
  type: 'FAQPage' | 'HowTo' | 'Article'
  data: FAQItem[] | Record<string, unknown>
  /** Canonical URL of the page */
  url?: string
  /** Page title (for HowTo / Article) */
  name?: string
  /** Page description */
  description?: string
}

function buildFAQSchema(items: FAQItem[], url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { url } : {}),
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function buildHowToSchema(data: Record<string, unknown>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    ...data,
  }
}

function buildArticleSchema(data: Record<string, unknown>, url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    ...(url ? { url } : {}),
    ...data,
    publisher: {
      '@type': 'Organization',
      name: 'Wealthplan',
      url: 'https://Wealthplan.com',
    },
  }
}

export function SchemaMarkup({ type, data, url, name, description }: SchemaMarkupProps) {
  let schema: Record<string, unknown>

  switch (type) {
    case 'FAQPage':
      schema = buildFAQSchema(data as FAQItem[], url)
      break
    case 'HowTo':
      schema = buildHowToSchema({ name, description, ...data as Record<string, unknown> })
      break
    case 'Article':
      schema = buildArticleSchema({ name, description, ...data as Record<string, unknown> }, url)
      break
    default:
      return null
  }

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint: safe, server-only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
