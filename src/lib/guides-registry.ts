export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "investing" | "debt" | "taxes" | "retirement" | "basics";
  readTime: string;
  publishedAt: string;
  content: string; // We'll mock the content directly here for simplicity, or use markdown later
}

export const GUIDES_REGISTRY: Guide[] = [
  {
    slug: "understanding-401k-match",
    title: "Understanding 401(k) Matching",
    description: "Learn how to maximize your employer match and why it's the closest thing to free money in personal finance.",
    category: "retirement",
    readTime: "5 min read",
    publishedAt: "2025-01-15",
    content: `
# Understanding 401(k) Matching
Your employer's 401(k) match is one of the most powerful wealth-building tools available to American workers. In this guide, we'll explain how it works and why you should ensure you're capturing every possible dollar.

## What is a 401(k) Match?
When you contribute a portion of your pre-tax salary to your 401(k) retirement account, many employers will "match" that contribution up to a certain percentage of your salary. 

For example, a common matching formula is:
* 100% match on the first 3% of your salary
* 50% match on the next 2% of your salary

## Why It Matters
If you make $100,000 and your company matches 100% up to 5%, that's an extra $5,000 completely free added to your compensation package every year. If you don't contribute at least 5%, you are literally leaving money on the table.
    `
  },
  {
    slug: "debt-avalanche-vs-snowball",
    title: "Debt Avalanche vs. Debt Snowball",
    description: "We break down both methods mathematically and psychologically so you can choose the best debt payoff strategy.",
    category: "debt",
    readTime: "7 min read",
    publishedAt: "2025-02-01",
    content: `
# Debt Avalanche vs. Debt Snowball
When you're facing multiple debts—credit cards, student loans, auto loans—the way you prioritize paying them off can save you thousands of dollars or help you stay motivated.

## The Debt Avalanche
**The Math-First Approach**
You list all your debts from highest interest rate to lowest interest rate. You pay the minimums on everything, and put any extra cash toward the debt with the highest rate. 

**Pros:** Saves the most money in interest.
**Cons:** If the highest interest debt has a huge balance, it can take a long time to feel a "win."

## The Debt Snowball
**The Psychology-First Approach**
You list all your debts from smallest balance to largest balance, regardless of interest rate. You attack the smallest balance first.

**Pros:** Quick wins keep you motivated to stick to the plan.
**Cons:** You will mathematically pay more in total interest.
    `
  },
  {
    slug: "rule-of-72",
    title: "The Rule of 72 Explained",
    description: "A simple mental math trick to figure out exactly how long it will take for your investments to double.",
    category: "investing",
    readTime: "4 min read",
    publishedAt: "2025-02-10",
    content: `
# The Rule of 72
The Rule of 72 is a quick, useful formula that is popularly used to estimate the number of years required to double the invested money at a given annual rate of return.

## How to Calculate It
Divide the number 72 by the annual rate of return. The result is the rough number of years it will take for your investment to double.

**Formula:** 72 / [Rate of Return] = Years to Double

## Examples
* **10% Return (Historical Stock Market Average):** 72 / 10 = 7.2 years
* **7% Return (Inflation-Adjusted Market Average):** 72 / 7 = 10.3 years
* **4% Return (High-Yield Savings Account):** 72 / 4 = 18 years
    `
  }
];
