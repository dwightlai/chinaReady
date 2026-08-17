"use client";

import { useState } from "react";
import Link from "next/link";

import { calculateStationArrival, type StationArrivalResult } from "./station-arrival";

const checkboxClass = "size-4 accent-[var(--primary)]";

export function StationArrivalCalculator() {
  const [station, setStation] = useState("");
  const [departureTime, setDepartureTime] = useState("09:30");
  const [travelMinutes, setTravelMinutes] = useState(30);
  const [factors, setFactors] = useState({ firstHighSpeedRailTrip: true, foreignPassport: true, largeLuggage: false, criticalConnection: false, peakPeriod: false });
  const [result, setResult] = useState<StationArrivalResult | null>(null);
  const [error, setError] = useState<string>();
  const factorOptions: Array<[keyof typeof factors, string]> = [
    ["firstHighSpeedRailTrip", "This is my first China high-speed rail trip"],
    ["foreignPassport", "I will enter with a foreign passport"],
    ["largeLuggage", "I have large or multiple suitcases"],
    ["criticalConnection", "A fixed flight, hotel or last connection depends on this train"],
    ["peakPeriod", "Weekend, holiday or likely rush-hour departure"],
  ];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setResult(calculateStationArrival({ station, departureTime, travelMinutes, ...factors }));
      setError(undefined);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Check the entered values.");
    }
  }

  return <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
    <form className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-6 sm:p-8" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-bold sm:col-span-2">Train station
          <input className="mt-2 w-full rounded-xl border border-[var(--line)] px-4 py-3 font-normal" onChange={(event) => setStation(event.target.value)} placeholder="Beijing South" required value={station} />
        </label>
        <label className="font-bold">Train departure time
          <input className="mt-2 w-full rounded-xl border border-[var(--line)] px-4 py-3 font-normal" onChange={(event) => setDepartureTime(event.target.value)} required type="time" value={departureTime} />
        </label>
        <label className="font-bold">Hotel-to-station travel time
          <span className="mt-2 flex items-center gap-3"><input className="w-full rounded-xl border border-[var(--line)] px-4 py-3 font-normal" max="300" min="0" onChange={(event) => setTravelMinutes(Number(event.target.value))} required type="number" value={travelMinutes} /><span className="text-sm text-[var(--muted)]">minutes</span></span>
        </label>
      </div>
      <fieldset className="mt-7"><legend className="font-extrabold">Add the factors that apply</legend><div className="mt-4 grid gap-3">
        {factorOptions.map(([key, label]) => <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[var(--surface)] px-4 py-3" key={key}><input checked={factors[key]} className={checkboxClass} onChange={(event) => setFactors((current) => ({ ...current, [key]: event.target.checked }))} type="checkbox" /><span className="font-semibold">{label}</span></label>)}
      </div></fieldset>
      {error ? <p className="mt-4 text-sm font-bold text-[var(--critical)]">{error}</p> : null}
      <button className="mt-7 rounded-full bg-[var(--primary)] px-6 py-3.5 font-extrabold text-white" type="submit">Calculate my station timing</button>
    </form>

    <section aria-live="polite" className="rounded-[var(--radius-lg)] bg-[var(--ink)] p-6 text-white sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-blue-300">Your timing plan</p>
      {result ? <>
        <p className="mt-6 text-sm font-bold text-slate-300">Recommended station arrival</p><p className="mt-1 text-4xl font-extrabold">{result.arrivalWindow}</p>
        <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-slate-300">Leave hotel by</p><p className="mt-1 text-xl font-extrabold">{result.leaveTime}</p></div><div className="rounded-xl bg-white/10 p-4"><p className="text-xs text-slate-300">Buffer level</p><p className="mt-1 text-xl font-extrabold">{result.level}</p><p className="text-xs text-slate-300">{result.bufferMinutes} minutes</p></div></div>
        {result.warnings.length ? <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-200">{result.warnings.map((warning) => <li className="flex gap-2" key={warning}><span aria-hidden>•</span>{warning}</li>)}</ul> : null}
        <p className="mt-6 text-xs leading-5 text-slate-400">This is a planning buffer, not live traffic or railway data. Recheck the official ticket status and local journey time before leaving.</p>
        <Link className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-extrabold text-[var(--ink)]" href="/checks/train-booking">Check my train booking</Link>
      </> : <p className="mt-6 max-w-sm text-lg leading-8 text-slate-300">Enter your departure and risk factors to calculate when to reach the station and when to leave your hotel.</p>}
    </section>
  </div>;
}
