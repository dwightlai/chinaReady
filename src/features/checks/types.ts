import type { ArticleFaq } from "@/features/guides/content/article-sections";

export type CheckSlug = "readiness" | "apps" | "payment" | "train-booking" | "dates" | "hotel-arrival";
export type Severity = "critical" | "high" | "information" | "ready";
export type OverallStatus = "not-ready" | "action-required" | "review" | "ready";
export type AnswerValue = string | number | boolean | string[] | null;
export type Answers = Record<string, AnswerValue>;
export type Operator =
  | "eq"
  | "neq"
  | "includes"
  | "missing"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "date-before"
  | "date-after"
  | "date-after-field"
  | "time-between"
  | "date-overlaps"
  | "text-includes"
  | "text-excludes"
  | "not-yes";

export interface Condition {
  field: string;
  endField?: string;
  operator: Operator;
  value?: AnswerValue | { start: string; end: string };
}

export interface QuestionOption {
  label: string;
  value: string | boolean;
  description?: string;
  exclusive?: boolean;
}

export interface VisibilityRule {
  field: string;
  equals: AnswerValue;
}

export interface Question {
  id: string;
  prompt: string;
  help?: string;
  section?: string;
  type: "single" | "multiple" | "date" | "time" | "text";
  required: boolean;
  options?: QuestionOption[];
  visibleWhen?: VisibilityRule;
}

export interface RiskRule {
  code: string;
  severity: Severity;
  priority: number;
  group: string;
  all?: Condition[];
  any?: Condition[];
  title: string;
  explanation: string;
  actions: string[];
  steps?: string[];
  doneWhen?: string[];
  backup?: string;
  relatedGuides?: string[];
  relatedCheck?: CheckSlug;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface SampleFindingPreview {
  severity: "critical" | "high";
  title: string;
  explanation: string;
}

export interface ToolConfig {
  slug: CheckSlug;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  lastReviewedAt: string;
  coveragePoints: string[];
  sampleFinding: SampleFindingPreview;
  faqs?: ArticleFaq[];
  sources?: SourceLink[];
  questions: Question[];
  rules: RiskRule[];
}

export interface Finding {
  codes: string[];
  group: string;
  severity: Severity;
  priority: number;
  title: string;
  explanation: string;
  actions: string[];
  steps?: string[];
  doneWhen?: string[];
  backup?: string;
  relatedGuides: string[];
  relatedCheck?: CheckSlug;
}

export interface ReportCounts {
  critical: number;
  high: number;
  information: number;
  ready: number;
}

export interface RiskReport {
  tool: CheckSlug;
  generatedAt: string;
  lastReviewedAt: string;
  overallStatus: OverallStatus;
  score: number;
  counts: ReportCounts;
  findings: Finding[];
  actions: string[];
  backupPlan: string[];
  relatedGuides: string[];
  relatedChecks: CheckSlug[];
}

export interface HolidayEvent {
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  preRiskDays: number;
  postRiskDays: number;
  affectedCities: string[];
  official: boolean;
  sourceUrl?: string;
  lastReviewedAt: string;
}
