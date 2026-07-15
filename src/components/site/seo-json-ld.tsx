import { siteConfig } from "@/lib/site";

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; path: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${siteConfig.url}${item.path}`,
      })),
    ],
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}

export function ArticleJsonLd({
  title,
  description,
  path,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  dateModified: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}${path}`,
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
