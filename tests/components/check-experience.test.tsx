import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CheckExperience } from "@/features/checks/components/check-experience";
import { datesConfig, paymentConfig, trainBookingConfig } from "@/features/checks/configs";
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
  it("offers a short payment diagnosis before the full preflight", async () => {
    const user = userEvent.setup();
    render(<CheckExperience config={paymentConfig} />);

    expect(screen.getByRole("button", { name: /Diagnose a payment problem/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Run full payment preflight/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Diagnose a payment problem/ }));
    expect(screen.getByRole("heading", { name: "Where are you in the payment setup or failure path?" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Quick diagnosis 1 of 1" })).toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: "I have not finished setup" })).not.toBeInTheDocument();
    expect(screen.queryByRole("radio", { name: "Payment works; I want a preflight check" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("radio", { name: "The card is linked but payment fails" }));
    expect(screen.getByRole("progressbar", { name: "Quick diagnosis 1 of 5" })).toBeInTheDocument();
  });

  it("starts full payment preflight without diagnostic-only questions", async () => {
    const user = userEvent.setup();
    render(<CheckExperience config={paymentConfig} />);

    await user.click(screen.getByRole("button", { name: /Run full payment preflight/ }));
    expect(screen.getByRole("heading", { name: "Which mobile payment apps have you set up?" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Where are you in the payment setup or failure path?" })).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Full preflight 1 of 13" })).toBeInTheDocument();
  });

  it("offers quick and complete train paths", async () => {
    const user = userEvent.setup();
    render(<CheckExperience config={trainBookingConfig} />);

    expect(screen.getByRole("button", { name: /Fix a train booking problem/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Check my complete train plan/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Fix a train booking problem/ }));
    expect(screen.getByRole("heading", { name: "What do you need help with right now?" })).toBeInTheDocument();
  });

  it("offers an immediate date check before the booking assessment", async () => {
    const user = userEvent.setup();
    render(<CheckExperience config={datesConfig} />);

    expect(screen.getByRole("button", { name: /Check my travel dates/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Assess my booking exposure/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Check my travel dates/ }));
    expect(screen.getByRole("progressbar", { name: "Quick check 1 of 3" })).toBeInTheDocument();
  });

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
