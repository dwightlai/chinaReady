import type { ComponentType } from "react";

import type { CheckSlug } from "@/features/checks/types";

export type GuideSlug =
  | "test-mobile-payment-before-china"
  | "foreign-card-fails-in-china"
  | "esim-bank-verification-messages"
  | "one-payment-method-is-not-enough"
  | "arrive-with-working-internet"
  | "china-holidays-tickets-hotels"
  | "travel-during-china-national-day"
  | "confirm-late-hotel-check-in-china"
  | "save-hotel-name-address-in-chinese";

export interface SourceNote {
  label: string;
  url?: string;
}

export interface Guide {
  slug: GuideSlug;
  title: string;
  description: string;
  category: "Payments" | "Connectivity" | "Travel dates" | "Hotel arrival";
  lastReviewedAt: string;
  applicableChecks: CheckSlug[];
  sourceNotes: SourceNote[];
  Content: ComponentType;
}
