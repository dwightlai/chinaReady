import type { CheckSlug, ToolConfig } from "../types";
import { datesConfig } from "./dates";
import { hotelArrivalConfig } from "./hotel-arrival";
import { paymentConfig } from "./payment";
import { readinessConfig } from "./readiness";

export { datesConfig, hotelArrivalConfig, paymentConfig, readinessConfig };

export const checkConfigs: Record<CheckSlug, ToolConfig> = {
  readiness: readinessConfig,
  payment: paymentConfig,
  dates: datesConfig,
  "hotel-arrival": hotelArrivalConfig,
};
