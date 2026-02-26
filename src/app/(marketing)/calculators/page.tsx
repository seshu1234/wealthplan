import { CalculatorGrid } from "@/components/home/calculator-grid";

export const metadata = {
  title: "All Financial Calculators | Wealthplan",
  description: "Explore our collection of free, accurate financial calculators designed for the US tax system.",
};

export default function CalculatorsPage() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Financial Calculators</h1>
        <p className="text-xl text-muted-foreground">
          Tools to help you plan your retirement, map out debt payoff, and build wealth.
        </p>
      </div>
      <CalculatorGrid />
    </div>
  );
}
