import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/en/", "/zh/"],
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
