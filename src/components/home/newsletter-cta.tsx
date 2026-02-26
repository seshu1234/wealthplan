"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-[hsl(var(--accent-brand))] text-[hsl(var(--accent-brand-foreground))] px-6 py-16 sm:px-12 sm:py-20 text-center shadow-xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
            <div className="w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
            <div className="w-64 h-64 rounded-full bg-black/10 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Join 10,000+ Wealth Architects
            </h2>
            <p className="opacity-90 text-lg md:text-xl leading-relaxed font-medium">
              Get one actionable financial blueprint delivered to your inbox each week. No fluff—just the math and methods that build lasting wealth.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-white/10 border-black/20  placeholder:/50 h-12 focus-visible:ring-white"
                required
              />
              <Button type="submit" size="lg" className="">
                Subscribe <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs /60">We respect your inbox. Unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
