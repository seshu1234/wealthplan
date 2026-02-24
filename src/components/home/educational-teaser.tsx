import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const featuredGuides = [
  {
    title: "Understanding 401(k) Matching",
    description: "Learn how to maximize your employer match and why it's the closest thing to free money in personal finance.",
    slug: "understanding-401k-match",
    readTime: "5 min read",
  },
  {
    title: "Debt Avalanche vs. Debt Snowball",
    description: "We break down both methods mathematically and psychologically so you can choose the best debt payoff strategy.",
    slug: "debt-avalanche-vs-snowball",
    readTime: "7 min read",
  },
  {
    title: "The Rule of 72 Explained",
    description: "A simple mental math trick to figure out exactly how long it will take for your investments to double.",
    slug: "rule-of-72",
    readTime: "4 min read",
  },
];

export function EducationalTeaser() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Financial Library</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Master your money with our comprehensive guides on investing, taxes, and debt.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/guides">View All Guides</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide, idx) => (
            <Link key={idx} href={`/guides/${guide.slug}`} className="block group">
              <Card className="h-full transition-colors hover:border-[hsl(var(--accent-brand))]">
                <CardHeader>
                  <p className="text-xs text-[hsl(var(--accent-brand))] font-medium uppercase tracking-wider mb-2">
                    {guide.readTime}
                  </p>
                  <CardTitle className="group-hover:text-[hsl(var(--accent-brand))] transition-colors">
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {guide.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
