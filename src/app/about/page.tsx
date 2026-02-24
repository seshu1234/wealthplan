import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About WealthPath — Free US Financial Calculators",
  description:
    "WealthPath builds free, accurate, and transparent financial calculators designed specifically for the US tax system.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button
        variant="ghost"
        asChild
        className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">About WealthPath</h1>
        <p className="text-xl text-muted-foreground">
          Free US Financial Calculators
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
        <section>
          <h2>Our Mission</h2>
          <p>
            WealthPath exists to democratize financial literacy. Our mission is
            to give every American access to the same quality financial planning
            tools that were previously only available through expensive
            financial advisors or complicated, error-prone spreadsheets.
          </p>
          <p>
            We build free, accurate, and transparent financial calculators
            designed specifically for the US tax system. Every tool on
            WealthPath uses the current IRS tax brackets, 401(k) contribution
            limits, Social Security rules, and state tax rates — so the numbers
            you see reflect financial reality, not just approximations.
          </p>
        </section>

        <section>
          <h2>Our Principles</h2>
          <p>
            <strong>Accuracy First.</strong> We update our tax brackets,
            contribution limits, and rate tables every January when the IRS
            releases new figures. Outdated numbers produce wrong answers — and
            wrong answers can cost you real money.
          </p>
          <p>
            <strong>Transparency Always.</strong> We believe you should
            understand the "why" behind every number. That is why every tool on
            WealthPath comes with a methodology section explaining the formulas
            used and what the results actually mean.
          </p>
          <p>
            <strong>Independence.</strong> WealthPath is an independent
            resource. While we may earn affiliate commissions, our calculations
            are strictly math-driven and unbiased. We prioritize data integrity
            over product placement.
          </p>
        </section>

        <section>
          <h2>Our Privacy Commitment</h2>
          <p>
            Privacy isn't just a policy here; it's a structural choice. We
            believe your financial data should stay yours.
          </p>
          <ul>
            <li>
              <strong>Local Processing:</strong> All calculations happen in your
              browser. We never see, stored, or transmit your individual
              financial inputs to our servers.
            </li>
            <li>
              <strong>No Accounts Required:</strong> You don't need to sign up
              to use our tools. No email address, no password, no profile.
            </li>
            <li>
              <strong>No Data Selling:</strong> We do not sell your personal
              behavior or financial data to third parties. Our commitment to
              privacy is absolute.
            </li>
          </ul>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground italic">
            WealthPath is an educational resource. We explain the math and the
            concepts so you can make more informed decisions — but we are not
            financial advisors, and nothing on this site should be taken as
            personalized financial advice. For major financial decisions,
            consult a licensed CFP or CPA.
          </p>
        </section>
      </div>
    </article>
  );
}
