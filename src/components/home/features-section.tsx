import { ShieldCheck, TrendingUp, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-[hsl(var(--accent-brand))]" />,
    title: "US Tax Rules Built-In",
    description: "Our calculators are hardcoded with the latest IRS tax brackets, standard deductions, and retirement contribution limits (401k, IRA, HSA) for precise US-focused results.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-[hsl(var(--accent-brand))]" />,
    title: "100% Free & Private",
    description: "No accounts, no paywalls, and no data tracking. All calculations happen locally in your browser so your financial data never leaves your device.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-[hsl(var(--accent-brand))]" />,
    title: "Educational Insights",
    description: "More than just numbers. Every calculator comes with step-by-step methodology explaining exactly how the math works and how you can optimize your finances.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto border-t border-border/40">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Why Choose Wealthplan?</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Built specifically for the American tax system and financial landscape, our tools aim to provide the most accurate projections available online.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <Card key={idx} className="bg-transparent border-none shadow-none text-center">
            <CardHeader className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-muted rounded-full">
                {feature.icon}
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
