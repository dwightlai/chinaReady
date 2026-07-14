import { describe, expect, it } from "vitest";

import { evaluateCheck } from "@/features/checks/evaluate";
import { evaluateCondition } from "@/features/checks/operators";
import type { Answers, ToolConfig } from "@/features/checks/types";

const sampleTool: ToolConfig = {
  slug: "payment",
  name: "Payment Setup Check",
  shortName: "Payment",
  description: "Find payment single points of failure.",
  duration: "3 minutes",
  lastReviewedAt: "2026-07-14",
  questions: [],
  rules: [
    {
      code: "PAYMENT_UNTESTED",
      severity: "high",
      priority: 20,
      group: "payment-resilience",
      all: [{ field: "paymentTested", operator: "eq", value: false }],
      title: "Your payment setup has not been tested.",
      explanation: "A linked card can still fail during a real transaction.",
      actions: [
        "Test a small payment before departure.",
        "Add a second card from another issuer.",
      ],
    },
    {
      code: "PAYMENT_SINGLE_POINT",
      severity: "critical",
      priority: 10,
      group: "payment-resilience",
      all: [
        { field: "paymentTested", operator: "eq", value: false },
        { field: "backupCard", operator: "eq", value: false },
        { field: "cashBackup", operator: "eq", value: false },
      ],
      title: "Your payment setup has a single point of failure.",
      explanation: "There is no tested payment path or practical backup.",
      actions: [
        "Test a small payment before departure.",
        "Add a second card from another issuer.",
        "Carry emergency RMB cash.",
      ],
      backup: "Keep a physical card and emergency cash separate from your phone.",
    },
  ],
};

describe("evaluateCondition", () => {
  const answers: Answers = {
    enabled: true,
    mode: "mobile",
    apps: ["alipay", "wechat"],
    cards: 1,
    optional: null,
    hotelArrivalTime: "00:30",
    arrivalDate: "2026-10-01",
    departureDate: "2026-10-05",
  };

  it.each([
    [{ field: "enabled", operator: "eq", value: true }, true],
    [{ field: "mode", operator: "neq", value: "cash" }, true],
    [{ field: "apps", operator: "includes", value: "alipay" }, true],
    [{ field: "optional", operator: "missing" }, true],
    [{ field: "cards", operator: "gt", value: 0 }, true],
    [{ field: "cards", operator: "gte", value: 1 }, true],
    [{ field: "cards", operator: "lt", value: 2 }, true],
    [{ field: "cards", operator: "lte", value: 1 }, true],
    [{ field: "arrivalDate", operator: "date-before", value: "2026-12-31" }, true],
    [{ field: "arrivalDate", operator: "date-after", value: "2026-01-01" }, true],
    [{ field: "hotelArrivalTime", operator: "time-between", value: { start: "23:00", end: "05:00" } }, true],
  ] as const)("evaluates %o", (condition, expected) => {
    expect(evaluateCondition(answers, condition)).toBe(expected);
  });

  it("detects an overlapping date range", () => {
    expect(
      evaluateCondition(answers, {
        field: "arrivalDate",
        endField: "departureDate",
        operator: "date-overlaps",
        value: { start: "2026-10-01", end: "2026-10-07" },
      }),
    ).toBe(true);
  });

  it("compares two answer dates", () => {
    expect(
      evaluateCondition({ arrival: "2026-08-10", departure: "2026-08-05" }, {
        field: "arrival",
        endField: "departure",
        operator: "date-after-field",
      }),
    ).toBe(true);
  });
});

describe("evaluateCheck", () => {
  it("merges related rules and keeps the strongest finding", () => {
    const report = evaluateCheck(sampleTool, {
      paymentTested: false,
      backupCard: false,
      cashBackup: false,
    });

    expect(report).toMatchObject({
      overallStatus: "not-ready",
      score: 76,
      counts: { critical: 1, high: 0, information: 0, ready: 0 },
    });
    expect(report.findings).toHaveLength(1);
    expect(report.findings[0]).toMatchObject({
      group: "payment-resilience",
      severity: "critical",
      title: "Your payment setup has a single point of failure.",
    });
  });

  it("deduplicates actions while preserving their order", () => {
    const report = evaluateCheck(sampleTool, {
      paymentTested: false,
      backupCard: false,
      cashBackup: false,
    });

    expect(report.actions).toEqual([
      "Test a small payment before departure.",
      "Add a second card from another issuer.",
      "Carry emergency RMB cash.",
    ]);
  });

  it("returns a ready report when no risk rules match", () => {
    const report = evaluateCheck(sampleTool, {
      paymentTested: true,
      backupCard: true,
      cashBackup: true,
    });

    expect(report).toMatchObject({
      overallStatus: "ready",
      score: 100,
      findings: [],
    });
  });
});
