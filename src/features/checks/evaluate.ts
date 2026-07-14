import { mergeFindings } from "./merge-findings";
import { matchesRule } from "./operators";
import { calculateScore, countFindings, overallStatus } from "./score";
import type { Answers, RiskReport, ToolConfig } from "./types";

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function evaluateCheck(tool: ToolConfig, answers: Answers): RiskReport {
  const matchedRules = tool.rules.filter((rule) => matchesRule(answers, rule));
  const findings = mergeFindings(matchedRules);
  const counts = countFindings(findings);

  return {
    tool: tool.slug,
    generatedAt: new Date().toISOString(),
    lastReviewedAt: tool.lastReviewedAt,
    overallStatus: overallStatus(counts),
    score: calculateScore(findings),
    counts,
    findings,
    actions: unique(findings.flatMap((finding) => finding.actions)),
    backupPlan: unique(findings.map((finding) => finding.backup).filter((item): item is string => Boolean(item))),
    relatedGuides: unique(findings.flatMap((finding) => finding.relatedGuides)),
    relatedChecks: unique(
      findings.map((finding) => finding.relatedCheck).filter((item): item is ToolConfig["slug"] => Boolean(item)),
    ),
  };
}
