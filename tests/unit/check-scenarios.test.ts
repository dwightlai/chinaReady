import { describe, expect, it } from "vitest";

import { evaluateCheck } from "@/features/checks/evaluate";
import {
  datesConfig,
  hotelArrivalConfig,
  paymentConfig,
  readinessConfig,
} from "@/features/checks/configs";

describe("payment scenarios", () => {
  it("flags the absence of any practical payment path as critical", () => {
    const report = evaluateCheck(paymentConfig, {
      paymentApps: [],
      identityVerified: false,
      foreignCardLinked: false,
      overseasTransactions: false,
      bankVerificationAccess: false,
      paymentTested: false,
      backupCard: false,
      physicalCard: false,
      cashBackup: false,
      originalNumberAvailable: false,
      esimReceivesSms: false,
      reliesOnOneApp: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "no-payment-path", severity: "critical" }),
    ]));
  });
});

describe("hotel arrival scenarios", () => {
  it("returns ready when the arrival plan has a complete primary and backup path", () => {
    const report = evaluateCheck(hotelArrivalConfig, {
      city: "Shanghai",
      hotelArrivalTime: "21:00",
      frontDesk24Hours: true,
      lateArrivalConfirmed: true,
      chineseHotelName: true,
      chineseAddress: true,
      hotelPhone: true,
      bookingNameMatches: true,
      mainstreamPlatform: true,
      freeCancellation: true,
      backupHotel: true,
      arrivalTransport: true,
    });

    expect(report.overallStatus).toBe("ready");
  });

  it("flags an unconfirmed late arrival without a 24-hour desk as critical", () => {
    const report = evaluateCheck(hotelArrivalConfig, {
      city: "Guangzhou",
      hotelArrivalTime: "00:30",
      frontDesk24Hours: false,
      lateArrivalConfirmed: false,
      chineseHotelName: true,
      chineseAddress: true,
      hotelPhone: true,
      bookingNameMatches: true,
      mainstreamPlatform: true,
      freeCancellation: false,
      backupHotel: false,
      arrivalTransport: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "late-arrival-unconfirmed", severity: "critical" }),
    ]));
  });
});

describe("readiness scenarios", () => {
  it("does not flag train follow-up risks when the trip has no train travel", () => {
    const report = evaluateCheck(readinessConfig, {
      trainTravel: false,
      trainTicketIssued: false,
      trainPassportChecked: false,
    });

    expect(report.findings).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "train-ticket-unissued" }),
      expect.objectContaining({ group: "train-passport-unchecked" }),
    ]));
  });
});

describe("date scenarios", () => {
  it("detects a National Day overlap", () => {
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2026-10-02",
      departureDate: "2026-10-06",
      cities: "Beijing",
      intercityTravel: true,
      highSpeedRail: true,
      popularAttractions: true,
      datesFlexible: false,
      bookingsComplete: false,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "holiday-overlap", severity: "high" }),
    ]));
  });

  it("asks for official verification beyond the reviewed calendar", () => {
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2027-05-01",
      departureDate: "2027-05-05",
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "invalid-verified-window", severity: "information" }),
    ]));
  });
});
