import type { HolidayEvent } from "../types";
import { shiftIsoDate } from "../date-utils";

export const officialHolidaySource =
  "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm";

const officialHolidays: Array<[string, string, string, string, number, number]> = [
  ["CN_NEW_YEAR_2026", "New Year", "2026-01-01", "2026-01-03", 1, 1],
  ["CN_SPRING_FESTIVAL_2026", "Spring Festival", "2026-02-15", "2026-02-23", 7, 3],
  ["CN_QINGMING_2026", "Qingming Festival", "2026-04-04", "2026-04-06", 1, 1],
  ["CN_LABOUR_DAY_2026", "Labour Day", "2026-05-01", "2026-05-05", 2, 2],
  ["CN_DRAGON_BOAT_2026", "Dragon Boat Festival", "2026-06-19", "2026-06-21", 1, 1],
  ["CN_MID_AUTUMN_2026", "Mid-Autumn Festival", "2026-09-25", "2026-09-27", 1, 1],
  ["CN_NATIONAL_DAY_2026", "National Day", "2026-10-01", "2026-10-07", 2, 2],
];

const travelPressureEvents: HolidayEvent[] = [
  {
    code: "CN_CHUNYUN_2026",
    name: "Spring Festival travel rush (Chunyun)",
    startDate: "2026-01-17",
    endDate: "2026-03-03",
    preRiskDays: 0,
    postRiskDays: 0,
    affectedCities: ["ALL"],
    official: false,
    lastReviewedAt: "2026-07-14",
  },
  {
    code: "CN_SUMMER_TRAVEL_2026",
    name: "summer travel peak",
    startDate: "2026-07-01",
    endDate: "2026-08-31",
    preRiskDays: 0,
    postRiskDays: 0,
    affectedCities: ["ALL"],
    official: false,
    lastReviewedAt: "2026-07-14",
  },
  {
    code: "CN_CANTON_FAIR_SPRING_2026",
    name: "Canton Fair (Guangzhou, spring session)",
    startDate: "2026-04-15",
    endDate: "2026-05-05",
    preRiskDays: 2,
    postRiskDays: 1,
    affectedCities: ["Guangzhou"],
    official: false,
    lastReviewedAt: "2026-07-14",
  },
  {
    code: "CN_CANTON_FAIR_AUTUMN_2026",
    name: "Canton Fair (Guangzhou, autumn session)",
    startDate: "2026-10-15",
    endDate: "2026-11-04",
    preRiskDays: 2,
    postRiskDays: 1,
    affectedCities: ["Guangzhou"],
    official: false,
    lastReviewedAt: "2026-07-14",
  },
];

export const holidayEvents2026: HolidayEvent[] = [
  ...officialHolidays.map(([code, name, startDate, endDate, preRiskDays, postRiskDays]) => ({
    code,
    name,
    startDate,
    endDate,
    preRiskDays,
    postRiskDays,
    affectedCities: ["ALL"],
    official: true,
    sourceUrl: officialHolidaySource,
    lastReviewedAt: "2026-07-14",
  })),
  ...travelPressureEvents,
];

export function holidayWindow(event: HolidayEvent): { start: string; end: string } {
  return {
    start: shiftIsoDate(event.startDate, -event.preRiskDays),
    end: shiftIsoDate(event.endDate, event.postRiskDays),
  };
}
