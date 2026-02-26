import { MetadataRoute } from "next";
import { CALCULATORS_REGISTRY } from "@/lib/calculators-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://Wealthplan.example.com";

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

  const calculatorRoutes = CALCULATORS_REGISTRY.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
