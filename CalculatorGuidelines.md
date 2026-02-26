# WealthPath — Calculator Page Build Guidelines for AI Agents

**Read this entire file before writing a single line of calculator code.**

---

## What a Calculator Page Is

A calculator page is NOT just a form. It is a complete, self-contained financial tool that includes:

- Interactive inputs
- Computed results with charts
- AI-generated insight
- Affiliate recommendation
- SEO content article
- FAQ section

Every calculator page must be able to stand alone as a high-quality resource. A user landing on `/calculators/mortgage-calculator` from Google should find everything they need on that single page.

---

## File Structure for Every Calculator

Each calculator lives in its own folder. No exceptions.

```
src/app/calculators/[slug]/
├── page.tsx                  ← Next.js page, imports the calculator component
└── content.tsx               ← SEO content, FAQ — static, not interactive

src/components/calculators/[slug]/
├── [slug]-calculator.tsx     ← Main component (assembles all parts)
├── [slug]-inputs.tsx         ← Input panel only
├── [slug]-results.tsx        ← Results panel only
└── [slug]-chart.tsx          ← Chart only

src/lib/calculations/
└── [slug].ts                 ← Pure math functions, NO React, NO imports from components
```

**Why this separation matters:**

- Math logic in `lib/calculations/` can be unit tested without rendering anything
- Input/results/chart components can be developed and tested independently
- The page file stays clean — it just composes everything together

---

## The Calculator Shell

Every calculator page uses `<CalculatorShell>` as its wrapper. This component provides consistent layout, spacing, and the SEO content zone. Never build a calculator page without it.

```tsx
// src/app/calculators/mortgage-calculator/page.tsx
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { MortgageCalculator } from "@/components/calculators/mortgage/mortgage-calculator";
import { MortgageContent } from "./content";

export const metadata = {
  title: "Mortgage Calculator (2025) — WealthPath",
  description:
    "Calculate your monthly mortgage payment including principal, interest, taxes, and insurance. See full amortization schedule and compare 15 vs 30 year loans.",
};

export default function MortgageCalculatorPage() {
  return (
    <CalculatorShell
      title="Mortgage Calculator"
      description="Calculate your monthly payment, total interest, and full amortization schedule."
      content={<MortgageContent />}
    >
      <MortgageCalculator />
    </CalculatorShell>
  );
}
```

---

## Page Layout — Non-Negotiable Order

Every calculator page renders sections in this exact order. Do not rearrange.

```
1.  Page H1 + description                    ← from CalculatorShell props
2.  Calculator card
    ├── Left: Input panel
    └── Right: Results panel
3.  Chart card                               ← Recharts visualization
4.  AI Insight card                          ← Dynamic text from API
5.  Affiliate CTA card                       ← Contextual product recommendation
6.  SEO content article                      ← Static, 800–1200 words
7.  FAQ accordion                            ← 4–6 questions
8.  Related calculators                      ← 3 links
```

If a calculator doesn't have a chart yet, show a placeholder card with "Chart coming soon" — never skip the slot.

---

## Input Panel Rules

### Every input field must have:

1. A `<Label>` above it with the exact field name
2. A helper text line below it (12px, muted color) explaining what to enter
3. Appropriate input type (number, select, slider)
4. Sensible default values pre-filled on load
5. Input validation (no negatives, no values above realistic limits)

### Currency inputs

Always show a `$` prefix inside the input. Never let users type "$" themselves.

```tsx
<div className="space-y-2">
  <Label htmlFor="home-price">Home Price</Label>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
      $
    </span>
    <Input
      id="home-price"
      type="number"
      value={homePrice}
      onChange={(e) => setHomePrice(Number(e.target.value))}
      className="pl-7"
      min={0}
      max={10000000}
    />
  </div>
  <p className="text-xs text-muted-foreground">
    Total purchase price of the home
  </p>
</div>
```

### Percentage inputs

Show `%` suffix. Use a Slider paired with a visible number — never a slider alone.

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label>Down Payment</Label>
    <span className="text-sm font-semibold tabular-nums text-foreground">
      {downPayment}%
    </span>
  </div>
  <Slider
    value={[downPayment]}
    onValueChange={([v]) => setDownPayment(v)}
    min={3}
    max={50}
    step={1}
  />
  <p className="text-xs text-muted-foreground">
    Minimum 3.5% for FHA loans, 20% avoids PMI
  </p>
</div>
```

### Select / Dropdown inputs

Use shadcn `<Select>` for any field with fixed options (state, filing status, loan term, compounding frequency).

```tsx
<div className="space-y-2">
  <Label>Filing Status</Label>
  <Select value={filingStatus} onValueChange={setFilingStatus}>
    <SelectTrigger>
      <SelectValue placeholder="Select filing status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="single">Single</SelectItem>
      <SelectItem value="married_joint">Married Filing Jointly</SelectItem>
      <SelectItem value="married_separate">
        Married Filing Separately
      </SelectItem>
      <SelectItem value="head_of_household">Head of Household</SelectItem>
    </SelectContent>
  </Select>
  <p className="text-xs text-muted-foreground">Your IRS tax filing status</p>
</div>
```

### Default values

Every calculator must have sensible defaults that produce a meaningful result on first load — never show empty/zero results.

| Calculator        | Key defaults                                                     |
| ----------------- | ---------------------------------------------------------------- |
| Mortgage          | $400,000 home, 20% down, 7.0% rate, 30 years                     |
| 401k              | $70,000 salary, 10% contribution, 4% match, 7% return, 30 years  |
| Compound interest | $10,000 principal, 8% rate, 30 years, monthly                    |
| Debt payoff       | Pre-fill with 3 example debts                                    |
| Retirement        | Age 35, $50,000 saved, 10% contribution, 7% return, retire at 65 |

---

## Results Panel Rules

### Result cards

Each key metric gets its own result card. 2–4 cards maximum in the primary result grid.

```tsx
// Pattern for every result card
<div className="rounded-xl bg-muted/50 border border-border p-4 space-y-1">
  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
    Monthly Payment
  </p>
  <p className="text-3xl font-bold tabular-nums text-foreground">
    {formatCurrency(monthlyPayment)}
  </p>
  <p className="text-xs text-muted-foreground">Principal + interest only</p>
</div>
```

### Positive vs negative values

- Positive outcomes (savings, returns, wealth): use `text-[hsl(var(--brand))]` (brand green)
- Negative outcomes (debt, interest paid, taxes owed): use `text-destructive`
- Neutral metrics: use `text-foreground`

### Always use `tabular-nums`

Every number that changes dynamically must have `tabular-nums` class. This prevents layout shift when numbers change length.

### Number formatting

**Never format numbers inline.** Always use the formatters from `lib/format.ts`:

```typescript
formatCurrency(1247000); // → "$1,247,000"
formatCurrencyFull(1247.5); // → "$1,247.50"
formatPercent(8.5); // → "8.5%"
formatNumber(1247000); // → "1,247,000"
formatCompact(1247000); // → "1.2M"
```

### Recalculation behavior

Results must update in real time as inputs change — no "Calculate" button needed. Use `useMemo` for expensive calculations to avoid unnecessary recomputes.

```tsx
const results = useMemo(() => {
  return calculateMortgage({ homePrice, downPayment, interestRate, loanTerm });
}, [homePrice, downPayment, interestRate, loanTerm]);
```

---

## Chart Rules

### Every calculator must have at least one chart.

No exceptions. If the math produces a single number, show how that number builds over time.

### Chart library

Recharts only. No Chart.js, no D3 directly, no other charting libraries.

### Chart types by calculator type

| Calculator type              | Chart type     | Why                         |
| ---------------------------- | -------------- | --------------------------- |
| Compound growth / retirement | Area chart     | Shows exponential curve     |
| Debt payoff                  | Line chart     | Shows declining balance     |
| Budget / allocation          | Donut chart    | Shows proportions           |
| Comparison (15yr vs 30yr)    | Grouped bar    | Side-by-side contrast       |
| Amortization                 | Stacked bar    | Principal vs interest split |
| Tax breakdown                | Horizontal bar | Category comparison         |

### Chart colors

Always use the constants from `lib/chart-colors.ts`. Never hardcode hex values in chart components.

```tsx
const { resolvedTheme } = useTheme()
const colors = resolvedTheme === "dark" ? CHART_COLORS_DARK : CHART_COLORS

// Then in chart:
<Area dataKey="balance" fill={colors.primary} stroke={colors.primary} />
<Area dataKey="contributions" fill={colors.secondary} stroke={colors.secondary} />
```

### Chart data format

Compute chart data inside the calculation function, not inside the component.

```typescript
// lib/calculations/compound-interest.ts
export function calculateCompoundInterest(inputs) {
  // ...math...

  const chartData = Array.from({ length: inputs.years }, (_, i) => ({
    year: i + 1,
    balance: Math.round(balanceAtYear(i + 1)),
    contributions: Math.round(
      inputs.principal + inputs.monthlyContribution * 12 * (i + 1),
    ),
    interest: Math.round(balanceAtYear(i + 1) - contributions),
  }));

  return { finalBalance, totalInterest, totalContributions, chartData };
}
```

### Tooltip

Every chart must have a custom tooltip. No default Recharts tooltip.

```tsx
// components/calculator/chart-tooltip.tsx
// Reusable component — use on every chart
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card shadow-lg p-3 text-sm space-y-1">
      <p className="font-semibold text-foreground">Year {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}
```

### Chart responsiveness

Always wrap charts in a `<ResponsiveContainer width="100%" height={300}>`. Never hardcode pixel dimensions.

---

## AI Insight Card

Every calculator gets an AI insight card below the chart. This is the most important differentiator.

### What it does

Takes the calculator inputs + results, sends them to the Anthropic API, streams a 2–4 sentence personalized interpretation.

### Prompt structure (for the API call)

```typescript
const prompt = `
You are a helpful US financial calculator assistant on WealthPath.
A user just calculated their mortgage payment. Here are their inputs and results:

Inputs:
- Home price: ${formatCurrency(homePrice)}
- Down payment: ${downPayment}% (${formatCurrency(downPaymentAmount)})
- Interest rate: ${interestRate}%
- Loan term: ${loanTerm} years

Results:
- Monthly payment (P+I): ${formatCurrency(monthlyPayment)}
- Total interest paid: ${formatCurrency(totalInterest)}
- Total cost of loan: ${formatCurrency(totalCost)}

Write 2–4 sentences interpreting these results for this specific user.
- Mention one specific insight about their numbers (good or concerning)
- Mention one actionable tip relevant to their situation
- Keep it under 80 words
- Do not use generic phrases like "great job" or "it's important to"
- Do not give personalized financial advice — frame as educational insight
- Write in second person ("your payment", "you would")
`;
```

### UI pattern for the AI insight card

```tsx
<Card className="border border-border shadow-none rounded-xl">
  <CardContent className="p-5">
    <div className="flex items-center gap-2 mb-3">
      <Sparkles className="h-4 w-4 text-primary" />
      <p className="text-sm font-semibold text-foreground">AI Insight</p>
      <Badge variant="outline" className="text-[10px] ml-auto">
        Powered by Claude
      </Badge>
    </div>
    {isLoading ? (
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    ) : (
      <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
    )}
  </CardContent>
</Card>
```

### When to call the API

Call the AI insight API when:

- User has not changed inputs for 800ms (debounce) — not on every keystroke
- All required inputs have valid, non-zero values

Do not call the API if any required input is zero or empty.

---

## Affiliate CTA Rules

Every calculator has one affiliate CTA card placed after the AI insight.

### Placement

After AI insight, before the SEO content article. One card only — never more than one affiliate recommendation per calculator page.

### Mapping (calculator → affiliate)

```typescript
// config/affiliates.ts
export const AFFILIATE_MAP = {
  "mortgage-calculator": {
    headline: "Ready to compare real mortgage rates?",
    subline: "Get personalized quotes from multiple lenders in minutes.",
    cta: "Compare Rates",
    href: "/go/lendingtree",
    partner: "LendingTree",
  },
  "401k-calculator": {
    headline: "Ready to open or optimize your 401(k)?",
    subline: "Fidelity offers zero-fee index funds and no account minimums.",
    cta: "Open Account",
    href: "/go/fidelity",
    partner: "Fidelity",
  },
  "compound-interest": {
    headline: "Put compound interest to work today.",
    subline: "High-yield savings accounts are currently paying 4.5–5%.",
    cta: "View Top Rates",
    href: "/go/ally",
    partner: "Ally Bank",
  },
  // ... one entry per calculator
};
```

### Affiliate CTA component pattern

```tsx
<Card className="border border-[hsl(var(--brand))] bg-[hsl(var(--brand-muted))] shadow-none rounded-xl">
  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div className="space-y-1">
      <p className="font-semibold text-sm text-foreground">
        {affiliate.headline}
      </p>
      <p className="text-xs text-muted-foreground">{affiliate.subline}</p>
    </div>
    <Button size="sm" className="shrink-0" asChild>
      <a
        href={affiliate.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {affiliate.cta} →
      </a>
    </Button>
  </CardContent>
</Card>
```

---

## Comparison Tab Pattern

Calculators with two scenarios (Roth vs Traditional, 15yr vs 30yr, Snowball vs Avalanche) must use the Tabs component — not two separate sections.

```tsx
<Tabs defaultValue="scenario-a">
  <TabsList className="w-full grid grid-cols-2">
    <TabsTrigger value="scenario-a">30-Year Loan</TabsTrigger>
    <TabsTrigger value="scenario-b">15-Year Loan</TabsTrigger>
  </TabsList>
  <TabsContent value="scenario-a">
    <ResultGrid results={thirtyYearResults} />
  </TabsContent>
  <TabsContent value="scenario-b">
    <ResultGrid results={fifteenYearResults} />
  </TabsContent>
</Tabs>
```

---

## Performance Rules

The old codebase had pages loading 600–750 kB. This must not happen again.

**Bundle size limits:**

- Target First Load JS per calculator page: under 250 kB
- Never import an entire library for one function
- Use dynamic imports for heavy components (charts, PDF export)

```tsx
// Dynamic import for PDF export — don't load until user clicks
const PDFExport = dynamic(() => import("@/components/calculator/pdf-export"), {
  ssr: false,
  loading: () => <Button disabled>Preparing PDF...</Button>,
});
```

**Never import:**

- The entire `date-fns` library — import individual functions
- `lodash` — use native JS equivalents
- Any chart library except Recharts
- Any UI library except shadcn/ui

---

## Accessibility Rules

Every calculator must meet these minimum requirements:

- Every input has a `<Label>` with matching `htmlFor` / `id`
- Every icon-only button has `aria-label`
- Color is never the only indicator of meaning (use text labels alongside colored result cards)
- All interactive elements are keyboard-navigable
- Chart containers have `role="img"` and `aria-label` describing the chart

---

## Calculator Build Checklist

Before marking any calculator as done, verify every item:

**Inputs:**

- [ ] All inputs have Label + helper text
- [ ] Currency inputs have $ prefix
- [ ] Percentage inputs have % suffix + Slider
- [ ] Select inputs use shadcn Select
- [ ] Sensible defaults pre-filled
- [ ] Inputs validate (no negatives, no unrealistic values)

**Results:**

- [ ] 2–4 result cards in primary grid
- [ ] Positive values use brand green, negatives use destructive
- [ ] All numbers use `tabular-nums`
- [ ] All numbers formatted via `lib/format.ts` — no inline formatting
- [ ] Results update in real time (no Calculate button)

**Chart:**

- [ ] At least one Recharts chart
- [ ] Chart uses colors from `lib/chart-colors.ts`
- [ ] Custom tooltip implemented
- [ ] `ResponsiveContainer` used — no hardcoded dimensions
- [ ] Dark mode works correctly (colors switch via `useTheme`)

**AI Insight:**

- [ ] Card rendered below chart
- [ ] Loading skeleton shown while API call is in flight
- [ ] API called on debounce (800ms), not on every keystroke
- [ ] Graceful error state if API call fails

**Affiliate CTA:**

- [ ] Correct affiliate mapped for this calculator
- [ ] Link uses `/go/[partner]` redirect pattern (not direct affiliate URL)
- [ ] `rel="noopener noreferrer nofollow"` on link

**SEO Content:**

- [ ] 800–1,200 words surrounding the calculator
- [ ] Primary keyword in H1 and first 100 words
- [ ] FAQ with minimum 4 questions
- [ ] Related calculators (3 links)
- [ ] Meta title: "[Keyword] (2025) — WealthPath"
- [ ] Meta description: 140–155 characters

**Technical:**

- [ ] Page loads under 250 kB First Load JS
- [ ] No console errors
- [ ] Mobile layout works at 375px width
- [ ] Dark mode works on all elements
- [ ] All inputs keyboard-navigable
- [ ] `tabular-nums` on all dynamic numbers

---

## Quick Reference: Calculator Registry

Add every new calculator to this registry so it appears in the hub page and nav.

```typescript
// lib/calculators-registry.ts
export const CALCULATORS = [
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    description: "Calculate how your money grows via compound interest.",
    category: "investing",
    keywords: ["compound interest calculator"],
    monthlySearches: 301000,
    tier: 1,
  },
  {
    slug: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Estimate your monthly mortgage payment and total interest.",
    category: "mortgage",
    keywords: ["mortgage calculator"],
    monthlySearches: 1500000,
    tier: 1,
  },
  // ... add every calculator here
];
```

---

_This file is law. Every calculator page must pass the full checklist above before it is considered complete._
