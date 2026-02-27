import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container px-4 mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <span className="text-[10px] font-black text-primary-foreground">WP</span>
              </div>
              <span className="font-bold tracking-tight">WealthPath</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Empowering through financial transparency. We build precision technology to help you master the math of your future.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Platform</h4>
            <nav className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/strategy" className="hover:text-foreground transition-colors">Strategy</Link>
              <Link href="/roadmaps" className="hover:text-foreground transition-colors">Roadmaps</Link>
              <Link href="/taxes/state-matrix" className="hover:text-foreground transition-colors">Tax Matrix</Link>
              <Link href="/calculators" className="hover:text-foreground transition-colors">Calculators</Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Connect</h4>
            <nav className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:text-foreground transition-colors text-primary font-bold">Full Disclaimer</Link>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 space-y-6">
          {/* Prominent Educational Disclaimer */}
          <div className="max-w-4xl p-6 rounded-2xl bg-background/50 border border-border/50 text-[11px] leading-relaxed text-muted-foreground/80 italic">
            <p>
              <strong className="text-foreground uppercase tracking-wider block mb-1">Educational Disclaimer & Non-Advisory Notice:</strong>
              WealthPath is an educational technology platform. We provide tools and simulations for informational purposes only. WealthPath is <strong>not</strong> a registered investment advisor, broker-dealer, or financial fiduciary. None of the content, calculations, or roadmaps provided constitute individual investment, legal, or tax advice. All financial decisions carry risk; we highly recommend consulting with a qualified professional (CPA, CFP, or Attorney) before taking action based on any information found on this site.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            <p>© {new Date().getFullYear()} WealthPath Technology. Built for Human Agency.</p>
            <div className="flex gap-6">
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
