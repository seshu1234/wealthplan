export interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number; // e.g., 20 for 20%
  annualRate: number; // e.g., 7 for 7%
  years: number;
  propertyTaxRate: number; // e.g., 1.2 for 1.2%
  homeInsuranceAnnual: number;
  hoaFeesMonthly: number;
}

export interface MortgageResult {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoaFees: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalCostOfLoan: number;
  yearlyAmortization: {
    year: number;
    remainingBalance: number;
    totalInterestPaid: number;
    totalPrincipalPaid: number;
  }[];
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const {
    homePrice,
    downPaymentPercent,
    annualRate,
    years,
    propertyTaxRate,
    homeInsuranceAnnual,
    hoaFeesMonthly,
  } = inputs;

  const downPayment = homePrice * (downPaymentPercent / 100);
  const principal = homePrice - downPayment;
  
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  // Monthly Principal & Interest calculation using the standard mortgage formula
  // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate > 0) {
    const compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPrincipalAndInterest = principal * (monthlyRate * compoundFactor) / (compoundFactor - 1);
  } else {
    // If rate is 0 (unlikely but prevents division by zero)
    monthlyPrincipalAndInterest = principal / numberOfPayments;
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyHomeInsurance = homeInsuranceAnnual / 12;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + hoaFeesMonthly;

  const totalInterestPaid = (monthlyPrincipalAndInterest * numberOfPayments) - principal;
  const totalCostOfLoan = principal + totalInterestPaid;

  // Generate Amortization Schedule (Yearly aggregation)
  const yearlyAmortization = [];
  let currentBalance = principal;
  let accumulatedInterest = 0;
  let accumulatedPrincipal = 0;

  for (let year = 1; year <= years; year++) {
    let interestForYear = 0;
    let principalForYear = 0;

    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) break;

      const interestPayment = currentBalance * monthlyRate;
      let principalPayment = monthlyPrincipalAndInterest - interestPayment;

      // Ensure we don't overpay on the very last payment due to rounding
      if (principalPayment > currentBalance) {
        principalPayment = currentBalance;
      }

      interestForYear += interestPayment;
      principalForYear += principalPayment;
      currentBalance -= principalPayment;
    }

    accumulatedInterest += interestForYear;
    accumulatedPrincipal += principalForYear;

    yearlyAmortization.push({
      year,
      remainingBalance: Math.max(0, Math.round(currentBalance)),
      totalInterestPaid: Math.round(accumulatedInterest),
      totalPrincipalPaid: Math.round(accumulatedPrincipal),
    });
  }

  return {
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance),
    monthlyHoaFees: Math.round(hoaFeesMonthly),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    totalInterestPaid: Math.round(totalInterestPaid),
    totalPrincipalPaid: Math.round(principal), // Should exactly equal loan amount
    totalCostOfLoan: Math.round(totalCostOfLoan),
    yearlyAmortization,
  };
}
