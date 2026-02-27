import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background pt-16 pb-8">
      <div className="container px-4 mx-auto max-w-6xl space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <span className="font-bold tracking-tight text-lg">WealthPath</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering through financial transparency. Precision technology built for human agency.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Platform</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/strategy" className="hover:text-primary transition-colors">Strategy</Link>
              <Link href="/roadmaps" className="hover:text-primary transition-colors">Roadmaps</Link>
              <Link href="/taxes/state-matrix" className="hover:text-primary transition-colors">State Matrix</Link>
              <Link href="/calculators" className="hover:text-primary transition-colors">Calculators</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/guides" className="hover:text-primary transition-colors">Guides</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/disclaimer" className="hover:text-primary transition-colors font-medium">Disclaimer</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t space-y-8">
          <div className="max-w-4xl text-[11px] leading-relaxed text-muted-foreground font-medium italic">
            <p>
              <strong>Educational Disclaimer:</strong> WealthPath is a technology platform for educational simulations. We are not a registered investment advisor or fiduciary. 
              Projections are hypothetical and do not constitute financial advice. Consult a professional before making major financial decisions.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground/60 font-medium">
            <p>© {new Date().getFullYear()} WealthPath Technology. Built for Agency.</p>
            <div className="flex gap-4">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
