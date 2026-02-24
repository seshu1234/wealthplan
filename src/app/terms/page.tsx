import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service | WealthPath",
  description: "Terms and conditions for using WealthPath financial tools and calculators.",
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-xl text-muted-foreground">Last updated: January 2025</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
        <p>
          By using WealthPath, you agree to these Terms of Service. If you do not agree, please do not use our website or tools.
        </p>

        <h2>1. Educational Use Only</h2>
        <p>
          WealthPath provides calculators, guides, and tools for <strong>educational and informational purposes only</strong>. None of the content on this website constitutes financial, investment, legal, or tax advice. 
        </p>

        <h2>2. No Professional Relationship</h2>
        <p>
          Your use of WealthPath does not create a client-advisor relationship. We are not registered investment advisors, brokers, or tax professionals. Always consult a licensed professional before making financial decisions.
        </p>

        <h2>3. Accuracy of Information</h2>
        <p>
          While we strive to keep our data (tax brackets, contribution limits, etc.) accurate and up-to-date with current US laws, we cannot guarantee that all information is perfectly accurate, complete, or current. You are responsible for verifying all figures with official sources such as the IRS.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          WealthPath and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or calculators. This includes, but is not limited to, financial losses due to reliance on calculator outputs.
        </p>

        <h2>5. User Conduct</h2>
        <p>
          You agree to use WealthPath only for lawful purposes. You may not use automated scripts, scrapers, or bots to access or extract data from our calculators without explicit permission.
        </p>

        <h2>6. Third-Party Links and Services</h2>
        <p>
          Our site may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the site following any changes indicates your acceptance of the new terms.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us via our <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </article>
  );
}
