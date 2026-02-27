'use client'

import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { AdSenseSlot } from "@/components/calculator/adsense-slot";
import { AffiliateCTA } from "@/components/calculator/affiliate-cta";
import { PrintButton } from "@/components/calculator/print-button";
import { Card } from "@/components/ui/card";

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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Texture — Subtle & Professional */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -right-4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 relative z-10">
      {/* AdSense — Above fold */}
      <AdSenseSlot zone="above-fold" className="w-full" />

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        </div>
        <div className="print:hidden">
          <PrintButton />
        </div>
      </div>

      <div className="space-y-12">
        {/* Strategic Perspective Section */}
        <section className="p-6 rounded-xl bg-muted/40 border flex flex-col md:flex-row gap-6 items-center shadow-sm">
          <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <TrendingUp className="size-6 text-accent" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Strategic Perspective</p>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground">
              {description} This high-fidelity simulation moves beyond generic guesses to lock in a roadmap built on verified financial logic.
            </p>
          </div>
        </section>

        {children}

        {/* Results Level Notice */}
        <Card className="p-4 bg-muted/20 border-border/40 text-[10px] italic text-muted-foreground/70 leading-relaxed text-center shadow-none">
          <p>
            <strong>Note on Simulations:</strong> These results are generated via automated financial logic for educational purposes only. WealthPath projections do not constitute investment advice.
          </p>
        </Card>
      </div>

      {/* AdSense — Mid calculator (between calculator and FAQ) */}
      <AdSenseSlot zone="mid-calc" className="w-full print:hidden" />

      <div className="print:hidden pt-8">
        {affiliateCta || <AffiliateCTA calculatorId={calculatorId} />}
      </div>


      {/* FAQ / Related Widget */}
      {faqSection && <div>{faqSection}</div>}
      {relatedWidget && <div className="print:hidden">{relatedWidget}</div>}

      {faqSection && (
        <AdSenseSlot zone="below-faq" className="w-full print:hidden" />
      )}
      </div>
    </div>
  );
}
