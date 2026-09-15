import { describe, expect, it } from "vitest";
import { assessVisa, type VisaInput } from "@/features/planning-tools/visa-rules";

const today = "2026-09-15";
const visit: VisaInput = { nationality: "France", entryDate: "2026-10-01", scheme: "direct", passport: "ordinary", validPassport: "yes", days: 10, purpose: "tourism" };
const transit: VisaInput = { ...visit, nationality: "United States", scheme: "transit", previous: "Japan", next: "South Korea", port: "Shanghai Pudong", portConfirmed: "yes", areasConfirmed: "yes", onwardConfirmed: "yes" };
describe("evidence-based visa assessment", () => {
  it("requires details before a preliminary positive result", () => {
    expect(assessVisa({ nationality: "France", entryDate: visit.entryDate, scheme: "direct" }, today).status).toBe("review");
    expect(assessVisa(visit, today).status).toBe("eligible");
  });
  it("treats expired or stale rules as review, never visa-required", () => {
    expect(assessVisa({ ...visit, entryDate: "2027-01-01" }, today).status).toBe("review");
    expect(assessVisa(visit, "2026-10-16").status).toBe("review");
    expect(assessVisa({ ...visit, nationality: "Russia", entryDate: "2027-01-01" }, today).status).toBe("eligible");
  });
  it("keeps uncovered nationalities and invalid dates uncertain", () => {
    expect(assessVisa({ ...visit, nationality: "other" }, today).status).toBe("review");
    expect(assessVisa({ ...visit, entryDate: "2026-02-30" }, today).status).toBe("review");
    expect(assessVisa({ ...visit, entryDate: "2026-09-01" }, today).status).toBe("review");
  });
  it("rejects only the selected scheme for incompatible answers", () => {
    expect(assessVisa({ ...visit, days: 31 }, today).status).toBe("ineligible");
    expect(assessVisa({ ...visit, purpose: "work" }, today).status).toBe("ineligible");
  });
  it("requires complete transit confirmations and distinct known destinations", () => {
    expect(assessVisa(transit, today).status).toBe("eligible");
    expect(assessVisa({ ...transit, next: "Japan" }, today).status).toBe("ineligible");
    expect(assessVisa({ ...transit, next: "Other / not listed" }, today).status).toBe("review");
    expect(assessVisa({ ...transit, portConfirmed: "" }, today).status).toBe("review");
    expect(assessVisa({ ...transit, onwardConfirmed: "no" }, today).status).toBe("ineligible");
  });
});
