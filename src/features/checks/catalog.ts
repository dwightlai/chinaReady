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
    name: "China Payment Preflight & Failure Diagnostic",
    description: "Find where app setup, card authorization, verification or merchant payment is failing.",
    duration: "5 minutes",
    cta: "Diagnose payment",
  },
  {
    slug: "passport",
    name: "Passport Carry & Identity Checker",
    description: "Know when to carry the original and where identity checks can block your day.",
    duration: "2 minutes",
    cta: "Check passport needs",
  },
  {
    slug: "train-booking",
    name: "China Train Booking Diagnostic",
    description: "Diagnose 12306 passport verification, ticket status and itinerary dependency risks.",
    duration: "5 minutes",
    cta: "Diagnose train booking",
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
