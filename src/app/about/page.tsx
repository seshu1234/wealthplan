import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About WealthPath — Free US Financial Calculators",
  description: "WealthPath builds free, accurate, and transparent financial calculators designed specifically for the US tax system.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">About WealthPath</h1>
        <p className="text-xl text-muted-foreground">Free US Financial Calculators</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
        <h2>Our Mission</h2>
        <p>
          WealthPath exists to give every American access to the same quality financial planning tools that were previously only available through expensive financial advisors or complicated spreadsheets.
        </p>
        <p>
          We build free, accurate, and transparent financial calculators designed specifically for the US tax system. Every calculator on WealthPath uses the current IRS tax brackets, 401(k) contribution limits, Social Security rules, and state tax rates — so the numbers you see reflect reality, not approximations.
        </p>

        <h2>What We Build</h2>
        <p>
          Our tools cover the full spectrum of personal finance: retirement planning, mortgage calculations, debt payoff strategies, investment projections, tax estimation, and budgeting. Each calculator is built to give you accurate projections based on real US financial rules, along with clear explanations of the underlying math.
        </p>
        <p>
          We believe you should understand exactly how a calculation works — not just see a number. That is why every tool on WealthPath comes with a methodology section explaining the formulas used and what the results actually mean.
        </p>

        <h2>Our Principles</h2>
        <p>
          <strong>Accuracy first.</strong> We update our tax brackets, contribution limits, and rate tables every January when the IRS releases new figures. Outdated numbers produce wrong answers — and wrong answers can cost you real money.
        </p>
        <p>
          <strong>Privacy by design.</strong> All calculations happen in your browser. We do not store your financial data, we do not require an account, and we do not sell information to third parties. Your numbers are yours.
        </p>
        <p>
          <strong>Education over advice.</strong> WealthPath is an educational resource. We explain the math and the concepts so you can make more informed decisions — but we are not financial advisors, and nothing on this site should be taken as personalized financial advice. For major financial decisions, consult a licensed CFP or CPA.
        </p>

        <h2>A Note on Our Calculators</h2>
        <p>
          Our calculators are built for the US financial system specifically. We use current federal tax brackets, current 401(k) and IRA contribution limits, and state-specific tax rates where applicable. We clearly indicate the tax year our data reflects and update annually.
        </p>
        <p>
          <em>For questions or feedback, visit our <Link href="/contact">Contact page</Link>.</em>
        </p>
      </div>
    </article>
  );
}
