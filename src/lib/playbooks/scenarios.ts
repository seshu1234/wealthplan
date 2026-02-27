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
  }
};
