# WealthPath — Complete Rebuild Blueprint

**Fresh Start | US Finance Calculators | AdSense-First Strategy**

---

## The Plan in One Sentence

Build a focused US personal finance calculator site from scratch, with 15 high-quality calculators live on a clean domain, surrounded by proper SEO content — then apply for AdSense at week 4.

---

## Phase 0 — Before Writing a Single Line of Code (Day 1–2)

### Domain Selection

Register one of these (check Namecheap in this order):

1. `smartmoneycalc.com` ← Best for AdSense approval speed
2. `wealthcalc.com` ← Best brand/SEO balance
3. `finwise.com` ← Most premium feel
4. `calcwise.com` ← Most scalable long-term

### Hosting

- Vercel (free tier) — deploy from GitHub, auto-HTTPS, instant
- Connect domain on day 1 so Google starts seeing it immediately

### Repo Setup

```
git init wealthpath
cd wealthpath
npx create-next-app@latest . --typescript --tailwind --app --src-dir
npx shadcn@latest init
```

When shadcn asks for base color: choose **Zinc** (not Slate, not Gray — Zinc is the sharpest)

---

## Phase 1 — Foundation (Day 1–3)

### Install dependencies

```bash
npm install recharts lucide-react next-themes
npm install @radix-ui/react-slider  # already via shadcn
```

### shadcn components to install upfront

```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add slider
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add tooltip
npx shadcn@latest add select
npx shadcn@latest add button
npx shadcn@latest add table
```

### globals.css — Brand color additions

Add these to your `:root` and `.dark` blocks in `globals.css`:

```css
:root {
  /* All existing shadcn zinc variables stay as-is */
  /* Add WealthPath brand green */
  --brand: 142 71% 42%;
  --brand-foreground: 0 0% 100%;
  --brand-muted: 142 40% 96%;
  --brand-subtle: 142 30% 88%;
}

.dark {
  --brand: 142 71% 52%;
  --brand-foreground: 0 0% 5%;
  --brand-muted: 142 20% 12%;
  --brand-subtle: 142 25% 18%;
}
```

### File structure to create on day 1

```
src/
├── app/
│   ├── layout.tsx                    ← Root layout with ThemeProvider
│   ├── page.tsx                      ← Homepage
│   ├── calculators/
│   │   ├── page.tsx                  ← All calculators hub
│   │   └── [slug]/
│   │       └── page.tsx              ← Dynamic calculator page
│   ├── about/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── disclaimer/page.tsx
│   ├── contact/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── theme-toggle.tsx
│   ├── calculator/
│   │   ├── calculator-shell.tsx      ← Reusable page wrapper
│   │   ├── input-field.tsx           ← Label + Input + helper text
│   │   ├── slider-field.tsx          ← Label + Slider + value display
│   │   ├── result-card.tsx           ← Single metric result card
│   │   ├── result-grid.tsx           ← 2-4 result cards in grid
│   │   ├── growth-chart.tsx          ← Recharts area chart wrapper
│   │   ├── comparison-chart.tsx      ← Recharts grouped bar chart
│   │   ├── affiliate-cta.tsx         ← Affiliate recommendation block
│   │   └── faq-section.tsx           ← FAQ accordion for SEO
│   └── home/
│       ├── hero.tsx
│       └── calculator-grid.tsx
│
├── lib/
│   ├── calculations/
│   │   ├── compound-interest.ts
│   │   ├── mortgage.ts
│   │   ├── 401k.ts
│   │   ├── debt-payoff.ts
│   │   ├── budget.ts
│   │   ├── bonds.ts
│   │   └── net-worth.ts
│   ├── format.ts                     ← All number formatters
│   ├── chart-colors.ts               ← Chart color constants
│   └── calculators-registry.ts       ← Metadata for all calculators
│
└── config/
    ├── tax-brackets-2025.ts
    ├── state-taxes.ts
    └── retirement-limits-2025.ts
```

---

## Phase 2 — Core Shared Components (Day 3–5)

These are built ONCE and reused across all 15+ calculators. This is the most important investment in the project.

### `lib/format.ts`

```typescript
export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const formatCurrencyFull = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);

export const formatPercent = (n: number, decimals = 1) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
  }).format(n / 100);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(Math.round(n));

export const formatCompact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
```

### `lib/chart-colors.ts`

```typescript
export const CHART_COLORS = {
  primary: "hsl(142, 71%, 42%)", // brand green
  secondary: "hsl(221, 83%, 53%)", // blue
  tertiary: "hsl(38, 92%, 50%)", // amber
  muted: "hsl(0, 0%, 65%)", // gray baseline
  negative: "hsl(0, 72%, 51%)", // red
};
export const CHART_COLORS_DARK = {
  primary: "hsl(142, 71%, 55%)",
  secondary: "hsl(221, 83%, 65%)",
  tertiary: "hsl(38, 92%, 62%)",
  muted: "hsl(0, 0%, 48%)",
  negative: "hsl(0, 72%, 62%)",
};
```

### `components/calculator/calculator-shell.tsx`

This is the master template. Every calculator uses this exact wrapper:

```tsx
interface CalculatorShellProps {
  title: string;
  description: string;
  children: React.ReactNode; // inputs + results + chart
  faqItems: { q: string; a: string }[];
  seoContent: React.ReactNode; // static SEO article below calc
  affiliateCta?: React.ReactNode;
}
```

Layout order (non-negotiable for every page):

1. H1 + description
2. Calculator card (inputs + results)
3. Chart card
4. AI insight card (dynamic text based on result)
5. Affiliate CTA
6. SEO content article
7. FAQ accordion

### `components/calculator/result-card.tsx`

```tsx
interface ResultCardProps {
  label: string;
  value: string;
  sublabel?: string;
  variant?: "default" | "positive" | "negative" | "muted";
}
```

- `positive` = brand green text
- `negative` = red text
- `default` = foreground
- Always use `tabular-nums` class on value

---

## Phase 3 — The 15 Launch Calculators (Week 1–3)

Build in this exact order. Each takes 4–8 hours properly done.

### WEEK 1 — The Big 5 (highest traffic)

**1. Compound Interest Calculator** ← Build first, it's the simplest

- Slug: `/calculators/compound-interest`
- Inputs: Principal, annual rate, years, compound frequency, monthly additions
- Outputs: Final balance, total interest earned, total contributions
- Chart: Area chart showing principal vs interest growth year by year
- Keyword: "compound interest calculator" — 301K/mo
- SEO content: "What is compound interest", "How compound frequency affects growth", "Rule of 72 explained"

**2. Mortgage Calculator**

- Slug: `/calculators/mortgage-calculator`
- Inputs: Home price, down payment, interest rate, loan term, property tax, HOA, PMI
- Outputs: Monthly payment (PITI), total interest, total cost, amortization table
- Chart: Bar chart showing principal vs interest per year + remaining balance line
- Special: 15yr vs 30yr side-by-side tab
- Keyword: "mortgage calculator" — 1.5M/mo

**3. Salary / Paycheck Calculator**

- Slug: `/calculators/salary-calculator`
- Inputs: Annual salary, filing status (single/married/HoH), state (Select dropdown, all 50)
- Outputs: Federal tax, state tax, FICA, net take-home (annual/monthly/biweekly/weekly)
- Chart: Donut showing income breakdown
- Keyword: "salary calculator" — 550K/mo
- Config: Needs `config/tax-brackets-2025.ts` and `config/state-taxes.ts`

**4. 401k Calculator**

- Slug: `/calculators/401k-calculator`
- Inputs: Salary, contribution %, employer match %, current balance, return rate, current age, retirement age, annual salary increase
- Outputs: Projected balance, employer match total, tax savings, personal contributions total
- Chart: Stacked area — your contributions vs employer match vs growth
- Keyword: "401k calculator" — 165K/mo
- Config: Uses `config/retirement-limits-2025.ts` (2025 limit: $23,500)

**5. Debt Payoff Calculator (Snowball vs Avalanche)**

- Slug: `/calculators/debt-payoff-calculator`
- Inputs: Dynamic debt list (add multiple debts), monthly payment budget
- Outputs: Payoff date, total interest paid, months to debt free
- Chart: Two lines — snowball timeline vs avalanche timeline
- Tab: Switch between snowball and avalanche results
- Keyword: "debt payoff calculator" — 40K/mo

---

### WEEK 2 — 5 More

**6. Roth IRA Calculator**

- Slug: `/calculators/roth-ira-calculator`
- Inputs: Current age, annual contribution, current balance, return rate, retirement age
- Outputs: Final balance, total contributions, total growth
- Special: Roth vs Traditional comparison tab, MAGI eligibility check
- Keyword: "roth ira calculator" — 90K/mo

**7. Budget Planner**

- Slug: `/calculators/budget-planner`
- Inputs: Monthly income + dynamic expense categories
- Outputs: 50/30/20 rule check, surplus/deficit, savings rate
- Chart: Donut of spending categories
- Keyword: "budget planner" — 60K/mo

**8. Net Worth Calculator**

- Slug: `/calculators/net-worth-calculator`
- Inputs: Assets (home, investments, savings, car, other), Liabilities (mortgage, auto loan, student loans, credit cards, other)
- Outputs: Total assets, total liabilities, net worth
- Chart: Bar comparison — assets vs liabilities
- Keyword: "net worth calculator" — 33K/mo

**9. Investment Calculator**

- Slug: `/calculators/investment-calculator`
- Inputs: Initial investment, monthly contribution, return rate, years, inflation rate
- Outputs: Nominal value, inflation-adjusted value, total contributions
- Chart: Area chart with nominal vs real (inflation-adjusted) lines
- Keyword: "investment calculator" — 110K/mo

**10. Retirement Calculator**

- Slug: `/calculators/retirement-calculator`
- Inputs: Current age, retirement age, current savings, monthly savings, expected return, desired retirement income, Social Security estimate
- Outputs: Projected balance, monthly income in retirement, savings gap analysis
- Keyword: "retirement calculator" — 200K/mo

---

### WEEK 3 — 5 More (AdSense Application Ready)

**11. Auto Loan Calculator**

- Keyword: "auto loan calculator" — 110K/mo

**12. Tax Bracket Calculator**

- Keyword: "tax bracket calculator" — 60K/mo
- Needs: `config/tax-brackets-2025.ts`

**13. Savings Goal Calculator**

- Keyword: "savings goal calculator" — 18K/mo

**14. Home Affordability Calculator**

- Keyword: "how much house can I afford" — 90K/mo

**15. Inflation Calculator**

- Keyword: "inflation calculator" — 49K/mo

---

## Phase 4 — AdSense Application Checklist (End of Week 3)

Before applying, verify every item:

### Site requirements

- [ ] At least 15 calculator pages live with real, working calculators
- [ ] Every calculator page has 800–1,200 words of text content (not just the JS widget)
- [ ] Every calculator page has an FAQ section (minimum 4 questions)
- [ ] Site has been live and indexed for at least 2–3 weeks
- [ ] Google Search Console set up and sitemap submitted
- [ ] All 15 pages are indexed (check Search Console Coverage report)

### Required pages (all must have real content, not placeholders)

- [ ] `/about` — Who runs the site, what it's for, US finance focus stated clearly
- [ ] `/privacy-policy` — Full policy including AdSense/cookies disclosure
- [ ] `/disclaimer` — Financial disclaimer ("not financial advice, educational only")
- [ ] `/contact` — Working contact form or email address

### Technical

- [ ] HTTPS active (Vercel does this automatically)
- [ ] No broken links (run a crawler)
- [ ] No console errors on calculator pages
- [ ] Mobile-responsive (test at 375px)
- [ ] Core Web Vitals: LCP under 2.5s (avoid heavy bundles — current site had 745kB pages)
- [ ] robots.txt allows Googlebot
- [ ] sitemap.xml submitted

### Content quality signals

- [ ] No placeholder or "lorem ipsum" text anywhere
- [ ] No India-specific calculators on the site
- [ ] Every page has a unique, descriptive `<title>` and `<meta description>`
- [ ] Financial disclaimer visible on every calculator page
- [ ] Author/reviewer credit on at least 5 pages ("Reviewed by [name], CFP")

### Apply here

`google.com/adsense` → Add site → Wait 1–14 days

---

## Phase 5 — Post-Approval (Month 2+)

Once AdSense is approved:

1. **Switch to Ezoic** at 10,000 monthly sessions (2–3x higher RPM than AdSense)
2. **Add affiliate links** — Fidelity, Schwab, LendingTree in relevant calculators
3. **Build 10 more calculators** — FIRE, Capital Gains, HSA, Student Loan, Refinance
4. **Add strategy guides** — "Financial plan for $100K salary", "How to pay off debt in 2 years"
5. **State pages** — 50 state tax pages (huge long-tail SEO opportunity)

---

## The AdSense Speed-Run Timeline

```
Day 1–2:    Domain + hosting + repo setup
Day 3–5:    Shared components built (shell, inputs, result cards, charts)
Day 6–10:   Calculators 1–5 live (compound interest, mortgage, salary, 401k, debt payoff)
Day 11–17:  Calculators 6–10 live
Day 18–21:  Calculators 11–15 live + all SEO content written
Day 22–23:  About, Privacy, Disclaimer, Contact pages finalized
Day 24:     Submit sitemap to Google Search Console
Day 28:     Apply for Google AdSense
Day 29–42:  Wait for approval (usually 1–14 days)
```

**Total time to AdSense application: 4 weeks**

---

## The One Thing That Kills This

Building calculators without the content.

A calculator with no surrounding text = thin content = AdSense rejection.

Every calculator page MUST have before you apply:

- 2–3 sentence intro above the calculator
- Dynamic result insight paragraph (auto-generated from inputs)
- "How to use this calculator" section (150 words)
- 2–3 factual explainer sections about the topic (200 words each)
- FAQ with 4–6 questions
- Related calculators section

This content takes 2–3 hours per calculator. Budget for it. Don't skip it.

---
