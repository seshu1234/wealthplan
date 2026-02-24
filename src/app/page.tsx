import { Hero } from "@/components/home/hero";
import { CalculatorGrid } from "@/components/home/calculator-grid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <Hero />
      <div className="bg-muted/50 py-12 flex-1">
        <CalculatorGrid />
      </div>
    </div>
  );
}
