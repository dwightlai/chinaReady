import Link from "next/link";

import { siteConfig } from "@/lib/site";

import { Container } from "./container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-white py-10">
      <Container className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <Link className="font-extrabold tracking-[-0.03em]" href="/">{siteConfig.wordmark}</Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Practical preparation checks for independent travel to China.</p>
          <p className="mt-3 text-sm text-[var(--muted)]">© {year} {siteConfig.wordmark}</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[var(--muted)]">
          <Link href="/checks">Checks</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </Container>
    </footer>
  );
}
