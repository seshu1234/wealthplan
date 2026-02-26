import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { FaqSection } from "@/components/calculator/faq-section";
import { SchemaMarkup } from "@/components/calculator/schema-markup";
import { CalcArticle, DataTable } from "@/components/calculator/calc-article";
import { DynamicCalculator } from "@/components/calculator/dynamic-calculator";

// Server-side data fetching
async function getCalculator(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calculators")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data;
}

// Dynamic metadata from DB
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = (await getCalculator(slug)) as any;
  if (!calc) return { title: "Calculator Not Found" };

  return {
    title: calc.seo_title || `${calc.title} — WealthPlan`,
    description: (calc.seo_description || calc.description) ?? undefined,
    openGraph: {
      title: calc.seo_title || calc.title,
      description: (calc.seo_description || calc.description) ?? undefined,
      ...(calc.og_image_url ? { images: [calc.og_image_url] } : {}),
    },
  };
}

export default async function DynamicCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = (await getCalculator(slug)) as any;

  if (!calc) notFound();

  const content = (calc.content || {}) as any;

  return (
    <CalculatorShell
      calculatorId={calc.slug}
      title={calc.title}
      description={calc.description || ""}
    >
      {/* FAQ Schema (Server Side) */}
      {content.faq && content.faq.length > 0 && (
        <SchemaMarkup
          type="FAQPage"
          url={`https://wealthplan.com/calculators/${calc.slug}`}
          data={content.faq}
        />
      )}

      {/* Full Interactive Experience (Client Side) */}
      <DynamicCalculator config={calc} />
    </CalculatorShell>
  );
}
