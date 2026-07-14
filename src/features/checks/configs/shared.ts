import type { Question, QuestionOption } from "../types";

export const yesNoUnsure: QuestionOption[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
  { label: "I'm not sure", value: "unsure" },
];

export const yesNo: QuestionOption[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

export function choice(
  id: string,
  prompt: string,
  options: QuestionOption[] = yesNoUnsure,
  help?: string,
  section?: string,
): Question {
  return { id, prompt, help, section, type: "single", required: true, options };
}
