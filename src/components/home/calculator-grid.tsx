import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CALCULATORS_REGISTRY } from "@/lib/calculators-registry";

export function CalculatorGrid() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Popular Calculators</h2>
        <p className="text-muted-foreground">Tools to help you achieve financial independence.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CALCULATORS_REGISTRY.map((calc) => (
          <Link key={calc.id} href={`/calculators/${calc.slug}`} className="block group">
            <Card className="h-full transition-colors hover:border-[hsl(var(--accent-brand))]">
              <CardHeader>
                <CardTitle className="group-hover:text-[hsl(var(--accent-brand))] transition-colors">
                  {calc.name}
                </CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
