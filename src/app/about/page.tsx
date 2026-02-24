import Link from "next/link";
import { 
  ArrowLeft, 
  Target, 
  Shield, 
  Eye, 
  Heart, 
  Users,
  CheckCircle,
  Award,
  Calendar,
  Globe,
  Lock,
  Calculator,
  BookOpen,
  Scale,
  Zap,
  Sparkles,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
  title: "About WealthPlan | Free US Financial Calculators",
  description: "WealthPlan builds free, accurate, and transparent financial calculators designed specifically for the US tax system. Learn about our mission and principles.",
};

export default function AboutPage() {
  const stats = [
    { icon: Calculator, value: "15+", label: "Financial Calculators" },
    { icon: Users, value: "100K+", label: "Monthly Users" },
    { icon: Calendar, value: "Annual", label: "Tax Updates" },
    { icon: Star, value: "4.9", label: "User Rating" },
  ];

  const principles = [
    { 
      icon: CheckCircle, 
      title: "Accuracy First", 
      description: "We update our tax brackets, contribution limits, and rate tables every January when the IRS releases new figures. Outdated numbers produce wrong answers — and wrong answers can cost you real money.",
      color: "green"
    },
    { 
      icon: Eye, 
      title: "Transparency Always", 
      description: "Every tool on WealthPlan comes with a methodology section explaining the formulas used and what the results actually mean. You deserve to understand the 'why' behind every number.",
      color: "blue"
    },
    { 
      icon: Shield, 
      title: "Independence", 
      description: "We're an independent resource. While we may earn affiliate commissions, our calculations are strictly math-driven and unbiased. We prioritize data integrity over product placement.",
      color: "purple"
    },
  ];

  const privacyCommitments = [
    { 
      icon: Lock, 
      title: "Local Processing", 
      description: "All calculations happen in your browser. We never see, store, or transmit your individual financial inputs to our servers.",
      highlight: "100% client-side"
    },
    { 
      icon: Users, 
      title: "No Accounts Required", 
      description: "You don't need to sign up to use our tools. No email address, no password, no profile. Just instant access to all calculators.",
      highlight: "Zero friction"
    },
    { 
      icon: Shield, 
      title: "No Data Selling", 
      description: "We do not sell your personal behavior or financial data to third parties. Our commitment to privacy is absolute.",
      highlight: "GDPR & CCPA compliant"
    },
  ];

  const teamValues = [
    { icon: Heart, value: "User-First Design" },
    { icon: Zap, value: "Fast & Efficient" },
    { icon: Scale, value: "Ethical Finance" },
    { icon: Globe, value: "Free for Everyone" },
  ];

  const milestones = [
    { year: "2020", event: "WealthPlan founded" },
    { year: "2021", event: "Launched first 5 calculators" },
    { year: "2022", event: "Reached 50K monthly users" },
    { year: "2023", event: "Added state tax support" },
    { year: "2024", event: "Mobile app beta launch" },
    { year: "2025", event: "15+ calculators & growing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <article className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="group -ml-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>
          </Button>
          
          <Badge variant="outline" className="text-sm">
            Est. 2020
          </Badge>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                About WealthPlan
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Free, accurate financial tools for every American
              </p>
            </div>
          </div>
          
          <Alert className="bg-primary/5 border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Our Promise</AlertTitle>
            <AlertDescription>
              Democratizing financial literacy through transparent, accurate, and free calculators.
            </AlertDescription>
          </Alert>
        </div>

        {/* Stats Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors text-center">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Section */}
        <Card className="mb-8 border-l-4 border-l-primary overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Our Mission</CardTitle>
                <CardDescription className="text-base">
                  Democratizing financial literacy for all Americans
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed">
                  WealthPlan exists to democratize financial literacy. Our mission is to give every American access to the same quality financial planning tools that were previously only available through expensive financial advisors or complicated, error-prone spreadsheets.
                </p>
                <p className="text-sm leading-relaxed">
                  We build free, accurate, and transparent financial calculators designed specifically for the US tax system. Every tool on WealthPlan uses the current IRS tax brackets, 401(k) contribution limits, Social Security rules, and state tax rates — so the numbers you see reflect financial reality, not just approximations.
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-5">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Our Commitment
                </h3>
                <ul className="space-y-2">
                  <li className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                    <span>Annual tax table updates every January</span>
                  </li>
                  <li className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                    <span>Real-time IRS guideline integration</span>
                  </li>
                  <li className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                    <span>State-specific tax calculations</span>
                  </li>
                  <li className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                    <span>Open methodology documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Principles Section - 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            const colorClasses = {
              green: "border-l-green-500 bg-green-500/5",
              blue: "border-l-blue-500 bg-blue-500/5",
              purple: "border-l-purple-500 bg-purple-500/5"
            }[principle.color];
            
            return (
              <Card key={index} className={`border-l-4 overflow-hidden ${colorClasses}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-full bg-${principle.color}-500/10`}>
                      <Icon className={`h-4 w-4 text-${principle.color}-600`} />
                    </div>
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Privacy Commitment */}
        <Card className="mb-8 border-l-4 border-l-blue-500 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Our Privacy Commitment</CardTitle>
                <CardDescription className="text-base">
                  Privacy isn&apos;t just a policy — it&apos;s a structural choice
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {privacyCommitments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-4">
                      <div className="mx-auto p-2 rounded-full bg-blue-500/10 w-fit mb-3">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <Badge variant="secondary" className="text-[10px]">
                        {item.highlight}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Milestones Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Our Journey
            </CardTitle>
            <CardDescription>
              Key milestones in WealthPlan&apos;s history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-bold text-primary">{milestone.year}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{milestone.event}</div>
                  {index < milestones.length - 1 && (
                    <div className="hidden md:block text-primary/30 text-xs mt-2">→</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              What Drives Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {teamValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Badge key={index} variant="secondary" className="py-2 px-3 text-sm">
                    <Icon className="h-3 w-3 mr-1" />
                    {value.value}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Why Users Trust WealthPlan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">Updated annually with IRS tax brackets and limits</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">No account required - instant access to all tools</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">100% free with no hidden premium tiers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">Client-side processing keeps your data private</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">Transparent methodology for every calculator</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">Mobile-friendly responsive design</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Resource Notice */}
        <div className="mt-8">
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Educational Resource</h3>
                  <p className="text-sm text-muted-foreground">
                    WealthPlan is an educational resource. We explain the math and the concepts so you can make more informed decisions — but we are not financial advisors, and nothing on this site should be taken as personalized financial advice. For major financial decisions, consult a licensed CFP or CPA.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}