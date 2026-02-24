import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Contact WealthPath",
  description: "Get in touch with WealthPath for calculator feedback, suggestions, or business inquiries.",
};

export default function ContactPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-muted-foreground hover:text-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <div className="space-y-4 mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground">We respond to all inquiries within 2–3 business days.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[hsl(var(--accent-brand))]">
          <section>
            <h2>How We Can Help</h2>
            <p>We value your feedback and are committed to maintaining the highest level of accuracy for our users.</p>
            
            <p>
              <strong>Calculator Feedback:</strong> Notice a discrepancy? Please share the calculator name, your inputs, and the expected result. Our team will investigate and verify data against current IRS guidelines.
            </p>
            
            <p>
              <strong>Feature Requests:</strong> Is there a specific financial scenario we don't cover yet? We're actively expanding our toolkit and would love to hear your ideas.
            </p>
            
            <p>
              <strong>Expectations:</strong> We are a small team of financial enthusiasts. We typically respond to inquiry within <strong>2–3 business days</strong>.
            </p>
            
            <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-slate-400 p-4 mt-8 rounded-r">
              <p className="text-sm m-0 italic text-muted-foreground">
                <strong>Please Note:</strong> We are unable to provide personalized financial, tax, or investment advice. For specific guidance, please consult 
                a licensed professional.
              </p>
            </div>
          </section>
        </div>

        <div>
          <form className="space-y-6 bg-muted/30 p-8 rounded-xl border" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Your name" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <select 
                id="subject" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option>General Inquiry</option>
                <option>Report an Issue</option>
                <option>Suggest a Calculator</option>
                <option>Business/Partnership</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="How can we help?" className="min-h-[150px]" />
            </div>
            
            <Button type="submit" className="w-full">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
