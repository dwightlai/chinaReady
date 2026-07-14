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
    slug: "payment",
    name: "Payment Setup Check",
    description: "Identify single points of failure before you need to pay.",
    duration: "3 minutes",
    cta: "Check payments",
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
