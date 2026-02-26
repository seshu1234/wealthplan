"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, a 401(k) calculator that actually factor in the current IRS contribution limits and catch-up rules. Incredibly useful.",
    author: "David M.",
    role: "Software Engineer",
  },
  {
    quote: "The visual charts on the compound interest calculator helped me convince my partner we need to start investing today.",
    author: "Sarah J.",
    role: "Small Business Owner",
  },
  {
    quote: "I love that I don't have to create an account or give away my email just to run some quick mortgage numbers.",
    author: "Michael T.",
    role: "First-time Homebuyer",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight">Trusted by Planners</h2>
          <p className="text-muted-foreground mt-4">See how others are using Wealthplan to plan their financial independence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-muted/20 border-border/50">
                <CardContent className="p-8 flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-[hsl(var(--accent-brand))]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-foreground italic">&quot;{t.quote}&quot;</p>
                  </div>
                  <div className="mt-8">
                    <p className="font-semibold text-foreground">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
