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
        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
          <p className="m-0 text-amber-900 dark:text-amber-200 font-medium">
            <strong>Important:</strong> All tools on WealthPath are for educational purposes only. They do not constitute financial advice.
          </p>
        </div>

        <section>
          <h2>1. Financial Disclaimer</h2>
          <p>
            The calculators and content on WealthPath are provided as software tools to help you model various financial scenarios. They are <strong>informational and educational only</strong>.
          </p>
          <p>
            WealthPath is not a financial advisor, tax professional, or broker. The results produced are estimates based on your inputs and current tax laws, but they cannot account for your specific financial situation. Actual results will vary.
          </p>
        </section>

        <section>
          <h2>2. Affiliate & Advertising Disclosure</h2>
          <p>
            WealthPath is supported by advertising and affiliate relationships. We may earn a commission when you click on links or sign up for services mentioned on this site.
          </p>
          <p>
            This compensation allows us to keep our calculators free for everyone. However, our reviews and calculations remain objective and are based on the mathematical models described in our methodology sections.
          </p>
        </section>

        <section>
          <h2>3. Limitation of Liability</h2>
          <p>
            By using this site, you agree that WealthPath and its developers are not liable for any financial losses or damages resulting from the use of our tools. 
          </p>
          <p>
            <strong>Do not make major financial decisions based solely on these calculators.</strong> Always consult with a certified financial planner (CFP) or tax professional (CPA) before taking action on your finances.
          </p>
        </section>

        <section>
          <h2>4. Data Accuracy</h2>
          <p>
            We strive for 100% accuracy and update our tax tables annually. However, tax laws change and errors can occur. Always cross-reference important figures with official sources like <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer">IRS.gov</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
