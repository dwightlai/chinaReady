import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react/dist/ssr";

import type { Finding, Severity } from "../types";

const styles: Record<Severity, { label: string; border: string; icon: typeof XCircle }> = {
  critical: { label: "Critical", border: "border-l-[var(--critical)]", icon: XCircle },
  high: { label: "High risk", border: "border-l-[var(--high)]", icon: Warning },
  information: { label: "Information", border: "border-l-[var(--primary)]", icon: Info },
  ready: { label: "Ready", border: "border-l-[var(--ready)]", icon: CheckCircle },
};

export function RiskFinding({ finding }: { finding: Finding }) {
  const style = styles[finding.severity];
  const Icon = style.icon;
  return (
    <article className={`rounded-[var(--radius-sm)] border border-[var(--line)] border-l-4 bg-white p-5 ${style.border}`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
        <Icon aria-hidden size={18} weight="bold" />
        {style.label}
      </div>
      <h3 className="mt-3 text-lg font-bold tracking-[-0.02em] text-[var(--ink)]">{finding.title}</h3>
      <p className="mt-2 leading-7 text-[var(--muted)]">{finding.explanation}</p>
      <div className="mt-5 grid gap-4 border-t border-[var(--line)] pt-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--ink)]">Do this</p>
          <div className="mt-2 space-y-2 text-sm leading-6 text-[var(--ink)]">
            {(finding.steps?.length ? finding.steps : finding.actions).map((step) => (
              <p className="flex gap-2" key={step}><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--primary)]" />{step}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--ink)]">Done when</p>
          <div className="mt-2 space-y-2 text-sm leading-6 text-[var(--muted)]">
            {(finding.doneWhen?.length ? finding.doneWhen : ["Complete the steps above, then run this check again."]).map((item) => (
              <p className="flex gap-2" key={item}><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--ready)]" />{item}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
