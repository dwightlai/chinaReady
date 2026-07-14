import { ChineseHotelAddressGuide } from "./content/chinese-hotel-address";
import { EsimVerificationGuide } from "./content/esim-verification";
import { ForeignCardFailureGuide } from "./content/foreign-card-failure";
import { HolidayBookingGuide } from "./content/holiday-booking";
import { LateCheckInGuide } from "./content/late-check-in";
import { NationalDayGuide } from "./content/national-day";
import { PaymentBackupGuide } from "./content/payment-backup";
import { PaymentTestGuide } from "./content/payment-test";
import type { Guide, GuideSlug } from "./types";

const reviewed = "2026-07-14";
const operationalNote = { label: "Conservative preparation guidance. Confirm current terms with the relevant provider." };
const holidaySource = { label: "State Council: 2026 public holiday arrangements", url: "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm" };

export const guideCatalog: Guide[] = [
  { slug: "test-mobile-payment-before-china", title: "How to test a mobile payment setup before visiting China", description: "Prove that your app, card and verification route work together before departure.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment", "readiness"], sourceNotes: [operationalNote], Content: PaymentTestGuide },
  { slug: "foreign-card-fails-in-china", title: "What to do if a foreign card fails in China", description: "Recover from a declined card without losing your only practical way to pay.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment"], sourceNotes: [operationalNote], Content: ForeignCardFailureGuide },
  { slug: "esim-bank-verification-messages", title: "Why a travel eSIM may not receive bank verification messages", description: "Protect the approval route your card issuer may need during a transaction.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment"], sourceNotes: [operationalNote], Content: EsimVerificationGuide },
  { slug: "one-payment-method-is-not-enough", title: "Why one payment method is not enough in China", description: "Build independent fallbacks for app, card, phone and verification failures.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment", "readiness"], sourceNotes: [operationalNote], Content: PaymentBackupGuide },
  { slug: "china-holidays-tickets-hotels", title: "How Chinese public holidays affect train tickets and hotel bookings", description: "Spot high-demand dates and protect the bookings that hold your itinerary together.", category: "Travel dates", lastReviewedAt: reviewed, applicableChecks: ["dates", "readiness"], sourceNotes: [holidaySource], Content: HolidayBookingGuide },
  { slug: "travel-during-china-national-day", title: "Whether to travel during China National Day", description: "Decide whether fixed holiday dates fit your tolerance for demand and reduced flexibility.", category: "Travel dates", lastReviewedAt: reviewed, applicableChecks: ["dates"], sourceNotes: [holidaySource], Content: NationalDayGuide },
  { slug: "confirm-late-hotel-check-in-china", title: "How to confirm late hotel check-in in China", description: "Make sure a delayed arrival does not leave you without access to your room.", category: "Hotel arrival", lastReviewedAt: reviewed, applicableChecks: ["hotel-arrival", "readiness"], sourceNotes: [operationalNote], Content: LateCheckInGuide },
  { slug: "save-hotel-name-address-in-chinese", title: "Why to save a hotel name and address in Chinese", description: "Give drivers and local support staff a clear, offline destination reference.", category: "Hotel arrival", lastReviewedAt: reviewed, applicableChecks: ["hotel-arrival", "readiness"], sourceNotes: [operationalNote], Content: ChineseHotelAddressGuide },
];

export const guidesBySlug = Object.fromEntries(guideCatalog.map((guide) => [guide.slug, guide])) as Record<GuideSlug, Guide>;
