"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { beijingDate, saleInstant, saleTimeSource, shiftDate, ticketCalendar, ticketPlan, type TicketStatus } from "./ticket-plan";

const inputClass = "mt-2 block w-full rounded-xl border border-[var(--line)] bg-white p-3 text-[var(--ink)]";

export function TicketPlanner() {
  const [date, setDate] = useState("");
  const [station, setStation] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<TicketStatus>("unbooked");
  const [now, setNow] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { const update = () => setNow(new Date()); update(); const timer = window.setInterval(update, 30000); return () => window.clearInterval(timer); }, []);
  let plan: ReturnType<typeof ticketPlan> | undefined;
  let error = "";
  try { if (date && now) plan = ticketPlan(date, status, now, time); } catch { error = "Enter a valid date and time."; }
  const instant = plan && time ? saleInstant(plan.saleDate, time) : null;
  function download() {
    try {
      const text = ticketCalendar(date, station.trim(), time, new Date());
      const url = URL.createObjectURL(new Blob([text], { type: "text/calendar;charset=utf-8" }));
      const a = document.createElement("a"); a.href = url; a.download = `china-train-${date}.ics`; a.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage("Calendar file downloaded. Open it and save the event in your calendar to enable the reminder. Your ticket status has not changed.");
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Could not create calendar file."); }
  }
  return <div className="grid gap-6 md:grid-cols-2">
    <section className="space-y-5 rounded-2xl border border-[var(--line)] bg-white p-6">
      <h2 className="text-2xl font-bold">When does your train go on sale?</h2>
      <label className="block font-bold">Train departure date<input type="date" className={inputClass} value={date} min={now ? beijingDate(now) : undefined} onChange={e => { setDate(e.target.value); setMessage(""); }} /></label>
      <p className="text-sm">Choose a date for an instant result. Add station details only if you want a timed reminder.</p>
      <label className="block font-bold">Departure station<input className={inputClass} placeholder="e.g. Shanghai Hongqiao" maxLength={100} value={station} onChange={e => { setStation(e.target.value); setTime(""); setMessage(""); }} /></label>
      <a className="block font-bold underline" href={saleTimeSource} target="_blank" rel="noreferrer">Look up your station’s sale time on 12306 ↗</a>
      <label className="block font-bold">Confirmed sale time (Beijing, UTC+8)<input type="time" className={inputClass} value={time} onChange={e => { setTime(e.target.value); setMessage(""); }} /></label>
      <p className="text-sm">Enter the time shown by 12306 for this station. Stations in the same city can have different sale times.</p>
      <label className="block font-bold">Current booking status<select className={inputClass} value={status} onChange={e => setStatus(e.target.value as TicketStatus)}><option value="unbooked">Not booked / unsure</option><option value="reserved">Reserved / requested / processing</option><option value="waitlisted">Waitlisted</option><option value="issued">I have confirmed it is issued</option></select></label>
    </section>
    <section className="space-y-5 rounded-2xl bg-[var(--surface)] p-6" aria-live="polite">
      <h2 className="text-2xl font-bold">Your booking action plan</h2>
      {error && <p role="alert">{error}</p>}
      {!plan && <p>Select your train departure date to see the sale date and next action.</p>}
      {plan && <>
        <div><p>Normal sale date · Beijing calendar</p><p className="text-3xl font-extrabold">{plan.saleDate}</p><p>{time ? `${time} Beijing time (entered by you)` : "Exact sale time: not yet confirmed"}</p></div>
        {instant && <p>Your device time: {instant.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })} ({Intl.DateTimeFormat().resolvedOptions().timeZone})</p>}
        {plan.goldenWeek && <p className="rounded-xl bg-orange-100 p-4 text-orange-950">National Day travel pressure: this date is within the holiday or our planning buffer around it. Prioritize unconfirmed intercity journeys.</p>}
        <p className="font-bold">{plan.action}</p>
        {status === "reserved" && <p>A reservation, payment request or processing order does not guarantee a seat. Confirm that the provider explicitly shows “issued” or “ticketed”.</p>}
        {status !== "issued" && plan.phase !== "past" && <p>Flexible by one day? Check departures on {shiftDate(date, -1)} (sale date {shiftDate(date, -15)}) or {shiftDate(date, 1)} (sale date {shiftDate(date, -13)}). Availability is not checked here.</p>}
        <button type="button" disabled={!instant || !station.trim() || !now || instant <= now || status === "issued"} onClick={download} className="rounded-full bg-[var(--primary)] px-5 py-3 font-bold text-white disabled:opacity-40">Download calendar reminder</button>
        <p className="text-sm">Requires a station and confirmed future sale time. Calendar alert: 10 minutes before sale. Downloading does not book a ticket or activate a website notification.</p>
        {message && <p role="status">{message}</p>}
        <div className="flex flex-wrap gap-4"><Link className="font-bold underline" href="/checks/train-booking">Diagnose my ticket status</Link><Link className="font-bold underline" href="/china-train-station-arrival-time-calculator">Plan station arrival</Link></div>
      </>}
    </section>
  </div>;
}
