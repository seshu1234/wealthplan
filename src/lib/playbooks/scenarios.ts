export type PlaybookStep = {
  id: string;
  calculatorId: string;
  title: string;
  description: string;
  actionLabel: string;
};

export type PlaybookScenario = {
  id: string;
  title: string;
  description: string;
  icon: string;
  steps: PlaybookStep[];
  outcomeDescription: string;
};

export const PLAYBOOKS: Record<string, PlaybookScenario> = {
  'career-pivot': {
    id: 'career-pivot',
    title: 'Modern Career Pivot',
    description: 'Calculate your runway, insurance gap, and the true cost of a 6-month career transition.',
    icon: 'briefcase',
    steps: [
      {
        id: 'runway',
        calculatorId: 'savings-calculator',
        title: 'The Runway Audit',
        description: 'How many months of survival do you have in liquid cash?',
        actionLabel: 'Calculate Runway'
      },
      {
        id: 'insurance',
        calculatorId: 'life-insurance-calc',
        title: 'Protection Bridge',
        description: 'Calculate the cost of private health and life coverage during the gap.',
        actionLabel: 'Check Coverage'
      },
      {
        id: 'target',
        calculatorId: 'salary-negotiator',
        title: 'Salary Floor',
        description: 'What is the absolute minimum salary you can accept in the new role?',
        actionLabel: 'Set Floor'
      }
    ],
    outcomeDescription: 'A fully-vetted transition plan with survival math and a "Pivot Point" date.'
  },
  'new-baby': {
    id: 'new-baby',
    title: 'The Family Expansion',
    description: 'Navigate the first 12 months of parenthood: from 529 setups to cash-flow shocks.',
    icon: 'baby',
    steps: [
      {
        id: 'cashflow',
        calculatorId: 'budget-planner',
        title: 'Post-Arrival Budget',
        description: 'Model the $1,500/mo average increase in household expenses.',
        actionLabel: 'Review Budget'
      },
      {
        id: 'education',
        calculatorId: '529-college-calc',
        title: 'Education Seed',
        description: 'The power of starting now: model a 18-year compounding journey.',
        actionLabel: 'Model 529'
      },
      {
        id: 'estate',
        calculatorId: 'legacy-planner',
        title: 'Legacy Foundation',
        description: 'Establish the survival numbers for your dependents.',
        actionLabel: 'Plan Legacy'
      }
    ],
    outcomeDescription: 'A comprehensive family financial roadmap designed to eliminate parent-brain financial stress.'
  },
  'first-job': {
    id: 'first-job',
    title: 'The First Paycheck',
    description: 'Launch your financial life from zero. Optimize your first 401(k) and emergency fund.',
    icon: 'graduation-cap',
    steps: [
      {
        id: '401k',
        calculatorId: 'compound-interest',
        title: 'The Match Hack',
        description: 'Calculate why a 100% ROI on the first 6% is non-negotiable.',
        actionLabel: 'Check Match Value'
      },
      {
        id: 'emergency',
        calculatorId: 'savings-calculator',
        title: 'Starter Buffer',
        description: 'Build your first $2,000 security net.',
        actionLabel: 'Plan Buffer'
      }
    ],
    outcomeDescription: 'A wealth-building starter kit ensuring you never fall into the debt trap early.'
  },
  'buying-first-home': {
    id: 'buying-first-home',
    title: 'Path to Homeownership',
    description: 'The multi-year journey to your first keys. DTI audits and downpayment velocity.',
    icon: 'home',
    steps: [
      {
        id: 'dti',
        calculatorId: 'debt-payoff-calculator',
        title: 'Lender Audit',
        description: 'Clean up your DTI before applying for a pre-approval.',
        actionLabel: 'Check Ratios'
      },
      {
        id: 'savings',
        calculatorId: 'savings-calculator',
        title: 'Velocity Hack',
        description: 'Model how soon you can hit a 20% downpayment.',
        actionLabel: 'Track Savings'
      }
    ],
    outcomeDescription: 'A mortgage-ready profile with optimized debt ratios and a clear purchase timeline.'
  },
  'paying-off-debt': {
    id: 'paying-off-debt',
    title: 'The Debt Deletion',
    description: 'Structured high-interest eradication. Avalanche vs. Snowball math.',
    icon: 'shield-alert',
    steps: [
      {
        id: 'audit',
        calculatorId: 'debt-payoff-calculator',
        title: 'Interest Leak Test',
        description: 'Which debts are costing you the most in lifetime wealth?',
        actionLabel: 'Run Audit'
      },
      {
        id: 'strategy',
        calculatorId: 'debt-payoff-calculator',
        title: 'Execution Path',
        description: 'Choose your weapon: Avalanche for math, Snowball for momentum.',
        actionLabel: 'Set Path'
      }
    ],
    outcomeDescription: 'Zero-debt trajectory with a confirmed "Freedom Date".'
  },
  'starting-investing': {
    id: 'starting-investing',
    title: 'Wealth from Zero',
    description: 'Transition from saver to investor. Index funds, tax-efficiency, and compounding.',
    icon: 'trending-up',
    steps: [
      {
        id: 'compounding',
        calculatorId: 'compound-interest',
        title: 'The 30-Year View',
        description: 'Model what $500/mo does over 3 decades vs. your savings account.',
        actionLabel: 'View Growth'
      },
      {
        id: 'taxes',
        calculatorId: 'investment-tax-calc',
        title: 'The Tax Leak',
        description: 'Calculate the true cost of taxes on your brokerage account.',
        actionLabel: 'Check Taxes'
      }
    ],
    outcomeDescription: 'A diversified investment philosophy designed for market survival and long-term gains.'
  },
  'job-loss': {
    id: 'job-loss',
    title: 'Emergency Survival',
    description: 'Immediate runway extension and expense triage when the income stops.',
    icon: 'flame',
    steps: [
      {
        id: 'runway',
        calculatorId: 'savings-calculator',
        title: 'Cash Burn Audit',
        description: 'How long until you hit $0? Let\'s find every extra week of runway.',
        actionLabel: 'Check Runway'
      },
      {
        id: 'triage',
        calculatorId: 'budget-planner',
        title: 'Survival Budget',
        description: 'Identify the "Must-Pay" items to protect your credit and safety.',
        actionLabel: 'Cut Costs'
      }
    ],
    outcomeDescription: 'A survival checklist focused on capital preservation and time-extension.'
  }
};
