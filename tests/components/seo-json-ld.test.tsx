import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { SiteJsonLd } from "@/components/site/site-json-ld";

function jsonLd(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]')).map((script) => JSON.parse(script.textContent ?? "{}"));
}

describe("structured data", () => {
  it("defines the site organization, website and free software application", () => {
    const { container } = render(<SiteJsonLd />);
    const [data] = jsonLd(container);
    const types = data["@graph"].map((item: { "@type": string }) => item["@type"]);

    expect(types).toEqual(["Organization", "WebSite", "SoftwareApplication"]);
    expect(data["@graph"][2]).toMatchObject({ isAccessibleForFree: true, operatingSystem: "Web" });
  });

  it("publishes a canonical software application entity for each checker", () => {
    const { container } = render(<SoftwareApplicationJsonLd description="Check payment readiness." name="China Payment Checker" path="/checks/payment" />);
    const [data] = jsonLd(container);

    expect(data).toMatchObject({
      "@type": "SoftwareApplication",
      name: "China Payment Checker",
      url: "https://chinatripcheck.com/checks/payment",
      applicationCategory: "TravelApplication",
      isAccessibleForFree: true,
    });
  });
});
