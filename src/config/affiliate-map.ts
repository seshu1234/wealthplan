// Contextual affiliate offers mapped by calculator ID
// Add/swap URLs when you join affiliate programs

export interface AffiliateOffer {
  title: string
  description: string
  cta: string
  href: string
  badge?: string
}

export const AFFILIATE_MAP: Record<string, AffiliateOffer> = {
  'compound-interest': {
    title: 'Start Investing Today',
    description: 'Open a Roth IRA with Fidelity — no minimums, no annual fees, $0 commissions.',
    cta: 'Open Account at Fidelity →',
    href: 'https://www.fidelity.com/open-account/roth-ira',
    badge: 'No Minimums',
  },
  'mortgage-calculator': {
    title: 'Compare Current Mortgage Rates',
    description: 'See rates from 30+ lenders in minutes. No impact to your credit score.',
    cta: 'Compare Rates on LendingTree →',
    href: 'https://www.lendingtree.com/home/mortgage/',
    badge: 'Free Quote',
  },
  '401k': {
    title: 'Roll Over Your Old 401(k)',
    description: 'Consolidate old employer plans into one IRA. Fidelity makes it simple.',
    cta: 'Start a Rollover at Fidelity →',
    href: 'https://www.fidelity.com/retirement-ira/rollover-ira',
    badge: 'Tax-Free Rollover',
  },
  'debt-payoff': {
    title: 'Cut Your Interest Rate',
    description: 'Check if you qualify for a 0% balance transfer card. Could save you hundreds.',
    cta: 'See Balance Transfer Offers →',
    href: 'https://www.nerdwallet.com/best/credit-cards/balance-transfer',
    badge: '0% APR Offers',
  },
  'budget': {
    title: 'Put Your Budget on Autopilot',
    description: 'Track spending and investments automatically with Empower (formerly Personal Capital). Free.',
    cta: 'Track for Free with Empower →',
    href: 'https://www.empower.com/',
    badge: 'Free Tool',
  },
  'net-worth': {
    title: 'Track Net Worth Automatically',
    description: 'Link all your accounts. Empower tracks your full net worth for free in real time.',
    cta: 'Start Tracking for Free →',
    href: 'https://www.empower.com/',
    badge: 'Free Tool',
  },
  // Default fallback
  _default: {
    title: 'Ready to Take Action?',
    description: 'Open a brokerage account with Fidelity — no minimums, no account fees.',
    cta: 'Get Started at Fidelity →',
    href: 'https://www.fidelity.com/open-account/overview',
  },
}

export function getAffiliate(calculatorId: string): AffiliateOffer {
  return AFFILIATE_MAP[calculatorId] ?? AFFILIATE_MAP['_default']
}
