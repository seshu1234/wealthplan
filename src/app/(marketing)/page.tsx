import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustSection } from "@/components/home/trust-section";
import { CalculatorGrid } from "@/components/home/calculator-grid";
import { Testimonials } from "@/components/home/testimonials";
import { EducationalTeaser } from "@/components/home/educational-teaser";
import { NewsletterCTA } from "@/components/home/newsletter-cta";
import { CalculatorFinder } from "@/components/home/calculator-finder";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <TrustSection />
      <div className="bg-muted/50 py-20 px-4">
        <CalculatorGrid />
      </div>
      <Testimonials />
      {/* Calculator Finder — routes visitors to the right tool */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-center">Not sure where to start?</h2>
          <p className="text-muted-foreground text-center text-sm">Answer two quick questions and we&apos;ll point you to the right calculator.</p>
          <CalculatorFinder />
        </div>
      </section>
      <EducationalTeaser />
      <NewsletterCTA />
    </div>
  );
}
