import { Clock, LockKey } from "@phosphor-icons/react/dist/ssr";

import type { ToolConfig } from "../types";

interface CheckIntroProps {
  config: ToolConfig;
  hasDraft: boolean;
  onStart: () => void;
}

export function CheckIntro({ config, hasDraft, onStart }: CheckIntroProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className="text-sm font-bold text-[var(--primary)]">Trip preparation tool</p>
          {hasDraft ? <span className="mt-4 inline-block rounded-lg bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-extrabold tracking-[0.04em] text-[var(--pending)]">Pending</span> : null}
          <h1 className="mt-4 max-w-3xl font-[var(--font-display)] text-4xl leading-[1.06] tracking-[-0.045em] text-[var(--ink)] sm:text-6xl">
            {config.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">{config.description}</p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[var(--muted)]">
            <span className="inline-flex items-center gap-2"><Clock aria-hidden size={18} />About {config.duration}</span>
            <span className="inline-flex items-center gap-2"><LockKey aria-hidden size={18} />Answers stay on this device</span>
          </div>

          <button
            className="mt-9 rounded-full bg-[var(--primary)] px-6 py-3 font-extrabold text-white transition hover:bg-[var(--primary-dark)] active:translate-y-px"
            onClick={onStart}
            type="button"
          >
            {hasDraft ? "Continue my check" : `Start ${config.shortName.toLowerCase()} check`}
          </button>

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
