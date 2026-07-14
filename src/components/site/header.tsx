import Link from "next/link";

import { Container } from "./container";

export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-white/95">
      <Container className="flex min-h-20 items-center justify-between gap-8">
        <Link aria-label="ChinaTripCheck home" className="text-lg font-extrabold tracking-[-0.035em] text-[var(--ink)]" href="/">
          China<span className="text-[var(--primary)]">TripCheck</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-bold text-[var(--muted)] md:flex">
          <Link className="transition hover:text-[var(--ink)]" href="/checks">Checks</Link>
          <Link className="transition hover:text-[var(--ink)]" href="/guides">Guides</Link>
          <Link className="transition hover:text-[var(--ink)]" href="/how-it-works">How it works</Link>
          <Link className="transition hover:text-[var(--ink)]" href="/about">About</Link>
        </nav>
        <Link className="whitespace-nowrap rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[var(--primary-dark)]" href="/checks/readiness">
          Check my trip
        </Link>
      </Container>
    </header>
  );
}
