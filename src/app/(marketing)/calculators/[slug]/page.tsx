import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { SchemaMarkup } from "@/components/calculator/schema-markup";
import { DynamicCalculator } from "@/components/calculator/dynamic-calculator";
import { CalculatorConfig } from "@/lib/calculator/engine";

// Server-side data fetching
interface CalculatorData {
  slug: string;
  title: string;
  description: string | null;
  config: Omit<CalculatorConfig, 'content'>;
  content: CalculatorConfig['content'];
  seo_title?: string;
  seo_description?: string;
  og_image_url?: string;
  status: string;
}

// Server-side data fetching
async function getCalculator(slug: string): Promise<CalculatorData | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("calculators")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as unknown as CalculatorData;
}

// Dynamic metadata from DB
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = await getCalculator(slug);
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
  const calc = await getCalculator(slug);

  if (!calc) notFound();

  const content = calc.content || {};

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
      <DynamicCalculator 
        calculatorId={calc.slug}
        config={({ ...calc.config, content: calc.content } as unknown as CalculatorConfig)} 
      />
    </CalculatorShell>
  );
}
