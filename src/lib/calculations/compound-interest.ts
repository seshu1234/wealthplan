export interface CompoundInterestInputs {
  principal: number;
  monthlyContribution: number;
  annualRate: number; // e.g., 8 for 8%
  years: number;
  frequency: "annually" | "monthly" | "daily";
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlySchedule: {
    year: number;
    balance: number;
    totalContributions: number;
    totalInterest: number;
  }[];
}

export function calculateCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestResult {
  const { principal, monthlyContribution, annualRate, years, frequency } = inputs;

  const rate = annualRate / 100;
  let n = 12; // default to monthly
  if (frequency === "annually") n = 1;
  if (frequency === "daily") n = 365;

  let currentBalance = principal;
  let totalContributions = principal;
  let totalInterest = 0;

  const yearlySchedule = [];

  // Initialize year 0
  yearlySchedule.push({
    year: 0,
    balance: principal,
    totalContributions: principal,
    totalInterest: 0,
  });

  for (let year = 1; year <= years; year++) {
    // For simplicity in iterating daily/monthly/annually over a year
    for (let period = 0; period < n; period++) {
      // Add interest for the period
      const interestEarned = currentBalance * (rate / n);
      currentBalance += interestEarned;
      totalInterest += interestEarned;

      // Add contributions (assuming they are made at the end of the month)
      // If daily, divide monthly contribution by roughly 30.4
      // If annually, multiply by 12
      let periodContribution = 0;
      if (frequency === "monthly") {
        periodContribution = monthlyContribution;
      } else if (frequency === "annually") {
        periodContribution = monthlyContribution * 12;
      } else if (frequency === "daily") {
        periodContribution = (monthlyContribution * 12) / 365;
      }

      currentBalance += periodContribution;
      totalContributions += periodContribution;
    }

    yearlySchedule.push({
      year,
      balance: Math.round(currentBalance),
      totalContributions: Math.round(totalContributions),
      totalInterest: Math.round(totalInterest),
    });
  }

  return {
    finalBalance: Math.round(currentBalance),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    yearlySchedule,
  };
}
