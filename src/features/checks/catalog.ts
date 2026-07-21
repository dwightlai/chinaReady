import type { CheckSlug } from "./types";

export interface CheckCatalogItem {
  slug: CheckSlug;
  name: string;
  description: string;
  duration: string;
  cta: string;
}

export const checkCatalog: CheckCatalogItem[] = [
  {
    slug: "readiness",
    name: "China Readiness Check",
    description: "Find blockers across payment, internet, travel dates and arrival plans.",
    duration: "4 minutes",
    cta: "Start full check",
  },
  {
    slug: "apps",
    name: "China App Readiness Checker",
    description: "Know which apps to install, register and verify before you land.",
    duration: "3 minutes",
    cta: "Check my apps",
  },
  {
    slug: "payment",
    name: "Payment Readiness Test",
    description: "Test your payment path and the backups behind it.",
    duration: "3 minutes",
    cta: "Check payments",
  },
  {
    slug: "train-booking",
    name: "Train Booking Readiness Checker",
    description: "Catch passport, account and connection risks before train day.",
    duration: "4 minutes",
    cta: "Check train plans",
  },
  {
    slug: "dates",
    name: "Travel Date Check",
    description: "Review verified holiday risks for tickets, hotels and attractions.",
    duration: "2 minutes",
    cta: "Check dates",
  },
  {
    slug: "hotel-arrival",
    name: "Hotel Arrival Check",
    description: "Prepare for late arrival, passport matching and a usable Chinese address.",
    duration: "3 minutes",
    cta: "Check arrival",
  },
];
