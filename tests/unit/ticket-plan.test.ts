import { describe, expect, it } from "vitest";
import { shiftDate, ticketPlan, ticketCalendar } from "@/features/planning-tools/ticket-plan";

describe("ticket sale planning", () => {
  const now = new Date("2026-09-15T08:00:00Z");
  it("counts the 15-day window inclusively across months and leap years", () => {
    expect(ticketPlan("2026-10-01", "unbooked", now).saleDate).toBe("2026-09-17");
    expect(shiftDate("2028-03-01", -1)).toBe("2028-02-29");
    expect(() => shiftDate("2026-02-29", 0)).toThrow();
  });
  it("does not assume today's sales have opened without a time", () => {
    expect(ticketPlan("2026-09-29", "reserved", now).phase).toBe("check-time");
    expect(ticketPlan("2026-09-29", "reserved", now, "17:00").phase).toBe("upcoming");
    expect(ticketPlan("2026-09-29", "reserved", now, "15:00").phase).toBe("open");
  });
  it("uses Beijing's date around UTC midnight and flags past departures", () => {
    expect(ticketPlan("2026-09-30", "unbooked", new Date("2026-09-15T17:00:00Z")).phase).toBe("check-time");
    expect(ticketPlan("2026-09-14", "issued", now).phase).toBe("past");
  });
  it("exports an exact UTC instant and a ten-minute alert", () => {
    const ics = ticketCalendar("2026-10-01", "Shanghai, Hongqiao", "08:00", now);
    expect(ics).toContain("DTSTART:20260917T000000Z");
    expect(ics).toContain("TRIGGER:-PT10M");
    expect(ics).toContain("Shanghai\\, Hongqiao");
    expect(() => ticketCalendar("2026-09-29", "Beijing", "08:00", now)).toThrow();
    expect(() => ticketCalendar("2026-10-01", "Beijing", "", now)).toThrow();
  });
});
