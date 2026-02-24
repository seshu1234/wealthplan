import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Privacy Policy — WealthPath",
  description: "Privacy policy explaining how WealthPath handles your data and uses cookies.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground">Last updated: January 2025</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
        <section>
          <h2>Information We Collect</h2>
          <p>
            WealthPath is designed with privacy as a core principle. We do not require account creation, and we do not store any financial data you enter into our calculators. All calculations are performed locally in your browser.
          </p>
          <p>
            We may collect limited non-personal information through analytics and advertising tools, including:
          </p>
          <ul>
            <li>Pages visited and time spent on pages</li>
            <li>Browser type and device type</li>
            <li>Geographic region (country/state level only)</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section>
          <h2>Cookies and Advertising Disclosure</h2>
          <p>
            We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.
          </p>
          
          <h3>Google AdSense and the DoubleClick Cookie</h3>
          <ul>
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.</li>
          </ul>

          <h3>Third-Party Ad Vendors</h3>
          <p>
            Other third-party vendors or ad networks may also use cookies to serve ads on WealthPath. You may visit those websites to opt out of the use of cookies for personalized advertising (if the vendor or ad network offers this capability). Alternatively, you can opt out of some third-party vendors' uses of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics:</strong> To understand aggregate site usage. The data is anonymized.</li>
            <li><strong>Google AdSense:</strong> To provide relevant advertising that keeps our tools free.</li>
            <li><strong>Vercel:</strong> For secure website hosting.</li>
          </ul>
        </section>

        <section>
          <h2>Your Financial Data</h2>
          <p>
            Any financial information you enter into our calculators (income, debt amounts, investment balances, etc.) is processed entirely within your browser. <strong>This data is never transmitted to our servers</strong> and is not accessible to WealthPath or any third party.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, please contact us through our <Link href="/contact">Contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
