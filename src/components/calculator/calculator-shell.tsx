import { ReactNode } from "react";
import { AffiliateCTA } from "@/components/calculator/affiliate-cta";

interface CalculatorShellProps {
  title: string;
  description: string;
  children: ReactNode; // inputs + results + chart + seo + faq
  affiliateCta?: ReactNode;
}

export function CalculatorShell({
  title,
  description,
  children,
  affiliateCta
}: CalculatorShellProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* 2. Content Injection (Calculator layout, Input, Charts) */}
      <div className="space-y-8">
        {children}
      </div>

      {/* 3. Affiliate CTA */}
      {affiliateCta || <AffiliateCTA />}
    </div>
  );
}
