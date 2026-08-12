import { describe, expect, it } from "vitest";

import { evaluateCheck } from "@/features/checks/evaluate";
import {
  datesConfig,
  hotelArrivalConfig,
  passportConfig,
  paymentConfig,
  readinessConfig,
  trainBookingConfig,
} from "@/features/checks/configs";

describe("train diagnostic scenarios", () => {
  it("diagnoses a passport image upload failure", () => {
    const report = evaluateCheck(trainBookingConfig, {
      ticketChannel: "12306",
      verificationStatus: "failed",
      verificationError: "photo-upload",
      photoMethod: "screenshot",
      nameMatches: true,
      ticketStatus: "none",
      backupTrain: true,
      criticalDependency: false,
      phoneAccess: true,
      originalPassportCarry: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "train-verification-photo", severity: "high" }),
    ]));
  });

  it("marks an unissued waitlist with a fixed dependency as critical", () => {
    const report = evaluateCheck(trainBookingConfig, {
      ticketChannel: "trip",
      verificationStatus: "verified",
      nameMatches: true,
      ticketStatus: "waitlisted",
      backupTrain: false,
      criticalDependency: true,
      phoneAccess: true,
      originalPassportCarry: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "train-waitlist-risk", severity: "critical" }),
      expect.objectContaining({ group: "train-critical-dependency", severity: "critical" }),
    ]));
  });

  it("does not report a ticket-status risk for an issued ticket with a backup", () => {
    const report = evaluateCheck(trainBookingConfig, {
      ticketChannel: "trip",
      verificationStatus: "verified",
      nameMatches: true,
      ticketStatus: "issued",
      backupTrain: true,
      criticalDependency: true,
      phoneAccess: true,
      originalPassportCarry: true,
    });

    expect(report.findings).not.toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "train-ticket-not-issued" }),
      expect.objectContaining({ group: "train-waitlist-risk" }),
      expect.objectContaining({ group: "train-critical-dependency" }),
    ]));
  });

  it("escalates an unissued ticket within two days", () => {
    const report = evaluateCheck(trainBookingConfig, {
      ticketChannel: "trip",
      verificationStatus: "verified",
      nameMatches: true,
      ticketStatus: "pending",
      departureWindow: "0-2",
      backupTrain: true,
      criticalDependency: false,
      phoneAccess: true,
      originalPassportCarry: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "train-imminent-unissued", severity: "critical" }),
    ]));
  });
});

describe("passport scenarios", () => {
  it("flags an original-passport blocker for a hotel and train day", () => {
    const report = evaluateCheck(passportConfig, {
      hotelCheckIn: true,
      trainTravel: true,
      flightTravel: false,
      ticketedAttraction: false,
      otherIdentityService: false,
      originalAvailable: false,
      bookingMatches: true,
      secureCopy: true,
      lossContacts: true,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "original-required", severity: "critical" }),
    ]));
    expect(report.relatedChecks).toContain("hotel-arrival");
  });
});

describe("payment scenarios", () => {
  it("diagnoses an issuer decline after a card has been linked", () => {
    const report = evaluateCheck(paymentConfig, {
      failureStage: "linked-payment-fails",
      paymentApps: ["alipay"],
      identityVerified: true,
      foreignCardLinked: true,
      overseasTransactions: true,
      bankVerificationAccess: true,
      paymentTested: false,
      issuerSignal: "issuer-declined",
      otherCardResult: "not-tried",
      merchantScope: "several",
      backupCard: true,
      physicalCard: true,
      cashBackup: true,
      originalNumberAvailable: true,
      dualSimReady: true,
      esimReceivesSms: true,
      reliesOnOneApp: false,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "issuer-decline", severity: "critical" }),
    ]));
  });

  it("separates a merchant-specific failure from a full payment failure", () => {
    const report = evaluateCheck(paymentConfig, {
      failureStage: "linked-payment-fails",
      paymentApps: ["alipay"],
      identityVerified: true,
      foreignCardLinked: true,
      overseasTransactions: true,
      bankVerificationAccess: true,
      paymentTested: false,
      issuerSignal: "unsure",
      otherCardResult: "not-tried",
      merchantScope: "one-merchant",
      backupCard: true,
      physicalCard: true,
      cashBackup: true,
      originalNumberAvailable: true,
      dualSimReady: true,
      esimReceivesSms: true,
      reliesOnOneApp: false,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "merchant-specific-failure", severity: "information" }),
    ]));
  });

  it("stops repeated attempts when risk control freezes the account", () => {
    const report = evaluateCheck(paymentConfig, {
      failureStage: "risk-control",
      paymentApps: ["alipay"],
      identityVerified: true,
      foreignCardLinked: true,
      overseasTransactions: true,
      bankVerificationAccess: true,
      paymentTested: false,
      riskRecovery: true,
      backupCard: true,
      physicalCard: true,
      cashBackup: true,
      originalNumberAvailable: true,
      dualSimReady: true,
      esimReceivesSms: true,
      reliesOnOneApp: false,
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "payment-risk-control", severity: "critical" }),
    ]));
  });

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

  it("treats an explicit neither-app answer as no mobile payment path", () => {
    const report = evaluateCheck(paymentConfig, {
      paymentApps: ["none"],
      physicalCard: false,
      cashBackup: false,
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
  it("flags a departure date earlier than the arrival date", () => {
    const report = evaluateCheck(datesConfig, {
      arrivalDate: "2026-08-10",
      departureDate: "2026-08-05",
    });

    expect(report.findings).toEqual(expect.arrayContaining([
      expect.objectContaining({ group: "invalid-date-order", severity: "critical" }),
    ]));
  });

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
      expect.objectContaining({ group: "holiday-overlap-CN_NATIONAL_DAY_2026", severity: "high" }),
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
