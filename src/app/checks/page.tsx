import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { ToolGrid } from "@/components/site/tool-grid";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "China Travel Checkers and Tools",
  description: "Choose one of seven practical China travel checkers and preparation tools.",
  alternates: { canonical: "/checks" },
  openGraph: {
    title: "China Travel Checkers and Tools",
    description: "Choose one of seven practical China travel checkers and preparation tools.",
    url: `${siteConfig.url}/checks`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function ChecksPage() {
  return (
    <main className="bg-[var(--surface)] py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Trip preparation</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] sm:text-5xl">China Travel Checkers and Tools</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">Use these free tools to check the parts of your plan most likely to create avoidable problems.</p>
        <ToolGrid />
        <p className="mt-10 text-sm text-[var(--muted)]">Already have a report? <Link className="font-bold text-[var(--ink)] underline underline-offset-4" href="/guides">Use the checker support library</Link> to resolve a specific finding.</p>
      </Container>
    </main>
  );
}
