"use client";

import { useState, useSyncExternalStore } from "react";

import { evaluateCheck } from "../evaluate";
import {
  clearCheckData,
  loadDraft,
  loadReport,
  saveDraft,
  saveReport,
  type DraftState,
} from "../storage";
import type { RiskReport as RiskReportData, ToolConfig } from "../types";
import { CheckIntro } from "./check-intro";
import { Questionnaire } from "./questionnaire";
import { RiskReport } from "./risk-report";

type Phase = "intro" | "questions" | "report";

const subscribeToBrowser = () => () => undefined;
const browserSnapshot = () => true;
const serverSnapshot = () => false;

export function CheckExperience({ config }: { config: ToolConfig }) {
  const isBrowser = useSyncExternalStore(subscribeToBrowser, browserSnapshot, serverSnapshot);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [report, setReport] = useState<RiskReportData | null>(null);
  const storedDraft = isBrowser && phase === null ? loadDraft(config.slug) : null;
  const storedReport = isBrowser && phase === null ? loadReport(config.slug)?.report ?? null : null;
  const activeDraft = draft ?? storedDraft;
  const activeReport = report ?? storedReport;
  const activePhase = phase ?? (activeReport ? "report" : "intro");

  function persistDraft(nextDraft: DraftState) {
    setDraft(nextDraft);
    saveDraft(config.slug, nextDraft);
  }

  function completeCheck(answers: DraftState["answers"]) {
    const nextReport = evaluateCheck(config, answers);
    const finalDraft = { currentStep: Math.max(config.questions.length - 1, 0), answers };
    persistDraft(finalDraft);
    saveReport(config.slug, nextReport);
    setReport(nextReport);
    setPhase("report");
  }

  function restartCheck() {
    clearCheckData(config.slug);
    setDraft(null);
    setReport(null);
    setPhase("questions");
  }

  function clearReport() {
    clearCheckData(config.slug);
    setDraft(null);
    setReport(null);
    setPhase("intro");
  }

  function beginQuestions() {
    setDraft(activeDraft);
    setPhase("questions");
  }

  if (!isBrowser) return <div className="min-h-[22rem]" aria-hidden />;

  if (activePhase === "questions") {
    return (
      <Questionnaire
        config={config}
        initialDraft={activeDraft}
        onComplete={completeCheck}
        onExit={() => setPhase("intro")}
        onSave={persistDraft}
      />
    );
  }

  if (activePhase === "report" && activeReport) {
    return (
      <RiskReport
        onClear={clearReport}
        onEdit={beginQuestions}
        onRestart={restartCheck}
        report={activeReport}
      />
    );
  }

  return <CheckIntro config={config} hasDraft={Boolean(activeDraft)} onStart={beginQuestions} />;
}
