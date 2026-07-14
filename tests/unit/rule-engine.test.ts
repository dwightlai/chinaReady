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
  coveragePoints: ["Payment test", "Backup card"],
  sampleFinding: { severity: "high", title: "Sample", explanation: "Sample explanation." },
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
    [{ field: "mode", operator: "text-includes", value: "mobile" }, true],
    [{ field: "mode", operator: "text-excludes", value: "cash" }, true],
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

describe("dates holiday windows", () => {
  it("applies preRiskDays before the official holiday start", async () => {
    const { datesConfig } = await import("@/features/checks/configs/dates");
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2026-09-29",
      departureDate: "2026-09-30",
      cities: "Shanghai",
      intercityTravel: false,
      highSpeedRail: false,
      popularAttractions: false,
      datesFlexible: true,
      bookingsComplete: true,
    });

    expect(report.findings.some((finding) => finding.codes.includes("CN_NATIONAL_DAY_2026_OVERLAP"))).toBe(true);
  });

  it("keeps multiple holiday findings instead of merging them", async () => {
    const { datesConfig } = await import("@/features/checks/configs/dates");
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2026-01-20",
      departureDate: "2026-02-20",
      cities: "Beijing",
      intercityTravel: false,
      highSpeedRail: false,
      popularAttractions: false,
      datesFlexible: true,
      bookingsComplete: true,
    });

    const holidayFindings = report.findings.filter((finding) => finding.group.startsWith("holiday-overlap-"));
    expect(holidayFindings.length).toBeGreaterThan(1);
  });

  it("flags departure dates outside the verified window", async () => {
    const { datesConfig } = await import("@/features/checks/configs/dates");
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2026-12-28",
      departureDate: "2027-01-05",
      cities: "Beijing",
      intercityTravel: false,
      highSpeedRail: false,
      popularAttractions: false,
      datesFlexible: true,
      bookingsComplete: true,
    });

    expect(report.findings.some((finding) => finding.codes.includes("DATES_OUTSIDE_WINDOW"))).toBe(true);
  });

  it("keeps Canton Fair high only for Guangzhou trips", async () => {
    const { datesConfig } = await import("@/features/checks/configs/dates");
    const guangzhou = evaluateCheck(datesConfig, {
      arrivalDate: "2026-04-20",
      departureDate: "2026-04-25",
      cities: "Guangzhou",
      intercityTravel: false,
      highSpeedRail: false,
      popularAttractions: false,
      datesFlexible: true,
      bookingsComplete: true,
    });
    const beijing = evaluateCheck(datesConfig, {
      arrivalDate: "2026-04-20",
      departureDate: "2026-04-25",
      cities: "Beijing",
      intercityTravel: false,
      highSpeedRail: false,
      popularAttractions: false,
      datesFlexible: true,
      bookingsComplete: true,
    });

    expect(guangzhou.findings.some((finding) => finding.codes.includes("CN_CANTON_FAIR_SPRING_2026_LOCAL") && finding.severity === "high")).toBe(true);
    expect(beijing.findings.some((finding) => finding.codes.includes("CN_CANTON_FAIR_SPRING_2026_OTHER") && finding.severity === "information")).toBe(true);
    expect(beijing.findings.some((finding) => finding.codes.includes("CN_CANTON_FAIR_SPRING_2026_LOCAL"))).toBe(false);
    expect(beijing.findings.some((finding) => /Guangzhou hotels/i.test(finding.actions.join(" ")))).toBe(false);
  });
});
