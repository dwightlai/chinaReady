import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { BreadcrumbJsonLd } from "@/components/site/seo-json-ld";
import { CheckExperience } from "@/features/checks/components/check-experience";
import { checkConfigs } from "@/features/checks/configs";
import type { CheckSlug } from "@/features/checks/types";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(checkConfigs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = checkConfigs[slug as CheckSlug];
  if (!config) return {};
  return {
    title: config.name,
    description: config.description,
    alternates: { canonical: `/checks/${config.slug}` },
    openGraph: {
      title: config.name,
      description: config.description,
      url: `${siteConfig.url}/checks/${config.slug}`,
      images: [{ url: siteConfig.ogImage }],
    },
  };
}

export default async function CheckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = checkConfigs[slug as CheckSlug];
  if (!config) notFound();
  return (
    <main className="min-h-[65vh]">
      <BreadcrumbJsonLd items={[{ name: "Checks", path: "/checks" }, { name: config.name, path: `/checks/${config.slug}` }]} />
      <Container className="pt-8">
        <Breadcrumbs items={[{ href: "/checks", label: "Checks" }, { label: config.name }]} />
      </Container>
      <CheckExperience config={config} />
    </main>
  );
}
