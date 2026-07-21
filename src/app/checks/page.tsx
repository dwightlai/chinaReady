import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { ToolGrid } from "@/components/site/tool-grid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trip checks",
  description: "Choose one of six practical China travel preparation checks.",
  alternates: { canonical: "/checks" },
  openGraph: {
    title: "Trip checks",
    description: "Choose one of four practical China travel preparation checks.",
    url: `${siteConfig.url}/checks`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function ChecksPage() {
  return (
    <main className="bg-[var(--surface)] py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Trip preparation</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">Trip checks</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Check the parts of your plan most likely to create avoidable problems.</p>
        <ToolGrid />
        <p className="mt-10 text-sm text-[var(--muted)]">
          Want background first? <Link className="font-bold text-[var(--ink)] underline underline-offset-4" href="/guides">Browse the guides</Link>.
        </p>
      </Container>
    </main>
  );
}
