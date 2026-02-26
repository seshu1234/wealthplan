import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  Scale, 
  FileText, 
  Gavel, 
  Info,
  BookOpen,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Globe,
  Lock,
  Clock,
  Users,
  FileCheck,
  ScrollText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata = {
  title: "Terms of Service | WealthPath",
  description: "Terms and conditions for using WealthPath's financial planning tools and calculators.",
};

export default function TermsPage() {
  const lastUpdated = "January 2025";
  
  const mainSections = [
    {
      id: "license",
      title: "1. Limited License",
      icon: FileText,
      content: "WealthPath grants you a personal, non-exclusive, non-transferable, limited license to use our financial planning tools, calculators, and resources for personal, non-commercial use only. You may not reproduce, redistribute, modify, or use our tools for commercial purposes without prior written consent. Any unauthorized use automatically terminates this license."
    },
    {
      id: "responsibilities",
      title: "2. User Responsibilities",
      icon: Shield,
      content: "You are solely responsible for the accuracy, completeness, and appropriateness of any financial data you input into our calculators and planning tools. You acknowledge that the outputs generated are only as reliable as the inputs provided and should not be considered professional financial advice. You agree not to use the site in any way that could compromise security, damage functionality, or impair our services for other users."
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      icon: Scale,
      content: "All content, including but not limited to calculator algorithms, financial models, design elements, graphics, proprietary code, and written resources, is the exclusive property of WealthPath and is protected by international copyright, trademark, and intellectual property laws. You may not copy, modify, or create derivative works without express written permission."
    },
    {
      id: "disclaimer",
      title: "4. Financial Disclaimer",
      icon: Info,
      content: "Our tools are for educational and informational purposes only. The service is provided 'as is' and 'as available.' We make no warranties, expressed or implied, regarding the accuracy, reliability, or availability of the tools. We are not a registered investment advisor, and any financial projections or calculations should be verified with a qualified financial professional before making decisions."
    },
    {
      id: "governing-law",
      title: "5. Governing Law",
      icon: Gavel,
      content: "These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the appropriate courts of the United States."
    }
  ];

  const quickFacts = [
    { icon: Clock, label: "Agreement Duration", value: "Ongoing until terminated" },
    { icon: Users, label: "User Type", value: "Individual, non-commercial" },
    { icon: Globe, label: "Jurisdiction", value: "United States" },
    { icon: Lock, label: "Data Protection", value: "GDPR & CCPA compliant" },
  ];

  const prohibitedActivities = [
    "Reverse engineering our calculators",
    "Using automated tools to scrape data",
    "Misrepresenting financial projections",
    "Commercial resale of insights",
    "Uploading malicious code",
    "Impersonating other users"
  ];

  const faqs = [
    {
      question: "Can I use WealthPlan for my business?",
      answer: "Our standard license is for personal, non-commercial use only. For business or commercial use, please contact our sales team for enterprise licensing options."
    },
    {
      question: "How is my financial data protected?",
      answer: "We employ bank-level encryption and never share your personal financial data with third parties. All calculations are performed securely in your browser or on encrypted servers."
    },
    {
      question: "What happens if I violate the terms?",
      answer: "We reserve the right to terminate access immediately for any violations. Serious breaches may result in legal action to protect our intellectual property and user community."
    },
    {
      question: "Can I modify or redistribute your calculators?",
      answer: "No, our calculators and tools are proprietary. You may not modify, distribute, or create derivative works without explicit written permission."
    }
  ];

  const keyPolicies = [
    {
      title: "Acceptable Use",
      icon: CheckCircle,
      items: ["Personal financial planning", "Educational purposes", "Non-commercial research"]
    },
    {
      title: "Prohibited Use",
      icon: AlertCircle,
      items: prohibitedActivities.slice(0, 3)
    },
    {
      title: "Data Rights",
      icon: FileCheck,
      items: ["You own your data", "We protect your privacy", "Opt-out available anytime"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <article className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
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
              v2.0.0
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Last Updated: {lastUpdated}
            </Badge>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <ScrollText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Please read these terms carefully before using WealthPlan
              </p>
            </div>
          </div>
          
          <Alert className="mt-6 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Important Notice</AlertTitle>
            <AlertDescription>
              By accessing and using WealthPlan&apos;s financial planning tools, you accept and agree to be bound by these terms and provisions. These terms create a legally binding agreement between you and WealthPlan.
            </AlertDescription>
          </Alert>
        </div>

        {/* Quick Facts Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickFacts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <Card key={index} className="bg-primary/5 border-primary/10">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{fact.label}</p>
                      <p className="text-sm font-semibold">{fact.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="terms" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="policies">Key Policies</TabsTrigger>
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            {/* Two-column layout for main sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {mainSections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card 
                    key={section.id} 
                    className="overflow-hidden border-l-4 border-l-primary/20 hover:border-l-primary transition-all hover:shadow-lg"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed text-foreground/80">
                        {section.content}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="policies">
            {/* Three-column layout for policies */}
            <div className="grid md:grid-cols-3 gap-6">
              {keyPolicies.map((policy, index) => {
                const Icon = policy.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{policy.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {policy.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Common Questions About Our Terms
                </CardTitle>
                <CardDescription>
                  Find quick answers to frequently asked questions about our terms of service
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Prohibited Activities Section - Two columns */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Strictly Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {prohibitedActivities.map((activity, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-destructive mt-1">✕</span>
                    <span className="text-muted-foreground">{activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-500/5 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-green-600">
                <BookOpen className="h-5 w-5" />
                Permitted Educational Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="text-sm flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-muted-foreground">Personal financial planning and education</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-muted-foreground">Classroom demonstrations with proper attribution</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-muted-foreground">Non-commercial research and analysis</span>
                </li>
                <li className="text-sm flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-muted-foreground">Sharing results with personal financial advisors</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information - Three columns */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Your Privacy Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Review our comprehensive privacy practices to understand how we protect your financial data.
              </p>
              <Button variant="outline" asChild size="sm">
                <Link href="/privacy">Read Privacy Policy →</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                Questions?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Our legal team is here to help clarify any terms or conditions.
              </p>
              <Button variant="outline" asChild size="sm">
                <Link href="/contact">Contact Support →</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <Separator className="my-8" />
          
          <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Acceptance of Terms</p>
                <p className="text-sm text-muted-foreground">
                  By continuing to use WealthPlan, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}