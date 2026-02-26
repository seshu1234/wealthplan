import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqSection } from "@/components/calculator/faq-section";
import { CompoundInterestCalc } from "@/components/calculator/compound-interest-calc";
import { SchemaMarkup } from "@/components/calculator/schema-markup";
import { RelatedCalculators } from "@/components/calculator/related-calculators";
import { CalcArticle, InfoBox, DataTable } from "@/components/calculator/calc-article";

export const metadata = {
  title: "Compound Interest Calculator (2025) — WealthPath",
  description: "Calculate how your money grows with compound interest. See year-by-year projections, total interest earned, and how contribution frequency affects your final balance.",
};

export default function CompoundInterestPage() {
  return (
    <CalculatorShell
      calculatorId="compound-interest"
      title="Compound Interest Calculator"
      description="Calculate exactly how your savings grow when interest earns interest. Enter your starting amount, expected return rate, and time horizon to see a year-by-year breakdown of your wealth accumulation."
    >
      {/* Calculator Component Placeholder */}
      <CompoundInterestCalc />

      <CalcArticle>
        <h2>What Is Compound Interest?</h2>
        <p>
          Compound interest means your interest earns interest. Unlike simple interest — which only pays returns on your original deposit — compound interest accelerates growth because you earn returns on a constantly growing base.
        </p>
        <InfoBox variant="tip">
          A $10,000 investment at 8% annually becomes <strong>$21,589</strong> after 10 years, <strong>$46,610</strong> after 20 years, and <strong>$100,627</strong> after 30 years — without adding a single extra dollar.
        </InfoBox>

        <h2>How Compounding Frequency Affects Your Balance</h2>
        <p>Same $10,000 at 8% annual rate after 10 years — only the frequency changes:</p>
        <DataTable
          headers={['Frequency', 'Final Balance', 'Extra vs Annual']}
          rows={[
            ['Annually', '$21,589', '—'],
            ['Quarterly', '$21,911', '+$322'],
            ['Monthly', '$22,196', '+$607'],
            ['Daily', '$22,253', '+$664'],
          ]}
        />
        <p>
          The difference between monthly and daily is negligible. What matters far more is your contribution rate and how long you stay invested.
        </p>

        <h2>The Rule of 72</h2>
        <p>Divide 72 by your annual return rate to estimate how many years your money takes to double.</p>
        <ul>
          <li>At 6%: 72 ÷ 6 = <strong>12 years to double</strong></li>
          <li>At 8%: 72 ÷ 8 = <strong>9 years to double</strong></li>
          <li>At 10%: 72 ÷ 10 = <strong>7.2 years to double</strong></li>
        </ul>

        <h2>What Return Rate Should I Use?</h2>
        <DataTable
          headers={['Account Type', 'Expected Return', 'Risk']}
          rows={[
            ['High-yield savings (HYSA)', '4.5–5.5%', '⚠️ Very Low'],
            ['US Treasury bonds', '4–5%', '⚠️ Very Low'],
            ['Balanced portfolio 60/40', '6–7%', '🟡 Moderate'],
            ['S&P 500 historical avg', '~10% nominal / ~7% real', '🟠 High'],
            ['Individual stocks', 'Highly variable', '🔴 Very High'],
          ]}
        />

        <h2>How to Use This Calculator</h2>
        <ol>
          <li>Enter your <strong>starting principal</strong> — the amount you are investing today</li>
          <li>Set your <strong>annual interest rate</strong> — use 7–10% for stocks, 4–5% for HYSA</li>
          <li>Choose your <strong>time period</strong> in years</li>
          <li>Select <strong>compounding frequency</strong> — monthly is standard</li>
          <li>Add <strong>monthly contributions</strong> to see how regular investing compounds</li>
        </ol>
      </CalcArticle>

      <SchemaMarkup
        type="FAQPage"
        url="https://wealthpath.com/calculators/compound-interest"
        data={[
            { question: "What is the difference between compound interest and simple interest?", answer: "Simple interest is calculated only on your original principal. Compound interest is calculated on your principal plus all previously earned interest. Over long periods, the difference is enormous — compound interest creates exponential growth while simple interest creates linear growth." },
            { question: "How often does compound interest typically compound?", answer: "Most savings accounts compound daily or monthly. Investment accounts compound continuously. For practical calculations, monthly compounding is the standard assumption." },
            { question: "What is the best account to take advantage of compound interest?", answer: "For long-term growth: a Roth IRA or 401(k) invested in low-cost index funds. For short-term savings: a high-yield savings account or money market account." }
          ]}
      />
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

      <RelatedCalculators calculatorId="compound-interest" />
    </CalculatorShell>
  );
}
