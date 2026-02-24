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
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata = {
  title: "Blog | WealthPlan - Financial Education & Insights",
  description: "Expert articles on retirement planning, tax strategies, investment basics, and personal finance management.",
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
  "taxes", "retirement", "investing", "mortgage", "savings", 
  "debt", "budgeting", "ira", "401k", "social security"
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingPosts = blogPosts.filter(post => post.trending);
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="group -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>
          </Button>
          
          <Badge variant="outline" className="text-sm">
            {blogPosts.length} Articles
          </Badge>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent py-2">
                Financial Insights Blog
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Expert advice, market updates, and financial planning strategies
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  <Icon className="h-3 w-3 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{post.category}</Badge>
                        {post.trending && (
                          <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        <Clock className="h-3 w-3 ml-2" />
                        {post.readTime}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Blog Posts */}
          <div className="lg:col-span-3">
            {/* Trending Section */}
            {trendingPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  Trending Now
                </h2>
                <div className="space-y-4">
                  {trendingPosts.slice(0, 3).map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0">
                              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {post.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {post.readTime}
                                </span>
                              </div>
                              <h3 className="font-semibold mb-1 hover:text-primary transition-colors">
                                {post.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Avatar className="h-5 w-5">
                                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">
                                  {post.author.name} · {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-48 h-32 bg-muted rounded-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge>{post.category}</Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{post.author.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {post.author.role}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                Read More
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About This Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Expert insights and practical advice to help you make smarter financial decisions. Updated weekly with fresh content.
                </p>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Articles</span>
                    <span className="font-medium">{blogPosts.length}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Authors</span>
                    <span className="font-medium">6 Experts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated</span>
                    <span className="font-medium">Weekly</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <Link key={index} href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link key={index} href={`/blog/tag/${tag}`}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
                <CardDescription>
                  Get the latest articles delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                  <p className="text-xs text-muted-foreground">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}