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
        <h2>Information We Collect</h2>
        <p>
          WealthPath is designed with privacy as a core principle. We do not require account creation, and we do not store any financial data you enter into our calculators. All calculations are performed locally in your browser.
        </p>
        <p>
          We may collect limited non-personal information through analytics tools, including:
        </p>
        <ul>
          <li>Pages visited and time spent on pages</li>
          <li>Browser type and device type</li>
          <li>Geographic region (country/state level only)</li>
          <li>Referring website</li>
        </ul>
        <p>
          This information is used solely to understand how our tools are used so we can improve them.
        </p>

        <h2>Cookies</h2>
        <p>WealthPath uses cookies for the following purposes:</p>
        <p>
          <strong>Essential cookies:</strong> Required for the site to function, including theme preference (light/dark mode).
        </p>
        <p>
          <strong>Analytics cookies:</strong> We use Google Analytics to understand aggregate site usage. This data is anonymized and cannot be used to identify individual users.
        </p>
        <p>
          <strong>Advertising cookies:</strong> We display ads through Google AdSense to support free access to our tools. Google AdSense may use cookies to show relevant ads based on your browsing history. You can opt out of personalized ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google&apos;s Ad Settings</a>.
        </p>

        <h2>Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li><strong>Google Analytics</strong> — website usage analytics</li>
          <li><strong>Google AdSense</strong> — advertising (see Google&apos;s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>)</li>
          <li><strong>Vercel</strong> — website hosting</li>
        </ul>

        <h2>Your Financial Data</h2>
        <p>
          Financial information you enter into our calculators (income, debt amounts, investment balances, etc.) is processed entirely within your browser. This data is never transmitted to our servers and is not accessible to WealthPath or any third party.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          WealthPath is intended for adults aged 18 and older. We do not knowingly collect information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of the site after changes constitutes acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us through our <Link href="/contact">Contact page</Link>.
        </p>
      </div>
    </article>
  );
}
