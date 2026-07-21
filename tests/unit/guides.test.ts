import { describe, expect, it } from "vitest";

import { guideCatalog } from "@/features/guides/catalog";

const expectedSlugs = [
  "test-mobile-payment-before-china",
  "foreign-card-fails-in-china",
  "esim-bank-verification-messages",
  "one-payment-method-is-not-enough",
  "cash-and-atms-in-china",
  "arrive-with-working-internet",
  "buy-sim-or-esim-for-china",
  "vpn-in-china-2026",
  "china-holidays-tickets-hotels",
  "travel-during-china-national-day",
  "confirm-late-hotel-check-in-china",
  "save-hotel-name-address-in-chinese",
  "didi-without-chinese-number",
  "first-city-shanghai-or-beijing",
  "train-booking-for-foreign-visitors",
  "china-entry-requirements-checklist",
];

describe("guide catalog", () => {
  it("contains exactly the approved guides", () => {
    expect(guideCatalog.map((guide) => guide.slug)).toEqual(expectedSlugs);
    expect(new Set(guideCatalog.map((guide) => guide.slug)).size).toBe(16);
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

  it("publishes a dedicated train booking guide", () => {
    expect(guideCatalog.some((guide) => guide.slug === "train-booking-for-foreign-visitors")).toBe(true);
  });
});
