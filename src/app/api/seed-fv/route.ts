import { createAdminClient } from "../../../lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createAdminClient();
  
  const fvConfig = {
    inputs: [
      { id: 'principal', type: 'number', label: 'Initial Investment (PV)', defaultValue: 10000, min: 0, max: 10000000 },
      { id: 'rate', type: 'slider', label: 'Annual Interest Rate (%)', defaultValue: 8, min: 0, max: 30, step: 0.1, unit: '%' },
      { id: 'years', type: 'slider', label: 'Time Horizon (Years)', defaultValue: 10, min: 1, max: 50, step: 1 }
    ],
    logic: {
      type: 'formula',
      formula: `principal * Math.pow(1 + rate/100, years)`
    },
    outputs: [
      {
        id: 'future_value',
        label: 'Future Value (FV)',
        format: 'currency',
        variant: 'positive',
        formula: `principal * Math.pow(1 + (rate * (1 - scenario_tax ? tax_rate/100 : 0))/100, years)`
      },
      {
        id: 'total_growth',
        label: 'Total Growth',
        format: 'currency',
        variant: 'positive',
        formula: `(principal * Math.pow(1 + (rate * (1 - scenario_tax ? tax_rate/100 : 0))/100, years)) - principal`
      },
      {
        id: 'inflation_adjusted',
        label: 'Inflation-Adjusted FV',
        format: 'currency',
        variant: 'neutral',
        formula: `(principal * Math.pow(1 + rate/100, years)) / Math.pow(1 + 3/100, years)`,
        tooltip: 'Estimated real value in today\'s dollars assuming 3% inflation.'
      }
    ],
    charts: [
      {
        id: 'growth_chart',
        title: 'Wealth Projection Over Time',
        loopKey: 'years',
        series: [
          {
            label: 'Wealth (Net)',
            dataKey: 'value',
            formula: `principal * Math.pow(1 + (rate * (1 - scenario_tax ? tax_rate/100 : 0))/100, i)`,
            color: 'hsl(var(--primary))'
          },
          {
            label: 'Total Invested',
            dataKey: 'invested',
            formula: `principal`,
            color: 'hsl(215, 20%, 65%)'
          }
        ]
      }
    ],
    scenarios: [
      {
        id: 'tax',
        label: 'Tax Impact Simulator',
        description: 'See how taxes on annual returns affect your final wealth.',
        inputs: [
          { id: 'tax_rate', label: 'Effective Tax Rate (%)', type: 'slider', defaultValue: 20, min: 0, max: 40, unit: '%' }
        ]
      }
    ],
    content: {
      intro: "Project your investment growth with our precision Future Value Calculator. This tool accurately estimates how today’s savings will multiply over time using compound interest logic. Whether planning for a house down payment or a distant retirement, understanding the future value of your money is the cornerstone of any successful financial roadmap.",
      highlight: "At an 8% return, $10,000 grows to over $46,000 in 20 years.",
      howToUse: [
        "Enter your Initial Investment (Principal): The amount you have saved today.",
        "Set Annual Interest Rate: Your expected yearly return from the market or savings.",
        "Select Time Horizon: How many years you plan to keep the money invested.",
        "Toggle Tax Scenario: See the 'drag' that capital gains taxes place on your final results."
      ],
      explanation: {
        title: "What is Future Value?",
        body: "Future Value (FV) is the estimated total value of an asset or cash at a specific date in the future, based on an assumed rate of growth. It is the core mathematical principle behind compounding—the process where your investment returns start generating their own returns over time. The longer your time horizon, the more powerful this effect becomes.\n\nFor example, if you invest **$10,000 for 10 years at an 8% annual return**, your money grows to **$21,589.25**. In those 10 years, you earned over $11,000 in interest without adding a single penny to the account. If you left that same $10,000 for 30 years, it would balloon to over $100,000. This exponential curve is what allows small savers to become wealthy over decades.\n\nHowever, nominal future value doesn't always tell the whole story. While your bank account might show $100,000 in 30 years, inflation will have reduced what that money can actually buy. That is why our calculator includes an 'Inflation-Adjusted' result, helping you see the 'real' value of your future wealth in today’s purchasing power, ensuring your goals are grounded in reality."
      },
      deepDive: {
        title: "Deep Dive: Simple vs. Compound Growth",
        body: "One of the most common mistakes investors make is thinking linearly. Simple growth means you earn interest only on your original $10,000. Over 10 years at 8%, that would only be $8,000 in total interest. Compound growth, however, reinvests that interest every year. By year 2, you are earning 8% on $10,800, not just $10,000. This subtle shift adds up to massive differences as the years pass.\n\nThe 'velocity of growth' is also impacted by external factors like taxes. If you are in a higher tax bracket and your investment is held in a taxable account, you aren't actually reinvesting 100% of your gains. By toggling our Tax Impact Simulator, you can see how an 8% market return might effectively act like a 6.4% return after a 20% tax hit. This realization often leads savvy investors to prioritize tax-advantaged accounts like 401(k)s and IRAs to keep their growth velocity as high as possible."
      },
      keyNumbers: [
        { label: "S&P 500 Historical (Avg)", value: "10.7%", source: "Goldman Sachs" },
        { label: "Long-term US Inflation", value: "3.24%", source: "BLS Data" },
        { label: "Typical HYSA Yield (2025)", value: "4.50%", source: "Bankrate" },
        { label: "Compounding Premium (20yr)", value: "3.5x", source: "Asset Logic" }
      ],
      faq: [
        { question: "Why does Future Value matter?", answer: "It helps you determine if your current savings rate and expected returns are sufficient to meet a specific future goal, like buying a home or retiring." },
        { question: "How does inflation affect FV?", answer: "Inflation reduces the purchasing power of your money. A future value of $100,000 in 20 years might only buy as much as $55,000 does today." },
        { question: "What interest rate should I use?", answer: "For conservative planning, use 4-5%. For equity-based (stock market) growth, 7-10% is the long-term historical range." },
        { question: "Is this for lump-sum or monthly savings?", answer: "This specific calculator is for a 'Lump Sum' (Principal). For monthly additions, use our SIP or Compound Interest calculator." },
        { question: "What is an 'Effective' rate?", answer: "The effective rate is your annual return after accounting for taxes, fees, and inflation. It is the true measure of your wealth's growth." }
      ]
    }
  };

  const { error } = await supabase
    .from('calculators')
    .upsert({
      slug: 'future-value',
      title: 'Future Value (FV) Calculator',
      description: 'Project how your current savings will grow over time.',
      category: 'investment',
      status: 'published',
      config: fvConfig,
      seo_title: 'Future Value Calculator | Project Investment Growth',
      seo_description: 'Calculate the future value of your savings with our interactive FV calculator. See how compound interest, taxes, and inflation affect your wealth.'
    }, { onConflict: 'slug' });
    
  return NextResponse.json({ success: !error, error });
}
