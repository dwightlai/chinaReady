import Link from "next/link";

import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-white py-10">
      <Container className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Link className="font-extrabold tracking-[-0.03em]" href="/">ChinaTripCheck</Link>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Practical preparation checks for independent travel to China.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[var(--muted)]">
          <Link href="/checks">Checks</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/about">About</Link>
        </nav>
      </Container>
    </footer>
  );
}
