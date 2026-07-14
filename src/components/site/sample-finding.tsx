import Link from "next/link";

export function SampleFinding() {
  return (
    <aside className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-7 sm:p-9">
      <p className="text-sm font-bold text-[var(--primary)]">Typical finding</p>
      <p className="mt-4 text-xs font-extrabold tracking-[0.04em] text-[var(--critical)]">Critical</p>
      <h2 className="mt-3 max-w-2xl font-[var(--font-display)] text-2xl leading-snug tracking-[-0.03em] text-balance sm:text-3xl">Your hotel details may not be usable on arrival.</h2>
      <p className="mt-4 max-w-[52ch] leading-8 text-[var(--muted)]">
        Drivers and local maps may not recognize an English hotel name. Save the name and full address in Chinese before you leave.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link className="rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[var(--primary-dark)]" href="/checks/readiness">
          Run the full check
        </Link>
        <Link className="text-sm font-extrabold text-[var(--ink)]" href="/guides/save-hotel-name-address-in-chinese">
          Read the hotel address guide →
        </Link>
      </div>
    </aside>
  );
}
