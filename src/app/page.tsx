import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustSection } from "@/components/home/trust-section";
import { CalculatorGrid } from "@/components/home/calculator-grid";
import { Testimonials } from "@/components/home/testimonials";
import { EducationalTeaser } from "@/components/home/educational-teaser";
import { NewsletterCTA } from "@/components/home/newsletter-cta";

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
      <EducationalTeaser />
      <NewsletterCTA />
    </div>
  );
}
