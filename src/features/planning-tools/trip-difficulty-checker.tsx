"use client";

import { useState } from "react";
import Link from "next/link";

import { calculateTripDifficulty, type TripDifficultyInput, type TripDifficultyResult } from "./trip-difficulty";

const initial: TripDifficultyInput = { firstSoloTrip: false, firstAsiaTrip: false, chineseAbility: "none", cityCount: "two-three", trainLegs: "one-two", paymentReady: false, chinaPhoneReady: false, travelStyle: "independent" };

export function TripDifficultyChecker() {
  const [answers, setAnswers] = useState(initial);
  const [result, setResult] = useState<TripDifficultyResult | null>(null);
  const update = <K extends keyof TripDifficultyInput>(key: K, value: TripDifficultyInput[K]) => setAnswers((current) => ({ ...current, [key]: value }));

  return <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
    <form className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 sm:p-8" onSubmit={(event) => { event.preventDefault(); setResult(calculateTripDifficulty(answers)); }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <YesNo label="Is this your first solo trip?" value={answers.firstSoloTrip} onChange={(value) => update("firstSoloTrip", value)} />
        <YesNo label="Is this your first trip in Asia?" value={answers.firstAsiaTrip} onChange={(value) => update("firstAsiaTrip", value)} />
        <Select label="Chinese ability" value={answers.chineseAbility} onChange={(value) => update("chineseAbility", value as TripDifficultyInput["chineseAbility"])} options={[["none", "None"], ["basic", "Basic phrases"], ["conversational", "Conversational"]]} />
        <Select label="Number of cities" value={answers.cityCount} onChange={(value) => update("cityCount", value as TripDifficultyInput["cityCount"])} options={[["one", "One"], ["two-three", "Two or three"], ["four-plus", "Four or more"]]} />
        <Select label="High-speed rail legs" value={answers.trainLegs} onChange={(value) => update("trainLegs", value as TripDifficultyInput["trainLegs"])} options={[["none", "None"], ["one-two", "One or two"], ["three-plus", "Three or more"]]} />
        <Select label="Travel style" value={answers.travelStyle} onChange={(value) => update("travelStyle", value as TripDifficultyInput["travelStyle"])} options={[["guided", "Guided"], ["mixed", "Mixed"], ["independent", "Independent"]]} />
        <YesNo label="Is mobile payment tested and backed up?" value={answers.paymentReady} onChange={(value) => update("paymentReady", value)} />
        <YesNo label="Is your China data and phone recovery plan ready?" value={answers.chinaPhoneReady} onChange={(value) => update("chinaPhoneReady", value)} />
      </div>
      <button className="mt-7 rounded-full bg-[var(--primary)] px-6 py-3.5 font-extrabold text-white" type="submit">Calculate my trip difficulty</button>
    </form>
    <section aria-live="polite" className="rounded-[var(--radius-lg)] bg-[var(--surface-strong)] p-6 sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--primary)]">Preparation level</p>
      {result ? <><h2 className="mt-5 text-3xl font-extrabold">{result.level}</h2><p className="mt-3 leading-7 text-[var(--muted)]">{result.summary}</p><h3 className="mt-7 font-extrabold">Focus on these first</h3><ol className="mt-4 space-y-3">{result.priorities.map((priority, index) => <li className="flex gap-3" key={priority}><span className="font-extrabold text-[var(--primary)]">{index + 1}</span><span>{priority}</span></li>)}</ol><Link className="mt-7 inline-flex rounded-full bg-[var(--primary)] px-5 py-3 font-extrabold text-white" href="/checks/readiness">Run full China Readiness Check</Link></> : <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Answer eight quick questions to see whether your itinerary needs light, moderate or advanced preparation.</p>}
    </section>
  </div>;
}

function YesNo({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) {
  const options: Array<[boolean, string]> = [[true, "Yes"], [false, "No"]];
  return <fieldset><legend className="font-bold">{label}</legend><div className="mt-2 grid grid-cols-2 gap-2">{options.map(([option, text]) => <label className={`cursor-pointer rounded-xl border px-4 py-3 text-center font-semibold ${value === option ? "border-[var(--primary)] bg-blue-50" : "border-[var(--line)]"}`} key={text}><input checked={value === option} className="sr-only" name={label} onChange={() => onChange(option)} type="radio" />{text}</label>)}</div></fieldset>;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[][]; onChange: (value: string) => void }) {
  return <label className="font-bold">{label}<select className="mt-2 w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 font-normal" onChange={(event) => onChange(event.target.value)} value={value}>{options.map(([option, text]) => <option key={option} value={option}>{text}</option>)}</select></label>;
}
