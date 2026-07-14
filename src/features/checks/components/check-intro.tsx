import { Clock, LockKey } from "@phosphor-icons/react/dist/ssr";

import type { ToolConfig } from "../types";

interface CheckIntroProps {
  config: ToolConfig;
  hasDraft: boolean;
  onStart: () => void;
}

export function CheckIntro({ config, hasDraft, onStart }: CheckIntroProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Trip preparation tool</p>
      {hasDraft ? <span className="mt-4 inline-block rounded-lg bg-[var(--surface-strong)] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--pending)]">Pending</span> : null}
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
    </section>
  );
}
