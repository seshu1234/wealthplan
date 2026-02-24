import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateCTA } from "@/components/calculator/affiliate-cta";

interface FAQItem {
  q: string;
  a: string;
}

interface CalculatorShellProps {
  title: string;
  description: string;
  children: ReactNode; // inputs + results + chart
  faqItems: FAQItem[];
  seoContent: ReactNode; // static SEO article below calc
  affiliateCta?: ReactNode;
}

export function CalculatorShell({
  title,
  description,
  children,
  faqItems,
  seoContent,
  affiliateCta
}: CalculatorShellProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* 2. Content Injection (Calculator layout, Input, Charts) */}
      <div className="space-y-8">
        {children}
      </div>

      {/* 3. Affiliate CTA */}
      {affiliateCta || <AffiliateCTA />}

      {/* 4. SEO Content */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {seoContent}
      </div>

      {/* 5. FAQ Accordion */}
      {faqItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
