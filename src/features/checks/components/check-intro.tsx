import Link from "next/link";
import { Clock, LockKey } from "@phosphor-icons/react/dist/ssr";

import { guideCatalog } from "@/features/guides/catalog";

import type { ToolConfig } from "../types";

interface CheckIntroProps {
  config: ToolConfig;
  hasDraft: boolean;
  onStart: () => void;
  onQuickStart?: () => void;
  onFullStart?: () => void;
}

export function CheckIntro({ config, hasDraft, onStart, onQuickStart, onFullStart }: CheckIntroProps) {
  const relatedGuides = guideCatalog.filter((guide) => guide.applicableChecks.includes(config.slug)).slice(0, 3);
  const flowCopy = config.slug === "payment" ? {
    quickTitle: "Diagnose a payment problem", quickBody: "Choose the failure, answer 2–4 follow-ups, and get the next action.", quickTime: "About 60 seconds →",
    fullTitle: "Run full payment preflight", fullBody: "Check setup, verification, phone access and independent backups.", fullTime: "About 5 minutes →",
  } : config.slug === "train-booking" ? {
    quickTitle: "Fix a train booking problem", quickBody: "Check passport verification, ticket status or an urgent departure risk.", quickTime: "About 60–90 seconds →",
    fullTitle: "Check my complete train plan", fullBody: "Review booking, identity, ticket status, connections and train-day backup.", fullTime: "About 5 minutes →",
  } : {
    quickTitle: "Check my travel dates", quickBody: "Enter your trip dates and cities to see holiday and demand risk immediately.", quickTime: "About 45 seconds →",
    fullTitle: "Assess my booking exposure", fullBody: "Add rail, attraction, flexibility and booking details for a complete assessment.", fullTime: "About 2 minutes →",
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="text-sm font-bold text-[var(--primary)]">Trip preparation tool</p>
          {hasDraft ? <span className="mt-4 inline-block rounded-lg bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-extrabold tracking-[0.04em] text-[var(--pending)]">Pending</span> : null}
          <h1 className="mt-4 max-w-2xl font-[var(--font-display)] text-4xl leading-[1.15] tracking-[-0.03em] text-balance sm:text-5xl">
            {config.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{config.description}</p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[var(--muted)]">
            <span className="inline-flex items-center gap-2"><Clock aria-hidden size={18} />About {config.duration}</span>
            <span className="inline-flex items-center gap-2"><LockKey aria-hidden size={18} />Answers stay on this device</span>
          </div>

          {onQuickStart && onFullStart && !hasDraft ? <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <button className="rounded-[var(--radius-md)] bg-[var(--primary)] p-5 text-left text-white transition hover:bg-[var(--primary-dark)]" onClick={onQuickStart} type="button">
              <span className="block text-lg font-extrabold">{flowCopy.quickTitle}</span>
              <span className="mt-2 block text-sm leading-6 text-blue-100">{flowCopy.quickBody}</span>
              <span className="mt-3 block text-sm font-extrabold">{flowCopy.quickTime}</span>
            </button>
            <button className="rounded-[var(--radius-md)] border border-[var(--line)] bg-white p-5 text-left transition hover:bg-[var(--surface)]" onClick={onFullStart} type="button">
              <span className="block text-lg font-extrabold">{flowCopy.fullTitle}</span>
              <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{flowCopy.fullBody}</span>
              <span className="mt-3 block text-sm font-extrabold text-[var(--primary)]">{flowCopy.fullTime}</span>
            </button>
          </div> : <button
            className="mt-9 rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white transition hover:bg-[var(--primary-dark)] active:translate-y-px"
            onClick={onStart}
            type="button"
          >
            {hasDraft ? "Continue my check" : `Start ${config.shortName.toLowerCase()} check`}
          </button>}

          <div className="mt-12">
            <h2 className="text-sm font-extrabold tracking-[-0.02em] text-[var(--ink)]">What this check looks for</h2>
            <ul className="mt-4 space-y-3">
              {config.coveragePoints.map((point) => (
                <li className="flex gap-3 text-[var(--muted)]" key={point}>
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  <span className="leading-7">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {config.faqs?.length ? (
            <div className="mt-12">
              <h2 className="text-sm font-extrabold tracking-[-0.02em] text-[var(--ink)]">Before you start</h2>
              <div className="mt-4 space-y-3">
                {config.faqs.slice(0, 2).map((faq) => (
                  <details className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm" key={faq.question}>
                    <summary className="cursor-pointer font-bold text-[var(--ink)]">{faq.question}</summary>
                    <p className="mt-2 leading-6 text-[var(--muted)]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          {relatedGuides.length ? (
            <div className="mt-12 border-t border-[var(--line)] pt-8">
              <h2 className="text-sm font-extrabold tracking-[-0.02em] text-[var(--ink)]">Supporting guides after your check</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Use these explanations when your report identifies a related gap.</p>
              <ul className="mt-4 space-y-3">
                {relatedGuides.map((guide) => (
                  <li key={guide.slug}><Link className="font-bold text-[var(--primary)] underline-offset-4 hover:underline" href={`/guides/${guide.slug}`}>{guide.title}</Link></li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-7">
          <p className="text-sm font-bold text-[var(--muted)]">Example finding</p>
          <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--line)] bg-white p-5">
            <p className={`text-xs font-extrabold tracking-[0.04em] ${config.sampleFinding.severity === "critical" ? "text-[var(--critical)]" : "text-[var(--high)]"}`}>
              {config.sampleFinding.severity === "critical" ? "Critical" : "High risk"}
            </p>
            <h3 className="mt-3 text-lg font-extrabold tracking-[-0.03em]">{config.sampleFinding.title}</h3>
            <p className="mt-2 leading-7 text-[var(--muted)]">{config.sampleFinding.explanation}</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Your report lists findings like this, with actions and a backup plan.</p>
        </aside>
      </div>
    </section>
  );
}
