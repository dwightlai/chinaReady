import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container } from "@/components/site/container";
import { BreadcrumbJsonLd, FaqPageJsonLd, SoftwareApplicationJsonLd } from "@/components/site/seo-json-ld";
import { guidesBySlug } from "@/features/guides/catalog";
import { landingPages, landingPagesBySlug, type LandingSlug } from "@/features/landing-pages/catalog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return landingPages.map((page) => ({ landing: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }): Promise<Metadata> {
  const { landing } = await params;
  const page = landingPagesBySlug[landing as LandingSlug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `${siteConfig.url}/${page.slug}`, images: [{ url: siteConfig.ogImage }] },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params;
  const page = landingPagesBySlug[landing as LandingSlug];
  if (!page) notFound();
  const guides = page.relatedGuides.map((slug) => guidesBySlug[slug]);
  return <main>
    <FaqPageJsonLd faqs={page.faqs} />
    <BreadcrumbJsonLd items={[{ name: page.title, path: `/${page.slug}` }]} />
    <SoftwareApplicationJsonLd description={page.description} name={page.title} path={`/${page.slug}`} />

    <section className="border-b border-[var(--line)] bg-[linear-gradient(135deg,#f7fbff,#ffffff_60%,#edf4ff)] py-14 sm:py-20">
      <Container>
        <Breadcrumbs items={[{ label: page.title }]} />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">{page.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-[var(--font-display)] text-4xl leading-[1.08] tracking-[-0.04em] sm:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-[var(--muted)]">{page.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5"><Link className="rounded-full bg-[var(--primary)] px-7 py-4 font-extrabold text-white hover:bg-[var(--primary-dark)]" href={`/checks/${page.checkSlug}`}>{page.cta}</Link><span className="text-sm font-bold text-[var(--muted)]">Free · {page.duration} · No account</span></div>
          </div>
          <aside className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-7 shadow-[0_20px_60px_rgba(20,43,62,0.1)]"><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Your result</p><ul className="mt-5 space-y-4">{page.outcomes.map((outcome) => <li className="flex gap-3 font-bold" key={outcome}><CheckCircle aria-hidden className="mt-0.5 shrink-0 text-[var(--ready)]" size={20} weight="fill" />{outcome}</li>)}</ul></aside>
        </div>
      </Container>
    </section>

    <section className="py-16 sm:py-20"><Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-bold text-[var(--primary)]">Why this check matters</p><h2 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.03em] sm:text-4xl">Check the complete path, not one setup step.</h2><p className="mt-4 text-lg leading-8 text-[var(--muted)]">{page.intro}</p></div><div className="grid gap-4 sm:grid-cols-2">{page.checks.map((item) => <article className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-6" key={item.title}><h3 className="font-extrabold">{item.title}</h3><p className="mt-2 leading-7 text-[var(--muted)]">{item.text}</p></article>)}</div></Container></section>

    <section className="border-y border-[var(--line)] bg-[var(--surface)] py-16"><Container className="grid gap-10 lg:grid-cols-2"><div><p className="text-sm font-bold text-[var(--primary)]">Use this checker if</p><h2 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.03em]">Your trip depends on any of these situations.</h2><ul className="mt-6 space-y-3">{page.useCases.map((item) => <li className="flex gap-3" key={item}><CheckCircle aria-hidden className="mt-1 shrink-0 text-[var(--primary)]" size={18} />{item}</li>)}</ul></div><div className="rounded-[var(--radius-lg)] bg-[var(--ink)] p-8 text-white"><p className="text-sm font-bold text-blue-300">How it works</p><ol className="mt-6 space-y-5">{["Answer focused questions about your actual setup.", "Deterministic rules identify blockers and weak backups.", "Use the ordered report to finish preparation."].map((step, index) => <li className="flex gap-4" key={step}><span className="font-extrabold text-blue-300">0{index + 1}</span><span className="font-bold">{step}</span></li>)}</ol><Link className="mt-8 inline-flex items-center gap-2 font-extrabold text-white" href={`/checks/${page.checkSlug}`}>{page.cta}<ArrowRight aria-hidden size={18} weight="bold" /></Link></div></Container></section>

    <section className="py-16 sm:py-20"><Container><p className="text-sm font-bold text-[var(--primary)]">Supporting guidance</p><h2 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.03em]">Resolve the gaps your report finds.</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{guides.map((guide) => <article className="rounded-[var(--radius-md)] border border-[var(--line)] p-6" key={guide.slug}><p className="text-sm font-bold text-[var(--primary)]">{guide.category}</p><h3 className="mt-3 font-extrabold leading-snug">{guide.title}</h3><Link className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold" href={`/guides/${guide.slug}`}>Read supporting guide<ArrowRight aria-hidden size={15} /></Link></article>)}</div></Container></section>

    <section className="border-y border-[var(--line)] bg-[var(--surface)] py-16"><Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-sm font-bold text-[var(--primary)]">Frequently asked questions</p><h2 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.03em]">Before you start the check.</h2></div><div className="space-y-3">{page.faqs.map((faq) => <details className="rounded-[var(--radius-md)] border border-[var(--line)] bg-white p-5" key={faq.question}><summary className="cursor-pointer font-extrabold">{faq.question}</summary><p className="mt-3 leading-7 text-[var(--muted)]">{faq.answer}</p></details>)}</div></Container></section>

    <section className="bg-[var(--ink)] py-14 text-white"><Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><h2 className="font-[var(--font-display)] text-3xl">Ready to check?</h2><p className="mt-2 text-slate-300">Get a private, actionable report in {page.duration}.</p></div><Link className="rounded-full bg-white px-6 py-3.5 font-extrabold text-[var(--ink)]" href={`/checks/${page.checkSlug}`}>{page.cta}</Link></Container></section>
  </main>;
}
