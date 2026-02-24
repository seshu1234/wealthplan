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
          <h2>Get in Touch</h2>
          <p>Have a question about one of our calculators? Found an error in our data? Want to suggest a new tool? We would love to hear from you.</p>
          
          <p>
            <strong>For calculator accuracy issues:</strong> Please describe the calculation that seems incorrect, the inputs you used, and what result you expected. We take accuracy seriously and will investigate every report.
          </p>
          
          <p>
            <strong>For content suggestions:</strong> We are always looking to add tools that genuinely help people. If there is a calculator you wish existed, let us know.
          </p>
          
          <p>
            <strong>For business inquiries:</strong> For partnership, advertising, or press inquiries, please use the contact form.
          </p>
          
          <p className="text-sm italic text-muted-foreground mt-8">
            Note: We are unable to provide personalized financial advice. For questions about your specific financial situation, please consult a licensed financial advisor.
          </p>
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
