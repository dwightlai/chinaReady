import type { Finding, RiskRule, Severity } from "./types";

const severityRank: Record<Severity, number> = {
  critical: 0,
  high: 1,
  information: 2,
  ready: 3,
};

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function mergeFindings(rules: RiskRule[]): Finding[] {
  const grouped = new Map<string, RiskRule[]>();
  for (const rule of rules) {
    grouped.set(rule.group, [...(grouped.get(rule.group) ?? []), rule]);
  }

  return [...grouped.entries()]
    .map(([group, groupRules]) => {
      const ordered = [...groupRules].sort(
        (left, right) => severityRank[left.severity] - severityRank[right.severity] || left.priority - right.priority,
      );
      const strongest = ordered[0];
      if (!strongest) throw new Error(`Finding group ${group} has no rules.`);

      return {
        codes: ordered.map((rule) => rule.code),
        group,
        severity: strongest.severity,
        priority: Math.min(...ordered.map((rule) => rule.priority)),
        title: strongest.title,
        explanation: strongest.explanation,
        actions: unique(ordered.flatMap((rule) => rule.actions)),
        backup: ordered.find((rule) => rule.backup)?.backup,
        relatedGuides: unique(ordered.flatMap((rule) => rule.relatedGuides ?? [])),
        relatedCheck: ordered.find((rule) => rule.relatedCheck)?.relatedCheck,
      } satisfies Finding;
    })
    .sort(
      (left, right) => severityRank[left.severity] - severityRank[right.severity] || left.priority - right.priority,
    );
}
