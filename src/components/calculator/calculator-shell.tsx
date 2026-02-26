import { ReactNode } from "react";
import { AdSenseSlot } from "@/components/calculator/adsense-slot";
import { AffiliateCTA } from "@/components/calculator/affiliate-cta";
import { PrintButton } from "@/components/calculator/print-button";

interface CalculatorShellProps {
  title: string;
  description: string;
  children: ReactNode;
  calculatorId: string;
  /** Pass a custom CTA to override the default affiliate CTA */
  affiliateCta?: ReactNode;
  /** Pass related calculators widget if you have one */
  relatedWidget?: ReactNode;
  /** Pass the FAQ section as a child so we can place the below-faq ad after it */
  faqSection?: ReactNode;
}

export function CalculatorShell({
  title,
  description,
  children,
  calculatorId,
  affiliateCta,
  relatedWidget,
  faqSection,
}: CalculatorShellProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* AdSense — Above fold (below header, above calculator) */}
      <AdSenseSlot zone="above-fold" className="w-full" />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Print Button */}
      <div className="flex justify-end print:hidden">
        <PrintButton />
      </div>

      {/* Main Calculator Content */}
      <div className="space-y-8">
        {children}
      </div>

      {/* AdSense — Mid calculator (between calculator and FAQ) */}
      <AdSenseSlot zone="mid-calc" className="w-full print:hidden" />

      {/* Affiliate CTA */}
      <div className="print:hidden">
        {affiliateCta || <AffiliateCTA calculatorId={calculatorId} />}
      </div>

      {/* FAQ / Related Widget */}
      {faqSection && <div>{faqSection}</div>}
      {relatedWidget && <div className="print:hidden">{relatedWidget}</div>}

      {/* AdSense — Below FAQ */}
      {faqSection && (
        <AdSenseSlot zone="below-faq" className="w-full print:hidden" />
      )}
    </div>
  );
}
