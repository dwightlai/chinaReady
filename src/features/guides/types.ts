import type { ComponentType } from "react";

import type { CheckSlug } from "@/features/checks/types";
import type { ArticleFaq } from "./content/article-sections";

export type GuideSlug =
  | "test-mobile-payment-before-china"
  | "foreign-card-fails-in-china"
  | "esim-bank-verification-messages"
  | "one-payment-method-is-not-enough"
  | "arrive-with-working-internet"
  | "buy-sim-or-esim-for-china"
  | "cash-and-atms-in-china"
  | "first-city-shanghai-or-beijing"
  | "china-holidays-tickets-hotels"
  | "travel-during-china-national-day"
  | "confirm-late-hotel-check-in-china"
  | "save-hotel-name-address-in-chinese"
  | "vpn-in-china-2026"
  | "didi-without-chinese-number"
  | "train-booking-for-foreign-visitors"
  | "china-entry-requirements-checklist";

export interface SourceNote {
  label: string;
  url?: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface Guide {
  slug: GuideSlug;
  title: string;
  description: string;
  category: "Payments" | "Connectivity" | "Travel dates" | "Hotel arrival" | "Transport" | "Planning";
  lastReviewedAt: string;
  applicableChecks: CheckSlug[];
  sourceNotes: SourceNote[];
  faqs?: ArticleFaq[];
  howTo?: HowToStep[];
  Content: ComponentType;
}
