import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqSection } from "@/components/calculator/faq-section";
import { MortgageCalc } from "@/components/calculator/mortgage-calc";

export const metadata = {
  title: "Mortgage Calculator (2025) — Monthly Payment & Amortization — WealthPath",
  description: "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. See a full amortization schedule and compare 15-year vs 30-year loans.",
};

export default function MortgageCalculatorPage() {
  return (
    <CalculatorShell
      title="Mortgage Calculator"
      description="Calculate your exact monthly mortgage payment including principal, interest, property taxes, HOA fees, and PMI. View your full amortization schedule and see exactly how much interest you will pay over the life of your loan."
    >
      {/* Calculator Component Placeholder */}
      <MortgageCalc />

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))] mt-16 pt-8 border-t">
        <h2>How Mortgage Payments Are Calculated</h2>
        <p>Your monthly mortgage payment consists of four components, commonly abbreviated as PITI:</p>
        <p>
          <strong>Principal</strong> is the portion of your payment that reduces your loan balance. In the early years of a mortgage, this is a small fraction of your payment. By the final years, it makes up the majority.
        </p>
        <p>
          <strong>Interest</strong> is the cost of borrowing money, calculated as your remaining loan balance multiplied by your monthly interest rate. Because your balance decreases over time, the interest portion of each payment also decreases — this is what an amortization schedule shows.
        </p>
        <p>
          <strong>Taxes</strong> refers to property taxes, which most lenders collect monthly and hold in escrow until the tax bill is due. Property taxes vary dramatically by state and county — from under 0.3% in Hawaii to over 2.4% in New Jersey.
        </p>
        <p>
          <strong>Insurance</strong> includes homeowners insurance (typically $100–200/month) and PMI (private mortgage insurance) if your down payment is less than 20% of the purchase price.
        </p>

        <h2>15-Year vs. 30-Year Mortgage: Which Is Better?</h2>
        <p>
          This is one of the most common mortgage questions, and the answer depends on your financial situation.
        </p>
        <p>
          A <strong>30-year mortgage</strong> has lower monthly payments, giving you more cash flow flexibility. However, you pay significantly more interest over the life of the loan.
        </p>
        <p>
          A <strong>15-year mortgage</strong> has higher monthly payments but you build equity faster, pay far less total interest, and typically get a lower interest rate (usually 0.5–0.75% lower than 30-year rates).
        </p>
        <p>Example: $400,000 loan at current rates</p>
        <ul>
          <li>30-year at 7.0%: $2,661/month — Total interest: $557,960</li>
          <li>15-year at 6.25%: $3,430/month — Total interest: $217,400</li>
        </ul>
        <p>
          The 15-year saves $340,560 in interest but costs $769 more per month. If you can afford the higher payment, the 15-year is mathematically superior. If the higher payment would stretch your budget uncomfortably, the 30-year with voluntary extra payments is often a better choice.
        </p>

        <h2>What Is PMI and How Do You Avoid It?</h2>
        <p>
          Private Mortgage Insurance (PMI) is required by most lenders when your down payment is less than 20% of the home&apos;s purchase price. PMI typically costs 0.5–1.5% of your loan amount annually, or $150–$450/month on a $400,000 loan.
        </p>
        <p>
          To avoid PMI: make a 20% down payment, use a piggyback loan (80/10/10 structure), or request PMI cancellation once your equity reaches 20% through appreciation or principal paydown.
        </p>

        <h2>How to Get the Best Mortgage Rate</h2>
        <p>
          Your mortgage rate is determined by your credit score, loan-to-value ratio, debt-to-income ratio, loan type, and current market rates. The single most impactful thing you can control is your credit score:
        </p>
        <ul>
          <li>760+ credit score: Best rates available</li>
          <li>720–759: Very competitive rates</li>
          <li>680–719: Good rates, minor premium</li>
          <li>620–679: Higher rates, consider improving credit first</li>
          <li>Below 620: May not qualify for conventional loans</li>
        </ul>

        <h2>How to Use This Calculator</h2>
        <ol>
          <li>Enter the <strong>home price</strong> you are considering</li>
          <li>Set your <strong>down payment</strong> as a percentage or dollar amount</li>
          <li>Enter the current <strong>interest rate</strong> — check Bankrate or your lender for current rates</li>
          <li>Choose your <strong>loan term</strong> (15 or 30 years are most common)</li>
          <li>Add <strong>property tax rate</strong> for your area (county assessor website has this)</li>
          <li>Add estimated <strong>HOA</strong> fees if applicable</li>
          <li>The calculator will automatically add <strong>PMI</strong> if your down payment is under 20%</li>
        </ol>
      </div>

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
    </CalculatorShell>
  );
}
