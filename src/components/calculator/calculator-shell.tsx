'use client'

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium Background Texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 -right-4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 relative z-10">
      {/* AdSense — Above fold (below header, above calculator) */}
      <AdSenseSlot zone="above-fold" className="w-full" />

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b"
      >
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{description}</p>
        </div>
        <div className="print:hidden">
          <PrintButton />
        </div>
      </motion.div>


      <div className="space-y-12">
        {/* Strategic Perspective Section - Answering "Why This Tool?" */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-2xl bg-muted/40 border border-border/50 flex flex-col md:flex-row gap-6 items-center"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Perspective</p>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground">
              {description} Use this high-fidelity projection to move beyond generic guesses and lock in a roadmap built on US-accurate financial logic.
            </p>
          </div>
        </motion.section>

        {children}

        {/* Results Level Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-muted/20 border border-border/40 text-[10px] italic text-muted-foreground/70 leading-relaxed text-center">
          <p>
            <strong>Note on Simulations:</strong> These results are generated via automated financial logic for educational purposes only. WealthPath projections do not constitute investment advice. Consult a professional advisor for significant financial decisions.
          </p>
        </div>
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
