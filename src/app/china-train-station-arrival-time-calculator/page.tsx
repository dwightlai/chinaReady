import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { BreadcrumbJsonLd, FaqPageJsonLd, SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { StationArrivalCalculator } from "@/features/planning-tools/station-arrival-calculator";
import { siteConfig } from "@/lib/site";

const path = "/china-train-station-arrival-time-calculator";
const description = "Calculate how early to arrive at a China train station and when to leave your hotel, with buffers for foreign passports, first-time rail travel, luggage, connections and peak periods.";
const faqs = [
  { question: "How early should a foreign visitor arrive at a China train station?", answer: "The useful buffer depends on the station, passport processing, familiarity, luggage and demand. This calculator starts with a standard station buffer and adds time for the factors that apply to your trip." },
  { question: "Can I use a foreign passport at the train station gate?", answer: "Use the original passport connected to the ticket. Some journeys may require a staffed or manual channel, so do not plan around the fastest local ID-card flow." },
  { question: "Does this calculator use live traffic or railway data?", answer: "No. It creates a preparation buffer from stable trip factors. Recheck live journey time and official ticket status before leaving." },
];

export const metadata: Metadata = { title: "China Train Station Arrival Time Calculator", description, alternates: { canonical: path }, openGraph: { title: "China Train Station Arrival Time Calculator", description, url: `${siteConfig.url}${path}`, images: [{ url: siteConfig.ogImage }] } };

export default function StationArrivalPage() {
  return <main>
    <SoftwareApplicationJsonLd description={description} name="China Train Station Arrival Time Calculator" path={path} />
    <BreadcrumbJsonLd items={[{ name: "Train Station Arrival Calculator", path }]} />
    <FaqPageJsonLd faqs={faqs} />
    <section className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#f7fbff,#fff_60%,#edf4ff)] py-14 sm:py-20"><Container><Breadcrumbs items={[{ label: "Train station arrival calculator" }]} /><p className="mt-8 text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Free train-day planning tool</p><h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.04em] sm:text-6xl">China Train Station Arrival Time Calculator</h1><p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--muted)]">Work out when to reach the station and when to leave your hotel before security, passport checks, luggage or unfamiliar station layouts consume your buffer.</p></Container></section>
    <section className="bg-[var(--surface)] py-12 sm:py-16"><Container><StationArrivalCalculator /></Container></section>
    <section className="py-16"><Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-bold text-[var(--primary)]">Why the buffer matters</p><h2 className="mt-3 font-[var(--font-display)] text-3xl">A ticket does not remove the station process.</h2></div><div className="grid gap-4 sm:grid-cols-2">{["Find the correct station entrance", "Complete security screening", "Use a staffed passport channel if needed", "Reach the waiting area before gate closure"].map((item) => <div className="rounded-xl border border-[var(--line)] p-5 font-bold" key={item}>{item}</div>)}</div><div className="lg:col-start-2"><Link className="font-extrabold text-[var(--primary)] underline underline-offset-4" href="/how-early-arrive-china-train-station">Read the complete station-arrival guide</Link></div></Container></section>
    <section className="border-y border-[var(--line)] bg-[var(--surface)] py-16"><Container><h2 className="font-[var(--font-display)] text-3xl">Frequently asked questions</h2><div className="mt-6 space-y-3">{faqs.map((faq) => <details className="rounded-xl border border-[var(--line)] bg-white p-5" key={faq.question}><summary className="cursor-pointer font-extrabold">{faq.question}</summary><p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p></details>)}</div></Container></section>
  </main>;
}
