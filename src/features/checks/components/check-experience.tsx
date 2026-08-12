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
import type { Answers, RiskReport as RiskReportData, ToolConfig } from "../types";
import { CheckIntro } from "./check-intro";
import { Questionnaire } from "./questionnaire";
import { RiskReport } from "./risk-report";

type Phase = "intro" | "questions" | "report";
type CheckFlow = "diagnostic" | "preflight" | "train-diagnostic" | "train-preflight" | "dates-basic" | "dates-preflight";

const subscribeToBrowser = () => () => undefined;
const browserSnapshot = () => true;
const serverSnapshot = () => false;

export function CheckExperience({ config }: { config: ToolConfig }) {
  const isBrowser = useSyncExternalStore(subscribeToBrowser, browserSnapshot, serverSnapshot);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [report, setReport] = useState<RiskReportData | null>(null);
  const [checkFlow, setCheckFlow] = useState<CheckFlow | null>(null);
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
    const diagnosticCodes = new Set(["PAY_CARD_LINK_FAILURE", "PAY_ID_FAILURE", "PAY_BANK_APPROVAL_FAILURE", "PAY_ISSUER_DECLINE", "PAY_APP_OR_RISK_FAILURE", "PAY_ONE_MERCHANT", "PAY_SECOND_ISSUER_WORKS", "PAY_RISK_CONTROL", "PAY_TOPUP_CONFUSION"]);
    const trainCodes = new Set(["TRAIN_NO_CHANNEL", "TRAIN_NAME_MISMATCH", "TRAIN_VERIFY_NAME", "TRAIN_VERIFY_PHOTO", "TRAIN_VERIFY_BUSY", "TRAIN_VERIFY_OTHER", "TRAIN_VERIFY_PENDING", "TRAIN_VERIFY_NOT_SUBMITTED", "TRAIN_STATUS_UNCONFIRMED", "TRAIN_WAITLIST", "TRAIN_IMMINENT_UNISSUED", "TRAIN_CRITICAL_DEPENDENCY", "TRAIN_NO_BACKUP"]);
    const evaluationConfig = config.slug === "payment" && checkFlow === "diagnostic"
      ? { ...config, rules: config.rules.filter((rule) => diagnosticCodes.has(rule.code)) }
      : config.slug === "train-booking" && checkFlow === "train-diagnostic"
        ? { ...config, rules: config.rules.filter((rule) => trainCodes.has(rule.code)) }
        : config.slug === "dates" && checkFlow === "dates-basic"
          ? { ...config, rules: config.rules.filter((rule) => rule.priority < 20) }
          : config;
    const nextReport = evaluateCheck(evaluationConfig, answers);
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
    if (config.slug === "payment") setCheckFlow(activeDraft?.answers.failureStage === "preflight" ? "preflight" : "diagnostic");
    if (config.slug === "train-booking") setCheckFlow(activeDraft?.answers.trainIssue === "preflight" ? "train-preflight" : "train-diagnostic");
    if (config.slug === "dates") setCheckFlow(Object.hasOwn(activeDraft?.answers ?? {}, "intercityTravel") ? "dates-preflight" : "dates-basic");
    setPhase("questions");
  }

  function beginFlow(flow: CheckFlow) {
    clearCheckData(config.slug);
    const answers: Answers = flow === "preflight" ? { failureStage: "preflight" } : flow === "train-preflight" ? { trainIssue: "preflight" } : {};
    const nextDraft: DraftState = { currentStep: 0, answers };
    setCheckFlow(flow);
    setDraft(nextDraft);
    setReport(null);
    saveDraft(config.slug, nextDraft);
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
        flow={checkFlow ?? "standard"}
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

  const quickFlow: CheckFlow | undefined = config.slug === "payment" ? "diagnostic" : config.slug === "train-booking" ? "train-diagnostic" : config.slug === "dates" ? "dates-basic" : undefined;
  const fullFlow: CheckFlow | undefined = config.slug === "payment" ? "preflight" : config.slug === "train-booking" ? "train-preflight" : config.slug === "dates" ? "dates-preflight" : undefined;
  return <CheckIntro config={config} hasDraft={Boolean(activeDraft)} onFullStart={fullFlow ? () => beginFlow(fullFlow) : undefined} onQuickStart={quickFlow ? () => beginFlow(quickFlow) : undefined} onStart={beginQuestions} />;
}
