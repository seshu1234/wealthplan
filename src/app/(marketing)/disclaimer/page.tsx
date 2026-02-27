import Link from "next/link";
import { 
  ArrowLeft, 
  Scale, 
  DollarSign,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  BookOpen,
  Gavel,
  TrendingUp,
  Calculator,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata = {
  title: "Disclaimer | WealthPlan",
  description: "Important financial disclaimers for using WealthPlan calculators and tools. Educational purposes only, not financial advice.",
};

export default function DisclaimerPage() {
  const lastUpdated = "January 2025";
  
  const disclaimerHighlights = [
    { icon: BookOpen, title: "Educational Only", description: "Tools for learning and modeling" },
    { icon: TrendingUp, title: "Not Investment Advice", description: "No personalized recommendations" },
    { icon: Calculator, title: "Estimates Only", description: "Results may vary from actual" },
    { icon: Shield, title: "Verify With Professionals", description: "Always consult qualified experts" },
  ];

  const keyPoints = [
    "Results are hypothetical and for illustrative purposes only",
    "Past performance does not guarantee future results",
    "Tax laws change and may vary by jurisdiction",
    "Your personal situation may differ from assumptions",
    "Always verify critical figures with official sources"
  ];

  const affiliatePartners = [
    { name: "Betterment", type: "Investment platform" },
    { name: "TurboTax", type: "Tax preparation" },
    { name: "Mint", type: "Budgeting tool" },
    { name: "Personal Capital", type: "Wealth management" },
  ];

  const professionalTypes = [
    { title: "Certified Financial Planner (CFP)", icon: Scale },
    { title: "Certified Public Accountant (CPA)", icon: FileText },
    { title: "Tax Attorney", icon: Gavel },
    { title: "Investment Advisor (RIA)", icon: TrendingUp },
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
          
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm">
              Last Updated: {lastUpdated}
            </Badge>
            <Badge variant="destructive" className="text-sm">
              Must Read
            </Badge>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight uppercase leading-none">
                Educational <span className="text-primary italic">Guardrails</span>
              </h1>
              <p className="text-muted-foreground mt-2 text-lg italic font-medium">
                Technology for agency, not financial advisory.
              </p>
            </div>
          </div>
          
          <Alert className="bg-muted/50 border-primary/20 rounded-2xl p-6">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-black uppercase tracking-widest text-xs mb-1">
              Mission Statement: Educational Technology
            </AlertTitle>
            <AlertDescription className="text-muted-foreground text-sm italic leading-relaxed">
              WealthPath is a pure-play technology platform. Our mission is to democratize financial literacy by providing high-precision tools and simulations. We are <strong>not</strong> a regulated financial advisory, we do <strong>not</strong> provide personalized investment advice, and we do <strong>not</strong> act as a fiduciary.
            </AlertDescription>
          </Alert>
        </div>

        {/* Highlights - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {disclaimerHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 rounded-full bg-amber-500/10">
                      <Icon className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{highlight.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{highlight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content - Vertical Sections */}
        <div className="space-y-8">
          {/* Section 1: Financial Disclaimer */}
          <Card className="border-l-4 border-l-red-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2 italic uppercase font-black">Educational Mission</CardTitle>
                  <CardDescription className="text-base italic">
                    Technology built for human agency
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    The calculators and content on WealthPlan are provided as software tools to help you model various financial scenarios. They are <strong className="text-red-600">informational and educational only</strong>.
                  </p>
                  <p className="text-sm leading-relaxed">
                    WealthPlan is not a financial advisor, tax professional, or broker. The results produced are estimates based on your inputs and current tax laws, but they cannot account for your specific financial situation. Actual results will vary.
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-5 border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Key Points to Remember
                  </h3>
                  <ul className="space-y-2">
                    {keyPoints.map((point, index) => (
                      <li key={index} className="text-xs flex items-start gap-2">
                        <span className="text-red-600 mt-1">•</span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Affiliate & Advertising Disclosure */}
          <Card className="border-l-4 border-l-blue-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <ExternalLink className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Affiliate & Advertising Disclosure</CardTitle>
                  <CardDescription className="text-base">
                    How we keep our tools free
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm leading-relaxed mb-4">
                    WealthPlan is supported by advertising and affiliate relationships. We may earn a commission when you click on links or sign up for services mentioned on this site.
                  </p>
                  <p className="text-sm leading-relaxed">
                    This compensation allows us to keep our calculators free for everyone. However, our reviews and calculations remain objective and are based on the mathematical models described in our methodology sections.
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-5">
                  <h3 className="font-semibold text-sm mb-3">Our Affiliate Partners</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {affiliatePartners.map((partner, index) => (
                      <div key={index} className="bg-background rounded p-2 text-center border">
                        <p className="font-medium text-xs">{partner.name}</p>
                        <p className="text-[10px] text-muted-foreground">{partner.type}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3 italic">
                    *We only partner with reputable financial services companies
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Limitation of Liability */}
          <Card className="border-l-4 border-l-purple-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Limitation of Liability</CardTitle>
                  <CardDescription className="text-base">
                    Legal protections and your responsibilities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-6 mb-4">
                <p className="text-sm leading-relaxed">
                  By using this site, you agree that WealthPlan and its developers are not liable for any financial losses or damages resulting from the use of our tools.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-destructive/5 border-destructive/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      What You Should NOT Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-destructive mt-1">✕</span>
                        <span>Make major financial decisions solely based on calculators</span>
                      </li>
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-destructive mt-1">✕</span>
                        <span>Use results for legal or tax filing without verification</span>
                      </li>
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-destructive mt-1">✕</span>
                        <span>Assume projections are guaranteed returns</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/5 border-green-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      What You SHOULD Do
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Consult with a Certified Financial Planner (CFP)</span>
                      </li>
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Verify with a tax professional (CPA) before filing</span>
                      </li>
                      <li className="text-xs flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span>Cross-reference with official sources like IRS.gov</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Data Accuracy */}
          <Card className="border-l-4 border-l-green-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Data Accuracy</CardTitle>
                  <CardDescription className="text-base">
                    Our commitment to reliable information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm leading-relaxed mb-4">
                    We strive for 100% accuracy and update our tax tables annually. However, tax laws change and errors can occur. Always cross-reference important figures with official sources.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer">
                      Visit IRS.gov
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-xs">Annual updates for tax brackets and limits</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-xs">Verified against official government sources</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-xs">State tax rates may vary - verify locally</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Professional Consultation */}
          <Card className="border-l-4 border-l-amber-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Scale className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">When to Consult a Professional</CardTitle>
                  <CardDescription className="text-base">
                    Situations requiring expert advice
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-3">
                {professionalTypes.map((prof, index) => {
                  const Icon = prof.icon;
                  return (
                    <Card key={index} className="text-center">
                      <CardContent className="pt-4">
                        <div className="mx-auto p-2 rounded-full bg-amber-500/10 w-fit mb-2">
                          <Icon className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="font-medium text-xs">{prof.title}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                These professionals can provide personalized advice based on your complete financial picture
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Summary Card */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-amber-500/10 via-transparent to-transparent border-amber-500/30">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">In Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    WealthPlan provides powerful tools for financial education and scenario modeling. 
                    However, they are not a substitute for professional advice. 
                    <strong className="block mt-2">
                      Always consult with qualified professionals before making significant financial decisions.
                    </strong>
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