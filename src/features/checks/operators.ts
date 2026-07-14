import type { Answers, Condition } from "./types";

function isMissing(value: unknown): boolean {
  return value === null || value === undefined || value === "" ||
    (Array.isArray(value) && value.length === 0);
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function dateValue(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(timestamp) ? null : timestamp;
}

export function evaluateCondition(answers: Answers, condition: Condition): boolean {
  const actual = answers[condition.field];

  switch (condition.operator) {
    case "eq":
      return actual === condition.value;
    case "neq":
      return actual !== condition.value;
    case "includes":
      return Array.isArray(actual) && actual.includes(String(condition.value));
    case "missing":
      return isMissing(actual);
    case "gt": {
      const number = asNumber(actual);
      return number !== null && number > Number(condition.value);
    }
    case "gte": {
      const number = asNumber(actual);
      return number !== null && number >= Number(condition.value);
    }
    case "lt": {
      const number = asNumber(actual);
      return number !== null && number < Number(condition.value);
    }
    case "lte": {
      const number = asNumber(actual);
      return number !== null && number <= Number(condition.value);
    }
    case "date-overlaps": {
      if (!condition.endField || !condition.value || typeof condition.value !== "object" || Array.isArray(condition.value)) {
        return false;
      }
      const arrival = dateValue(actual);
      const departure = dateValue(answers[condition.endField]);
      const windowStart = dateValue(condition.value.start);
      const windowEnd = dateValue(condition.value.end);
      if (arrival === null || departure === null || windowStart === null || windowEnd === null) {
        return false;
      }
      return arrival <= windowEnd && departure >= windowStart;
    }
  }
}

export function matchesRule(
  answers: Answers,
  rule: { all?: Condition[]; any?: Condition[] },
): boolean {
  const allMatches = !rule.all || rule.all.every((condition) => evaluateCondition(answers, condition));
  const anyMatches = !rule.any || rule.any.length === 0 ||
    rule.any.some((condition) => evaluateCondition(answers, condition));
  return allMatches && anyMatches;
}
