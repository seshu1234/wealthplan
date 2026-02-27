import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-24 text-center space-y-8 max-w-4xl mx-auto px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent)] pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest border border-border/40">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Financial Education Technology · Not Financial Advice
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[0.95] uppercase">
          Master the Math of <br />
          <span className="text-primary italic">Your Legacy.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed italic">
          High-precision simulations built to educate, not advise. Leverage the same math used by professionals to architect a transparent financial future.
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
