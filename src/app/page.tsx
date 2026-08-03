import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { FeaturedGuides } from "@/components/site/featured-guides";
import { ResultPreview } from "@/components/site/result-preview";
import { FaqPageJsonLd } from "@/components/site/seo-json-ld";
import { SiteJsonLd } from "@/components/site/site-json-ld";
import { ToolClusters } from "@/components/site/tool-clusters";
import { ToolGrid } from "@/components/site/tool-grid";
import { TrustStrip } from "@/components/site/trust-strip";
import { siteConfig } from "@/lib/site";

const heroSrc = { src: "/images/china-trip-check-hero.png", width: 1200, height: 659 } as const;

const readinessAreas = ["Payment", "Apps", "Train booking", "Passport", "Hotels"] as const;

const homeFaqs = [
  { question: "Can foreigners use Alipay in China?", answer: "Eligible international visitors can set up Alipay with supported identity and card details. Complete verification and test the payment path before departure, with a card or cash backup." },
  { question: "Do I need WeChat for a trip to China?", answer: "Not every traveler needs every feature, but WeChat can be useful for communication and some services. The app readiness checker recommends a setup based on your trip rather than a generic app list." },
  { question: "Can tourists book China trains with a passport?", answer: "Foreign visitors can use supported passport details for real-name train tickets. The booking channel, passenger record, issued ticket and original passport should all match before travel day." },
  { question: "When should I carry my passport in China?", answer: "Carry the original for hotel check-in, flights, trains and any real-name service that requires it. A photo or photocopy is useful for recovery but is not a guaranteed substitute." },
];

export const metadata: Metadata = {
  title: "China Travel Readiness Checker",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "China Travel Readiness Checker | ChinaTripCheck",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function HomePage() {
  return (
    <main>
      <SiteJsonLd />
      <FaqPageJsonLd faqs={homeFaqs} />

      <section className="overflow-hidden border-b border-[var(--line)] bg-[linear-gradient(135deg,#f7fbff_0%,#ffffff_58%,#eef5ff_100%)]">
        <Container className="grid min-h-[650px] items-center gap-12 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Free pre-trip check · Private by design</p>
            <h1 className="mt-5 font-[var(--font-display)] text-5xl leading-[1.06] tracking-[-0.045em] text-[var(--ink)] text-balance sm:text-6xl lg:text-[4.25rem]">
              China Travel Readiness Checker
            </h1>
            <p className="mt-6 max-w-[38rem] text-xl leading-9 text-[var(--muted)]">Check if you&apos;re ready to travel to China before payment, apps, bookings or identity checks interrupt your trip.</p>
            <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3" aria-label="Readiness topics">
              {readinessAreas.map((area) => (
                <li className="flex items-center gap-2 font-extrabold text-[var(--ink)]" key={area}>
                  <CheckCircle aria-hidden className="text-[var(--ready)]" size={20} weight="fill" />{area}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link className="rounded-full bg-[var(--primary)] px-7 py-4 font-extrabold text-white transition hover:bg-[var(--primary-dark)]" href="/checks/readiness">Start Free Readiness Check</Link>
              <Link className="inline-flex items-center gap-2 font-extrabold text-[var(--ink)]" href="#seven-checks">Explore the checks<ArrowRight aria-hidden size={18} weight="bold" /></Link>
            </div>
            <p className="mt-4 text-sm text-[var(--muted)]">About 4 minutes · No account · Answers stay in your browser</p>
          </div>

          <div className="relative min-h-[470px] overflow-hidden rounded-[2rem] bg-[var(--surface-strong)] shadow-[0_28px_80px_rgba(20,43,62,0.14)]">
            <picture>
              <source sizes="(max-width: 1024px) 100vw, 46vw" srcSet="/images/china-trip-check-hero.webp" type="image/webp" />
              <source sizes="(max-width: 1024px) 100vw, 46vw" srcSet="/images/china-trip-check-hero.jpg" type="image/jpeg" />
              <Image alt="Traveler checking China travel readiness before departure" className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 46vw" src={heroSrc} />
            </picture>
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/70 bg-white/94 p-5 shadow-xl backdrop-blur">
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">One readiness check</p>
              <p className="mt-2 text-lg font-extrabold">A clear plan before you fly.</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">Find blockers, prioritized actions and practical backups.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="readiness-overview">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold text-[var(--primary)]">Readiness overview</p>
            <h2 id="readiness-overview" className="mt-4 font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Am I ready for China?</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">A trip is ready when the critical paths work together—not when a checklist merely says the apps are installed.</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {[
              ["Set up", "Install and verify the apps, cards and passenger identities your plan needs."],
              ["Test", "Confirm payment, connectivity and booking paths before departure."],
              ["Match", "Keep passport names, ticket records and hotel bookings consistent."],
              ["Back up", "Prepare another way to pay, connect, travel and reach your hotel."],
            ].map(([title, text]) => (
              <article className="bg-white p-6 sm:p-7" key={title}><h3 className="font-extrabold">{title}</h3><p className="mt-2 leading-7 text-[var(--muted)]">{text}</p></article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-16 sm:py-24" id="seven-checks">
        <Container>
          <p className="text-sm font-bold text-[var(--primary)]">Seven focused tools</p>
          <h2 className="mt-4 max-w-3xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-4xl">Check every critical part of your China trip.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Start with the complete readiness check, or open the tool that matches the task you need to solve now.</p>
          <ToolGrid />
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="example-report">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-[var(--primary)]">Example report</p>
            <h2 id="example-report" className="mt-4 font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Know what to fix first.</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--muted)]">Your private report turns answers into a readiness score, ordered findings and concrete next actions. It highlights blockers without pretending every traveler needs the same setup.</p>
            <Link className="mt-6 inline-flex items-center gap-2 font-extrabold text-[var(--primary)]" href="/how-it-works">See how scoring works<ArrowRight aria-hidden size={18} weight="bold" /></Link>
          </div>
          <div className="flex min-h-80 items-center justify-center rounded-[var(--radius-lg)] bg-[linear-gradient(135deg,#eaf2ff,#f4f7f9)] p-8"><ResultPreview /></div>
        </Container>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20" aria-labelledby="popular-tools">
        <Container>
          <p className="text-sm font-bold text-[var(--primary)]">Popular readiness topics</p>
          <h2 id="popular-tools" className="mt-4 max-w-3xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Tools first. Supporting answers second.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Each topic starts with a task-based checker, then connects to focused explanations for the gaps it finds.</p>
          <ToolClusters />
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="latest-updates">
        <Container>
          <div id="latest-updates"><FeaturedGuides /></div>
        </Container>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface)] py-16 sm:py-20" aria-labelledby="home-faq">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="text-sm font-bold text-[var(--primary)]">China travel readiness FAQ</p><h2 id="home-faq" className="mt-4 font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Common questions before departure.</h2></div>
          <div className="space-y-3">
            {homeFaqs.map((faq) => <details className="rounded-[var(--radius-md)] border border-[var(--line)] bg-white p-5" key={faq.question}><summary className="cursor-pointer font-extrabold">{faq.question}</summary><p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p></details>)}
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16"><TrustStrip /></Container>

      <section className="border-t border-[var(--line)] bg-[var(--ink)] py-14 text-white sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div><h2 className="font-[var(--font-display)] text-3xl tracking-[-0.03em]">Check your China readiness now.</h2><p className="mt-3 max-w-xl text-slate-300">Run the free check before you leave. It takes about four minutes.</p></div>
          <Link className="rounded-full bg-white px-6 py-3.5 font-extrabold text-[var(--ink)] transition hover:bg-blue-50" href="/checks/readiness">Start Free Readiness Check</Link>
        </Container>
      </section>
    </main>
  );
}
