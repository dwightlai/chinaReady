import { CheckCircle, ListChecks, LockKey } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: "How ChinaTripCheck evaluates preparation risks while keeping answers on your device.",
};

const steps = [
  { icon: ListChecks, title: "Answer practical questions", text: "Choose the check you need and describe the plan you already have." },
  { icon: CheckCircle, title: "Match clear risk rules", text: "Deterministic rules compare your answers with documented preparation risks. No artificial intelligence is used." },
  { icon: LockKey, title: "Act on a private report", text: "Your report prioritizes blockers and backups. Answers and reports stay in this browser until you clear them." },
];

export default function HowItWorksPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <p className="text-sm font-bold text-[var(--primary)]">Transparent by design</p>
        <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-5xl tracking-[-0.05em] sm:text-6xl">A clear check, not a black box.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{siteConfig.wordmark} turns common preparation gaps into a short, ordered action plan.</p>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, text, title }, index) => (
            <section className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-8" key={title}>
              <Icon aria-hidden className="text-[var(--primary)]" size={28} />
              <p className="mt-7 text-sm font-bold text-[var(--muted)]">0{index + 1}</p>
              <h2 className="mt-3 text-xl font-extrabold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{text}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 max-w-3xl rounded-[var(--radius-md)] border border-[var(--line)] p-7">
          <h2 className="font-[var(--font-display)] text-3xl">What this tool cannot do</h2>
          <p className="mt-4 leading-8 text-[var(--muted)]">It does not replace official provider advice, live availability or emergency help. Time-sensitive information includes a review date so you know when to verify it again.</p>
        </div>
        <Link className="mt-9 inline-block rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white" href="/checks/readiness">Check my trip</Link>
      </Container>
    </main>
  );
}
