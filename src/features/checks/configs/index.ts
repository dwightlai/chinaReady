import type { CheckSlug, ToolConfig } from "../types";
import { datesConfig } from "./dates";
import { hotelArrivalConfig } from "./hotel-arrival";
import { paymentConfig } from "./payment";
import { passportConfig } from "./passport";
import { readinessConfig } from "./readiness";
import { appsConfig } from "./apps";
import { trainBookingConfig } from "./train-booking";

export { appsConfig, datesConfig, hotelArrivalConfig, passportConfig, paymentConfig, readinessConfig, trainBookingConfig };

export const checkConfigs: Record<CheckSlug, ToolConfig> = {
  readiness: readinessConfig,
  apps: appsConfig,
  payment: paymentConfig,
  passport: passportConfig,
  "train-booking": trainBookingConfig,
  dates: datesConfig,
  "hotel-arrival": hotelArrivalConfig,
};
