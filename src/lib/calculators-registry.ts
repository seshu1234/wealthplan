
export interface CalcEntry {
  id: string
  name: string
  slug: string
  description: string
  category: string
  tags: string[]
  relatedTo: string[]
  icon?: string
}

export const CALCULATORS_REGISTRY: CalcEntry[] = [
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest',
    description: 'See how your savings grow with compound interest — year by year.',
    category: 'growth',
    tags: ['savings', 'investment', 'interest', 'HYSA', 'growth'],
    relatedTo: ['mortgage-calculator', '401k', 'net-worth'],
    icon: '📈',
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    slug: 'mortgage-calculator',
    description: 'Calculate monthly payments, total interest, and see a full amortization schedule.',
    category: 'debt',
    tags: ['mortgage', 'home', 'loan', 'real estate', 'PITI'],
    relatedTo: ['compound-interest', 'debt-payoff', 'net-worth'],
    icon: '🏠',
  },
  {
    id: '401k',
    name: '401(k) Calculator',
    slug: '401k',
    description: 'Project your 401(k) balance at retirement including employer match.',
    category: 'retirement',
    tags: ['401k', 'retirement', 'employer match', 'IRA'],
    relatedTo: ['compound-interest', 'net-worth', 'budget'],
    icon: '🏦',
  },
  {
    id: 'debt-payoff',
    name: 'Debt Payoff Calculator',
    slug: 'debt-payoff',
    description: 'Compare avalanche vs. snowball strategies. See your debt-free date.',
    category: 'debt',
    tags: ['debt', 'credit card', 'student loans', 'payoff'],
    relatedTo: ['mortgage-calculator', 'budget', 'net-worth'],
    icon: '💳',
  },
  {
    id: 'budget',
    name: 'Budget Calculator',
    slug: 'budget',
    description: 'Build a monthly budget based on the 50/30/20 rule.',
    category: 'budgeting',
    tags: ['budget', 'spending', '50/30/20', 'income'],
    relatedTo: ['debt-payoff', 'net-worth', 'compound-interest'],
    icon: '📊',
  },
  {
    id: 'net-worth',
    name: 'Net Worth Calculator',
    slug: 'net-worth',
    description: 'Calculate your total net worth: assets minus liabilities.',
    category: 'planning',
    tags: ['net worth', 'assets', 'liabilities', 'wealth'],
    relatedTo: ['compound-interest', 'budget', 'mortgage-calculator'],
    icon: '💰',
  },
]

export function getRelated(calculatorId: string, limit = 3): CalcEntry[] {
  const calc = CALCULATORS_REGISTRY.find(c => c.id === calculatorId)
  if (!calc) return []
  return calc.relatedTo
    .map(id => CALCULATORS_REGISTRY.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, limit) as CalcEntry[]
}
