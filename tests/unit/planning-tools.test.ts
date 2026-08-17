import { describe, expect, it } from "vitest";

import { calculateStationArrival, formatClock } from "@/features/planning-tools/station-arrival";
import { calculateTripDifficulty } from "@/features/planning-tools/trip-difficulty";

describe("station arrival calculator", () => {
  it("adds a practical buffer for a first-time foreign-passport traveler", () => {
    const result = calculateStationArrival({ station: "Beijing South", departureTime: "09:30", travelMinutes: 30, firstHighSpeedRailTrip: true, foreignPassport: true, largeLuggage: true, criticalConnection: false, peakPeriod: false });
    expect(result.bufferMinutes).toBe(40);
    expect(result.arrivalWindow).toBe("08:40–08:50");
    expect(result.leaveTime).toBe("08:10");
    expect(result.warnings).toHaveLength(3);
  });

  it("formats a hotel departure on the previous day", () => {
    expect(formatClock(-20)).toBe("23:40 the previous day");
    const result = calculateStationArrival({ station: "Shanghai Hongqiao", departureTime: "00:30", travelMinutes: 40, firstHighSpeedRailTrip: true, foreignPassport: true, largeLuggage: false, criticalConnection: false, peakPeriod: false });
    expect(result.leaveTime).toContain("previous day");
  });
});

describe("trip difficulty checker", () => {
  it("returns easy for a simple supported itinerary", () => {
    const result = calculateTripDifficulty({ firstSoloTrip: false, firstAsiaTrip: false, chineseAbility: "conversational", cityCount: "one", trainLegs: "none", paymentReady: true, chinaPhoneReady: true, travelStyle: "guided" });
    expect(result.level).toBe("EASY");
  });

  it("returns advanced for a complex unprepared first trip", () => {
    const result = calculateTripDifficulty({ firstSoloTrip: true, firstAsiaTrip: true, chineseAbility: "none", cityCount: "four-plus", trainLegs: "three-plus", paymentReady: false, chinaPhoneReady: false, travelStyle: "independent" });
    expect(result.level).toBe("ADVANCED ITINERARY");
    expect(result.priorities.length).toBeGreaterThanOrEqual(4);
  });
});
