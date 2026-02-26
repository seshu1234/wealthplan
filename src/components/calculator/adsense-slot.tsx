'use client'

/**
 * AdSenseSlot — renders a responsive AdSense ad zone.
 *
 * In development: shows a labeled placeholder so you can see exact placements.
 * In production: renders the AdSense <ins> element.
 *
 * Usage:
 *   <AdSenseSlot zone="above-fold" />
 *   <AdSenseSlot zone="mid-calc" className="my-4" />
 *   <AdSenseSlot zone="below-faq" />
 */

interface AdSenseSlotProps {
  zone: 'above-fold' | 'mid-calc' | 'below-faq'
  className?: string
}

// Replace these with your actual AdSense slot IDs from your AdSense dashboard
const SLOT_IDS: Record<AdSenseSlotProps['zone'], string> = {
  'above-fold': '1234567890',  // TODO: replace with real slot ID
  'mid-calc': '0987654321',    // TODO: replace with real slot ID
  'below-faq': '1122334455',   // TODO: replace with real slot ID
}

// Replace with your AdSense publisher ID (ca-pub-XXXXXXXXXXXXXXXXX)
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX' // TODO: replace with your pub ID

const isDev = process.env.NODE_ENV === 'development'

export function AdSenseSlot({ zone, className = '' }: AdSenseSlotProps) {
  if (isDev) {
    return (
      <div
        data-adsense-zone={zone}
        className={`flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/20 text-muted-foreground/50 text-xs font-mono py-4 ${className}`}
        style={{ minHeight: zone === 'above-fold' ? 90 : zone === 'mid-calc' ? 250 : 90 }}
      >
        AdSense · {zone}
      </div>
    )
  }

  return (
    <div data-adsense-zone={zone} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={SLOT_IDS[zone]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
