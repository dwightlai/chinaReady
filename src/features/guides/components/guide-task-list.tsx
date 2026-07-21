"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

import type { GuideSlug, HowToStep } from "../types";

export function GuideTaskList({ guideSlug, steps }: { guideSlug: GuideSlug; steps: HowToStep[] }) {
  const storageKey = `ctc:guide:${guideSlug}:tasks`;
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          window.queueMicrotask(() => setCompleted(parsed));
        }
      }
    } catch {
      // Local storage can be unavailable in private browsing modes.
    }
  }, [storageKey]);

  const completedSet = useMemo(() => new Set(completed), [completed]);

  function toggle(name: string) {
    const next = completedSet.has(name) ? completed.filter((item) => item !== name) : [...completed, name];
    setCompleted(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Keep the checklist usable even when storage is unavailable.
    }
  }

  return (
    <section className="my-10 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7" aria-labelledby="guide-task-list-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--primary)]">Make it real</p>
          <h2 className="mt-2 font-[var(--font-display)] text-2xl tracking-[-0.03em]" id="guide-task-list-title">Your trip-ready checklist</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-[var(--muted)]">{completed.length}/{steps.length} done</span>
      </div>
      <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)]">Tick the steps you have completed. Progress is saved on this device and does not replace checking the provider&apos;s current rules.</p>
      <div className="mt-5 space-y-3">
        {steps.map((step) => {
          const isDone = completedSet.has(step.name);
          return (
            <label className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6 transition ${isDone ? "border-[#b9ddc7] bg-[#eef8f2] text-[var(--muted)]" : "border-[var(--line)] bg-white"}`} key={step.name}>
              <input checked={isDone} className="mt-1 size-4 accent-[var(--primary)]" onChange={() => toggle(step.name)} type="checkbox" />
              <span className="flex-1"><strong className={isDone ? "line-through" : ""}>{step.name}</strong><span className="mt-1 block text-[var(--muted)]">{step.text}</span></span>
              {isDone ? <CheckCircle aria-hidden className="mt-1 shrink-0 text-[var(--ready)]" size={18} weight="fill" /> : null}
            </label>
          );
        })}
      </div>
    </section>
  );
}
