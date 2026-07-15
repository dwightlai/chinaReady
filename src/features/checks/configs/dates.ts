import type { Condition, RiskRule, ToolConfig } from "../types";
import { holidayEvents2026, holidayWindow } from "./holiday-events";
import { choice, yesNo } from "./shared";

const cityAliases: Record<string, string[]> = {
  Guangzhou: ["guangzhou", "guang zhou", "广州", "廣州", "canton", "gz"],
};

function cityMatchConditions(cities: string[]): Condition[] {
  return cities.flatMap((city) => (cityAliases[city] ?? [city.toLowerCase()]).map((alias) => ({
    field: "cities",
    operator: "text-includes" as const,
    value: alias,
  })));
}

function cityExcludeConditions(cities: string[]): Condition[] {
  return cities.flatMap((city) => (cityAliases[city] ?? [city.toLowerCase()]).map((alias) => ({
    field: "cities",
    operator: "text-excludes" as const,
    value: alias,
  })));
}

function overlapCondition(window: { start: string; end: string }): Condition {
  return {
    field: "arrivalDate",
    endField: "departureDate",
    operator: "date-overlaps",
    value: { start: window.start, end: window.end },
  };
}

const holidayRules: RiskRule[] = holidayEvents2026.flatMap((event, index): RiskRule[] => {
  const window = holidayWindow(event);
  const scopedCities = event.affectedCities.filter((city) => city !== "ALL");
  const guides = event.code.includes("NATIONAL_DAY")
    ? ["travel-during-china-national-day"]
    : ["china-holidays-tickets-hotels"];

  if (scopedCities.length === 0) {
    return [{
      code: `${event.code}_OVERLAP`,
      severity: "high",
      priority: 10 + index,
      group: `holiday-overlap-${event.code}`,
      all: [overlapCondition(window)],
      title: `Your trip overlaps with ${event.name}.`,
      explanation: "Transport, hotels and popular attractions may have less availability than usual.",
      actions: ["Prioritize intercity transport.", "Confirm hotels and timed attractions early."],
      relatedGuides: guides,
    }];
  }

  return [
    {
      code: `${event.code}_LOCAL`,
      severity: "high",
      priority: 10 + index,
      group: `holiday-overlap-${event.code}-local`,
      all: [overlapCondition(window)],
      any: cityMatchConditions(scopedCities),
      title: `Your trip overlaps with ${event.name}.`,
      explanation: "Hotel and transport demand can rise sharply in Guangzhou during the fair.",
      actions: ["Confirm Guangzhou hotels early.", "Leave buffer time for crowded transfer routes."],
      relatedGuides: guides,
    },
    {
      code: `${event.code}_OTHER`,
      severity: "information",
      priority: 50 + index,
      group: `holiday-overlap-${event.code}-other`,
      all: [overlapCondition(window), ...cityExcludeConditions(scopedCities)],
      title: `Your trip overlaps with ${event.name.replace(/\s*\(Guangzhou[^)]*\)/, "").trim()} dates.`,
      explanation: "Trade-fair periods can raise hotel and transport demand in the host city. This may matter less if you are not visiting that city.",
      actions: ["Confirm whether your cities are affected before changing bookings."],
      relatedGuides: guides,
    },
  ];
});

export const datesConfig: ToolConfig = {
  slug: "dates",
  name: "Travel Date Check",
  shortName: "Dates",
  description: "Check your dates against our verified 2026 holiday calendar.",
  duration: "2 minutes",
  lastReviewedAt: "2026-07-14",
  coveragePoints: [
    "Overlap with verified Chinese public holidays and pre/post risk windows",
    "Spring travel rush, summer peak and Canton Fair pressure",
    "High-speed rail and incomplete key bookings",
    "Whether your dates still have room to flex",
  ],
  sampleFinding: {
    severity: "high",
    title: "Your trip overlaps with National Day Golden Week.",
    explanation: "Transport, hotels and popular attractions may have less availability than usual.",
  },
  questions: [
    { id: "arrivalDate", prompt: "When will you arrive in China?", type: "date", required: true },
    { id: "departureDate", prompt: "When will you leave China?", type: "date", required: true },
    { id: "cities", prompt: "Which city or cities will you visit?", help: "Use common English names such as Guangzhou, Shanghai or Beijing. Multiple cities are fine.", type: "text", required: true },
    choice("intercityTravel", "Will you travel between cities?", yesNo),
    choice("highSpeedRail", "Do you plan to use high-speed rail?", yesNo),
    choice("popularAttractions", "Will you visit major timed or ticketed attractions?", yesNo),
    choice("datesFlexible", "Can you adjust your dates if risk is high?", yesNo),
    choice("bookingsComplete", "Are your key transport and hotel bookings confirmed?", yesNo),
  ],
  rules: [
    {
      code: "DATES_INVALID_ORDER", severity: "critical", priority: 1, group: "invalid-date-order",
      all: [{ field: "arrivalDate", endField: "departureDate", operator: "date-after-field" }],
      title: "Your departure date is earlier than your arrival date.",
      explanation: "The trip window cannot be checked until the dates are in chronological order.",
      actions: ["Correct the arrival or departure date and run the check again."],
    },
    ...holidayRules,
    {
      code: "DATES_OUTSIDE_WINDOW", severity: "information", priority: 1, group: "invalid-verified-window",
      any: [
        { field: "arrivalDate", operator: "date-before", value: "2026-01-01" },
        { field: "arrivalDate", operator: "date-after", value: "2026-12-31" },
        { field: "departureDate", operator: "date-before", value: "2026-01-01" },
        { field: "departureDate", operator: "date-after", value: "2026-12-31" },
      ],
      title: "These dates are outside our verified holiday calendar.",
      explanation: "Official future holiday arrangements may not yet be published or reviewed here.",
      actions: ["Check the latest official Chinese government holiday schedule before booking."],
      relatedGuides: ["china-holidays-tickets-hotels"],
    },
    {
      code: "DATES_RAIL", severity: "high", priority: 30, group: "rail-booking-risk",
      all: [{ field: "highSpeedRail", operator: "eq", value: true }, { field: "bookingsComplete", operator: "eq", value: false }],
      title: "Your planned rail travel is not confirmed.",
      explanation: "High-demand dates can reduce useful train options quickly.",
      actions: ["Prioritize confirmed intercity rail bookings."],
      relatedGuides: ["china-holidays-tickets-hotels"],
    },
    {
      code: "DATES_INTERCITY", severity: "high", priority: 29, group: "intercity-unconfirmed",
      all: [{ field: "intercityTravel", operator: "eq", value: true }, { field: "bookingsComplete", operator: "eq", value: false }],
      title: "Intercity travel is planned without confirmed bookings.",
      explanation: "Busy periods can make late city-to-city changes expensive or unavailable.",
      actions: ["Confirm the main intercity legs before peak demand builds."],
      relatedGuides: ["china-holidays-tickets-hotels"],
    },
    {
      code: "DATES_HOTEL", severity: "high", priority: 31, group: "hotel-price-risk",
      all: [{ field: "bookingsComplete", operator: "eq", value: false }, { field: "datesFlexible", operator: "eq", value: false }],
      title: "Fixed dates and incomplete bookings reduce your options.",
      explanation: "Limited flexibility can make late hotel changes more expensive.",
      actions: ["Confirm cancellable accommodation as soon as practical."],
    },
    {
      code: "DATES_ATTRACTION", severity: "high", priority: 32, group: "attraction-booking-risk",
      all: [{ field: "popularAttractions", operator: "eq", value: true }, { field: "bookingsComplete", operator: "eq", value: false }],
      title: "Popular attraction reservations are not confirmed.",
      explanation: "Timed attractions may sell out during busy periods.",
      actions: ["Check passport booking support and reserve timed attractions early."],
    },
    {
      code: "DATES_FLEXIBLE_GAP", severity: "information", priority: 40, group: "flexibility-gap",
      all: [{ field: "datesFlexible", operator: "eq", value: false }, { field: "bookingsComplete", operator: "eq", value: true }],
      title: "Your dates are fixed even though bookings look complete.",
      explanation: "A disruption may still force expensive changes if nothing can move.",
      actions: ["Keep one cancellable booking or a backup night if the schedule is tight."],
    },
  ],
};
