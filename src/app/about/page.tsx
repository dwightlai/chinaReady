import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Why ChinaTripCheck helps international visitors find preparation risks before departure.",
  alternates: { canonical: "/about" },
};

const notFor = [
  "Visa eligibility or application processing",
  "Live ticket, hotel or attraction availability",
  "Booking, payment processing or itinerary generation",
  "Emergency help or official government advice",
];

export default function AboutPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold text-[var(--primary)]">About {siteConfig.wordmark}</p>
          <h1 className="mt-4 max-w-xl font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-5xl">Fewer hidden gaps before a big trip.</h1>
        </div>
        <div className="space-y-6 text-lg leading-8 text-[var(--muted)]">
          <p>First-time independent visitors often finish their bookings but still carry fragile assumptions about payment, high-demand dates and hotel arrival.</p>
          <p>{siteConfig.wordmark} makes those assumptions visible. It asks focused questions, explains the risk in plain language and recommends a practical backup.</p>
          <p>It is built for independent travelers preparing before departure—especially visitors who will rely on Alipay or WeChat Pay, intercity transport and hotel check-in without a local host.</p>
          <div>
            <h2 className="font-[var(--font-display)] text-2xl tracking-[-0.03em] text-[var(--ink)]">What this site does not do</h2>
            <ul className="mt-4 space-y-3">
              {notFor.map((item) => (
                <li className="flex gap-3" key={item}>
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p>It supports preparation and points travelers back to official providers for final verification.</p>
          <Link className="inline-block rounded-full bg-[var(--primary)] px-6 py-3 text-base font-extrabold text-white" href="/checks">Explore the checks</Link>
        </div>
      </Container>
    </main>
  );
}
