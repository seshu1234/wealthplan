import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-20 text-center space-y-8 max-w-4xl mx-auto px-4">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
          Stop Guessing. <br />
          <span className="text-[hsl(var(--accent-brand))]">Start Growing.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          High-precision financial roadmaps designed to eliminate anxiety and build a legacy that actually lasts.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/10" asChild>
          <Link href="/calculators">Explore Your Future</Link>
        </Button>
        <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold" asChild>
          <Link href="/about">Why WealthPlan?</Link>
        </Button>
      </div>
    </section>
  );
}
