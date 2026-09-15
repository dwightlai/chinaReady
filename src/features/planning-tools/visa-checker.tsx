"use client";
import { useEffect, useState } from "react";
import { assessVisa, countryOptions, transitCountries, visaSources, type VisaInput } from "./visa-rules";
import { beijingDate } from "./ticket-plan";

const fieldClass = "mt-2 block w-full rounded-xl border border-[var(--line)] bg-white p-3 text-[var(--ink)]";
const labels = { eligible: "Preliminarily eligible", ineligible: "Does not meet the selected scheme", review: "More information or policy verification needed" };
const yesNo = [["", "Choose"], ["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]];
export function VisaChecker() {
  const [input, setInput] = useState<VisaInput>({ nationality: "", entryDate: "", scheme: "direct" });
  const [today, setToday] = useState("");
  useEffect(() => { const update = () => setToday(beijingDate(new Date())); update(); const timer = window.setInterval(update, 60000); return () => window.clearInterval(timer); }, []);
  function update(key: keyof VisaInput, value: string | number | undefined) { setInput(current => ({ ...current, [key]: value })); }
  function select(key: keyof VisaInput, title: string, options: string[][]) {
    return <label className="block font-bold">{title}<select className={fieldClass} value={String(input[key] ?? "")} onChange={e => update(key, e.target.value)}>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></label>;
  }
  const result = assessVisa(input, today || "2026-09-15");
  const readyForDetails = Boolean(input.nationality && input.entryDate);
  const routeCountries = [...countryOptions, "Hong Kong", "Macao", "Taiwan", "Other / not listed"].sort();
  return <div className="grid items-start gap-6 lg:grid-cols-2">
    <div className="space-y-6 rounded-2xl border border-[var(--line)] p-6">
      <h2 className="text-2xl font-bold">1. Find a possible policy</h2>
      {select("nationality", "Passport nationality", [["", "Choose nationality"], ...countryOptions.map(c => [c, c]), ["other", "Other / not listed"]])}
      <label className="block font-bold">Entry date (mainland China)<input className={fieldClass} type="date" value={input.entryDate} onChange={e => update("entryDate", e.target.value)} /></label>
      {readyForDetails && <>
        <h2 className="text-2xl font-bold">2. Check your visit</h2>
        {select("scheme", "Scheme to assess", [["direct", "30-day unilateral visa-free visit"], ["transit", "240-hour transit to another country / region"]])}
        {select("passport", "Passport type", [["", "Choose"], ["ordinary", "Ordinary passport"], ["other", "Diplomatic / official / emergency / other"], ["unsure", "Not sure"]])}
        {select("validPassport", "Is your passport valid for the planned stay?", yesNo)}
        <label className="block font-bold">Planned stay in days<input className={fieldClass} type="number" min={1} step={1} value={input.days ?? ""} onChange={e => update("days", e.target.value === "" ? undefined : Number(e.target.value))} /></label>
        <p className="text-sm">For a 30-day unilateral visit, NIA counts from midnight after entry. For transit, confirm the exact permitted departure deadline with border inspection; use a conservative whole-day estimate here.</p>
        {select("purpose", "Purpose of visit", [["", "Choose"], ["tourism", "Tourism"], ["business", "Business visit (not employment)"], ["visit", "Family / friends visit"], ["exchange", "Exchange visit"], ["transit", "Transit"], ["work", "Work / employment"], ["study", "Study"], ["journalism", "Journalism"], ["other", "Other / not sure"]])}
        {input.scheme === "transit" && <>
          <h2 className="text-2xl font-bold">3. Confirm your transit route</h2>
          <p>Use the country or region of the flight or journey immediately before and after mainland China, including stopovers. A return to the same place does not meet this transit scheme.</p>
          {select("previous", "Immediately before mainland China", [["", "Choose"], ...routeCountries.map(c => [c, c])])}
          {select("next", "Immediately after mainland China", [["", "Choose"], ...routeCountries.map(c => [c, c])])}
          <label className="block font-bold">Entry port<input className={fieldClass} value={input.port ?? ""} maxLength={100} placeholder="e.g. Shanghai Pudong Airport" onChange={e => setInput(current => ({ ...current, port: e.target.value, portConfirmed: "" }))} /></label>
          <a className="block font-bold underline" href={visaSources.transit} target="_blank" rel="noreferrer">Open NIA’s current port and permitted-area list ↗</a>
          {select("portConfirmed", "Is this entry port on the official 240-hour list?", yesNo)}
          {select("areasConfirmed", "Are all planned stays and travel within the permitted areas?", yesNo)}
          {select("onwardConfirmed", "Do you hold an onward ticket with a confirmed date and seat?", yesNo)}
        </>}
      </>}
    </div>
    <section aria-live="polite" className="space-y-5 rounded-2xl bg-[var(--surface)] p-6">
      <h2 className="text-2xl font-bold">{labels[result.status]}</h2>
      <ul className="list-disc space-y-3 pl-5">{result.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
      {input.scheme === "direct" && transitCountries.includes(input.nationality) && <p>A 240-hour transit scheme may also be available if you travel onward to a different country or region. Select it to check the additional conditions.</p>}
      {result.rule && <div className="space-y-2 border-t border-[var(--line)] pt-4">
        <h3 className="font-bold">Policy evidence</h3>
        <p>Scheme: {result.rule.scheme === "direct" ? "30-day unilateral exemption" : "240-hour transit"}</p>
        <p>Effective date: {result.rule.effectiveDate ?? "See source; original start dates vary"}</p>
        <p>Verified entry-date coverage starts: {result.rule.coverageFrom}</p>
        <p>Policy expiry: {result.rule.expiryDate ?? "No fixed expiry stated in this source (not a permanent guarantee)"}</p>
        <p>Last verified: {result.rule.lastVerified} · Review due: {result.rule.reviewDue}</p>
        {result.rule.sources.map((url, i) => <a key={url} className="block underline" href={url} target="_blank" rel="noreferrer">Official policy source {i + 1} ↗</a>)}
      </div>}
      <p className="text-sm">Coverage: unilateral 30-day visits and 240-hour transit only. Bilateral exemptions, 24-hour transit and regional schemes require separate checks. “Does not meet” applies only to the selected scheme and is not a decision on all entry options.</p>
      <a className="block underline" href={visaSources.unilateral}>NIA unilateral visa-free policy</a><a className="block underline" href={visaSources.transit}>NIA transit policies and restrictions</a>
      <p className="text-sm">Answers stay in this page and are not saved or sent to our server. This tool does not issue visas or guarantee boarding or entry.</p>
    </section>
  </div>;
}
