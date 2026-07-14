import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RiskReport } from "@/features/checks/components/risk-report";
import type { RiskReport as RiskReportData } from "@/features/checks/types";

const report: RiskReportData = {
  tool: "payment",
  generatedAt: "2026-07-14T00:00:00.000Z",
  lastReviewedAt: "2026-07-14",
  overallStatus: "not-ready",
  score: 64,
  counts: { critical: 1, high: 1, information: 0, ready: 3 },
  findings: [
    {
      codes: ["CRITICAL"],
      group: "payment-path",
      severity: "critical",
      priority: 1,
      title: "Your payment setup has a single point of failure.",
      explanation: "No tested payment path or practical backup is available.",
      actions: ["Test a small payment.", "Add a backup card."],
      relatedGuides: [],
    },
    {
      codes: ["HIGH"],
      group: "verification",
      severity: "high",
      priority: 2,
      title: "Bank verification may be unavailable.",
      explanation: "Your issuer may require a message or app approval.",
      actions: ["Add a backup card."],
      relatedGuides: [],
    },
  ],
  actions: ["Test a small payment.", "Add a backup card."],
  backupPlan: ["Carry emergency RMB cash."],
  relatedGuides: [],
  relatedChecks: [],
};

describe("RiskReport", () => {
  it("renders labeled metrics, ordered findings and reviewed date", () => {
    render(<RiskReport report={report} onEdit={vi.fn()} onRestart={vi.fn()} onClear={vi.fn()} />);

    expect(screen.getByText("ACTION REQUIRED")).toBeInTheDocument();
    expect(screen.getAllByText("Critical").length).toBeGreaterThan(0);
    expect(screen.getAllByText("High risk").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Your payment setup has a single point of failure.",
      "Bank verification may be unavailable.",
    ]);
    expect(screen.getByText("Last reviewed July 14, 2026")).toBeInTheDocument();
  });

  it("renders deduplicated ordered actions and calls clear", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<RiskReport report={report} onEdit={vi.fn()} onRestart={vi.fn()} onClear={onClear} />);

    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      "Test a small payment.",
      "Add a backup card.",
      "Carry emergency RMB cash.",
    ]);

    await user.click(screen.getByRole("button", { name: "Clear report" }));
    expect(onClear).toHaveBeenCalledOnce();
  });
});
