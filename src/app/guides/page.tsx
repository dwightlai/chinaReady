import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { checkCatalog } from "@/features/checks/catalog";
import { guideCatalog } from "@/features/guides/catalog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "China Travel Checker Support",
  description: "Supporting explanations for ChinaTripCheck payment, app, booking, passport, train and hotel readiness findings.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "China Travel Checker Support",
    description: "Supporting explanations for ChinaTripCheck payment, app, booking, passport, train and hotel readiness findings.",
    url: `${siteConfig.url}/guides`,
    images: [{ url: siteConfig.ogImage }],
  },
};

const categories = ["Payments", "Connectivity", "Travel dates", "Hotel arrival", "Transport", "Planning"] as const;

export default function GuidesPage() {
  return (
    <main className="bg-[var(--surface)] py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Checker support library</p>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">Resolve the gaps your check finds.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Start with a readiness checker. Use these focused explanations only when your report identifies a related payment, app, booking, passport, train or hotel task.</p>
        <div className="mt-8 flex flex-wrap items-center gap-5 rounded-[var(--radius-lg)] bg-[var(--ink)] p-7 text-white">
          <div className="min-w-0 flex-1"><p className="text-sm font-bold text-blue-300">Recommended first step</p><h2 className="mt-2 text-2xl font-extrabold">Run the complete China readiness check.</h2><p className="mt-2 text-sm leading-6 text-slate-300">Get an ordered report before deciding which support article you need.</p></div>
          <Link className="rounded-full bg-white px-5 py-3 font-extrabold text-[var(--ink)]" href="/checks/readiness">Start readiness check</Link>
        </div>
        <div className="mt-12 space-y-12">
          {categories.map((category) => {
            const guides = guideCatalog.filter((guide) => guide.category === category);
            if (guides.length === 0) return null;
            return (
              <section key={category}>
                <h2 className="text-sm font-bold text-[var(--muted)]">{category}</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {guides.map((guide) => (
                    <article className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-7 sm:p-9" key={guide.slug}>
                      <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--primary)]">Supporting guide</p>
                      <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] sm:text-2xl">{guide.title}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">{guide.description}</p>
                      {(() => {
                        const check = checkCatalog.find((item) => item.slug === guide.applicableChecks[0]);
                        return <div className="mt-7 flex flex-wrap items-center gap-4">
                          {check ? <Link className="rounded-full bg-[var(--primary)] px-4 py-2.5 text-sm font-extrabold text-white" href={`/checks/${check.slug}`}>Use {check.name}</Link> : null}
                          <Link className="inline-flex items-center gap-2 text-sm font-extrabold" href={`/guides/${guide.slug}`}>Read supporting guide<ArrowUpRight aria-hidden size={17} weight="bold" /></Link>
                        </div>;
                      })()}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
