import { notFound } from "next/navigation";
import { CALCULATORS_REGISTRY } from "@/lib/calculators-registry";

export function generateStaticParams() {
  return CALCULATORS_REGISTRY.map((calc) => ({
    slug: calc.slug,
  }));
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calculatorMeta = CALCULATORS_REGISTRY.find((c) => c.slug === slug);

  if (!calculatorMeta) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-4">{calculatorMeta.name}</h1>
      <p className="text-muted-foreground mb-8">{calculatorMeta.description}</p>
      <div className="p-12 border border-dashed rounded-lg bg-muted/30">
        <p>Implementation for {calculatorMeta.id} goes here.</p>
      </div>
    </div>
  );
}
