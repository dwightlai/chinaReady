import type { Finding, OverallStatus, ReportCounts, Severity } from "./types";

const deductions: Record<Severity, number> = {
  critical: 24,
  high: 12,
  information: 4,
  ready: 0,
};

export function countFindings(findings: Finding[]): ReportCounts {
  const counts: ReportCounts = { critical: 0, high: 0, information: 0, ready: 0 };
  for (const finding of findings) counts[finding.severity] += 1;
  return counts;
}

export function calculateScore(findings: Finding[]): number {
  const deduction = findings.reduce((total, finding) => total + deductions[finding.severity], 0);
  return Math.max(0, 100 - deduction);
}

export function overallStatus(counts: ReportCounts): OverallStatus {
  if (counts.critical > 0) return "not-ready";
  if (counts.high > 0) return "action-required";
  if (counts.information > 0) return "review";
  return "ready";
}
