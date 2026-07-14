import type { HolidayEvent } from "../types";

export const officialHolidaySource =
  "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm";

export const holidayEvents2026: HolidayEvent[] = [
  ["CN_NEW_YEAR_2026", "New Year", "2026-01-01", "2026-01-03", 1, 1],
  ["CN_SPRING_FESTIVAL_2026", "Spring Festival", "2026-02-15", "2026-02-23", 7, 3],
  ["CN_QINGMING_2026", "Qingming Festival", "2026-04-04", "2026-04-06", 1, 1],
  ["CN_LABOUR_DAY_2026", "Labour Day", "2026-05-01", "2026-05-05", 2, 2],
  ["CN_DRAGON_BOAT_2026", "Dragon Boat Festival", "2026-06-19", "2026-06-21", 1, 1],
  ["CN_MID_AUTUMN_2026", "Mid-Autumn Festival", "2026-09-25", "2026-09-27", 1, 1],
  ["CN_NATIONAL_DAY_2026", "National Day", "2026-10-01", "2026-10-07", 2, 2],
].map(([code, name, startDate, endDate, preRiskDays, postRiskDays]) => ({
  code: String(code),
  name: String(name),
  startDate: String(startDate),
  endDate: String(endDate),
  preRiskDays: Number(preRiskDays),
  postRiskDays: Number(postRiskDays),
  affectedCities: ["ALL"],
  official: true,
  sourceUrl: officialHolidaySource,
  lastReviewedAt: "2026-07-14",
}));
