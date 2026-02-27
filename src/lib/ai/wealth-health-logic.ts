/**
 * Wealth-Health Index Logic
 * Based on expert methodologies from:
 * 1. Financial Health Network (FHN) 8-Indicator Framework
 * 2. CFP Board Practice Standards (Emergency Fund & DTI Ratios)
 * 3. Fidelity Life-Stage Asset Multipliers
 */

export interface WealthHealthInput {
  age: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  liquidAssets: number;
  totalMonthlyDebt: number;
  savingsRate: number; // as decimal (e.g. 0.15)
}

export interface WealthHealthResult {
  score: number;
  status: 'Healthy' | 'Coping' | 'Vulnerable';
  pillars: {
    liquidity: number; // 0-30
    debt: number;      // 0-30
    savings: number;   // 0-20
    assets: number;    // 0-20
  };
  recommendations: string[];
}

export function calculateWealthHealth(input: WealthHealthInput): WealthHealthResult {
  const { age, monthlyIncome, monthlyExpenses, liquidAssets, totalMonthlyDebt, savingsRate } = input;

  // 1. Liquidity Coverage (30 pts)
  // Benchmark: 3-6 months non-discretionary expenses (CFP Standard)
  const efMonths = monthlyExpenses > 0 ? liquidAssets / monthlyExpenses : 6;
  let liquidityScore = 0;
  if (efMonths >= 6) liquidityScore = 30;
  else if (efMonths >= 3) liquidityScore = 15 + ((efMonths - 3) / 3) * 15;
  else if (efMonths >= 1) liquidityScore = (efMonths / 3) * 15;
  
  // 2. Debt Management (30 pts)
  // Benchmark: <20% (Elite), 30% (Healthy), 36% (Warning), 43% (Critical)
  const dti = monthlyIncome > 0 ? (totalMonthlyDebt / monthlyIncome) : 0;
  let debtScore = 0;
  if (dti <= 0.20) debtScore = 30;
  else if (dti <= 0.36) debtScore = 30 - ((dti - 0.20) / 0.16) * 15;
  else if (dti <= 0.45) debtScore = 15 - ((dti - 0.36) / 0.09) * 15;
  else debtScore = 0;

  // 3. Savings Velocity (20 pts)
  // Benchmark: 20% Gold Standard (FHN)
  let savingsScore = 0;
  if (savingsRate >= 0.20) savingsScore = 20;
  else if (savingsRate >= 0) savingsScore = (savingsRate / 0.20) * 20;

  // 4. Asset Multiplier (20 pts)
  // Benchmark: Age-based salary multiples (1x at 30, 3x at 40, etc.)
  const annualIncome = monthlyIncome * 12;
  const targetMultiplier = age < 30 ? 0.5 : (age - 25) / 5; // simplified expert slope
  const actualMultiplier = annualIncome > 0 ? (liquidAssets / annualIncome) : 0;
  
  let assetScore = 0;
  if (actualMultiplier >= targetMultiplier) assetScore = 20;
  else if (targetMultiplier > 0) assetScore = (actualMultiplier / targetMultiplier) * 20;

  const totalScore = Math.min(100, Math.max(0, Math.round(liquidityScore + debtScore + savingsScore + assetScore)));

  // Recommendations
  const recs: string[] = [];
  if (efMonths < 3) recs.push("Priority 1: Build a 3-month emergency buffer to protect your foundation.");
  if (dti > 0.36) recs.push("Priority 2: De-leverage. Your DTI is reaching a critical threshold for lenders.");
  if (savingsRate < 0.15) recs.push("Priority 3: Target a 15-20% savings velocity for long-term health.");
  if (actualMultiplier < targetMultiplier) recs.push("Priority 4: Increase asset accumulation to match your current life stage.");

  return {
    score: totalScore,
    status: totalScore >= 80 ? 'Healthy' : totalScore >= 40 ? 'Coping' : 'Vulnerable',
    pillars: {
      liquidity: Math.round(liquidityScore),
      debt: Math.round(debtScore),
      savings: Math.round(savingsScore),
      assets: Math.round(assetScore),
    },
    recommendations: recs.length > 0 ? recs : ["You are maintaining elite financial health across all expert pillars!"]
  };
}
