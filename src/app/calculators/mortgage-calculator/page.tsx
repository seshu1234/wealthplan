import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqSection } from "@/components/calculator/faq-section";
import { MortgageCalc } from "@/components/calculator/mortgage-calc";
import { SchemaMarkup } from "@/components/calculator/schema-markup";
import { RelatedCalculators } from "@/components/calculator/related-calculators";
import { LiveRatesBanner } from "@/components/calculator/live-rates-banner";
import { CalcArticle, InfoBox, DataTable } from "@/components/calculator/calc-article";

export const metadata = {
  title: "Mortgage Calculator (2025) — Monthly Payment & Amortization — WealthPath",
  description: "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. See a full amortization schedule and compare 15-year vs 30-year loans.",
};

export default function MortgageCalculatorPage() {
  return (
    <CalculatorShell
      calculatorId="mortgage-calculator"
      title="Mortgage Calculator"
      description="Calculate your exact monthly mortgage payment including principal, interest, property taxes, HOA fees, and PMI. View your full amortization schedule and see exactly how much interest you will pay over the life of your loan."
    >
      {/* Live rate feed banner */}
      <LiveRatesBanner highlightRate="mortgage30" />
      <MortgageCalc />

      <CalcArticle>
        <h2>How Mortgage Payments Are Calculated (PITI)</h2>
        <p>Every monthly mortgage payment has four components:</p>
        <DataTable
          headers={['Component', 'What It Is', 'Typical Range']}
          rows={[
            ['Principal', 'Reduces your loan balance', 'Grows over time'],
            ['Interest', 'Cost of borrowing (on remaining balance)', 'Shrinks over time'],
            ['Taxes', 'Property tax held in escrow', '0.3–2.4% of home value/yr'],
            ['Insurance', 'Home insurance + PMI if <20% down', '$100–200/mo + PMI'],
          ]}
        />

        <h2>15-Year vs. 30-Year Mortgage</h2>
        <p>Example: $400,000 loan at current market rates</p>
        <DataTable
          headers={['Loan Term', 'Monthly Payment', 'Total Interest', 'Interest Savings']}
          rows={[
            ['30-year at 7.0%', '$2,661', '$557,960', '—'],
            ['15-year at 6.25%', '$3,430', '$217,400', '+$340,560 saved'],
          ]}
        />
        <InfoBox variant="tip">
          The 15-year saves <strong>$340,560</strong> but costs <strong>$769/month more</strong>. If that payment is comfortable, the 15-year is mathematically superior. Otherwise, a 30-year with voluntary extra principal payments gives you flexibility.
        </InfoBox>

        <h2>PMI: What It Is and How to Avoid It</h2>
        <p>
          Private Mortgage Insurance (PMI) is required when your down payment is under 20%. It typically costs <strong>0.5–1.5% of your loan amount annually</strong> — that&apos;s $150–$450/month on a $400,000 loan.
        </p>
        <ul>
          <li>Put <strong>20% down</strong> to skip PMI entirely</li>
          <li>Use a <strong>piggyback loan</strong> (80/10/10 structure)</li>
          <li><strong>Request cancellation</strong> once equity reaches 20% via payments or appreciation</li>
        </ul>

        <h2>How Credit Score Affects Your Rate</h2>
        <DataTable
          headers={['Credit Score', 'Rate Tier', 'Impact']}
          rows={[
            ['760+', '✅ Best available', 'Lowest possible payment'],
            ['720–759', '✅ Very competitive', 'Minor premium'],
            ['680–719', '🟡 Good', 'Slightly higher rate'],
            ['620–679', '⚠️ Fair', 'Noticeably higher rate'],
            ['Below 620', '🔴 Poor', 'May not qualify for conventional'],
          ]}
        />

        <h2>How to Use This Calculator</h2>
        <ol>
          <li>Enter the <strong>home price</strong> you are considering</li>
          <li>Set your <strong>down payment</strong> — 20% removes PMI automatically</li>
          <li>Enter the current <strong>interest rate</strong> — use the live rate banner above</li>
          <li>Choose your <strong>loan term</strong> (15 or 30 years)</li>
          <li>Add your area&apos;s <strong>property tax rate</strong> (check your county assessor site)</li>
          <li>Add <strong>HOA fees</strong> if applicable</li>
        </ol>
      </CalcArticle>

      <SchemaMarkup
        type="FAQPage"
        url="https://wealthpath.com/calculators/mortgage-calculator"
        data={[
            { question: "How much house can I afford?", answer: "A common guideline is the 28/36 rule: spend no more than 28% of your gross monthly income on housing costs (PITI), and no more than 36% on total debt payments." },
            { question: "What credit score do I need for a mortgage?", answer: "For a conventional loan, most lenders require a minimum 620 credit score, though you will get significantly better rates above 740." },
            { question: "What is an amortization schedule?", answer: "An amortization schedule shows every monthly payment broken down into principal and interest. In the early years, most of your payment goes to interest." }
          ]}
      />
      <div className="mt-16 pt-8 border-t">
        <FaqSection 
          title="Frequently Asked Questions"
          items={[
            {
              question: "How much house can I afford?",
              answer: "A common guideline is the 28/36 rule: spend no more than 28% of your gross monthly income on housing costs (PITI), and no more than 36% on total debt payments including car loans, student loans, and credit cards. On a $100,000 annual salary, that means a maximum housing payment of about $2,333/month."
            },
            {
              question: "What credit score do I need for a mortgage?",
              answer: "For a conventional loan, most lenders require a minimum 620 credit score, though you will get significantly better rates above 740. FHA loans accept scores as low as 580 with a 3.5% down payment, or 500 with a 10% down payment."
            },
            {
              question: "What is an amortization schedule?",
              answer: "An amortization schedule is a table showing every monthly payment over the life of your loan, broken down into principal and interest. In the early years, most of your payment goes to interest. Over time, the balance shifts toward principal as your loan balance decreases."
            },
            {
              question: "Should I pay points to lower my interest rate?",
              answer: "Mortgage points (also called discount points) let you pay upfront to reduce your interest rate — typically 1 point (1% of loan amount) reduces your rate by 0.25%. To decide if it is worth it, calculate your break-even period: divide the point cost by your monthly savings. If you plan to stay in the home longer than the break-even period, buying points makes sense."
            },
            {
              question: "What is the difference between interest rate and APR?",
              answer: "The interest rate is the base cost of your loan. APR (Annual Percentage Rate) includes the interest rate plus fees like origination fees, broker fees, and mortgage points, expressed as a yearly rate. APR is the more complete number for comparing loans from different lenders."
            }
          ]}
        />
      </div>

      <RelatedCalculators calculatorId="mortgage-calculator" />
    </CalculatorShell>
  );
}
