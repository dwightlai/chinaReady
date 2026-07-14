import { beforeEach, describe, expect, it } from "vitest";

import {
  clearAllCheckData,
  clearCheckData,
  loadDraft,
  loadReport,
  saveDraft,
  saveReport,
} from "@/features/checks/storage";
import type { RiskReport } from "@/features/checks/types";

describe("check storage", () => {
  beforeEach(() => localStorage.clear());

  it("saves and restores a versioned draft", () => {
    saveDraft("payment", { currentStep: 3, answers: { paymentTested: false } });

    expect(loadDraft("payment")).toEqual({
      version: 1,
      currentStep: 3,
      answers: { paymentTested: false },
    });
  });

  it("removes corrupt draft data", () => {
    localStorage.setItem("ctc:check:payment:draft", "broken-json");

    expect(loadDraft("payment")).toBeNull();
    expect(localStorage.getItem("ctc:check:payment:draft")).toBeNull();
  });

  it("saves and clears a report for one check", () => {
    const report: RiskReport = {
      tool: "payment",
      generatedAt: "2026-07-14T00:00:00.000Z",
      lastReviewedAt: "2026-07-14",
      overallStatus: "ready",
      score: 100,
      counts: { critical: 0, high: 0, information: 0, ready: 0 },
      findings: [],
      actions: [],
      backupPlan: [],
      relatedGuides: [],
      relatedChecks: [],
    };

    saveReport("payment", report);
    expect(loadReport("payment")).toEqual({ version: 1, report });

    clearCheckData("payment");
    expect(loadDraft("payment")).toBeNull();
    expect(loadReport("payment")).toBeNull();
  });

  it("clears every known check without removing unrelated data", () => {
    saveDraft("payment", { currentStep: 1, answers: {} });
    saveDraft("hotel-arrival", { currentStep: 2, answers: {} });
    localStorage.setItem("unrelated", "keep");

    clearAllCheckData();

    expect(loadDraft("payment")).toBeNull();
    expect(loadDraft("hotel-arrival")).toBeNull();
    expect(localStorage.getItem("unrelated")).toBe("keep");
  });
});
