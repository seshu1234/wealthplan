"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  Send, 
  Mail, 
  Clock, 
  MessageSquare,
  HelpCircle,
  Bug,
  Lightbulb,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Building2,
  Users,
  FileText,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    calculatorName: "",
    message: "",
    urgency: "normal"
  });

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "issue", label: "Report an Issue", icon: Bug },
    { value: "suggestion", label: "Suggest a Calculator", icon: Lightbulb },
    { value: "calculator-feedback", label: "Calculator Feedback", icon: FileText },
    { value: "partnership", label: "Business/Partnership", icon: Briefcase },
    { value: "enterprise", label: "Enterprise Licensing", icon: Building2 },
  ];

  const quickContacts = [
    { icon: Mail, label: "Email Support", value: "support@wealthplan.com", href: "mailto:support@wealthplan.com" },
    { icon: Clock, label: "Response Time", value: "2-3 business days" },
    { icon: Users, label: "Team Size", value: "Dedicated support team" },
    { icon: Calendar, label: "Hours", value: "Mon-Fri, 9am-6pm EST" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      inquiryType: "general",
      calculatorName: "",
      message: "",
      urgency: "normal"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

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
          
          <Badge variant="outline" className="text-sm">
            Support Available
          </Badge>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                We&apos;re here to help with your financial planning journey
              </p>
            </div>
          </div>
          
          <Alert className="bg-primary/5 border-primary/20">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Quick Response Guarantee</AlertTitle>
            <AlertDescription>
              We respond to all inquiries within 2-3 business days. For urgent matters, please mark your message as urgent.
            </AlertDescription>
          </Alert>
        </div>

        {/* Quick Contact Info - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickContacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <Card key={index} className="bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                      {contact.href ? (
                        <a href={contact.href} className="text-sm font-semibold hover:text-primary transition-colors">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold">{contact.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content - Two columns */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  How We Can Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Calculator Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        Notice a discrepancy? Share the calculator name and your inputs. We verify against current IRS guidelines.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Feature Requests</h3>
                      <p className="text-sm text-muted-foreground">
                        Is there a financial scenario we don&apos;t cover? We&apos;re actively expanding and value your ideas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Partnerships</h3>
                      <p className="text-sm text-muted-foreground">
                        Interested in integrating our calculators or enterprise licensing? Let&apos;s talk.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-500/5 border-amber-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We are unable to provide personalized financial, tax, or investment advice. 
                  For specific guidance, please consult a licensed professional.
                </p>
                <Separator className="my-4" />
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Licensed professionals available for referrals</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Common Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Retirement Planning</Badge>
                  <Badge variant="secondary">Tax Calculators</Badge>
                  <Badge variant="secondary">Investment Returns</Badge>
                  <Badge variant="secondary">Mortgage</Badge>
                  <Badge variant="secondary">Savings Goals</Badge>
                  <Badge variant="secondary">Budgeting</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within 2-3 business days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <select 
                      id="inquiryType" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.inquiryType === "calculator-feedback" && (
                    <div className="space-y-2">
                      <Label htmlFor="calculatorName">Calculator Name</Label>
                      <Input 
                        id="calculatorName" 
                        placeholder="e.g., Retirement Calculator" 
                        value={formData.calculatorName}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide as much detail as possible..." 
                      className="min-h-[150px]" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency Level</Label>
                    <RadioGroup 
                      defaultValue="normal" 
                      className="flex gap-4"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal">Normal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="text-amber-600">Urgent</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message 
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-12">
          <Separator className="mb-8" />
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Us Directly</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Prefer traditional email?
                </p>
                <a href="mailto:support@wealthplan.com" className="text-primary hover:underline text-sm">
                  support@wealthplan.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Chat with our support team
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Help Center</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Find answers quickly
                </p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href="/faq">View FAQs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}