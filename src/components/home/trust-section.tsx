"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { value: 15, label: "Free Financial Tools", suffix: "+" },
  { value: 0, label: "Data Stored on Servers", suffix: "" },
  { value: 100, label: "US Federal Tax Rules", suffix: "%" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 2000;
    const incrementTime = (totalDuration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-bold tabular-nums text-[hsl(var(--accent-brand))]">
      {count}{suffix}
    </span>
  );
}

export function TrustSection() {
  return (
    <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight">Financial Confidence, Built In</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We update our logic and tax tables every January. Outdated math produces wrong answers — and wrong answers cost you real money. We ensure your roadmap is accurate and your privacy is absolute.
            </p>
            <ul className="space-y-3">
              {[
                "Absolute Privacy: No accounts, no identity tracking.",
                "Sovereign Data: Your finances never leave your device.",
                "US-Specific Logic: IRS-aligned math for local precision."
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--accent-brand))]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center space-y-2 h-40"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
