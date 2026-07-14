import { describe, expect, it } from "vitest";

import { siteConfig } from "@/lib/site";

describe("siteConfig", () => {
  it("uses the approved public brand and canonical domain", () => {
    expect(siteConfig.name).toBe("China Trip Check");
    expect(siteConfig.wordmark).toBe("ChinaTripCheck");
    expect(siteConfig.url).toBe("https://chinatripcheck.com");
  });
});
