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
          By accessing and using WealthPath, you accept and agree to be bound by the terms and provision of this agreement. 
        </p>

        <section>
          <h2>1. Limited License</h2>
          <p>
            WealthPath grants you a personal, non-exclusive, non-transferable, limited license to use our calculators for personal, non-commercial use only. You may not reproduce, redistribute, or use our tools for commercial purposes without prior written consent.
          </p>
        </section>

        <section>
          <h2>2. User Responsibilities</h2>
          <p>
            You are responsible for the accuracy of any data you input into our calculators. You understand that the outputs are only as reliable as the inputs provided. You agree not to use the site in any way that could damage, disable, or impair our services.
          </p>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            All content, including calculator logic, design, graphics, and code, is the property of WealthPath and is protected by copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" and "as available." We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the tools. Use of the site is at your own risk.
          </p>
        </section>

        <section>
          <h2>5. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p>
            If you have questions regarding these terms, please visit our <Link href="/contact">Contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
