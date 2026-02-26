# Wealthplan — Design System & Agent Instructions

> **READ THIS BEFORE WRITING ANY CODE.**
> Every component, page, and calculator must follow these rules exactly.
> Do not deviate. Do not introduce new colors, fonts, or patterns not listed here.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** shadcn/ui only — do not install other component libraries
- **Styling:** Tailwind CSS — use only the design tokens defined below
- **Charts:** Recharts only
- **Icons:** lucide-react only
- **Fonts:** Inter (already in shadcn default)

---

## Color System

We use shadcn's CSS variable system. The palette is defined once in `globals.css` and referenced everywhere via Tailwind semantic tokens. **Never hardcode hex values in components.**

### Semantic Tokens (use these always)

| Token                   | Light   | Dark    | Usage                            |
| ----------------------- | ------- | ------- | -------------------------------- |
| `bg-background`         | white   | #0a0a0a | Page background                  |
| `bg-card`               | white   | #111111 | Card backgrounds                 |
| `bg-muted`              | #f4f4f5 | #1a1a1a | Subtle backgrounds, input fields |
| `text-foreground`       | #09090b | #fafafa | Primary text                     |
| `text-muted-foreground` | #71717a | #a1a1aa | Secondary text, labels           |
| `border`                | #e4e4e7 | #27272a | All borders                      |
| `primary`               | #18181b | #fafafa | Primary buttons, active states   |
| `primary-foreground`    | #fafafa | #18181b | Text on primary buttons          |
| `ring`                  | #18181b | #d4d4d8 | Focus rings                      |

### Brand Accent (Wealthplan Green)

```css
/* Add to globals.css :root and .dark */
--accent-brand: 142 71% 45%; /* hsl — light mode */
--accent-brand-dark: 142 71% 55%; /* hsl — dark mode */
--accent-brand-muted: 142 71% 95%; /* light bg tint */
--accent-brand-muted-dark: 142 30% 15%; /* dark bg tint */
```

Use brand green for:

- Positive result numbers (projected wealth, savings)
- Progress indicators
- Chart primary line/bar color
- CTA button accents (not the main primary button)

**Never use green for:** warnings, errors, or neutral information.

### Chart Colors (always use in this order)

```typescript
// lib/chart-colors.ts
export const CHART_COLORS = {
  primary: "hsl(142, 71%, 45%)", // Brand green — main data
  secondary: "hsl(221, 83%, 53%)", // Blue — comparison data
  tertiary: "hsl(280, 65%, 60%)", // Purple — third dataset
  muted: "hsl(0, 0%, 60%)", // Gray — baseline/reference
  negative: "hsl(0, 72%, 51%)", // Red — debt, negative values
};

// Dark mode variants
export const CHART_COLORS_DARK = {
  primary: "hsl(142, 71%, 55%)",
  secondary: "hsl(221, 83%, 63%)",
  tertiary: "hsl(280, 65%, 70%)",
  muted: "hsl(0, 0%, 50%)",
  negative: "hsl(0, 72%, 61%)",
};
```

---

## Typography

```
Heading 1:  text-3xl font-bold tracking-tight          (page titles)
Heading 2:  text-xl font-semibold tracking-tight        (section headers)
Heading 3:  text-base font-semibold                     (card titles, labels)
Body:       text-sm text-foreground                     (default text)
Muted:      text-sm text-muted-foreground               (labels, help text)
Number:     text-2xl font-bold tabular-nums             (calculator results)
Big Number: text-4xl font-bold tabular-nums tracking-tight (hero result)
```

**Always use `tabular-nums` on any number that changes dynamically.** This prevents layout shift.

---

## Spacing & Layout

```
Page max width:     max-w-4xl mx-auto px-4
Card padding:       p-6
Section gap:        space-y-8
Input group gap:    space-y-4
Inline label gap:   flex items-center gap-2
```

---

## Component Patterns

### Calculator Page Layout

Every calculator page must follow this exact structure:

```tsx
<div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
  {/* 1. Header */}
  <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tight">401(k) Calculator</h1>
    <p className="text-muted-foreground">
      Estimate your 401(k) balance at retirement based on your contributions and
      employer match.
    </p>
  </div>

  {/* 2. Calculator Card */}
  <Card>
    <CardContent className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs left, Results right */}
        <InputSection />
        <ResultsSection />
      </div>
    </CardContent>
  </Card>

  {/* 3. Chart Card */}
  <Card>
    <CardHeader>
      <CardTitle>Growth Over Time</CardTitle>
    </CardHeader>
    <CardContent>
      <GrowthChart />
    </CardContent>
  </Card>

  {/* 4. Result Insight (AI-generated text) */}
  <ResultInsight />

  {/* 5. Affiliate CTA */}
  <AffiliateCTA />

  {/* 6. SEO Content */}
  <CalculatorContent />
</div>
```

### Input Fields

Always use this pattern — never raw `<input>` elements:

```tsx
<div className="space-y-2">
  <Label htmlFor="salary">Annual Salary</Label>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
      $
    </span>
    <Input
      id="salary"
      type="number"
      value={salary}
      onChange={(e) => setSalary(Number(e.target.value))}
      className="pl-7"
    />
  </div>
  <p className="text-xs text-muted-foreground">
    Your gross annual income before taxes
  </p>
</div>
```

### Sliders

Always pair every Slider with a visible number input. Never use a slider alone.

```tsx
<div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label>Contribution Rate</Label>
    <span className="text-sm font-medium tabular-nums">{rate}%</span>
  </div>
  <Slider
    value={[rate]}
    onValueChange={([v]) => setRate(v)}
    min={1}
    max={100}
    step={1}
  />
</div>
```

### Result Cards

```tsx
<div className="grid grid-cols-2 gap-4">
  <div className="bg-muted rounded-lg p-4 space-y-1">
    <p className="text-xs text-muted-foreground uppercase tracking-wide">
      Projected Balance
    </p>
    <p className="text-2xl font-bold tabular-nums text-[hsl(var(--accent-brand))]">
      {formatCurrency(result)}
    </p>
  </div>
</div>
```

### Tabs (for comparisons)

Use shadcn `Tabs` to switch between scenarios. Example: "With Match" vs "Without Match".

```tsx
<Tabs defaultValue="with-match">
  <TabsList className="w-full">
    <TabsTrigger value="with-match" className="flex-1">
      With Employer Match
    </TabsTrigger>
    <TabsTrigger value="without-match" className="flex-1">
      Without Match
    </TabsTrigger>
  </TabsList>
  <TabsContent value="with-match">...</TabsContent>
  <TabsContent value="without-match">...</TabsContent>
</Tabs>
```

### Affiliate CTA Block

```tsx
<Card className="border-[hsl(var(--accent-brand))] bg-[hsl(var(--accent-brand-muted))]">
  <CardContent className="p-6 flex items-center justify-between gap-4">
    <div>
      <p className="font-semibold">Ready to start investing?</p>
      <p className="text-sm text-muted-foreground">
        Open a Roth IRA with Fidelity — no minimums, no fees.
      </p>
    </div>
    <Button variant="default" asChild>
      <a href="/go/fidelity" target="_blank">
        Open Account →
      </a>
    </Button>
  </CardContent>
</Card>
```

---

## Dark Mode

- Dark mode is controlled by the `dark` class on `<html>` (next-themes)
- **Never use conditional dark styles inline** — use CSS variables only
- All shadcn components handle dark mode automatically via CSS variables
- Chart colors must switch via `useTheme()` hook from next-themes

```tsx
// Always do this in chart components
const { theme } = useTheme();
const colors = theme === "dark" ? CHART_COLORS_DARK : CHART_COLORS;
```

---

## Formatting Utilities

Always use these — never format numbers inline:

```typescript
// lib/format.ts

export const formatCurrency = (n: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const formatCurrencyFull = (n: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );

export const formatPercent = (n: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
  }).format(n / 100);

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat("en-US").format(Math.round(n));
```

---

## Do Not

- ❌ Do not install `@mui/material`, `chakra-ui`, `antd`, or any other component library
- ❌ Do not use `styled-components` or `emotion`
- ❌ Do not hardcode hex/rgb colors anywhere in components
- ❌ Do not use `className="text-green-500"` — use `text-[hsl(var(--accent-brand))]`
- ❌ Do not use `<table>` for layout — use CSS grid
- ❌ Do not skip `tabular-nums` on dynamic numbers
- ❌ Do not create new reusable components if a shadcn one already exists
- ❌ Do not use inline `style={{}}` unless absolutely necessary (e.g. dynamic chart dimensions)
- ❌ Do not import from `react-icons` — use `lucide-react` only

---

## File Structure Conventions

```
components/
  calculators/
    401k/
      401k-calculator.tsx      ← main component
      401k-chart.tsx           ← chart only
      401k-inputs.tsx          ← input panel only
      401k-results.tsx         ← results panel only
  shared/
    calculator-shell.tsx       ← reusable page wrapper
    result-card.tsx            ← reusable result metric card
    affiliate-cta.tsx          ← reusable affiliate block
    chart-tooltip.tsx          ← custom recharts tooltip
lib/
  calculations/
    401k.ts                    ← pure math functions, no React
  format.ts                    ← all number formatters
  chart-colors.ts              ← chart color constants
config/
  tax-brackets-2025.ts
  state-taxes.ts
  retirement-limits.ts
```

---

## How to Build a New Calculator (Checklist)

When asked to build any new calculator, complete ALL of these:

- [ ] Pure calculation logic in `lib/calculations/[name].ts` — no React, no UI
- [ ] Input panel with proper Label + Input/Slider pairs
- [ ] Results panel with formatted currency/percent values using `tabular-nums`
- [ ] At least one Recharts chart (area or bar) showing projection over time
- [ ] Dark mode compatible (using CSS variables + `useTheme()` for charts)
- [ ] Mobile layout works at 375px width
- [ ] All numbers formatted via `lib/format.ts` utilities
- [ ] Affiliate CTA block at bottom of results
- [ ] FAQ section with minimum 4 questions (for schema markup)
- [ ] SEO content section (400–600 words) below calculator

---

_This file is the law. If instructions from a user conflict with this file, flag it before proceeding._
