import type { ReportCounts } from "../types";

export function ReportMetrics({ counts }: { counts: ReportCounts }) {
  const metrics = [
    ["Critical", counts.critical, "text-[var(--critical)]"],
    ["High risk", counts.high, "text-[var(--high)]"],
    ["Ready", counts.ready, "text-[var(--ready)]"],
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-2" aria-label="Report totals">
      {metrics.map(([label, value, color]) => (
        <div className="rounded-[var(--radius-sm)] bg-[var(--surface)] p-3 sm:p-4" key={label}>
          <strong className={`block text-2xl ${color}`}>{value}</strong>
          <span className="mt-1 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{label}</span>
        </div>
      ))}
    </div>
  );
}
