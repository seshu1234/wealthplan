import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { CalculatorGrid } from "@/components/home/calculator-grid";
import { EducationalTeaser } from "@/components/home/educational-teaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <FeaturesSection />
      <div className="bg-muted/50 py-12 flex-1">
        <CalculatorGrid />
      </div>
      <EducationalTeaser />
    </div>
  );
}
