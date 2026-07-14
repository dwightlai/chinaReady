import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for ChinaTripCheck preparation tools and guides.",
};

export default function TermsPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-bold text-[var(--primary)]">Terms of use</p>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl tracking-[-0.05em] sm:text-6xl">Preparation guidance, not official advice.</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--muted)]">
          <p>{siteConfig.wordmark} provides deterministic preparation checks and educational guides for independent travel planning. It does not sell tickets, process payments, issue visas or provide emergency services.</p>
          <p>Reports are generated from your answers and published rules. They can be incomplete or become outdated as provider policies change. Always verify important details with the official provider before travel.</p>
          <p>You are responsible for the accuracy of the answers you enter and for any decisions you make after reading a report or guide.</p>
          <p>The site is provided as-is for informational preparation support. Use does not create an advisory, agency or fiduciary relationship.</p>
        </div>
        <Link className="mt-10 inline-block rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white" href="/checks/readiness">
          Check my trip
        </Link>
      </Container>
    </main>
  );
}
