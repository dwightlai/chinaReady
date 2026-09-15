export const saleTimeSource = "https://kyfw.12306.cn/index/view/infos/sale_time.html";
export const saleRuleSource = "https://kyfw.12306.cn/otn/gonggao/saleTicketMeans.html";
export type TicketStatus = "unbooked" | "reserved" | "waitlisted" | "issued";

export function shiftDate(date: string, days: number): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Enter a valid departure date.");
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) throw new Error("Enter a valid departure date.");
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return parsed.toISOString().slice(0, 10);
}

export function beijingDate(now: Date): string {
  return new Date(now.getTime() + 8 * 3600000).toISOString().slice(0, 10);
}

export function saleInstant(date: string, time: string): Date {
  shiftDate(date, 0);
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("Confirm the station's sale time first.");
  return new Date(`${date}T${time}:00+08:00`);
}

export function ticketPlan(departure: string, status: TicketStatus, now: Date, time = "") {
  const saleDate = shiftDate(departure, -14);
  const today = beijingDate(now);
  const phase = departure < today ? "past" : saleDate > today ? "upcoming" : saleDate === today && !time ? "check-time" : time && saleInstant(saleDate, time) > now ? "upcoming" : "open";
  const action = phase === "past" ? "This departure date has passed. Choose your next journey." : status === "issued" ? "Ticket marked issued by you. Check passenger, station and departure details; carry the original passport." : status === "waitlisted" ? "A waitlist is not a ticket. Check its deadline with the provider and prepare another train or flexible route." : phase === "upcoming" ? "Complete passenger verification now. Be ready at the confirmed station sale time." : phase === "check-time" ? "Sales start today. Check the departure station's exact sale time in 12306." : "Check availability now. If no suitable ticket is available, check official standby options and alternative dates.";
  return { saleDate, phase, action, goldenWeek: departure >= "2026-09-29" && departure <= "2026-10-09" };
}

const escapeIcs = (text: string) => text.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
export function ticketCalendar(departure: string, station: string, time: string, now: Date): string {
  const start = saleInstant(shiftDate(departure, -14), time);
  if (start <= now) throw new Error("Sale time has passed. Check tickets now instead of adding a reminder.");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ChinaTripCheck//Ticket Planner//EN", "BEGIN:VEVENT", `UID:${start.getTime()}-${encodeURIComponent(station)}@chinatripcheck.com`, `DTSTAMP:${stamp(now)}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(new Date(start.getTime() + 15 * 60000))}`, `SUMMARY:${escapeIcs(`China train tickets: ${station} on ${departure}`)}`, `DESCRIPTION:${escapeIcs(`Check 12306 for tickets. Station sale time confirmed by you: ${time} Beijing time. A reservation is not an issued ticket.`)}`, "BEGIN:VALARM", "TRIGGER:-PT10M", "ACTION:DISPLAY", "DESCRIPTION:China train tickets go on sale in 10 minutes", "END:VALARM", "END:VEVENT", "END:VCALENDAR"];
  // Fold at 70 UTF-8 bytes without splitting a Unicode character.
  return lines.map(line => { let output = "", bytes = 0; for (const char of line) { const size = new TextEncoder().encode(char).length; if (bytes + size > 70) { output += "\r\n "; bytes = 1; } output += char; bytes += size; } return output; }).join("\r\n") + "\r\n";
}
