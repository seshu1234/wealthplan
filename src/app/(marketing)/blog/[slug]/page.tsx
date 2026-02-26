import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Twitter,
  Linkedin,
  Mail,
  TrendingUp,
  ChevronRight,
  Share2,
  Eye,
  ThumbsUp,
  BookOpen,
  Info,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  if (!post) return { title: "Post Not Found | WealthPath" };
  return {
    title: `${post.title} | WealthPath`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  if (!post) notFound();

  const relatedPosts =
    post.relatedPosts
      ?.map((s) => blogPosts[s as keyof typeof blogPosts])
      .filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div
          id="progress-bar"
          className="h-full bg-primary transition-all duration-150"
          style={{ width: "0%" }}
        />
      </div>

      {/* Floating sidebar actions — desktop only */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        <Button variant="outline" size="icon" className="rounded-full shadow-md" aria-label="Like">
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full shadow-md" aria-label="Bookmark">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full shadow-md" aria-label="Share">
          <Share2 className="h-4 w-4" />
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-1">{post.readTime}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2 text-muted-foreground">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Article header */}
        <div className="max-w-7xl mx-auto mb-10">
          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{post.category}</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <Badge className="uppercase tracking-wide text-xs font-bold px-3 py-1">
              {post.category}
            </Badge>
            {post.trending && (
              <Badge variant="outline" className="gap-1 text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-400">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            <Badge variant="outline" className="gap-1 text-muted-foreground">
              <Eye className="h-3 w-3" />
              {(post.likes ?? 0) * 12} views
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-5 italic mb-8">
            {post.excerpt}
          </p>

          {/* Author row — compact, in header */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {post.author.role} · {post.readTime} ·{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden mb-12 md:mb-20 bg-primary/5 border border-border">
          <div className="aspect-video sm:aspect-[21/9] flex items-center justify-center p-6 sm:p-10">
            <div className="text-center space-y-2">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                WealthPath · {post.category}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground max-w-2xl leading-snug">
                {post.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto">

          {/* ── Main content ── */}
          <div className="py-4"> 

            {/* Table of contents */}
            <Card className="border border-border shadow-none bg-muted/40 rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Table of Contents</span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {["Introduction", "Overview", "Key Changes", "Strategies", "Conclusion"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Info box */}
            <div className="flex gap-4 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 p-4 sm:p-5 my-4">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">Key Insight</p>
                <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                  The standard deduction is increasing to $15,000 for single filers and $30,000
                  for married couples filing jointly in 2025. 
                </p>
              </div>
            </div>

            {/* Tip box */}
            <div className="flex gap-4 rounded-xl border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 sm:p-5 my-4">
              <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-green-700 dark:text-green-300">Pro Tip</p>
                <p className="text-sm text-green-900 dark:text-green-200 leading-relaxed">
                  Consider accelerating deductions into 2024 if you expect to be in a lower tax
                  bracket in 2025.
                </p>
              </div>
            </div>

            {/* Warning box */}
            <div className="flex gap-4 rounded-xl border border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30 p-4 sm:p-5 my-4">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">Important Warning</p>
                <p className="text-sm text-orange-900 dark:text-orange-200 leading-relaxed">
                  State tax brackets may not align with federal adjustments. Always check your
                  state&apos;s specific guidelines.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <blockquote className="rounded-xl bg-primary/5 border-l-4 border-primary px-5 sm:px-8 py-6 text-center my-4">
              <p className="text-xl sm:text-2xl font-light text-primary leading-snug">
                The 2025 adjustments represent the largest inflation adjustment to tax brackets
                in over a decade.
              </p>
            </blockquote>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-12">
              {[
                { value: "2.8%", label: "Average Bracket Increase" },
                { value: "$15,000", label: "Single Standard Deduction" },
                { value: "$30,000", label: "Married Standard Deduction" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-5 text-center space-y-1 hover:shadow-md transition-shadow"
                >
                  <p className="text-2xl font-bold text-primary tabular-nums">{value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                </div>
              ))}
            </div>

            {/* Data table */}
            <div>
              <h2 id="overview" className="text-2xl font-bold tracking-tight my-4 text-foreground">
                2025 Tax Brackets Comparison
              </h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption className="pb-3">2025 Federal Income Tax Brackets vs. 2024</TableCaption>
                    <TableHeader>
                      <TableRow className="bg-muted/60">
                        <TableHead className="font-semibold">Filing Status</TableHead>
                        <TableHead className="font-semibold">Rate</TableHead>
                        <TableHead className="font-semibold">2024 Range</TableHead>
                        <TableHead className="font-semibold">2025 Range</TableHead>
                        <TableHead className="font-semibold">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Single</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>$0 – $11,000</TableCell>
                        <TableCell>$0 – $11,600</TableCell>
                        <TableCell className="text-green-600 font-medium">+$600</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Single</TableCell>
                        <TableCell>12%</TableCell>
                        <TableCell>$11,001 – $44,725</TableCell>
                        <TableCell>$11,601 – $47,150</TableCell>
                        <TableCell className="text-green-600 font-medium">+$2,425</TableCell>
                      </TableRow>
                      <TableRow className="bg-primary/5">
                        <TableCell className="font-medium">Married Joint</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>$0 – $22,000</TableCell>
                        <TableCell>$0 – $23,200</TableCell>
                        <TableCell className="text-green-600 font-medium">+$1,200</TableCell>
                      </TableRow>
                      <TableRow className="bg-primary/5">
                        <TableCell className="font-medium">Married Joint</TableCell>
                        <TableCell>12%</TableCell>
                        <TableCell>$22,001 – $89,450</TableCell>
                        <TableCell>$23,201 – $94,300</TableCell>
                        <TableCell className="text-green-600 font-medium">+$4,850</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="my-8">
              <h2 id="key-changes" className="text-2xl font-bold tracking-tight mb-4text-foreground">
                Full 2025 Tax Brackets
              </h2>
              <Tabs defaultValue="single">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="single">Single Filers</TabsTrigger>
                  <TabsTrigger value="married">Married Joint</TabsTrigger>
                </TabsList>
                <TabsContent value="single" className="mt-4 rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/60">
                        <TableHead className="font-semibold">Rate</TableHead>
                        <TableHead className="font-semibold">Income Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["10%", "$0 – $11,600"],
                        ["12%", "$11,601 – $47,150"],
                        ["22%", "$47,151 – $100,525"],
                        ["24%", "$100,526 – $191,950"],
                        ["32%", "$191,951 – $243,725"],
                        ["35%", "$243,726 – $609,350"],
                        ["37%", "Over $609,350"],
                      ].map(([rate, range]) => (
                        <TableRow key={rate}>
                          <TableCell className="font-semibold text-primary">{rate}</TableCell>
                          <TableCell className="text-muted-foreground">{range}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="married" className="mt-4 rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/60">
                        <TableHead className="font-semibold">Rate</TableHead>
                        <TableHead className="font-semibold">Income Range</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ["10%", "$0 – $23,200"],
                        ["12%", "$23,201 – $94,300"],
                        ["22%", "$94,301 – $201,050"],
                        ["24%", "$201,051 – $383,900"],
                        ["32%", "$383,901 – $487,450"],
                        ["35%", "$487,451 – $731,200"],
                        ["37%", "Over $731,200"],
                      ].map(([rate, range]) => (
                        <TableRow key={rate}>
                          <TableCell className="font-semibold text-primary">{rate}</TableCell>
                          <TableCell className="text-muted-foreground">{range}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </div>

            {/* Article HTML content */}
            <div
              className="text-base sm:text-lg text-foreground space-y-6
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:leading-[1.8] [&_p]:text-muted-foreground [&_p]:mb-6
                [&_strong]:text-foreground [&_strong]:font-semibold
                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-muted-foreground
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-muted-foreground
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                [&_hr]:border-border [&_hr]:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQ */}
            <div className="my-12">
              <h2 id="strategies" className="text-2xl font-bold tracking-tight mb-4 text-foreground">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden divide-y divide-border">
                <AccordionItem value="q1" className="border-0 px-5">
                  <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline hover:text-primary">
                    How do these changes affect my paycheck?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    The increased brackets mean you can earn more without moving into a higher tax
                    bracket, typically resulting in slightly higher take-home pay starting January 2025.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-0 px-5">
                  <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline hover:text-primary">
                    Should I adjust my withholding?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    Review your withholding using the IRS Tax Withholding Estimator, especially if
                    you had a significant refund or balance due last year.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="border-0 px-5">
                  <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline hover:text-primary">
                    What about state taxes?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    State tax brackets vary widely. Some states index to inflation automatically;
                    others don&apos;t. Check your state&apos;s tax authority for specific guidance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Separator />

            {/* ── Author card — inline after content ── */}
            <div className="flex flex-col sm:flex-row gap-5 rounded-2xl border border-border bg-card p-6 my-12">
              <Avatar className="h-16 w-16 shrink-0">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback className="text-lg">{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <div>
                  <p className="font-bold text-base text-foreground">{post.author.name}</p>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {post.author.role}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.author.bio}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-sm font-medium mb-3 text-foreground">Topics</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(" ", "-")}`}>
                    <Badge
                      variant="outline"
                      className="rounded-full px-4 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Engagement bar */}
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <Button variant="outline" size="lg" className="gap-2 rounded-full">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({post.likes ?? 0})
              </Button>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground hidden sm:block">Share:</p>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Share via Email">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 md:mt-24">
            <h2 className="text-2xl font-bold tracking-tight mb-6 md:mb-10 text-foreground">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                  <Card className="h-full border border-border shadow-none rounded-2xl hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full gap-4">
                      <Badge variant="secondary" className="w-fit text-xs font-semibold">
                        {related.category}
                      </Badge>
                      <h3 className="font-bold text-base leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-xs font-semibold text-foreground">{related.author.name}</span>
                        <span className="text-xs text-muted-foreground">{related.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="mt-16 md:mt-28">
          <Card className="border-0 bg-primary text-primary-foreground rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Master Your Finances
                </h2>
                <p className="text-primary-foreground/80 text-base max-w-md">
                  Join 25,000+ readers getting our weekly brief on taxes, investing, and wealth building.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl text-foreground bg-background border-0 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-background/30 text-sm"
                  />
                  <Button variant="secondary" className="font-bold rounded-xl px-6 py-3 h-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-[11px] text-primary-foreground/50 text-center uppercase tracking-widest">
                  No spam · Unsubscribe anytime
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Reading progress script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', function() {
              var el = document.getElementById('progress-bar');
              if (!el) return;
              var scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
              el.style.width = scrolled + '%';
            });
          `,
        }}
      />
    </div>
  );
}