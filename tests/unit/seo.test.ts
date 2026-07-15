import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("public discovery metadata", () => {
  it("publishes the complete canonical sitemap", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(23);
    expect(entries.every((entry) => entry.url.startsWith("https://chinatripcheck.com"))).toBe(true);
    expect(entries.map((entry) => entry.url)).toEqual(expect.arrayContaining([
      "https://chinatripcheck.com/checks/readiness",
      "https://chinatripcheck.com/checks/payment",
      "https://chinatripcheck.com/checks/dates",
      "https://chinatripcheck.com/checks/hotel-arrival",
      "https://chinatripcheck.com/guides/save-hotel-name-address-in-chinese",
      "https://chinatripcheck.com/guides/arrive-with-working-internet",
      "https://chinatripcheck.com/guides/buy-sim-or-esim-for-china",
      "https://chinatripcheck.com/guides/cash-and-atms-in-china",
      "https://chinatripcheck.com/guides/first-city-shanghai-or-beijing",
      "https://chinatripcheck.com/privacy",
      "https://chinatripcheck.com/terms",
    ]));
  });

  it("allows crawling and references the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://chinatripcheck.com/sitemap.xml",
    });
  });
});
