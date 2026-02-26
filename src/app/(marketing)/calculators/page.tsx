import { CalculatorGrid } from "@/components/home/calculator-grid";

export const metadata = {
  title: "All Financial Calculators | Wealthplan",
  description: "Explore our collection of free, accurate financial calculators designed for the US tax system.",
};

export default function CalculatorsPage() {
  return (
    <div className="py-16 space-y-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight">Precision Fuel for Your Ambition</h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
          Most calculators use generic math. Ours are built for the US financial reality—integrating IRS rules, tax brackets, and retirement limits to give you a roadmap you can actually use.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {["Tax-Aware", "Zero-Data Tracking", "High-Fidelity Results"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <CalculatorGrid />
    </div>
  );
}
