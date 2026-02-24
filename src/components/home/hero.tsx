import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-20 text-center space-y-6 max-w-3xl mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
        Master Your Money with <span className="text-[hsl(var(--accent-brand))]">Precision</span>
      </h1>
      <p className="text-xl text-muted-foreground">
        Free, accurate financial calculators designed for the US tax system. 
        Plan your retirement, pay off debt, and build wealth.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Button size="lg" asChild>
          <Link href="/calculators">Explore Calculators</Link>
        </Button>
      </div>
    </section>
  );
}
