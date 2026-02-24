import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqSection } from "@/components/calculator/faq-section";
import { affiliateLinks } from "@/lib/calculators-registry"; // We can reuse or create if needed

export const metadata = {
  title: "Compound Interest Calculator (2025) — WealthPath",
  description: "Calculate how your money grows with compound interest. See year-by-year projections, total interest earned, and how contribution frequency affects your final balance.",
};

export default function CompoundInterestPage() {
  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      description="Calculate exactly how your savings grow when interest earns interest. Enter your starting amount, expected return rate, and time horizon to see a year-by-year breakdown of your wealth accumulation."
    >
      {/* Calculator Component Placeholder */}
      <div className="bg-muted w-full h-96 flex items-center justify-center rounded-lg border-2 border-dashed border-border/50 mb-12">
        <p className="text-muted-foreground font-medium">Compound Interest Calculator Interface Goes Here</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))] mt-16 pt-8 border-t">
        <h2>What Is Compound Interest?</h2>
        <p>
          Compound interest is the process by which interest is added to your principal balance, and then that combined amount earns interest in the next period. Unlike simple interest — which only pays interest on your original deposit — compound interest accelerates growth over time because you are constantly earning returns on a larger and larger base.
        </p>
        <p>
          Albert Einstein is often (though likely apocryphally) credited with calling compound interest the eighth wonder of the world. Whether or not he said it, the math backs it up: a $10,000 investment earning 8% annually becomes $21,589 after 10 years, $46,610 after 20 years, and $100,627 after 30 years — all without adding a single additional dollar.
        </p>

        <h2>How Compound Frequency Affects Your Balance</h2>
        <p>
          Compounding can happen at different intervals: annually, quarterly, monthly, or even daily. The more frequently interest compounds, the faster your money grows — though the difference between monthly and daily compounding is smaller than most people expect.
        </p>
        <p>Here is how a $10,000 investment at 8% annual rate grows over 10 years depending on compounding frequency:</p>
        <ul>
          <li><strong>Annually:</strong> $21,589</li>
          <li><strong>Quarterly:</strong> $21,911</li>
          <li><strong>Monthly:</strong> $22,196</li>
          <li><strong>Daily:</strong> $22,253</li>
        </ul>
        <p>
          For most savings accounts and investments, monthly compounding is standard. What matters far more than compounding frequency is your contribution rate and how long you stay invested.
        </p>

        <h2>The Rule of 72</h2>
        <p>
          A quick mental math shortcut: divide 72 by your expected annual return rate to estimate how many years it takes your money to double.
        </p>
        <ul>
          <li>At 6% return: 72 ÷ 6 = <strong>12 years to double</strong></li>
          <li>At 8% return: 72 ÷ 8 = <strong>9 years to double</strong></li>
          <li>At 10% return: 72 ÷ 10 = <strong>7.2 years to double</strong></li>
        </ul>
        <p>
          This rule works because of the mathematics of exponential growth and is accurate within about 1–2% of the precise answer for rates between 4% and 15%.
        </p>

        <h2>How to Use This Calculator</h2>
        <ol>
          <li>Enter your <strong>starting principal</strong> — the amount you are investing today</li>
          <li>Set your <strong>annual interest rate</strong> — use 7–10% for long-term stock market estimates, 4–5% for high-yield savings</li>
          <li>Choose your <strong>time period</strong> in years</li>
          <li>Select your <strong>compounding frequency</strong> — monthly is standard for most accounts</li>
          <li>Optionally add <strong>monthly contributions</strong> to see how regular investing accelerates growth</li>
          <li>Click Calculate to see your projected balance, total contributions, and total interest earned</li>
        </ol>

        <h2>What Return Rate Should I Use?</h2>
        <ul>
          <li><strong>High-yield savings account:</strong> 4.5–5.5% (current rates as of 2025)</li>
          <li><strong>US Treasury bonds:</strong> 4–5%</li>
          <li><strong>Balanced portfolio (60% stocks / 40% bonds):</strong> 6–7%</li>
          <li><strong>S&P 500 historical average:</strong> ~10% nominal, ~7% inflation-adjusted</li>
          <li><strong>Individual stocks:</strong> Highly variable — do not assume past performance</li>
        </ul>
        <p>
          For retirement planning, most financial planners recommend using 6–7% as a conservative estimate for a diversified portfolio.
        </p>
      </div>

      <div className="mt-16 pt-8 border-t">
        <FaqSection 
          title="Frequently Asked Questions"
          items={[
            {
              question: "What is the difference between compound interest and simple interest?",
              answer: "Simple interest is calculated only on your original principal. Compound interest is calculated on your principal plus all previously earned interest. Over long periods, the difference is enormous — compound interest creates exponential growth while simple interest creates linear growth."
            },
            {
              question: "How often does compound interest typically compound?",
              answer: "Most savings accounts and money market accounts compound daily or monthly. CDs often compound daily. Investment accounts technically compound continuously since prices change every second. For practical calculations, monthly compounding is the standard assumption."
            },
            {
              question: "Can compound interest work against me?",
              answer: "Yes — on debt. Credit card interest compounds monthly at rates of 20–29%, which means carrying a balance causes your debt to grow exponentially in the same way investments do. This is why paying off high-interest debt is mathematically equivalent to earning that same interest rate as a guaranteed investment return."
            },
            {
              question: "What is the best account to take advantage of compound interest?",
              answer: "For long-term growth: a Roth IRA or 401(k) invested in low-cost index funds. For short-term savings: a high-yield savings account or money market account. The key advantage of tax-advantaged retirement accounts is that compound growth is not taxed annually, which allows the full compounding effect to work uninterrupted."
            },
            {
              question: "How accurate is this compound interest calculator?",
              answer: "This calculator uses the standard compound interest formula: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)], where P is principal, r is annual rate, n is compounding frequency, t is time in years, and PMT is periodic contribution. Results are mathematically precise given the inputs — actual investment returns will vary."
            }
          ]}
        />
      </div>
    </CalculatorShell>
  );
}
