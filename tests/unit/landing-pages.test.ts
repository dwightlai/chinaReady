import { describe, expect, it } from "vitest";

import { landingPages } from "@/features/landing-pages/catalog";

describe("SEO landing pages", () => {
  it("publishes six unique, single-intent pages", () => {
    expect(landingPages).toHaveLength(6);
    expect(new Set(landingPages.map((page) => page.slug)).size).toBe(6);
    expect(new Set(landingPages.map((page) => page.title)).size).toBe(6);
  });

  it("connects every landing page to a working checker and supporting content", () => {
    for (const page of landingPages) {
      expect(page.description.length).toBeGreaterThan(80);
      expect(page.checks.length).toBeGreaterThanOrEqual(4);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(page.relatedGuides.length).toBeGreaterThanOrEqual(3);
      expect(page.cta).toMatch(/^Check My/);
    }
  });
});
