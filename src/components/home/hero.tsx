import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium border border-border/50">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Educational Technology · Not Financial Advice
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Built for <span className="text-primary">Intelligence.</span><br />
            Not just math.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            WealthPath is your AI-First financial architect. Get a 0–100 Health Score, generate automated roadmaps, and chat with a Sidekick that actually knows the US tax system.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button variant="cta" size="lg" className="h-14 px-10 font-bold uppercase tracking-wider shadow-lg hover:translate-y-[-1px] transition-transform" asChild>
            <Link href="/score">Check My Health Score</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 font-bold uppercase tracking-wider" asChild>
            <Link href="/sidekick">Ask My Sidekick</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
