import type { MetadataRoute } from "next";
import { productCategories } from "@/data/categories";
import { products } from "@/data/products";

const DOMAIN = "https://www.zj-qiangtai.com";
const locales = ["en", "zh", "ru"] as const;

const staticPaths = [
  "/products",
  "/manufacturing",
  "/quality-control",
  "/applications",
  "/about",
  "/contact",
  "/privacy-policy",
] as const;

const buildDate = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  function add(url: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
    if (seen.has(url)) return;
    seen.add(url);
    entries.push({ url, lastModified: buildDate, changeFrequency, priority });
  }

  for (const locale of locales) {
    const prefix = `/${locale}`;

    // Home
    add(`${DOMAIN}${prefix}`, 1, "weekly");

    // Static pages
    for (const path of staticPaths) {
      const priority =
        path === "/products" ? 0.9
        : path === "/privacy-policy" ? 0.3
        : path === "/manufacturing" || path === "/quality-control" || path === "/applications" ? 0.7
        : 0.6;
      const freq = path === "/privacy-policy" ? "yearly" : path === "/products" ? "weekly" : "monthly";
      add(`${DOMAIN}${prefix}${path}`, priority, freq);
    }

    // Category pages
    for (const cat of productCategories) {
      add(`${DOMAIN}${prefix}/products/${cat.slug}`, 0.8, "weekly");
    }

    // Product pages
    for (const p of products) {
      add(`${DOMAIN}${prefix}/products/${p.categorySlug}/${p.slug}`, 0.7, "monthly");
    }
  }

  return entries;
}
