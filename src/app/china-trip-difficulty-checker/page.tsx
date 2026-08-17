import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { TripDifficultyChecker } from "@/features/planning-tools/trip-difficulty-checker";
import { siteConfig } from "@/lib/site";

const path = "/china-trip-difficulty-checker";
const description = "Estimate how difficult your first China trip will be based on solo travel experience, language, cities, train legs, payment, phone readiness and independent travel.";
export const metadata: Metadata = { title: "First China Trip Difficulty Checker", description, alternates: { canonical: path }, openGraph: { title: "First China Trip Difficulty Checker", description, url: `${siteConfig.url}${path}`, images: [{ url: siteConfig.ogImage }] } };

export default function TripDifficultyPage() {
  return <main>
    <SoftwareApplicationJsonLd description={description} name="First China Trip Difficulty Checker" path={path} /><BreadcrumbJsonLd items={[{ name: "Trip Difficulty Checker", path }]} />
    <section className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#f7fbff,#fff_60%,#edf4ff)] py-14 sm:py-20"><Container><Breadcrumbs items={[{ label: "Trip difficulty checker" }]} /><p className="mt-8 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">First-trip complexity check</p><h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.04em] sm:text-6xl">How difficult will your China trip be?</h1><p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--muted)]">Turn a vague “Is China too ambitious?” question into a practical preparation level based on the itinerary you are actually planning.</p></Container></section>
    <section className="bg-[var(--surface)] py-12 sm:py-16"><Container><TripDifficultyChecker /></Container></section>
    <section className="py-16"><Container className="grid gap-8 md:grid-cols-3">{[["Trip shape", "Cities, rail legs and fixed dependencies add coordination."], ["Personal experience", "Solo and regional experience affect how much unfamiliarity arrives at once."], ["Critical setup", "Payment and connectivity readiness often matter more than destination count alone."]].map(([title, text]) => <article className="rounded-[var(--radius-md)] border border-[var(--line)] p-6" key={title}><h2 className="font-extrabold">{title}</h2><p className="mt-2 leading-7 text-[var(--muted)]">{text}</p></article>)}</Container></section>
  </main>;
}
