"use client";

import { motion } from "framer-motion";
import { Calculator, MousePointerClick, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: <Calculator className="h-10 w-10 text-[hsl(var(--accent-brand))]" />,
    title: "1. Choose a Tool",
    description: "Select from 15+ specialized financial calculators for your specific need.",
  },
  {
    icon: <MousePointerClick className="h-10 w-10 text-[hsl(var(--accent-brand))]" />,
    title: "2. Input Your Data",
    description: "Enter your numbers securely. Your data never leaves your browser.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-[hsl(var(--accent-brand))]" />,
    title: "3. See Your Future",
    description: "Get instant, US tax-accurate projections and beautiful charts.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">How WealthPath Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Plan your financial future in three simple steps.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative z-10">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-2">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-[6.5rem] left-[15%] right-[15%] h-0.5 bg-border z-0" />
        </motion.div>
      </div>
    </section>
  );
}
