import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Questionnaire, visibleQuestions } from "@/features/checks/components/questionnaire";
import { paymentConfig } from "@/features/checks/configs";
import type { ToolConfig } from "@/features/checks/types";

const miniConfig: ToolConfig = {
  slug: "readiness",
  name: "Mini readiness",
  shortName: "Mini",
  description: "A test check.",
  duration: "1 minute",
  lastReviewedAt: "2026-07-14",
  coveragePoints: ["Train ticket status"],
  sampleFinding: { severity: "high", title: "Sample", explanation: "Sample explanation." },
  questions: [
    {
      id: "trainTravel",
      prompt: "Will you take a train during this trip?",
      type: "single",
      required: true,
      options: [
        { label: "Yes, I will take a train", value: true },
        { label: "No, I will not take a train", value: false },
      ],
    },
    {
      id: "trainTicketIssued",
      prompt: "Has your train ticket been issued?",
      type: "single",
      required: true,
      visibleWhen: { field: "trainTravel", equals: true },
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ],
  rules: [],
};

describe("Questionnaire", () => {
  it("keeps each payment diagnostic branch focused", () => {
    const commonAnswers = { paymentApps: ["alipay"] };
    const linkedFailure = visibleQuestions(paymentConfig, { ...commonAnswers, failureStage: "linked-payment-fails" });
    const riskControl = visibleQuestions(paymentConfig, { ...commonAnswers, failureStage: "risk-control" });
    const preflight = visibleQuestions(paymentConfig, { ...commonAnswers, failureStage: "preflight" });

    expect(linkedFailure.length).toBeLessThanOrEqual(17);
    expect(riskControl.length).toBeLessThanOrEqual(15);
    expect(preflight.length).toBeLessThanOrEqual(14);
  });

  it("blocks progression until a required answer is selected", async () => {
    const user = userEvent.setup();
    render(<Questionnaire config={miniConfig} onComplete={vi.fn()} onSave={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "See my report" }));

    expect(screen.getByText("Choose an answer to continue.")).toBeInTheDocument();
  });

  it("skips conditional questions that do not apply", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<Questionnaire config={miniConfig} onComplete={onComplete} onSave={vi.fn()} />);

    await user.click(screen.getByRole("radio", { name: "No, I will not take a train" }));
    await user.click(screen.getByRole("button", { name: "See my report" }));

    expect(screen.queryByText("Has your train ticket been issued?")).not.toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith({ trainTravel: false });
  });

  it("restores the saved answer and exposes accessible progress", () => {
    render(
      <Questionnaire
        config={miniConfig}
        initialDraft={{ currentStep: 0, answers: { trainTravel: true } }}
        onComplete={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(screen.getByRole("radio", { name: "Yes, I will take a train" })).toBeChecked();
    expect(screen.getByRole("progressbar", { name: "Question 1 of 2" })).toBeInTheDocument();
  });
});
