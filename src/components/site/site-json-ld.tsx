import { siteConfig } from "@/lib/site";

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.ogImage}`,
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
      },
      {
        "@type": "WebApplication",
        name: siteConfig.name,
        url: siteConfig.url,
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        description: siteConfig.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
      },
    ],
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
