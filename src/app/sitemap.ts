import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://wealthplan.com";

  const staticRoutes = [
    "",
    "/calculators",
    "/about",
    "/privacy-policy",
    "/disclaimer",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch published calculators from DB for dynamic sitemap entries
  const supabase = await createClient();
  const { data: calculators } = await supabase
    .from("calculators")
    .select("slug, updated_at")
    .eq("status", "published");

  const calculatorRoutes = (calculators || []).map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: calc.updated_at || new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
