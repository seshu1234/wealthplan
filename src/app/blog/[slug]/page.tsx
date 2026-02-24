import Link from "next/link";
import { notFound } from "next/navigation";
import { 
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
  Target,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) return { title: "Post Not Found | WealthPlan" };

  return {
    title: `${post.title} | WealthPlan Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  
  if (!post) {
    notFound();
  }

  const relatedPosts = post.relatedPosts?.map(slug => blogPosts[slug as keyof typeof blogPosts]).filter(Boolean) || [];
  const readingTime = parseInt(post.readTime);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-150"
          style={{ width: '0%' }}
          id="progress-bar"
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4">
          {readingTime} min read
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="hidden xs:flex gap-2 rounded-full px-4 border-slate-200">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-2 rounded-full px-4 border-slate-200">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-7xl mx-auto mb-10 md:mb-16">
          {/* Breadcrumb - Hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">{post.category}</span>
          </div>

          {/* Category and Trending */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6">
            <Badge variant="default" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold">
              {post.category}
            </Badge>
            {post.trending && (
              <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:border-orange-800 dark:text-orange-400 rounded-full px-3">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
            <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-700 dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-400 rounded-full px-3">
              <Eye className="h-3 w-3 mr-1" />
              {(post.likes || 0) * 12}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 md:mb-10 leading-[1.1] bg-gradient-to-br from-slate-950 via-slate-800 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent break-words">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 md:mb-16 max-w-4xl leading-relaxed border-l-4 md:border-l-8 border-blue-600 pl-4 md:pl-8 py-1 md:py-2 font-medium italic">
            {post.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="max-w-7xl mx-auto relative rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-xl">
          <div className="aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex items-center justify-center p-6 md:p-12">
            <div className="text-center">
              <p className="text-[10px] md:text-xs font-black tracking-[0.2em] text-white/60 uppercase mb-2 md:mb-4">WealthPlan Editorial</p>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-black max-w-2xl leading-tight">{post.title}</h2>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
        </div>

        {/* Article Content Grid - Wider Layout */}
        <div className="grid lg:grid-cols-4 gap-8 pb-4">
          {/* Main Content - Wider column */}
          <div className="lg:col-span-3">
            {/* Table of Contents - Sticky */}
            <Card className="mb-8 border-0 shadow-sm bg-slate-50 dark:bg-slate-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold">Table of Contents</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href="#introduction" className="text-muted-foreground hover:text-blue-600 transition-colors">Introduction</a>
                  <a href="#overview" className="text-muted-foreground hover:text-blue-600 transition-colors">Overview</a>
                  <a href="#key-changes" className="text-muted-foreground hover:text-blue-600 transition-colors">Key Changes</a>
                  <a href="#strategies" className="text-muted-foreground hover:text-blue-600 transition-colors">Strategies</a>
                  <a href="#conclusion" className="text-muted-foreground hover:text-blue-600 transition-colors">Conclusion</a>
                </div>
              </CardContent>
            </Card>

            {/* Article Content - Responsive spacing and table handling */}
            <article className="prose prose-base sm:prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:tracking-tight prose-headings:mt-12 md:prose-headings:mt-16 prose-headings:mb-4 md:prose-headings:mb-6
              prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h2:pb-3 md:prose-h2:pb-4
              prose-p:leading-[1.7] md:prose-p:leading-[1.8] prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:mb-6 sm:prose-p:mb-10
              prose-li:my-2 md:prose-li:my-3 prose-li:leading-relaxed
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
              prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold hover:prose-a:underline decoration-blue-200 decoration-2 underline-offset-4
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:py-4 prose-blockquote:px-6 md:prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:my-8 md:prose-blockquote:my-12 prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200
              prose-img:rounded-2xl md:prose-img:rounded-3xl prose-img:shadow-xl md:prose-img:shadow-2xl
              prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap prose-table:my-8 prose-table:pb-4">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t">
              <h3 className="text-sm font-medium mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}>
                    <Badge variant="outline" className="rounded-full px-4 py-1.5 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Engagement Section */}
            <div className="mt-12 md:mt-20 p-6 md:p-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl md:rounded-[2.5rem] text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-xl md:text-2xl font-black mb-2">Helpful Insights?</h3>
                  <p className="text-slate-400 text-sm md:text-base">Support our editorial team by sharing this guide.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                  <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/20 hover:bg-white/20 hover:text-white rounded-full px-8">
                    <ThumbsUp className="h-5 w-5" />
                    <span>Approve ({post.likes || 0})</span>
                  </Button>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <Mail className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Stacks below on mobile */}
          <div className="lg:col-span-1 space-y-8 md:space-y-12">
            {/* Author Card - Desktop optimized */}
            <Card className="hidden lg:block border-0 shadow-lg overflow-hidden rounded-3xl sticky top-24">
              <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <CardContent className="pt-0 px-6 pb-6">
                <Avatar className="h-16 w-16 border-4 border-white dark:border-slate-900 -mt-8 mb-4">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-slate-800 text-white">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg mb-1">{post.author.name}</h3>
                <p className="text-blue-600 font-bold text-xs uppercase mb-3">{post.author.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.author.bio}
                </p>
              </CardContent>
            </Card>

            {/* Quick Summary / Key Highlights */}
            <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-lg md:text-xl mb-6 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Key Highlights
              </h3>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">Authoritative financial strategy validated by CPA experts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium">Updated for current 2025 market dynamics and tax laws.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 md:mt-32">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-8 md:mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group h-full">
                  <Card className="h-full border-0 shadow-lg rounded-[1.5rem] md:rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all">
                    <CardContent className="p-6 md:p-8 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-blue-600/10 text-blue-600 border-0 font-bold">
                          {related.category}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 flex-grow">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                        <span className="text-xs font-bold">{related.author.name}</span>
                        <span className="text-[10px] font-black uppercase text-slate-400">{related.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-20 md:mt-32">
          <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <CardContent className="p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">Master Your Wealth.</h2>
                <p className="text-blue-100 text-base md:text-xl max-w-xl mx-auto md:mx-0">
                  Join 25,000+ readers getting our high-signal weekly brief on taxes, markets, and strategic finance.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-5 py-4 rounded-xl md:rounded-2xl text-slate-900 border-0 focus:ring-4 focus:ring-white/20 outline-none placeholder:text-slate-400"
                  />
                  <Button className="bg-slate-900 hover:bg-black text-white font-bold h-auto py-4 px-8 rounded-xl md:rounded-2xl shadow-xl transition-all active:scale-95">
                    Subscribe
                  </Button>
                </div>
                <p className="text-[10px] md:text-xs text-blue-200/60 text-center font-medium uppercase tracking-widest">
                  Professional Research · No Spam · Safe & Secure
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reading progress script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) progressBar.style.width = scrolled + '%';
          });
        `
      }} />
    </div>
  );
}