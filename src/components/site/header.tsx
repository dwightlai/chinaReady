"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Container } from "./container";

const navItems = [
  { href: "/checks", label: "Checks" },
  { href: "/guides", label: "Guides" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
] as const;

function navClass(pathname: string, href: string) {
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return active
    ? "text-[var(--ink)]"
    : "text-[var(--muted)] transition hover:text-[var(--ink)]";
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const close = () => setIsOpen(false);

  return (
    <header className="relative z-50 border-b border-[var(--line)] bg-white/95">
      <Container className="flex min-h-20 items-center justify-between gap-3">
        <Link aria-label="ChinaTripCheck home" className="text-lg font-extrabold tracking-[-0.035em] text-[var(--ink)]" href="/">
          China<span className="text-[var(--primary)]">TripCheck</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-sm font-bold md:flex">
          {navItems.map((item) => (
            <Link aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined} className={navClass(pathname, item.href)} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="hidden whitespace-nowrap rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[var(--primary-dark)] sm:inline-flex" href="/checks/readiness">
          Check my trip
        </Link>
        <button
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="grid size-11 place-items-center rounded-full border border-[var(--line)] text-[var(--ink)] md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X aria-hidden size={21} weight="bold" /> : <List aria-hidden size={22} weight="bold" />}
        </button>
      </Container>
      {isOpen ? (
        <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-y border-[var(--line)] bg-white p-5 shadow-[0_18px_45px_rgba(20,43,62,0.12)] md:hidden">
          <div className="mx-auto grid max-w-[1180px] gap-1">
            {navItems.map((item) => (
              <Link className={`rounded-xl px-4 py-3 font-bold ${navClass(pathname, item.href)}`} href={item.href} key={item.href} onClick={close}>
                {item.label}
              </Link>
            ))}
            <Link className="mt-2 rounded-full bg-[var(--primary)] px-5 py-3 text-center font-extrabold text-white" href="/checks/readiness" onClick={close}>Check my trip</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
