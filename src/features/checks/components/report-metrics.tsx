import type { ReportCounts } from "../types";

export function ReportMetrics({ counts, actionCount }: { counts: ReportCounts; actionCount: number }) {
  const metrics = [
    ["Critical", counts.critical, "text-[var(--critical)]"],
    ["High risk", counts.high, "text-[var(--high)]"],
    ["Info", counts.information, "text-[var(--pending)]"],
    ["Next actions", actionCount, "text-[var(--primary)]"],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Report totals">
      {metrics.map(([label, value, color]) => (
        <div className="rounded-[var(--radius-sm)] bg-[var(--surface)] p-3 sm:p-4" key={label}>
          <strong className={`block text-2xl ${color}`}>{value}</strong>
          <span className="mt-1 block text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">{label}</span>
        </div>
      ))}
    </div>
  );
}
