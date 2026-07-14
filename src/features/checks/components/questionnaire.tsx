"use client";

import { useMemo, useState } from "react";

import type { DraftState } from "../storage";
import type { Answers, ToolConfig } from "../types";
import { Progress } from "./progress";
import { QuestionField } from "./question-field";

interface QuestionnaireProps {
  config: ToolConfig;
  initialDraft?: DraftState | null;
  onSave: (draft: DraftState) => void;
  onComplete: (answers: Answers) => void;
  onExit?: () => void;
}

function isAnswered(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "" &&
    (!Array.isArray(value) || value.length > 0);
}

export function visibleQuestions(config: ToolConfig, answers: Answers) {
  return config.questions.filter((question) =>
    !question.visibleWhen || answers[question.visibleWhen.field] === question.visibleWhen.equals,
  );
}

export function Questionnaire({ config, initialDraft, onSave, onComplete, onExit }: QuestionnaireProps) {
  const [answers, setAnswers] = useState<Answers>(initialDraft?.answers ?? {});
  const [currentStep, setCurrentStep] = useState(initialDraft?.currentStep ?? 0);
  const [error, setError] = useState<string>();
  const questions = useMemo(() => visibleQuestions(config, answers), [answers, config]);
  const safeStep = Math.min(currentStep, Math.max(questions.length - 1, 0));
  const question = questions[safeStep];

  if (!question) return null;
  const currentQuestion = question;

  const isLast = safeStep === questions.length - 1;

  function updateAnswer(value: Answers[string]) {
    const next = { ...answers, [currentQuestion.id]: value };
    setAnswers(next);
    setError(undefined);
    onSave({ currentStep: safeStep, answers: next });
  }

  function continueFlow() {
    if (currentQuestion.required && !isAnswered(answers[currentQuestion.id])) {
      setError("Choose an answer to continue.");
      return;
    }
    if (isLast) {
      onComplete(answers);
      return;
    }
    const nextStep = safeStep + 1;
    setCurrentStep(nextStep);
    setError(undefined);
    onSave({ currentStep: nextStep, answers });
  }

  function goBack() {
    const previous = Math.max(0, safeStep - 1);
    setCurrentStep(previous);
    setError(undefined);
    onSave({ currentStep: previous, answers });
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <Progress current={safeStep + 1} total={questions.length} />
      <div aria-live="polite" className="mt-10">
        <h1 className="font-[var(--font-display)] text-3xl leading-tight tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
          {currentQuestion.prompt}
        </h1>
        {currentQuestion.help ? <p className="mt-3 max-w-[60ch] leading-7 text-[var(--muted)]">{currentQuestion.help}</p> : null}
      </div>
      <div className="mt-7">
        <QuestionField error={error} onChange={updateAnswer} question={currentQuestion} value={answers[currentQuestion.id]} />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <button className="rounded-full px-3 py-2 font-semibold text-[var(--muted)] disabled:opacity-40" disabled={safeStep === 0} onClick={goBack} type="button">
            Back
          </button>
          {onExit ? <button className="rounded-full px-3 py-2 font-semibold text-[var(--muted)]" onClick={onExit} type="button">Save and exit</button> : null}
        </div>
        <button className="whitespace-nowrap rounded-full bg-[var(--primary)] px-6 py-3 font-bold text-white transition hover:bg-[var(--primary-dark)] active:translate-y-px" onClick={continueFlow} type="button">
          {isLast ? "See my report" : "Continue"}
        </button>
      </div>
    </section>
  );
}
