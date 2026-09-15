import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { ToolGrid } from "@/components/site/tool-grid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "China Travel Checkers and Tools",
  description: "Choose practical China travel checkers, calculators and preparation tools.",
  alternates: { canonical: "/checks" },
  openGraph: {
    title: "China Travel Checkers and Tools",
    description: "Choose practical China travel checkers, calculators and preparation tools.",
    url: `${siteConfig.url}/checks`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function ChecksPage() {
  return (
    <main className="bg-[var(--surface)] py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Trip preparation</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">China Travel Checkers and Tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Use these free tools to check the parts of your plan most likely to create avoidable problems.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link className="rounded-[var(--radius-lg)] bg-[var(--ink)] p-7 text-white" href="/china-train-station-arrival-time-calculator"><p className="text-sm font-bold text-blue-300">New · Train-day calculator</p><h2 className="mt-3 text-2xl font-extrabold">Calculate when to reach the station</h2><p className="mt-3 leading-7 text-slate-300">Get a station arrival window and hotel departure time from your passport, luggage and itinerary risks.</p><span className="mt-5 inline-block font-extrabold">Calculate timing →</span></Link>
          <Link className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-7" href="/china-trip-difficulty-checker"><p className="text-sm font-bold text-[var(--primary)]">First-trip planning</p><h2 className="mt-3 text-2xl font-extrabold">How difficult is your China trip?</h2><p className="mt-3 leading-7 text-[var(--muted)]">Turn eight itinerary factors into a clear preparation level and focused priorities.</p><span className="mt-5 inline-block font-extrabold text-[var(--primary)]">Check difficulty →</span></Link>
        </div>
        <ToolGrid />
        <Link className="mt-8 block rounded-xl border border-[var(--line)] bg-white p-6 font-bold underline" href="/china-visa-free-checker">Check visa-free eligibility by nationality and entry date</Link>
        <Link className="mt-8 block rounded-xl border border-[var(--line)] bg-white p-6 font-bold underline" href="/china-train-ticket-sale-planner">Train ticket sale planner: booking dates, reminders and next actions</Link>
        <p className="mt-10 text-sm text-[var(--muted)]">Already have a report? <Link className="font-bold text-[var(--ink)] underline underline-offset-4" href="/guides">Use the checker support library</Link> to resolve a specific finding.</p>
      </Container>
    </main>
  );
}
