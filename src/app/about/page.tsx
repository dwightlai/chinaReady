import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";

export const metadata: Metadata = { title: "About", description: "Why China Trip Check helps international visitors find preparation risks before departure." };

export default function AboutPage() {
  return <main className="py-16 sm:py-24"><Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--primary)]">About China Trip Check</p><h1 className="mt-4 font-[var(--font-display)] text-5xl leading-[1.02] tracking-[-0.05em] sm:text-6xl">Fewer hidden gaps before a big trip.</h1></div><div className="space-y-6 text-lg leading-8 text-[var(--muted)]"><p>First-time independent visitors often finish their bookings but still carry fragile assumptions about payment, high-demand dates and hotel arrival.</p><p>China Trip Check makes those assumptions visible. It asks focused questions, explains the risk in plain language and recommends a practical backup.</p><p>The site is intentionally narrow. It is not a booking service, itinerary generator, destination directory or source of live availability. It supports preparation and points travelers back to official providers for final verification.</p><Link className="inline-block rounded-full bg-[var(--primary)] px-6 py-3 text-base font-extrabold text-white" href="/checks">Explore the checks</Link></div></Container></main>;
}
