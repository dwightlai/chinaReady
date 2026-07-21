import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { FeaturedGuides } from "@/components/site/featured-guides";
import { ResultPreview } from "@/components/site/result-preview";
import { SampleFinding } from "@/components/site/sample-finding";
import { SiteJsonLd } from "@/components/site/site-json-ld";
import { ToolGrid } from "@/components/site/tool-grid";
import { TrustStrip } from "@/components/site/trust-strip";
import { siteConfig } from "@/lib/site";

const heroSrc = {
  src: "/images/china-trip-check-hero.png",
  width: 1200,
  height: 659,
} as const;

export const metadata: Metadata = {
  title: "China Trip Risk Checker | ChinaTripCheck",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "China Trip Risk Checker | ChinaTripCheck",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function HomePage() {
  return (
    <main>
      <SiteJsonLd />
      <Container className="grid min-h-[620px] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-sm font-bold text-[var(--primary)]">Payment, dates and hotel arrival</h2>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.12] tracking-[-0.03em] text-[var(--ink)] text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Find the risks before they disrupt your China trip.
          </h1>
          <p className="mt-5 max-w-[36rem] text-lg leading-8 text-[var(--muted)]">Check your payments, travel dates and hotel arrival before you leave.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link className="rounded-full bg-[var(--primary)] px-6 py-3.5 font-extrabold text-white transition hover:bg-[var(--primary-dark)]" href="/checks/readiness">Check my trip</Link>
            <Link className="inline-flex items-center gap-2 font-extrabold text-[var(--ink)]" href="/how-it-works">See how it works<ArrowRight aria-hidden size={18} weight="bold" /></Link>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-[var(--surface-strong)]">
          <picture>
            <source sizes="(max-width: 1024px) 100vw, 48vw" srcSet="/images/china-trip-check-hero.webp" type="image/webp" />
            <source sizes="(max-width: 1024px) 100vw, 48vw" srcSet="/images/china-trip-check-hero.jpg" type="image/jpeg" />
            <Image
              alt="Traveler preparing for a China trip in a modern station"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              src={heroSrc}
            />
          </picture>
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[#dfe8ed] via-[#eaf0f2]/85 to-transparent pb-6 pt-24">
            <ResultPreview />
          </div>
        </div>
      </Container>

      <section className="bg-[var(--surface)] py-16 sm:py-24">
        <Container>
          <p className="text-sm font-bold text-[var(--primary)]">Start where the risk is</p>
          <h2 className="mt-4 max-w-3xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-4xl">Six checks. One clearer plan.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Start with the full check or go directly to the part of your trip that needs attention.</p>
          <ToolGrid />
          <div className="mt-14">
            <SampleFinding />
          </div>
          <FeaturedGuides />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-[var(--primary)]">How the checks work</p>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Short questions. Clear rules. Local report.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Answer focused questions about apps, payments, trains, dates and arrival. Deterministic rules flag blockers and backups. Nothing is sent to a server for scoring.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              "Describe the plan you already have.",
              "Match documented preparation risks.",
              "Act on a private, ordered report.",
            ].map((step, index) => (
              <li className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-[var(--ink)]" key={step}>
                <span className="text-sm font-bold text-[var(--muted)]">0{index + 1}</span>
                <p className="mt-1 font-extrabold">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="py-12 sm:py-16"><TrustStrip /></Container>

      <section className="border-t border-[var(--line)] bg-[var(--surface)] py-14 sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl tracking-[-0.03em]">Ready to find the gaps?</h2>
            <p className="mt-3 max-w-xl text-[var(--muted)]">Run the full readiness check before you leave. It takes about four minutes.</p>
          </div>
          <Link className="rounded-full bg-[var(--primary)] px-6 py-3.5 font-extrabold text-white transition hover:bg-[var(--primary-dark)]" href="/checks/readiness">
            Check my trip
          </Link>
        </Container>
      </section>
    </main>
  );
}
