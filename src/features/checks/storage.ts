import type { Answers, CheckSlug, RiskReport } from "./types";

const VERSION = 1 as const;
const CHECKS: CheckSlug[] = ["readiness", "payment", "dates", "hotel-arrival"];

export interface DraftState {
  currentStep: number;
  answers: Answers;
}

export interface StoredDraft extends DraftState {
  version: typeof VERSION;
}

export interface StoredReport {
  version: typeof VERSION;
  report: RiskReport;
}

function key(slug: CheckSlug, type: "draft" | "report"): string {
  return `ctc:check:${slug}:${type}`;
}

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function isAnswers(value: unknown): value is Answers {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((answer) =>
    answer === null ||
    typeof answer === "string" ||
    typeof answer === "number" ||
    typeof answer === "boolean" ||
    (Array.isArray(answer) && answer.every((item) => typeof item === "string")),
  );
}

function isStoredDraft(value: unknown): value is StoredDraft {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredDraft>;
  return candidate.version === VERSION &&
    typeof candidate.currentStep === "number" &&
    Number.isInteger(candidate.currentStep) &&
    candidate.currentStep >= 0 &&
    isAnswers(candidate.answers);
}

function isStoredReport(value: unknown, slug: CheckSlug): value is StoredReport {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StoredReport>;
  const report = candidate.report as Partial<RiskReport> | undefined;
  return candidate.version === VERSION &&
    Boolean(report) &&
    report?.tool === slug &&
    typeof report.score === "number" &&
    Array.isArray(report.findings) &&
    Array.isArray(report.actions);
}

function read<T>(storageKey: string, validate: (value: unknown) => value is T): T | null {
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(storageKey);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (validate(parsed)) return parsed;
    store.removeItem(storageKey);
    return null;
  } catch {
    try {
      store.removeItem(storageKey);
    } catch {
      return null;
    }
    return null;
  }
}

function write(storageKey: string, value: unknown): void {
  try {
    storage()?.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Checks remain usable in memory when browser storage is unavailable.
  }
}

export function saveDraft(slug: CheckSlug, draft: DraftState): void {
  write(key(slug, "draft"), { version: VERSION, ...draft } satisfies StoredDraft);
}

export function loadDraft(slug: CheckSlug): StoredDraft | null {
  return read(key(slug, "draft"), isStoredDraft);
}

export function saveReport(slug: CheckSlug, report: RiskReport): void {
  write(key(slug, "report"), { version: VERSION, report } satisfies StoredReport);
}

export function loadReport(slug: CheckSlug): StoredReport | null {
  return read(key(slug, "report"), (value): value is StoredReport => isStoredReport(value, slug));
}

export function clearCheckData(slug: CheckSlug): void {
  const store = storage();
  if (!store) return;
  try {
    store.removeItem(key(slug, "draft"));
    store.removeItem(key(slug, "report"));
  } catch {
    // Clearing local data is best effort in restricted browser contexts.
  }
}

export function clearAllCheckData(): void {
  for (const slug of CHECKS) clearCheckData(slug);
}
