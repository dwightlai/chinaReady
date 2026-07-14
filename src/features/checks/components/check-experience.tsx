"use client";

import { useEffect, useState } from "react";

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

export function CheckExperience({ config }: { config: ToolConfig }) {
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [report, setReport] = useState<RiskReportData | null>(null);

  useEffect(() => {
    const storedDraft = loadDraft(config.slug);
    const storedReport = loadReport(config.slug)?.report ?? null;
    setDraft(storedDraft);
    setReport(storedReport);
    setPhase(storedReport ? "report" : "intro");
    setIsReady(true);
  }, [config.slug]);

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

  if (!isReady) return <div className="min-h-[22rem]" aria-hidden />;

  if (phase === "questions") {
    return (
      <Questionnaire
        config={config}
        initialDraft={draft}
        onComplete={completeCheck}
        onExit={() => setPhase("intro")}
        onSave={persistDraft}
      />
    );
  }

  if (phase === "report" && report) {
    return (
      <RiskReport
        onClear={clearReport}
        onEdit={() => setPhase("questions")}
        onRestart={restartCheck}
        report={report}
      />
    );
  }

  return <CheckIntro config={config} hasDraft={Boolean(draft)} onStart={() => setPhase("questions")} />;
}
