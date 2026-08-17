export interface TripDifficultyInput {
  firstSoloTrip: boolean;
  firstAsiaTrip: boolean;
  chineseAbility: "none" | "basic" | "conversational";
  cityCount: "one" | "two-three" | "four-plus";
  trainLegs: "none" | "one-two" | "three-plus";
  paymentReady: boolean;
  chinaPhoneReady: boolean;
  travelStyle: "guided" | "mixed" | "independent";
}

export interface TripDifficultyResult {
  score: number;
  level: "EASY" | "MODERATE PREP" | "HIGH PREP" | "ADVANCED ITINERARY";
  summary: string;
  priorities: string[];
}

export function calculateTripDifficulty(input: TripDifficultyInput): TripDifficultyResult {
  let score = 0;
  if (input.firstSoloTrip) score += 2;
  if (input.firstAsiaTrip) score += 2;
  score += input.chineseAbility === "none" ? 2 : input.chineseAbility === "basic" ? 1 : 0;
  score += input.cityCount === "four-plus" ? 3 : input.cityCount === "two-three" ? 1 : 0;
  score += input.trainLegs === "three-plus" ? 2 : input.trainLegs === "one-two" ? 1 : 0;
  if (!input.paymentReady) score += 2;
  if (!input.chinaPhoneReady) score += 1;
  score += input.travelStyle === "independent" ? 2 : input.travelStyle === "mixed" ? 1 : 0;

  const level = score <= 4 ? "EASY" : score <= 8 ? "MODERATE PREP" : score <= 12 ? "HIGH PREP" : "ADVANCED ITINERARY";
  const priorities: string[] = [];
  if (!input.paymentReady) priorities.push("Set up and test a primary payment path plus an independent backup.");
  if (!input.chinaPhoneReady) priorities.push("Prepare working data, account recovery and access to your original number.");
  if (input.trainLegs !== "none") priorities.push("Confirm every train passenger record, issued ticket and station buffer.");
  if (input.cityCount === "four-plus") priorities.push("Reduce fixed dependencies or add recovery time between cities.");
  if (input.chineseAbility === "none" && input.travelStyle !== "guided") priorities.push("Save destinations, hotel details and essential instructions in Chinese.");
  if (!priorities.length) priorities.push("Keep your confirmed bookings and backups accessible offline.");

  const summaries = {
    EASY: "Your plan has relatively few coordination points, but the critical payment, connectivity and identity paths still need to work.",
    "MODERATE PREP": "Your trip is realistic with focused preparation across the dependencies highlighted below.",
    "HIGH PREP": "Several parts of the trip depend on one another, so complete the critical setup before adding more complexity.",
    "ADVANCED ITINERARY": "This plan combines multiple high-effort factors. Simplify fixed dependencies or complete a full readiness review before booking more.",
  } as const;

  return { score, level, summary: summaries[level], priorities };
}
