import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { QuestionField } from "@/features/checks/components/question-field";
import type { Question } from "@/features/checks/types";

const question: Question = {
  id: "apps",
  prompt: "Which apps?",
  type: "multiple",
  required: true,
  options: [
    { label: "Alipay", value: "alipay" },
    { label: "WeChat Pay", value: "wechat" },
    { label: "Neither", value: "none", exclusive: true },
  ],
};

describe("QuestionField multiple choice", () => {
  it("clears regular choices when an exclusive option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuestionField onChange={onChange} question={question} value={["alipay"]} />);

    await user.click(screen.getByRole("checkbox", { name: "Neither" }));

    expect(onChange).toHaveBeenCalledWith(["none"]);
  });

  it("clears an exclusive choice when a regular option is selected", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuestionField onChange={onChange} question={question} value={["none"]} />);

    await user.click(screen.getByRole("checkbox", { name: "Alipay" }));

    expect(onChange).toHaveBeenCalledWith(["alipay"]);
  });
});
