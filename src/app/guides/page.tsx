import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { guideCatalog } from "@/features/guides/catalog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel risk guides",
  description: "Practical guides for payment, connectivity, date and hotel arrival risks in China.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Travel risk guides",
    description: "Practical guides for payment, connectivity, date and hotel arrival risks in China.",
    url: `${siteConfig.url}/guides`,
    images: [{ url: siteConfig.ogImage }],
  },
};

const categories = ["Payments", "Connectivity", "Travel dates", "Hotel arrival", "Transport", "Planning"] as const;

export default function GuidesPage() {
  return (
    <main className="bg-[var(--surface)] py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Practical preparation</p>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">Travel risk guides</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">Clear answers for the preparation gaps most likely to interrupt a China trip.</p>
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
                      <h3 className="text-xl font-extrabold leading-snug tracking-[-0.02em] sm:text-2xl">{guide.title}</h3>
                      <p className="mt-3 leading-7 text-[var(--muted)]">{guide.description}</p>
                      <Link className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold" href={`/guides/${guide.slug}`}>
                        Read guide<ArrowUpRight aria-hidden size={17} weight="bold" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <p className="mt-12 text-sm text-[var(--muted)]">
          Prefer a structured check instead? <Link className="font-bold text-[var(--ink)] underline underline-offset-4" href="/checks">Open the trip checks</Link>.
        </p>
      </Container>
    </main>
  );
}
