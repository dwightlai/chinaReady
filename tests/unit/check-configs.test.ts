import { describe, expect, it } from "vitest";

import { checkCatalog } from "@/features/checks/catalog";
import { checkConfigs } from "@/features/checks/configs";

const GUIDE_SLUGS = new Set([
  "test-mobile-payment-before-china",
  "foreign-card-fails-in-china",
  "esim-bank-verification-messages",
  "one-payment-method-is-not-enough",
  "cash-and-atms-in-china",
  "arrive-with-working-internet",
  "buy-sim-or-esim-for-china",
  "china-holidays-tickets-hotels",
  "travel-during-china-national-day",
  "confirm-late-hotel-check-in-china",
  "save-hotel-name-address-in-chinese",
  "first-city-shanghai-or-beijing",
]);

describe("check catalog", () => {
  it("publishes exactly the four approved checks", () => {
    expect(checkCatalog.map((tool) => tool.slug)).toEqual([
      "readiness",
      "payment",
      "dates",
      "hotel-arrival",
    ]);
  });
});

describe.each(Object.values(checkConfigs))("$slug config", (config) => {
  it("contains a short, complete questionnaire", () => {
    expect(config.questions.length).toBeGreaterThanOrEqual(8);
    expect(config.questions.length).toBeLessThanOrEqual(15);
    expect(new Set(config.questions.map((question) => question.id)).size).toBe(config.questions.length);
  });

  it("contains unique, actionable, reviewed rules", () => {
    expect(config.lastReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(new Set(config.rules.map((rule) => rule.code)).size).toBe(config.rules.length);
    for (const rule of config.rules) {
      expect(rule.actions.length).toBeGreaterThan(0);
      expect(rule.title.length).toBeGreaterThan(12);
      for (const guide of rule.relatedGuides ?? []) expect(GUIDE_SLUGS.has(guide)).toBe(true);
    }
  });
});
