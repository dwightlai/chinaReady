import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckExperience } from "@/features/checks/components/check-experience";
import { loadDraft, loadReport, saveDraft } from "@/features/checks/storage";
import type { ToolConfig } from "@/features/checks/types";

const miniConfig: ToolConfig = {
  slug: "readiness",
  name: "China Readiness Check",
  shortName: "Readiness",
  description: "Find the blockers that could disrupt your trip.",
  duration: "1 minute",
  lastReviewedAt: "2026-07-14",
  coveragePoints: ["Payment readiness"],
  sampleFinding: { severity: "critical", title: "Sample", explanation: "Sample explanation." },
  questions: [
    {
      id: "paymentReady",
      prompt: "Is your payment setup ready?",
      type: "single",
      required: true,
      options: [
        { label: "Yes, it is ready", value: true },
        { label: "No, it is not ready", value: false },
      ],
    },
  ],
  rules: [
    {
      code: "PAYMENT_NOT_READY",
      severity: "critical",
      priority: 1,
      group: "payment",
      all: [{ field: "paymentReady", operator: "eq", value: false }],
      title: "Your payment setup needs attention.",
      explanation: "You may not have a working way to pay on arrival.",
      actions: ["Set up and test a payment method."],
    },
  ],
};

describe("CheckExperience", () => {
  it("restores a saved draft when the traveler starts the check", async () => {
    const user = userEvent.setup();
    saveDraft("readiness", { currentStep: 0, answers: { paymentReady: true } });

    render(<CheckExperience config={miniConfig} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Continue my check" }));

    expect(screen.getByRole("radio", { name: "Yes, it is ready" })).toBeChecked();
  });

  it("evaluates answers, stores the report and clears it on request", async () => {
    const user = userEvent.setup();
    render(<CheckExperience config={miniConfig} />);

    await user.click(screen.getByRole("button", { name: "Start readiness check" }));
    await user.click(screen.getByRole("radio", { name: "No, it is not ready" }));
    await user.click(screen.getByRole("button", { name: "See my report" }));

    expect(screen.getByText("Your payment setup needs attention.")).toBeInTheDocument();
    expect(loadReport("readiness")?.report.counts.critical).toBe(1);

    await user.click(screen.getByRole("button", { name: "Clear report" }));
    await user.click(screen.getByRole("button", { name: "Yes, clear report" }));

    expect(screen.getByRole("button", { name: "Start readiness check" })).toBeInTheDocument();
    expect(loadReport("readiness")).toBeNull();
    expect(loadDraft("readiness")).toBeNull();
  });
});
