import { ShieldCheck, TrendingUp, BookOpen } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Intelligence for Agency",
    description: "Built to educate, not advise. Our IRS-aware math helps you understand the 'Why' behind every scenario, empowering you to make informed independent choices.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "100% Data Sovereignty",
    description: "Privacy by design. Every calculation happens locally on your device. No accounts, no data sales—your financial simulations belong to you and you alone.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Precision Education",
    description: "Beyond basic tools. We provide the technical infrastructure to simulate real-world impacts of inflation, taxes, and debt on your long-term legacy.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Wealthplan?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Built specifically for accuracy in the American financial landscape, our engines provide high-fidelity simulations for informed human agency.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-xl border bg-muted/30 space-y-4 hover:bg-muted/50 transition-colors shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm italic font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
