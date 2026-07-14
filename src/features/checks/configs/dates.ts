import type { RiskRule, ToolConfig } from "../types";
import { holidayEvents2026, holidayWindow } from "./holiday-events";
import { choice, yesNo } from "./shared";

const holidayRules: RiskRule[] = holidayEvents2026.map((event, index) => {
  const window = holidayWindow(event);
  const isCantonFair = event.code.includes("CANTON_FAIR");
  return {
    code: `${event.code}_OVERLAP`,
    severity: "high" as const,
    priority: 10 + index,
    group: `holiday-overlap-${event.code}`,
    all: [{
      field: "arrivalDate",
      endField: "departureDate",
      operator: "date-overlaps",
      value: { start: window.start, end: window.end },
    }],
    title: `Your trip overlaps with ${event.name}.`,
    explanation: isCantonFair
      ? "Hotel and transport demand can rise sharply in Guangzhou during the fair."
      : "Transport, hotels and popular attractions may have less availability than usual.",
    actions: isCantonFair
      ? ["Confirm Guangzhou hotels early.", "Leave buffer time for crowded transfer routes."]
      : ["Prioritize intercity transport.", "Confirm hotels and timed attractions early."],
    relatedGuides: event.code.includes("NATIONAL_DAY")
      ? ["travel-during-china-national-day"]
      : ["china-holidays-tickets-hotels"],
  };
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
    { id: "cities", prompt: "Which city or cities will you visit?", type: "text", required: true },
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
