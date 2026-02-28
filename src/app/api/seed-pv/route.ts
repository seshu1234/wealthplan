import { createAdminClient } from "../../../lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createAdminClient();
  
  const pvConfig = {
    inputs: [
      { id: 'target_value', type: 'number', label: 'Future Goal (FV)', defaultValue: 100000, min: 0, max: 100000000 },
      { id: 'rate', type: 'slider', label: 'Expected Annual Return (%)', defaultValue: 7, min: 0.1, max: 30, step: 0.1, unit: '%' },
      { id: 'years', type: 'slider', label: 'Time Horizon (Years)', defaultValue: 15, min: 1, max: 50, step: 1 }
    ],
    logic: {
      type: 'formula',
      formula: `target_value / Math.pow(1 + rate/100, years)`
    },
    outputs: [
      {
        id: 'present_value',
        label: 'Present Value (PV)',
        format: 'currency',
        variant: 'positive',
        formula: `target_value / Math.pow(1 + rate/100, years)`
      },
      {
        id: 'total_discount',
        label: 'Total Discount (Interest)',
        format: 'currency',
        variant: 'positive',
        formula: `target_value - (target_value / Math.pow(1 + rate/100, years))`
      }
    ],
    charts: [
      {
        id: 'discount_curve',
        title: 'Present Value Decay (Cost of Waiting)',
        loopKey: 'years',
        series: [
          {
            label: 'Amount Needed Today',
            dataKey: 'value',
            formula: `target_value / Math.pow(1 + rate/100, i)`,
            color: 'hsl(var(--primary))'
          },
          {
            label: 'Target Goal',
            dataKey: 'goal',
            formula: `target_value`,
            color: 'hsl(var(--accent))'
          }
        ]
      }
    ],
    scenarios: [
      {
        id: 'sensitivity',
        label: 'Return Sensitivity',
        description: 'Compare how much more you need to save if returns are lower.',
        inputs: [
          { id: 'alt_rate', label: 'Conservative Return (%)', type: 'slider', defaultValue: 4, min: 0.1, max: 10, unit: '%' }
        ]
      }
    ],
    content: {
      intro: "Reverse-engineer your financial goals with our Present Value (PV) Calculator. This tool determines exactly how much you need to invest today to reach a specific target amount in the future. By applying a discount rate, you can evaluate the current worth of future cash, making it an essential tool for smart investment analysis and long-term goal setting.",
      highlight: "To reach $1,000,000 in 30 years at 8% returns, you need ~$99,000 today.",
      howToUse: [
        "Enter Future Goal (FV): The total amount you want to have in the future.",
        "Set Expected Annual Return: The 'discount rate' or interest you expect to earn.",
        "Select Time Horizon: How many years until you need that future sum.",
        "Analyze the Discount Curve: See how the amount required today drops as time increases."
      ],
      explanation: {
        title: "What is Present Value?",
        body: "Present Value (PV) is the current worth of a future sum of money or stream of cash flows given a specified rate of return. It is based on the 'Time Value of Money' principle—the idea that a dollar today is worth more than a dollar tomorrow because today's dollar can be invested to earn interest.\n\nFor example, if you want to have **$100,000 in 15 years** and you expect a **7% annual return**, the Present Value Calculator tells you that you need to invest **$36,244.60** today. The remaining $63,755 of your goal will be generated purely through the power of compounding interest over those 15 years. This calculation is the foundation of retirement planning, as it tells you the 'lump sum' equivalent of your future needs.\n\nUnderstanding PV allows investors to make 'apples-to-apples' comparisons between different financial opportunities. If someone offers you $50,000 today or $100,000 in 10 years, which is better? At a 7% interest rate, $100,000 in 10 years is only worth about $50,834 today—making them nearly identical in value. PV cuts through the noise of time and interest to show you the structural truth of any deal."
      },
      deepDive: {
        title: "Deep Dive: The Discount Rate & Risk",
        body: "In Present Value calculations, the interest rate is often called the 'Discount Rate.' This is because we are 'discounting' the future sum back to the present. Choosing the right rate is the most critical part of the calculation. A higher discount rate means the present value will be lower, because money grows faster at higher rates. Conversely, a lower rate means you need to put up more capital today to reach your goal.\n\nThe choice of discount rate often reflects the risk of the investment. A 'risk-free' rate (like a US Treasury bond) might be 4%, while a 'risky' stock market return might be 10%. If you use a 10% rate, the calculator will show you need less money today, but you are taking on more risk that you might miss your target. Savvy planners often run 'Sensitivity Analysis' by checking their PV at multiple rates to ensure their plan is robust even if market conditions change."
      },
      keyNumbers: [
        { label: "FV Goal Benchmark", value: "$1,000,000", source: "Asset Logic" },
        { label: "20-Yr Discount Factor", value: "0.21", source: "at 8% Rate" },
        { label: "Opportunity Cost (Avg)", value: "7.5%", source: "Market Index" },
        { label: "Inflation Buffer", value: "3.0%", source: "Fed Target" }
      ],
      faq: [
        { question: "What is the difference between PV and FV?", answer: "FV looks forward (how much will this grow?), while PV looks backward (how much do I need now to get that amount?)." },
        { question: "Why is PV lower than the future sum?", answer: "Because your money earns interest over time. You need less today because compounding will do the heavy lifting for you." },
        { question: "What is a 'Discount Rate'?", answer: "It is the interest rate used to bring future money back to its value today. It represents your expected return or your opportunity cost." },
        { question: "Can I use PV for inflation?", answer: "Yes. Use the inflation rate as your discount rate to see how much a future 'nominal' amount is worth in today's 'real' purchasing power." },
        { question: "Is this tool useful for business?", answer: "Absolutely. PV is used in Net Present Value (NPV) analysis to decide if a future business project is worth the investment today." }
      ]
    }
  };

  const { error } = await supabase
    .from('calculators')
    .upsert({
      slug: 'present-value',
      title: 'Present Value (PV) Calculator',
      description: 'Find out how much you need today to reach a future goal.',
      category: 'investment',
      status: 'published',
      config: pvConfig,
      seo_title: 'Present Value Calculator | Goal Back-Calculation Tool',
      seo_description: 'Calculate the present value of your future financial goals. Use our PV tool to see exactly how much to invest today based on your target and returns.'
    }, { onConflict: 'slug' });
    
  return NextResponse.json({ success: !error, error });
}
