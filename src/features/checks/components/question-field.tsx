import type { AnswerValue, Question } from "../types";

interface QuestionFieldProps {
  question: Question;
  value: AnswerValue | undefined;
  error?: string;
  onChange: (value: AnswerValue) => void;
}

export function QuestionField({ question, value, error, onChange }: QuestionFieldProps) {
  const errorId = `${question.id}-error`;

  if (question.type === "single") {
    return (
      <fieldset aria-describedby={error ? errorId : undefined} className="space-y-3">
        <legend className="sr-only">{question.prompt}</legend>
        {question.options?.map((option) => (
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border bg-white p-4 transition active:translate-y-px ${
              value === option.value
                ? "border-[var(--primary)] shadow-[inset_3px_0_0_var(--primary)]"
                : "border-[var(--line)] hover:border-[#9bb5c7]"
            }`}
            key={String(option.value)}
          >
            <input
              checked={value === option.value}
              className="mt-1 h-4 w-4 accent-[var(--primary)]"
              name={question.id}
              onChange={() => onChange(option.value)}
              type="radio"
            />
            <span>
              <span className="block font-semibold text-[var(--ink)]">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
        {error ? <p className="text-sm font-semibold text-[var(--critical)]" id={errorId}>{error}</p> : null}
      </fieldset>
    );
  }

  if (question.type === "multiple") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset aria-describedby={error ? errorId : undefined} className="space-y-3">
        <legend className="sr-only">{question.prompt}</legend>
        {question.options?.map((option) => {
          const optionValue = String(option.value);
          return (
            <label className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-white p-4" key={optionValue}>
              <input
                checked={selected.includes(optionValue)}
                className="h-4 w-4 accent-[var(--primary)]"
                onChange={() => {
                  const exclusiveValues = question.options
                    ?.filter((candidate) => candidate.exclusive)
                    .map((candidate) => String(candidate.value)) ?? [];
                  const next = selected.includes(optionValue)
                    ? selected.filter((item) => item !== optionValue)
                    : option.exclusive
                      ? [optionValue]
                      : [...selected.filter((item) => !exclusiveValues.includes(item)), optionValue];
                  onChange(next);
                }}
                type="checkbox"
              />
              <span className="font-semibold">{option.label}</span>
            </label>
          );
        })}
        {error ? <p className="text-sm font-semibold text-[var(--critical)]" id={errorId}>{error}</p> : null}
      </fieldset>
    );
  }

  return (
    <div className="space-y-2">
      <label className="sr-only" htmlFor={question.id}>{question.prompt}</label>
      <input
        aria-describedby={error ? errorId : undefined}
        className="w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-white px-4 py-3 text-[var(--ink)] placeholder:text-[#738592]"
        id={question.id}
        onChange={(event) => onChange(event.target.value)}
        type={question.type}
        value={typeof value === "string" ? value : ""}
      />
      {error ? <p className="text-sm font-semibold text-[var(--critical)]" id={errorId}>{error}</p> : null}
    </div>
  );
}
