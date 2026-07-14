import { ArrowCounterClockwise, NotePencil, Trash } from "@phosphor-icons/react/dist/ssr";

import type { RiskReport as RiskReportData } from "../types";
import { ReportMetrics } from "./report-metrics";
import { RiskFinding } from "./risk-finding";

interface RiskReportProps {
  report: RiskReportData;
  onEdit: () => void;
  onRestart: () => void;
  onClear: () => void;
}

const statusLabels = {
  "not-ready": "ACTION REQUIRED",
  "action-required": "ACTION REQUIRED",
  review: "REVIEW NEEDED",
  ready: "READY",
} as const;

function displayDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function RiskReport({ report, onEdit, onRestart, onClear }: RiskReportProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-5 shadow-[0_20px_60px_rgba(29,58,78,0.08)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">Readiness score</p>
            <p className="mt-1 text-5xl font-extrabold tracking-[-0.06em] text-[var(--ink)]">{report.score}</p>
          </div>
          <span className="rounded-[var(--radius-sm)] bg-[#fff0e4] px-3 py-2 text-xs font-extrabold tracking-[0.05em] text-[#9a4311]">
            {statusLabels[report.overallStatus]}
          </span>
        </div>
        <ReportMetrics counts={report.counts} />
      </div>

      <div className="mt-8 space-y-3">
        {report.findings.length ? report.findings.map((finding) => (
          <RiskFinding finding={finding} key={finding.group} />
        )) : (
          <div className="rounded-[var(--radius-md)] border border-[#b9ddc7] bg-[#eef8f2] p-6">
            <h2 className="text-xl font-bold text-[var(--ready)]">No major blockers found</h2>
            <p className="mt-2 leading-7 text-[var(--muted)]">Keep your backups available and verify provider details before departure.</p>
          </div>
        )}
      </div>

      {(report.actions.length || report.backupPlan.length) ? (
        <section className="mt-8 rounded-[var(--radius-md)] bg-[var(--surface)] p-5 sm:p-7">
          <h2 className="font-[var(--font-display)] text-2xl tracking-[-0.03em]">What to do next</h2>
          <ol className="mt-4 space-y-3 pl-6 leading-7 text-[var(--ink)]">
            {report.actions.map((action) => <li className="list-decimal pl-2" key={action}>{action}</li>)}
          </ol>
          {report.backupPlan.length ? (
            <div className="mt-6 border-l-2 border-[var(--warm)] pl-4">
              <h2 className="font-bold">Backup plan</h2>
              <ul className="mt-2 space-y-2 leading-7 text-[var(--muted)]">
                {report.backupPlan.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ) : null}
        </section>
      ) : null}

      <p className="mt-6 text-sm text-[var(--muted)]">Last reviewed {displayDate(report.lastReviewedAt)}</p>
      <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--muted)]">
        This check identifies likely preparation risks. Verify important details with the official provider before travel.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 font-bold" onClick={onEdit} type="button"><NotePencil aria-hidden size={18} />Edit answers</button>
        <button className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 font-bold" onClick={onRestart} type="button"><ArrowCounterClockwise aria-hidden size={18} />Restart</button>
        <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold text-[var(--critical)]" onClick={onClear} type="button"><Trash aria-hidden size={18} />Clear report</button>
      </div>
    </section>
  );
}
