import Link from "next/link";

import { guideCatalog } from "@/features/guides/catalog";

const featuredSlugs = [
  "test-mobile-payment-before-china",
  "china-holidays-tickets-hotels",
  "save-hotel-name-address-in-chinese",
] as const;

export function FeaturedGuides() {
  const guides = featuredSlugs
    .map((slug) => guideCatalog.find((guide) => guide.slug === slug))
    .filter(Boolean);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[var(--primary)]">Practical guides</p>
          <h2 className="mt-3 max-w-2xl font-[var(--font-display)] text-3xl leading-[1.15] tracking-[-0.03em] sm:text-4xl">Clear answers for common gaps.</h2>
        </div>
        <Link className="font-extrabold text-[var(--ink)]" href="/guides">Browse all guides →</Link>
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
        {guides.map((guide) => guide ? (
          <article className="bg-white p-6 sm:p-7" key={guide.slug}>
            <p className="text-sm font-bold text-[var(--primary)]">{guide.category}</p>
            <h3 className="mt-3 text-lg font-extrabold leading-snug tracking-[-0.02em]">{guide.title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">{guide.description}</p>
            <Link className="mt-6 inline-block text-sm font-extrabold" href={`/guides/${guide.slug}`}>Read guide →</Link>
          </article>
        ) : null)}
      </div>
    </div>
  );
}
