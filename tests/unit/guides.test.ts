import { describe, expect, it } from "vitest";

import { guideCatalog } from "@/features/guides/catalog";

const expectedSlugs = [
  "test-mobile-payment-before-china",
  "foreign-card-fails-in-china",
  "esim-bank-verification-messages",
  "one-payment-method-is-not-enough",
  "arrive-with-working-internet",
  "china-holidays-tickets-hotels",
  "travel-during-china-national-day",
  "confirm-late-hotel-check-in-china",
  "save-hotel-name-address-in-chinese",
];

describe("guide catalog", () => {
  it("contains exactly the approved guides", () => {
    expect(guideCatalog.map((guide) => guide.slug)).toEqual(expectedSlugs);
    expect(new Set(guideCatalog.map((guide) => guide.slug)).size).toBe(9);
  });

  it("provides complete review, source and rendering metadata", () => {
    for (const guide of guideCatalog) {
      expect(guide.title.length).toBeGreaterThan(10);
      expect(guide.description.length).toBeGreaterThan(20);
      expect(guide.lastReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.applicableChecks.length).toBeGreaterThan(0);
      expect(guide.sourceNotes.length).toBeGreaterThan(0);
      expect(typeof guide.Content).toBe("function");
    }
  });

  it("does not publish a dedicated train checker guide", () => {
    expect(guideCatalog.some((guide) => /train check(er)?/i.test(`${guide.title} ${guide.description}`))).toBe(false);
  });
});
