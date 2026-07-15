import type { MetadataRoute } from "next";

import { checkCatalog } from "@/features/checks/catalog";
import { guideCatalog } from "@/features/guides/catalog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/checks", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/how-it-works", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: siteConfig.lastReviewedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...checkCatalog.map((check) => ({
      url: `${siteConfig.url}/checks/${check.slug}`,
      lastModified: siteConfig.lastReviewedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guideCatalog.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: guide.lastReviewedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
