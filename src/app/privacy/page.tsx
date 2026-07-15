import type { Metadata } from "next";
import Link from "next/link";

import { ClearLocalDataButton } from "@/components/site/clear-local-data-button";
import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How ChinaTripCheck handles answers, reports and browsing data, including Umami analytics.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy",
    description: "How ChinaTripCheck handles answers, reports and browsing data.",
    url: `${siteConfig.url}/privacy`,
    images: [{ url: siteConfig.ogImage }],
  },
};

export default function PrivacyPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <p className="text-sm font-bold text-[var(--primary)]">Data handling</p>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-5xl">Answers stay on your device.</h1>
        <div className="mt-8 space-y-6 text-lg leading-8 text-[var(--muted)]">
          <p>
            {siteConfig.wordmark} runs preparation checks in your browser. Answers and generated reports are stored in local browser storage on this device. They are not sent to a {siteConfig.wordmark} server for scoring or profile building.
          </p>
          <p>
            Clearing site data in your browser, using the clear controls inside a check, or using the button below removes those local drafts and reports. Opening the site in another browser or on another device starts fresh.
          </p>
          <p>
            The public site uses <a className="font-bold text-[var(--ink)] underline underline-offset-4" href="https://umami.is/" rel="noreferrer" target="_blank">Umami</a> for privacy-focused page-view analytics. Umami records basic visit metrics such as page path, referrer, browser and country. It does not load check answers, report contents or form fields. Analytics traffic goes to Umami Cloud (`cloud.umami.is`).
          </p>
          <p>
            Hosting providers may also see standard HTTP request logs. Check answers are not part of those logs.
          </p>
          <p>
            The tools do not create an account, and they do not require you to submit a passport, booking confirmation or payment credential to {siteConfig.wordmark}.
          </p>
        </div>
        <ClearLocalDataButton />
        <Link className="mt-10 inline-block rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white" href="/checks/readiness">
          Check my trip
        </Link>
      </Container>
    </main>
  );
}
