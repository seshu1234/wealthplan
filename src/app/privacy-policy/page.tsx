import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Cookie, 
  FileText,
  Database,
  Globe,
  Settings,
  CheckCircle,
  Info,
  Mail,
  HardDrive,
  Key,
  EyeOff,
  Fingerprint,
  Bell,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Privacy Policy | WealthPlan",
  description: "WealthPlan's privacy policy explains how we protect your financial data, use cookies, and respect your privacy.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 2025";
  
  const privacyHighlights = [
    { icon: Lock, title: "Local Processing", description: "All financial calculations happen in your browser" },
    { icon: EyeOff, title: "No Data Storage", description: "We never store your financial information" },
    { icon: Shield, title: "Bank-Level Security", description: "Encrypted connections and secure hosting" },
    { icon: Settings, title: "Cookie Control", description: "You can manage preferences anytime" },
  ];

  const financialDataPoints = [
    "Income and salary information",
    "Investment account balances",
    "Debt and liability amounts",
    "Retirement savings figures",
    "Tax-related calculations",
    "Budget and expense tracking"
  ];

  const thirdPartyServices = [
    { 
      name: "Google Analytics", 
      purpose: "Aggregate usage analysis to improve our tools",
      data: "Anonymized page views, feature usage, session duration",
      icon: Eye,
      link: "https://policies.google.com/privacy"
    },
    { 
      name: "Google AdSense", 
      purpose: "Personalized advertising to keep our tools free",
      data: "Cookies, browsing behavior, ad interactions",
      icon: Cookie,
      link: "https://policies.google.com/technologies/ads"
    },
    { 
      name: "Vercel", 
      purpose: "Secure hosting and content delivery",
      data: "IP addresses, request logs, system information",
      icon: Database,
      link: "https://vercel.com/privacy"
    },
  ];

  const cookieTypes = [
    { 
      type: "Essential Cookies", 
      description: "Required for basic site functionality and security",
      examples: ["Session management", "Security tokens", "Load balancing"],
      always: true 
    },
    { 
      type: "Analytics Cookies", 
      description: "Help us understand how visitors use our site",
      examples: ["Page views", "Click tracking", "Feature usage"],
      always: false 
    },
    { 
      type: "Marketing Cookies", 
      description: "Used to deliver relevant advertisements",
      examples: ["Ad personalization", "Retargeting", "Campaign tracking"],
      always: false 
    },
    { 
      type: "Preference Cookies", 
      description: "Remember your settings and choices",
      examples: ["Theme preference", "Calculator defaults", "Language"],
      always: false 
    },
  ];

  const userRights = [
    { icon: Eye, right: "Right to Access", description: "Request a copy of your personal data" },
    { icon: Trash2, right: "Right to Deletion", description: "Request removal of your data (Right to be forgotten)" },
    { icon: Settings, right: "Right to Opt-Out", description: "Decline non-essential data collection" },
    { icon: Database, right: "Right to Portability", description: "Receive your data in a portable format" },
    { icon: Bell, right: "Right to Object", description: "Object to certain data processing" },
    { icon: Fingerprint, right: "Right to Rectification", description: "Correct inaccurate personal data" },
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
              GDPR Compliant
            </Badge>
            <Badge variant="outline" className="text-sm">
              CCPA Ready
            </Badge>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                How we protect your privacy and handle your data
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span>Last updated: {lastUpdated}</span>
            <span>•</span>
            <span>Version 2.0</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
          
          <Alert className="bg-green-500/5 border-green-500/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600 font-semibold">Privacy First Design</AlertTitle>
            <AlertDescription>
              WealthPlan is built with privacy as a core principle. Your financial data never leaves your device.
            </AlertDescription>
          </Alert>
        </div>

        {/* Privacy Highlights - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {privacyHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
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

        {/* Main Content - Vertical List */}
        <div className="space-y-8">
          {/* Section 1: Financial Data */}
          <Card className="border-l-4 border-l-green-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Your Financial Data</CardTitle>
                  <CardDescription className="text-base">
                    How we handle sensitive financial information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm leading-relaxed mb-4">
                    Any financial information you enter into our calculators is processed entirely within your browser. 
                    <strong className="text-green-600 block mt-2">This data is never transmitted to our servers</strong> 
                    and is not accessible to WealthPlan or any third party.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>100% client-side processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>No account required</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Data deleted when you close the tab</span>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm font-medium mb-3">Financial data processed locally:</p>
                  <ul className="space-y-2">
                    {financialDataPoints.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Information We Collect */}
          <Card className="border-l-4 border-l-blue-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Information We Collect</CardTitle>
                  <CardDescription className="text-base">
                    Limited non-personal data for analytics and improvement
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      Usage Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="text-xs text-muted-foreground">Pages visited</li>
                      <li className="text-xs text-muted-foreground">Time on site</li>
                      <li className="text-xs text-muted-foreground">Feature usage</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-blue-600" />
                      Technical Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="text-xs text-muted-foreground">Browser type</li>
                      <li className="text-xs text-muted-foreground">Device info</li>
                      <li className="text-xs text-muted-foreground">OS version</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      Location Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="text-xs text-muted-foreground">Country/region</li>
                      <li className="text-xs text-muted-foreground">Language preference</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Cookie Usage */}
          <Card className="border-l-4 border-l-amber-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Cookie className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Cookie Usage</CardTitle>
                  <CardDescription className="text-base">
                    How we use cookies to enhance your experience
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {cookieTypes.map((cookie, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg border">
                      <div className={`p-1 rounded-full mt-1 ${cookie.always ? 'bg-green-100 dark:bg-green-900' : 'bg-muted'}`}>
                        <div className={`h-2 w-2 rounded-full ${cookie.always ? 'bg-green-600' : 'bg-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{cookie.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cookie.description}</p>
                        <div className="mt-2">
                          <p className="text-xs font-medium">Examples:</p>
                          <ul className="text-xs text-muted-foreground list-disc list-inside">
                            {cookie.examples.map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                          </ul>
                        </div>
                        {cookie.always && (
                          <Badge variant="secondary" className="mt-2 text-xs">Always active</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Manage Cookie Preferences</AlertTitle>
                  <AlertDescription>
                    You can opt out of personalized advertising by visiting{' '}
                    <a 
                      href="https://www.google.com/settings/ads" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Ads Settings
                    </a>
                    {' '}or{' '}
                    <a 
                      href="https://www.aboutads.info" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      www.aboutads.info
                    </a>.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Third-Party Services */}
          <Card className="border-l-4 border-l-purple-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Third-Party Services</CardTitle>
                  <CardDescription className="text-base">
                    Services we use to provide and improve WealthPlan
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {thirdPartyServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{service.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Purpose</p>
                          <p className="text-sm">{service.purpose}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Data Collected</p>
                          <p className="text-sm">{service.data}</p>
                        </div>
                        <Button variant="link" size="sm" className="px-0 h-auto" asChild>
                          <a href={service.link} target="_blank" rel="noopener noreferrer">
                            View Privacy Policy →
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Your Privacy Rights */}
          <Card className="border-l-4 border-l-indigo-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <Key className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Your Privacy Rights</CardTitle>
                  <CardDescription className="text-base">
                    Depending on your location, you may have these rights
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {userRights.map((right, index) => {
                  const Icon = right.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="p-1.5 rounded-full bg-indigo-500/10">
                        <Icon className="h-3 w-3 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{right.right}</p>
                        <p className="text-xs text-muted-foreground">{right.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" size="sm">
                  Exercise Your Privacy Rights
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Security Measures */}
          <Card className="border-l-4 border-l-red-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-500/5 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Security Measures</CardTitle>
                  <CardDescription className="text-base">
                    How we protect your information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="mx-auto p-2 rounded-full bg-red-500/10 w-fit mb-3">
                    <Lock className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="font-medium text-sm">TLS 1.3 Encryption</p>
                  <p className="text-xs text-muted-foreground mt-1">All connections are encrypted</p>
                </div>
                <div className="text-center p-4">
                  <div className="mx-auto p-2 rounded-full bg-red-500/10 w-fit mb-3">
                    <Fingerprint className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="font-medium text-sm">Data Minimization</p>
                  <p className="text-xs text-muted-foreground mt-1">We collect only what&apos;s necessary</p>
                </div>
                <div className="text-center p-4">
                  <div className="mx-auto p-2 rounded-full bg-red-500/10 w-fit mb-3">
                    <Database className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="font-medium text-sm">Secure Hosting</p>
                  <p className="text-xs text-muted-foreground mt-1">Enterprise-grade infrastructure</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Do you share my financial data with third parties?",
                a: "Never. Any financial information you enter into our calculators is processed entirely within your browser. This data never touches our servers."
              },
              {
                q: "Can I opt out of cookies?",
                a: "Yes. You can manage cookie preferences through your browser settings. Essential cookies cannot be disabled as they're necessary for basic functionality."
              },
              {
                q: "How long do you keep my data?",
                a: "We don't store any personal financial data. Anonymous analytics data is retained for 26 months before automatic deletion."
              },
              {
                q: "Is my data encrypted?",
                a: "Yes. All connections to WealthPlan are encrypted using TLS 1.3. Your browser communicates with our servers securely."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-start gap-2">
                    <span className="text-primary mt-0.5">Q:</span>
                    <span>{faq.q}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">A:</span>
                    <span>{faq.a}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <Separator className="mb-8" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Privacy Questions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our privacy team is here to address any concerns about your data.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Privacy Team</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Download Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Download a copy of our privacy policy for your records.
                </p>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}