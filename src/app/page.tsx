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

export default function HomePage() {
  return (
    <main>
      <SiteJsonLd />
      <Container className="grid min-h-[620px] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-bold text-[var(--primary)]">Travel prepared, arrive confident</p>
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
          <Image
            alt="Traveler preparing for a China trip in a modern station"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            src="/images/china-trip-check-hero.png"
          />
          <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[#dfe8ed] via-[#eaf0f2]/85 to-transparent pb-6 pt-24">
            <ResultPreview />
          </div>
        </div>
      </Container>

      <section className="bg-[var(--surface)] py-16 sm:py-24">
        <Container>
          <p className="text-sm font-bold text-[var(--primary)]">Choose your starting point</p>
          <h2 className="mt-4 max-w-3xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-4xl">Four checks. One clearer plan.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Start with the full check or go directly to the part of your trip that needs attention.</p>
          <ToolGrid />
          <div className="mt-14">
            <SampleFinding />
          </div>
          <FeaturedGuides />
        </Container>
      </section>

      <Container className="py-12 sm:py-16"><TrustStrip /></Container>
    </main>
  );
}
