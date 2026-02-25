import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Search,
  TrendingUp,
  DollarSign,
  Home,
  Car,
  GraduationCap,
  Heart,
  Shield,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata = {
  title: "Blog | WealthPath - Financial Education & Insights",
  description:
    "Expert articles on retirement planning, tax strategies, investment basics, and personal finance management.",
};

import { blogPosts as blogPostsData } from "@/lib/blog-data";

const blogPosts = Object.values(blogPostsData);

const categories = [
  { name: "All", icon: BookOpen, count: blogPosts.length },
  { name: "Tax Planning", icon: DollarSign, count: 12 },
  { name: "Retirement", icon: TrendingUp, count: 15 },
  { name: "Real Estate", icon: Home, count: 8 },
  { name: "Student Loans", icon: GraduationCap, count: 6 },
  { name: "Insurance", icon: Shield, count: 5 },
  { name: "Savings", icon: Heart, count: 9 },
  { name: "Auto", icon: Car, count: 4 },
];

const popularTags = [
  "taxes",
  "retirement",
  "investing",
  "mortgage",
  "savings",
  "debt",
  "budgeting",
  "ira",
  "401k",
  "social security",
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const trendingPosts = blogPosts.filter((post) => post.trending);
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">

        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <Button variant="ghost" size="sm" asChild className="-ml-2 gap-2 text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Badge variant="outline" className="text-sm">
            {blogPosts.length} Articles
          </Badge>
        </div>

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Financial Insights
              </h1>
              <p className="text-muted-foreground mt-1">
                Expert advice on taxes, investing, and personal finance
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md mt-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
        </div>

        {/* Category pills */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full gap-1.5 shrink-0"
                >
                  <Icon className="h-3 w-3" />
                  {category.name}
                  <Badge
                    variant="secondary"
                    className="ml-1 text-[10px] px-1.5 py-0"
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              Featured Articles
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {featuredPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full border border-border shadow-none hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-primary/5 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-primary/30" />
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="text-xs">{post.category}</Badge>
                        {post.trending && (
                          <Badge
                            variant="outline"
                            className="text-xs text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800 gap-1"
                          >
                            <TrendingUp className="h-3 w-3" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter className="pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback className="text-[10px]">
                            {post.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {post.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Main grid */}
        <div className="grid lg:grid-cols-4 gap-10">

          {/* ── Main content column ── */}
          <div className="lg:col-span-3 space-y-12">

            {/* Trending */}
            {trendingPosts.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  Trending Now
                </h2>
                <div className="space-y-3">
                  {trendingPosts.slice(0, 3).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                      <Card className="border border-border shadow-none hover:bg-muted/40 transition-colors rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                              <BookOpen className="h-7 w-7 text-primary/30" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {post.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {post.readTime}
                                </span>
                              </div>
                              <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback className="text-[10px]">
                                    {post.author.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {post.author.name} ·{" "}
                                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Latest articles */}
            <section>
              <h2 className="text-lg font-bold mb-4 text-foreground">Latest Articles</h2>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <Card className="border border-border shadow-none hover:shadow-md transition-shadow rounded-xl">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Thumbnail */}
                          <div className="sm:w-44 h-28 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                            <BookOpen className="h-8 w-8 text-primary/30" />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className="text-xs">{post.category}</Badge>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold mb-1 leading-snug group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>

                            {/* Author + CTA */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={post.author.avatar} />
                                  <AvatarFallback className="text-[10px]">
                                    {post.author.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-foreground font-medium">
                                  {post.author.name}
                                </span>
                                <span className="text-xs text-muted-foreground hidden sm:inline">
                                  {post.author.role}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-1 text-xs shrink-0"
                              >
                                Read More
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Categories */}
            <Card className="border border-border shadow-none rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Categories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {categories.slice(1).map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={index}
                        href={`/blog/category/${category.name
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm group-hover:text-foreground transition-colors">
                            {category.name}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular tags */}
            <Card className="border border-border shadow-none rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link key={index} href={`/blog/tag/${tag}`}>
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="border border-primary/20 bg-primary/5 shadow-none rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Newsletter</CardTitle>
                <CardDescription className="text-sm">
                  Get the latest articles in your inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                <Input placeholder="Your email" type="email" />
                <Button className="w-full" size="sm">
                  Subscribe
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  No spam · Unsubscribe anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}