import { statSync } from "fs";
import path from "path";

import type { MetadataRoute } from "next";

import { checkCatalog } from "@/features/checks/catalog";
import { guideCatalog } from "@/features/guides/catalog";
import { landingPages } from "@/features/landing-pages/catalog";
import { siteConfig } from "@/lib/site";

function fileModifiedAt(...segments: string[]): Date {
  try {
    return statSync(path.join(process.cwd(), ...segments)).mtime;
  } catch {
    return new Date(siteConfig.lastReviewedAt);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "/china-visa-free-checker", file: "src/app/china-visa-free-checker/page.tsx", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/china-train-ticket-sale-planner", file: "src/app/china-train-ticket-sale-planner/page.tsx", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "", file: "src/app/page.tsx", priority: 1, changeFrequency: "weekly" as const, images: [`${siteConfig.url}${siteConfig.ogImage}`] },
    { path: "/checks", file: "src/app/checks/page.tsx", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/china-train-station-arrival-time-calculator", file: "src/app/china-train-station-arrival-time-calculator/page.tsx", priority: 0.95, changeFrequency: "monthly" as const },
    { path: "/how-early-arrive-china-train-station", file: "src/app/how-early-arrive-china-train-station/page.tsx", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/china-trip-difficulty-checker", file: "src/app/china-trip-difficulty-checker/page.tsx", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/guides", file: "src/app/guides/page.tsx", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/how-it-works", file: "src/app/how-it-works/page.tsx", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", file: "src/app/about/page.tsx", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", file: "src/app/privacy/page.tsx", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", file: "src/app/terms/page.tsx", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: fileModifiedAt(page.file),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.images ? { images: page.images } : {}),
    })),
    ...checkCatalog.map((check) => ({
      url: `${siteConfig.url}/checks/${check.slug}`,
      lastModified: fileModifiedAt("src", "app", "checks", "[slug]", "page.tsx"),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...landingPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: fileModifiedAt("src", "features", "landing-pages", "catalog.ts"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...guideCatalog.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: new Date(guide.lastReviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
