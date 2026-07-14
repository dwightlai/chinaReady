import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CheckExperience } from "@/features/checks/components/check-experience";
import { checkConfigs } from "@/features/checks/configs";
import type { CheckSlug } from "@/features/checks/types";

export function generateStaticParams() {
  return Object.keys(checkConfigs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const config = checkConfigs[slug as CheckSlug];
  if (!config) return {};
  return { title: config.name, description: config.description };
}

export default async function CheckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = checkConfigs[slug as CheckSlug];
  if (!config) notFound();
  return <main className="min-h-[65vh]"><CheckExperience config={config} /></main>;
}
