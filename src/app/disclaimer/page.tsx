import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Disclaimer — WealthPath",
  description: "Important financial disclaimers for using WealthPath calculators.",
};

export default function DisclaimerPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
        <p className="text-xl text-muted-foreground">Please read this important notice before using our tools.</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
        <h2>Financial Disclaimer</h2>
        <p>
          The calculators, tools, and content on WealthPath are provided for <strong>educational and informational purposes only</strong>. Nothing on this website constitutes financial, investment, tax, or legal advice.
        </p>
        <p>
          The results produced by our calculators are estimates based on the information you provide and the assumptions built into each tool. Actual results will vary based on market conditions, changes in tax law, individual circumstances, and many other factors outside our control.
        </p>

        <h2>Not a Substitute for Professional Advice</h2>
        <p>
          WealthPath is not a registered investment advisor, financial planner, broker, or tax professional. We strongly recommend consulting with a qualified professional before making significant financial decisions, including but not limited to:
        </p>
        <ul>
          <li>Retirement planning and withdrawal strategies</li>
          <li>Mortgage and home purchase decisions</li>
          <li>Investment selection and portfolio allocation</li>
          <li>Tax planning and filing</li>
          <li>Estate planning</li>
        </ul>

        <h2>Accuracy of Information</h2>
        <p>
          We make every effort to keep our calculators and content accurate and up to date with current IRS rules, tax brackets, and contribution limits. However, tax laws change frequently, and we cannot guarantee that all information reflects the most current regulations at any given time. Always verify important figures with the IRS website (irs.gov) or a qualified tax professional.
        </p>

        <h2>Investment Risk</h2>
        <p>
          Past investment performance referenced on this site is not a guarantee of future results. All investments carry risk, including the possible loss of principal. The return rates used in our calculators are illustrative only.
        </p>

        <h2>Affiliate Relationships</h2>
        <p>
          WealthPath may earn commissions when you click affiliate links and open accounts with financial institutions we recommend. This does not affect the accuracy of our calculators or the objectivity of our content. We only recommend products and services we believe provide genuine value.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          WealthPath and its operators shall not be liable for any financial losses, damages, or decisions made based on information from this website.
        </p>
      </div>
    </article>
  );
}
