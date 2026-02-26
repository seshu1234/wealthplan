import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GUIDES_REGISTRY } from "@/lib/guides-registry";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return GUIDES_REGISTRY.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES_REGISTRY.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Wealthplan Guides`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES_REGISTRY.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/guides">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <div className="flex items-center gap-4 text-sm font-medium text-[hsl(var(--accent-brand))]">
          <span className="uppercase tracking-wider">{guide.category}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-muted-foreground">{guide.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{guide.title}</h1>
        <p className="text-xl text-muted-foreground">{guide.description}</p>
      </div>

      <div 
        className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]"
        dangerouslySetInnerHTML={{ 
          // Very basic markdown parsing for demo purposes
          __html: guide.content
            .replace(/^# (.*)/gm, '<h2>$1</h2>')
            .replace(/^## (.*)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<ul><li>$1</li></ul>')
            // Fix newlines
            .split('\n\n').map(p => {
              if (p.trim() && !p.trim().startsWith('<h') && !p.trim().startsWith('<u')) {
                return `<p>${p}</p>`;
              }
              return p;
            }).join('')
        }} 
      />
    </article>
  );
}
