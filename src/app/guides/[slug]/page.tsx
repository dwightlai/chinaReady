import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { checkCatalog } from "@/features/checks/catalog";
import { guideCatalog, guidesBySlug } from "@/features/guides/catalog";
import type { GuideSlug } from "@/features/guides/types";
import { formatReviewDate } from "@/lib/format-date";

export function generateStaticParams() {
  return guideCatalog.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesBySlug[slug as GuideSlug];
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guidesBySlug[slug as GuideSlug];
  if (!guide) notFound();
  const { Content } = guide;
  const relatedChecks = guide.applicableChecks.map((checkSlug) => checkCatalog.find((check) => check.slug === checkSlug)).filter(Boolean);

  return (
    <main className="py-14 sm:py-20">
      <Container>
        <Breadcrumbs items={[{ href: "/guides", label: "Guides" }, { label: guide.title }]} />
      </Container>
      <Container className="mt-2 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="max-w-3xl">
          <p className="text-sm font-bold text-[var(--primary)]">{guide.category}</p>
          <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.05] tracking-[-0.05em] sm:text-6xl">{guide.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{guide.description}</p>
          <div className="my-10 h-px bg-[var(--line)]" />
          <Content />
          <div className="mt-12 border-t border-[var(--line)] pt-6 text-sm leading-6 text-[var(--muted)]">
            <p>Last reviewed {formatReviewDate(guide.lastReviewedAt)}</p>
            <p className="mt-2">This guide is conservative preparation guidance. Confirm important details with the official provider before travel.</p>
          </div>
        </article>
        <aside className="h-fit rounded-[var(--radius-md)] bg-[var(--surface)] p-6 lg:sticky lg:top-6">
          <h2 className="font-extrabold">Related checks</h2>
          <div className="mt-4 space-y-3">{relatedChecks.map((check) => check ? <Link className="block rounded-xl bg-white px-4 py-3 text-sm font-bold" href={`/checks/${check.slug}`} key={check.slug}>{check.name}</Link> : null)}</div>
          <h2 className="mt-7 font-extrabold">Sources and review notes</h2>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--muted)]">{guide.sourceNotes.map((source) => <li key={source.label}>{source.url ? <a className="underline underline-offset-4" href={source.url} rel="noreferrer" target="_blank">{source.label}</a> : source.label}</li>)}</ul>
        </aside>
      </Container>
    </main>
  );
}
