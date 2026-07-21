import { ArrivalInternetGuide, arrivalInternetFaqs } from "./content/arrival-internet";
import { CashAtmGuide, cashAtmFaqs } from "./content/cash-atm";
import { ChineseHotelAddressGuide, chineseHotelAddressFaqs } from "./content/chinese-hotel-address";
import { DidiGuide, didiFaqs } from "./content/didi";
import { EntryRequirementsGuide, entryRequirementsFaqs } from "./content/entry-requirements";
import { EsimVerificationGuide, esimVerificationFaqs } from "./content/esim-verification";
import { FirstCityGuide, firstCityFaqs } from "./content/first-city";
import { ForeignCardFailureGuide } from "./content/foreign-card-failure";
import { HolidayBookingGuide, holidayBookingFaqs } from "./content/holiday-booking";
import { LateCheckInGuide, lateCheckInFaqs } from "./content/late-check-in";
import { NationalDayGuide } from "./content/national-day";
import { PaymentBackupGuide } from "./content/payment-backup";
import { PaymentTestGuide, paymentTestFaqs } from "./content/payment-test";
import { SimEsimGuide, simEsimFaqs } from "./content/sim-esim";
import { TrainBookingGuide, trainBookingFaqs } from "./content/train-booking";
import { VpnChinaGuide, vpnChinaFaqs } from "./content/vpn-china";
import type { Guide, GuideSlug } from "./types";
import { guideHowTos } from "./how-tos";

const reviewed = "2026-07-21";
const holidaySource = { label: "State Council: 2026 public holiday arrangements", url: "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm" };
const paymentSource = { label: "China government payment guide for overseas visitors", url: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html" };
const cardFailureSource = { label: "China government payment guide for overseas visitors", url: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html" };
const esimSmsSource = { label: "Travel eSIM SMS support varies by provider. Confirm incoming message support with the eSIM vendor and your bank." };
const backupSource = { label: "China government payment guide for overseas visitors", url: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html" };
const cashSource = { label: "China government payment guide for overseas visitors", url: "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html" };
const internetSource = { label: "Mainland network access depends on your SIM/eSIM plan, device unlock status and local coverage on arrival." };
const simSource = { label: "Confirm mainland China coverage, activation steps and airport backup purchase options with the SIM or eSIM provider." };
const hotelLateSource = { label: "Late-arrival policies are set by each hotel. Get written confirmation from the property, not only the booking platform." };
const hotelAddressSource = { label: "Ask the hotel for the official Chinese name and address and keep an offline copy for drivers and local staff." };
const firstCitySource = { label: "Choose the first city from inbound flight timing, hotel confirmation strength and recovery margin—not attraction rankings." };
const vpnSource = { label: "Foreign app and website access on mainland networks can be limited. Prioritize local payment, maps and offline booking copies." };
const didiSource = { label: "China government guide: DiDi for foreign travelers", url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025" };
const entrySource = { label: "NIA: 2026 unilateral visa exemption list", url: "https://en.nia.gov.cn/n147418/n147463/c183390/content.html" };
const entryTransitSource = { label: "NIA: 240-hour visa-free transit policy", url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html" };
const railSource = { label: "12306 English FAQ", url: "https://www.12306.cn/en/faq.html?item=1" };
const railRegisterSource = { label: "12306 foreign-passport registration", url: "https://www.12306.cn/en/register.html" };
const railSalesSource = { label: "12306 ticket sales policy", url: "https://kyfw.12306.cn/otn/gonggao/saleTicketMeans.html" };

export const guideCatalog: Guide[] = [
  { slug: "test-mobile-payment-before-china", title: "How to test Alipay or WeChat Pay before visiting China", description: "Prove that your Alipay or WeChat Pay setup, card and verification route work together before departure.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment", "readiness", "apps"], sourceNotes: [paymentSource], faqs: paymentTestFaqs, howTo: guideHowTos["test-mobile-payment-before-china"], Content: PaymentTestGuide },
  { slug: "foreign-card-fails-in-china", title: "What to do if a foreign card fails in China", description: "Recover from a declined card without losing your only practical way to pay through Alipay, WeChat Pay or cash.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment"], sourceNotes: [cardFailureSource], howTo: guideHowTos["foreign-card-fails-in-china"], Content: ForeignCardFailureGuide },
  { slug: "esim-bank-verification-messages", title: "Why a travel eSIM may not receive bank verification messages", description: "Protect the approval route your card issuer may need during an Alipay or WeChat Pay transaction.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment"], sourceNotes: [esimSmsSource], faqs: esimVerificationFaqs, howTo: guideHowTos["esim-bank-verification-messages"], Content: EsimVerificationGuide },
  { slug: "one-payment-method-is-not-enough", title: "Why one Alipay or WeChat Pay method is not enough", description: "Build independent fallbacks for app, card, phone and verification failures.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment", "readiness"], sourceNotes: [backupSource], howTo: guideHowTos["one-payment-method-is-not-enough"], Content: PaymentBackupGuide },
  { slug: "cash-and-atms-in-china", title: "How much cash and ATM access to prepare for China", description: "Use RMB cash as a backup while keeping Alipay, WeChat Pay and a second card ready.", category: "Payments", lastReviewedAt: reviewed, applicableChecks: ["payment", "readiness"], sourceNotes: [cashSource], faqs: cashAtmFaqs, howTo: guideHowTos["cash-and-atms-in-china"], Content: CashAtmGuide },
  { slug: "arrive-with-working-internet", title: "How to arrive in China with working internet", description: "Set a primary and backup data plan so payment, maps and hotel contact work on landing.", category: "Connectivity", lastReviewedAt: reviewed, applicableChecks: ["readiness", "apps"], sourceNotes: [internetSource], faqs: arrivalInternetFaqs, howTo: guideHowTos["arrive-with-working-internet"], Content: ArrivalInternetGuide },
  { slug: "buy-sim-or-esim-for-china", title: "How to choose a SIM or eSIM for mainland China travel", description: "Pick a data plan that works on landing and keep an airport backup if the first option fails.", category: "Connectivity", lastReviewedAt: reviewed, applicableChecks: ["readiness", "apps"], sourceNotes: [simSource], faqs: simEsimFaqs, howTo: guideHowTos["buy-sim-or-esim-for-china"], Content: SimEsimGuide },
  { slug: "vpn-in-china-2026", title: "Do you need a VPN in China in 2026", description: "Prepare for limited foreign app access on mainland networks without making a VPN your only arrival plan.", category: "Connectivity", lastReviewedAt: reviewed, applicableChecks: ["readiness", "apps"], sourceNotes: [vpnSource], faqs: vpnChinaFaqs, howTo: guideHowTos["vpn-in-china-2026"], Content: VpnChinaGuide },
  { slug: "china-holidays-tickets-hotels", title: "How Chinese public holidays affect train tickets and hotel bookings", description: "Spot high-demand dates and protect the bookings that hold your itinerary together.", category: "Travel dates", lastReviewedAt: reviewed, applicableChecks: ["dates", "readiness"], sourceNotes: [holidaySource], faqs: holidayBookingFaqs, howTo: guideHowTos["china-holidays-tickets-hotels"], Content: HolidayBookingGuide },
  { slug: "travel-during-china-national-day", title: "Whether to travel during China National Day", description: "Decide whether fixed holiday dates fit your tolerance for demand and reduced flexibility.", category: "Travel dates", lastReviewedAt: reviewed, applicableChecks: ["dates"], sourceNotes: [holidaySource], howTo: guideHowTos["travel-during-china-national-day"], Content: NationalDayGuide },
  { slug: "confirm-late-hotel-check-in-china", title: "How to confirm late hotel check-in in China", description: "Make sure a delayed arrival does not leave you without access to your room.", category: "Hotel arrival", lastReviewedAt: reviewed, applicableChecks: ["hotel-arrival", "readiness"], sourceNotes: [hotelLateSource], faqs: lateCheckInFaqs, howTo: guideHowTos["confirm-late-hotel-check-in-china"], Content: LateCheckInGuide },
  { slug: "save-hotel-name-address-in-chinese", title: "Why to save a hotel name and address in Chinese", description: "Give drivers and local support staff a clear, offline destination reference.", category: "Hotel arrival", lastReviewedAt: reviewed, applicableChecks: ["hotel-arrival", "readiness"], sourceNotes: [hotelAddressSource], faqs: chineseHotelAddressFaqs, howTo: guideHowTos["save-hotel-name-address-in-chinese"], Content: ChineseHotelAddressGuide },
  { slug: "didi-without-chinese-number", title: "How to use DiDi without a Chinese phone number", description: "Set up ride-hailing before a late airport transfer and keep a taxi-desk backup if verification fails.", category: "Hotel arrival", lastReviewedAt: reviewed, applicableChecks: ["hotel-arrival", "readiness", "apps"], sourceNotes: [didiSource], faqs: didiFaqs, howTo: guideHowTos["didi-without-chinese-number"], Content: DidiGuide },
  { slug: "first-city-shanghai-or-beijing", title: "Whether to start in Shanghai or Beijing", description: "Choose the first city from arrival logistics and recovery margin, not from a generic ranking.", category: "Planning", lastReviewedAt: reviewed, applicableChecks: ["readiness", "hotel-arrival"], sourceNotes: [firstCitySource], faqs: firstCityFaqs, howTo: guideHowTos["first-city-shanghai-or-beijing"], Content: FirstCityGuide },
  { slug: "train-booking-for-foreign-visitors", title: "How foreign visitors book China train tickets", description: "Set up a foreign-passport passenger record, buy at the right time and arrive with an issued ticket and a fallback.", category: "Transport", lastReviewedAt: reviewed, applicableChecks: ["train-booking", "apps", "readiness"], sourceNotes: [railSource, railRegisterSource, railSalesSource], faqs: trainBookingFaqs, howTo: guideHowTos["train-booking-for-foreign-visitors"], Content: TrainBookingGuide },
  { slug: "china-entry-requirements-checklist", title: "China entry requirements checklist for foreign visitors", description: "Confirm passport, visa or visa-free eligibility and offline documents before non-refundable bookings.", category: "Planning", lastReviewedAt: reviewed, applicableChecks: ["readiness"], sourceNotes: [entrySource, entryTransitSource], faqs: entryRequirementsFaqs, howTo: guideHowTos["china-entry-requirements-checklist"], Content: EntryRequirementsGuide },
];

export const guidesBySlug = Object.fromEntries(guideCatalog.map((guide) => [guide.slug, guide])) as Record<GuideSlug, Guide>;
