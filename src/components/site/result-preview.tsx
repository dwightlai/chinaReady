export function ResultPreview() {
  return (
    <div className="w-[min(19rem,85%)] rounded-[1.25rem] border border-white/80 bg-white p-5 shadow-[0_24px_70px_rgba(17,42,61,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">Readiness score</p>
          <p className="mt-1 text-4xl font-extrabold tracking-[-0.06em]">64</p>
        </div>
        <span className="rounded-lg bg-[#fff0e4] px-2.5 py-2 text-[0.62rem] font-extrabold tracking-[0.05em] text-[#9a4311]">ACTION REQUIRED</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="Critical" value="2" tone="text-[var(--critical)]" />
        <Metric label="High risk" value="3" tone="text-[var(--high)]" />
        <Metric label="Ready" value="4" tone="text-[var(--ready)]" />
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl bg-[var(--surface)] p-3">
      <p className={`text-base font-extrabold ${tone}`}>{value}</p>
      <p className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.05em] text-[var(--muted)]">{label}</p>
    </div>
  );
}
