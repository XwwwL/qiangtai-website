import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { productCategories } from "@/data/categories";
import { products } from "@/data/products";

const locales = ["en", "zh", "ru"];
const staticPaths = ["", "/products", "/about", "/manufacturing", "/quality-control", "/applications", "/contact", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const entries: MetadataRoute.Sitemap = [];

  // Add x-default entries
  for (const path of staticPaths) {
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
    });
  }

  // Add locale-specific entries
  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;

    // Static pages
    for (const path of staticPaths) {
      const urlPath = path === "" ? (prefix || "/") : `${prefix}${path}`;
      const url = path === "" ? (prefix ? `${baseUrl}${prefix}` : baseUrl) : `${baseUrl}${prefix}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
      });
    }

    // Category pages
    for (const cat of productCategories) {
      entries.push({
        url: `${baseUrl}${prefix}/products/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      });

      // Product pages
      for (const p of products.filter((p) => p.categorySlug === cat.slug)) {
        entries.push({
          url: `${baseUrl}${prefix}/products/${p.categorySlug}/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
