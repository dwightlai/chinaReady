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
  flow?: "standard" | "diagnostic" | "preflight" | "train-diagnostic" | "train-preflight" | "dates-basic" | "dates-preflight";
}

function isAnswered(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "" &&
    (!Array.isArray(value) || value.length > 0);
}

const diagnosticBranches: Record<string, string[]> = {
  "cant-add-card": ["failureStage", "paymentApps", "foreignCardLinked", "overseasTransactions"],
  "cant-verify-id": ["failureStage", "paymentApps", "identityVerified"],
  "cant-verify-bank": ["failureStage", "paymentApps", "bankVerificationAccess", "originalNumberAvailable"],
  "linked-payment-fails": ["failureStage", "paymentApps", "issuerSignal", "otherCardResult", "merchantScope"],
  "risk-control": ["failureStage", "paymentApps", "riskRecovery"],
  "top-up": ["failureStage", "paymentApps", "topUpReason"],
};

const trainDiagnosticBranches: Record<string, string[]> = {
  verification: ["trainIssue", "ticketChannel", "platformMode", "verificationStatus", "verificationError", "photoMethod", "nameMatches"],
  "ticket-status": ["trainIssue", "ticketChannel", "ticketStatus"],
  "departure-risk": ["trainIssue", "ticketChannel", "ticketStatus", "departureWindow", "backupTrain", "criticalDependency"],
};

function isTimeBetween(value: unknown, start: string, end: string) {
  if (typeof value !== "string" || !/^\d{2}:\d{2}$/.test(value)) return false;
  return start <= end ? value >= start && value <= end : value >= start || value <= end;
}

function matchesVisibility(question: ToolConfig["questions"][number], answers: Answers) {
  if (!question.visibleWhen) return true;
  if ("equals" in question.visibleWhen) return answers[question.visibleWhen.field] === question.visibleWhen.equals;
  return isTimeBetween(answers[question.visibleWhen.field], question.visibleWhen.timeBetween.start, question.visibleWhen.timeBetween.end);
}

export function visibleQuestions(config: ToolConfig, answers: Answers, flow: QuestionnaireProps["flow"] = "standard") {
  const visible = config.questions.filter((question) => matchesVisibility(question, answers));
  if (flow === "diagnostic") {
    const ids = diagnosticBranches[String(answers.failureStage)] ?? ["failureStage"];
    return visible.filter((question) => ids.includes(question.id));
  }
  if (flow === "preflight") {
    return visible.filter((question) => question.id !== "failureStage" && !["issuerSignal", "otherCardResult", "merchantScope", "riskRecovery", "topUpReason"].includes(question.id));
  }
  if (flow === "train-diagnostic") {
    const ids = trainDiagnosticBranches[String(answers.trainIssue)] ?? ["trainIssue"];
    return visible.filter((question) => ids.includes(question.id));
  }
  if (flow === "train-preflight") return visible.filter((question) => question.id !== "trainIssue");
  if (flow === "dates-basic") return visible.filter((question) => ["arrivalDate", "departureDate", "cities"].includes(question.id));
  if (flow === "dates-preflight") return visible;
  return visible;
}

export function Questionnaire({ config, initialDraft, onSave, onComplete, onExit, flow = "standard" }: QuestionnaireProps) {
  const [answers, setAnswers] = useState<Answers>(initialDraft?.answers ?? {});
  const [currentStep, setCurrentStep] = useState(initialDraft?.currentStep ?? 0);
  const [error, setError] = useState<string>();
  const questions = useMemo(() => visibleQuestions(config, answers, flow), [answers, config, flow]);
  const safeStep = Math.min(currentStep, Math.max(questions.length - 1, 0));
  const question = questions[safeStep];

  if (!question) return null;
  const currentQuestion = question;
  const displayedQuestion = flow === "diagnostic" && currentQuestion.id === "failureStage"
    ? { ...currentQuestion, options: currentQuestion.options?.filter((option) => !["setup", "preflight"].includes(String(option.value))) }
    : currentQuestion;

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
      <Progress current={safeStep + 1} label={flow === "diagnostic" ? "Quick diagnosis" : ["train-diagnostic", "dates-basic"].includes(flow) ? "Quick check" : ["preflight", "train-preflight", "dates-preflight"].includes(flow) ? "Full preflight" : "Question"} total={questions.length} />
      <div aria-live="polite" className="mt-10">
        {currentQuestion.section ? <p className="mb-3 text-sm font-bold text-[var(--primary)]">{currentQuestion.section}</p> : null}
        <h1 className="font-[var(--font-display)] text-3xl leading-[1.2] tracking-[-0.03em] text-[var(--ink)] text-balance sm:text-4xl">
          {currentQuestion.prompt}
        </h1>
        {currentQuestion.help ? <p className="mt-3 max-w-[60ch] leading-7 text-[var(--muted)]">{currentQuestion.help}</p> : null}
      </div>
      <div className="mt-7">
        <QuestionField error={error} onChange={updateAnswer} question={displayedQuestion} value={answers[currentQuestion.id]} />
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
