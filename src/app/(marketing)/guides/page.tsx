import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GUIDES_REGISTRY } from "@/lib/guides-registry";

export const metadata = {
  title: "Financial Guides & Education | Wealthplan",
  description: "Learn about US taxes, retirement planning, investing strategies, and debt payoff methods.",
};

export default function GuidesHubPage() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Financial Library</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Deep dives into the strategies and math behind the calculators.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES_REGISTRY.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block group">
            <Card className="h-full transition-colors hover:border-[hsl(var(--accent-brand))] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="text-[hsl(var(--accent-brand))] font-medium uppercase tracking-wider">
                    {guide.category}
                  </span>
                  <span className="text-muted-foreground">{guide.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-[hsl(var(--accent-brand))] transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm">
                  {guide.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
