export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "investing" | "debt" | "taxes" | "retirement" | "basics";
  readTime: string;
  publishedAt: string;
  content: string;
}

export const GUIDES_REGISTRY: Guide[] = [
  {
    slug: "understanding-401k-matching",
    title: "Understanding 401(k) Matching — The Closest Thing to Free Money",
    description: "Learn how 401(k) employer matching works, how to maximize your match, and why not contributing enough to get the full match is leaving money on the table.",
    category: "retirement",
    readTime: "5 min",
    publishedAt: "2025-01-15",
    content: `
If your employer offers a 401(k) match and you are not contributing enough to capture the full match, you are effectively turning down part of your compensation. Employer matching is the closest thing to free money in personal finance — and yet millions of Americans leave it uncaptured every year.

## How 401(k) Matching Works
An employer match means your company contributes to your 401(k) based on how much you contribute. The most common matching formula is:

**"We match 100% of your contributions up to 3% of your salary, plus 50% of contributions between 3% and 5%."**

On a $70,000 salary, this means:
* You contribute 5% = $3,500
* Employer matches 100% of first 3% = $2,100
* Employer matches 50% of next 2% = $700
* Total employer contribution = $2,800
* Your effective return on day one: $2,800 / $3,500 = **80% instant return**

No investment in the world offers an 80% guaranteed day-one return. That is why contributing at least enough to capture your full match is universally considered the first step in any personal finance plan.

## Common Matching Formulas
Matching formulas vary by employer. Common structures include:

* **Dollar-for-dollar match up to X%:** Employer matches 100% of contributions up to a set percentage of salary
* **Partial match:** Employer matches 50 cents per dollar up to a set percentage
* **Tiered match:** Different rates at different contribution levels (like the example above)
* **Fixed contribution:** Employer contributes a set percentage regardless of employee contributions

Check your employee benefits portal or ask HR for your exact matching formula.

## The Vesting Schedule Trap
There is a catch: most employer matches are subject to a **vesting schedule**, meaning you only keep the matched money if you stay at the company long enough.

Common vesting schedules:
* **Immediate vesting:** You keep 100% of the match from day one
* **Cliff vesting:** 0% until a set date, then 100% (e.g., 0% for year 1–2, then 100%)
* **Graded vesting:** Percentage increases each year (e.g., 20% per year over 5 years)

If you plan to leave a job, check your vesting status first. Leaving two months before full vesting can cost thousands of dollars.

## What Is the 401(k) Contribution Limit for 2025?
The IRS sets annual limits on 401(k) contributions:
* Employee contribution limit: **$23,500** (up from $23,000 in 2024)
* Catch-up contribution (age 50+): **additional $7,500**
* Total limit including employer match: **$70,000**

Employer match contributions do not count toward the $23,500 employee limit — they count toward the $70,000 combined limit.

## Should I Choose Traditional or Roth 401(k)?
Many employers now offer both options:

**Traditional 401(k):** Contributions are pre-tax, reducing your taxable income today. You pay taxes on withdrawals in retirement.

**Roth 401(k):** Contributions are after-tax, meaning no immediate tax break. Qualified withdrawals in retirement are completely tax-free, including all the growth.

General guidance: If you expect to be in a lower tax bracket in retirement than today, traditional is often better. If you expect to be in the same or higher bracket, Roth is often better. Many people contribute to both to hedge against future tax rate uncertainty.

## Action Steps
1. Find out your exact employer matching formula (HR or benefits portal)
2. Calculate the minimum contribution needed to capture the full match
3. Increase your contribution to at least that level immediately
4. If you can contribute more, consider maxing out your 401(k) next
5. Review your investment fund selection — most people should be in a target-date fund or low-cost index funds
    `
  },
  {
    slug: "debt-avalanche-vs-snowball",
    title: "Debt Avalanche vs. Debt Snowball: Which Pays Off Debt Faster?",
    description: "We break down the debt avalanche and debt snowball methods mathematically and psychologically. See which strategy saves the most money and which keeps you most motivated.",
    category: "debt",
    readTime: "7 min",
    publishedAt: "2025-02-01",
    content: `
Two methods dominate personal finance advice for paying off multiple debts: the debt avalanche and the debt snowball. They differ in one key way — the order in which you pay off your debts. That single difference has significant mathematical and psychological implications.

## How Both Methods Work
Both methods share the same foundation: you make minimum payments on all your debts, then put every extra dollar toward one target debt until it is gone, then roll that payment into the next debt.

**Debt Avalanche:** Target the debt with the highest interest rate first, regardless of balance size.

**Debt Snowball:** Target the debt with the smallest balance first, regardless of interest rate.

## The Math: Avalanche Wins
The debt avalanche is mathematically optimal. By eliminating your highest-rate debt first, you reduce the amount of interest accruing across your total debt load as quickly as possible.

**Example scenario:**
* Credit Card A: $8,000 at 24% APR — minimum $160/month
* Credit Card B: $3,000 at 19% APR — minimum $60/month
* Car Loan: $12,000 at 6% APR — minimum $230/month
* Total extra payment budget: $500/month above minimums

**Avalanche result:** Pay off in 28 months, total interest paid: $4,218

**Snowball result:** Pay off in 29 months, total interest paid: $4,891

Difference: The avalanche saves $673 and finishes one month faster in this scenario. The gap widens significantly when interest rate differences are larger.

## The Psychology: Snowball Often Wins in Practice
Here is the uncomfortable truth: the mathematically correct answer is not always the right answer for every person.

The debt snowball creates quick wins. When you eliminate Credit Card B ($3,000 balance) first, you get a victory in a few months. That victory is real — you have one fewer payment, one fewer creditor, and psychological proof that the plan works. Research in behavioral economics consistently shows that people are more likely to maintain a debt payoff plan when they experience early wins, even if those wins cost slightly more in interest.

Dave Ramsey built an entire financial empire on this insight: if the mathematically superior method causes people to quit, it is not actually superior for them.

## How to Choose

**Choose the avalanche if:**
* You are analytically motivated and the math drives your behavior
* Your highest-rate debt has a manageable balance (not so large it takes years to eliminate)
* You have strong financial discipline and will not lose motivation
* The interest rate differences between your debts are significant (10%+ spread)

**Choose the snowball if:**
* You have struggled to stick to debt payoff plans before
* You need early wins to stay motivated
* Your highest-rate debt also has a very large balance
* The interest rate differences between your debts are small (less than 5% spread)

**The hybrid approach:** Some people prioritize any debt with a very high rate (above 20%) first regardless of balance, then switch to snowball order for remaining debts. This captures most of the mathematical benefit while preserving motivation.

## What Actually Matters Most
The difference between avalanche and snowball is almost always less than $1,000–$2,000 over the course of a payoff plan. What matters far more:

1. **How much extra you pay each month.** Increasing your extra payment from $200 to $400 saves more than any method choice.
2. **Whether you stick to the plan.** A snowball plan you follow for 3 years beats an avalanche plan you abandon after 6 months every single time.
3. **Whether you stop accumulating new debt.** Both methods fail if you keep adding to your balances.

Use our [Debt Payoff Calculator](/calculators/debt-payoff-calculator) to run the exact numbers for your specific debts and see the precise difference between methods.
    `
  },
  {
    slug: "rule-of-72",
    title: "The Rule of 72 Explained — How Long Until Your Money Doubles?",
    description: "Learn the Rule of 72 — the simple mental math trick that tells you exactly how long it takes for your investments to double at any given return rate.",
    category: "investing",
    readTime: "4 min",
    publishedAt: "2025-02-10",
    content: `
The Rule of 72 is the most useful mental math shortcut in personal finance. It lets you estimate — instantly, without a calculator — how long it will take for any investment to double in value.

## The Formula
Divide 72 by your annual return rate. The result is the approximate number of years to double your money.

**Years to double = 72 ÷ Annual Return Rate**

Examples:
* 6% return: 72 ÷ 6 = **12 years to double**
* 8% return: 72 ÷ 8 = **9 years to double**
* 10% return: 72 ÷ 10 = **7.2 years to double**
* 12% return: 72 ÷ 12 = **6 years to double**

## Why It Works
The Rule of 72 is an approximation of the precise formula for doubling time: ln(2) / ln(1 + r), where r is the return rate. The number 72 is chosen because it is close to 69.3 (the mathematically exact constant) but is easily divisible by many common return rates: 1, 2, 3, 4, 6, 8, 9, 12, 24, and 36.

The rule is accurate within about 1–2% for return rates between 4% and 15% — more than precise enough for planning purposes.

## Practical Uses

**Evaluating investments:** If someone offers you an investment promising 15% annual returns, the Rule of 72 says your money doubles every 4.8 years. If that sounds too good — it probably is.

**Understanding inflation's damage:** The Rule of 72 works in reverse for inflation. At 3% inflation, purchasing power halves in 24 years. At 7% inflation, it halves in about 10 years. This is why inflation is called the "silent tax."

**Comparing debt vs. investing:** A credit card charging 24% interest means your debt doubles in 3 years (72 ÷ 24) if you make no payments. This viscerally illustrates why eliminating high-interest debt is often the best "investment" you can make.

**Setting expectations for retirement:** If you are 35 with $50,000 saved and expect a 7% return, your money doubles roughly every 10 years: $100,000 at 45, $200,000 at 55, $400,000 at 65 — without adding another dollar. This shows both the power of early saving and the cost of starting late.

## Limitations
The Rule of 72 assumes a consistent annual return rate, which real investments do not provide. Stock markets fluctuate significantly year to year. The rule is a planning heuristic, not a prediction.

It also does not account for taxes. In a taxable account, annual taxes on gains reduce the effective compounding rate. In a Roth IRA or 401(k), tax-free or tax-deferred growth means the full return compounds — one of many reasons tax-advantaged retirement accounts are so valuable.

## The Rule of 72 in Reverse
You can also use the Rule of 72 to find the return rate needed to double your money in a target time:

**Required return = 72 ÷ Years to double**

* Want to double in 5 years? You need: 72 ÷ 5 = **14.4% annual return** (aggressive)
* Want to double in 10 years? You need: 72 ÷ 10 = **7.2% annual return** (achievable with index funds)
* Want to double in 20 years? You need: 72 ÷ 20 = **3.6% annual return** (conservative)

This reverse application is useful for reality-checking financial goals and understanding what return rate your plan actually requires.
    `
  }
];
