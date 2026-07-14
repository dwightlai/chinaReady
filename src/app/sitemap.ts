import type { MetadataRoute } from "next";

import { checkCatalog } from "@/features/checks/catalog";
import { guideCatalog } from "@/features/guides/catalog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/checks",
    ...checkCatalog.map((check) => `/checks/${check.slug}`),
    "/guides",
    ...guideCatalog.map((guide) => `/guides/${guide.slug}`),
    "/how-it-works",
    "/about",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: "2026-07-14" }));
}
