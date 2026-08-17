import { describe, expect, it } from "vitest";

import { landingPages } from "@/features/landing-pages/catalog";

describe("SEO landing pages", () => {
  it("publishes eleven unique, single-intent pages", () => {
    expect(landingPages).toHaveLength(11);
    expect(new Set(landingPages.map((page) => page.slug)).size).toBe(11);
    expect(new Set(landingPages.map((page) => page.title)).size).toBe(11);
  });

  it("connects every landing page to a working checker and supporting content", () => {
    for (const page of landingPages) {
      expect(page.description.length).toBeGreaterThan(80);
      expect(page.checks.length).toBeGreaterThanOrEqual(4);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(page.relatedGuides.length).toBeGreaterThanOrEqual(3);
      expect(page.cta).toMatch(/^(Check|Diagnose) My/);
    }
  });
});
