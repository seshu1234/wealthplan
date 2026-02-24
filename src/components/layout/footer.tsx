import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-loose text-muted-foreground">
            Built for educational purposes. Not financial advice.
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
        </nav>
      </div>
    </footer>
  );
}
