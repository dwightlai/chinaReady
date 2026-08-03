import type { CheckSlug } from "@/features/checks/types";
import type { GuideSlug } from "@/features/guides/types";

export type LandingSlug = "china-payment-checker" | "china-app-checker" | "china-phone-checker" | "china-booking-checker" | "china-hotel-checker" | "china-train-checker";

export interface LandingPageConfig {
  slug: LandingSlug; eyebrow: string; title: string; description: string; intro: string;
  checkSlug: CheckSlug; cta: string; duration: string; outcomes: string[];
  checks: Array<{ title: string; text: string }>; useCases: string[];
  faqs: Array<{ question: string; answer: string }>; relatedGuides: GuideSlug[];
}

export const landingPages: LandingPageConfig[] = [
  {
    slug: "china-payment-checker", eyebrow: "China payment readiness", title: "China Payment Checker for Foreign Visitors",
    description: "Check whether Alipay, WeChat Pay, foreign cards, bank verification and cash backups are ready for your China trip.",
    intro: "A linked card is not the same as a reliable payment path. Test the complete chain before you depend on it for transport, food or your first hotel transfer.",
    checkSlug: "payment", cta: "Check My China Payments", duration: "3 minutes",
    outcomes: ["A payment readiness score", "Critical setup and verification gaps", "Independent card and cash backups"],
    checks: [
      { title: "Alipay and WeChat Pay", text: "Review installation, identity verification, card linking and whether one app is your only route." },
      { title: "Foreign bank cards", text: "Check overseas transaction settings, issuer approval and a second card from another bank." },
      { title: "Verification access", text: "Confirm bank-app approvals, SMS access and the original phone number used by your issuer." },
      { title: "Payment backups", text: "Prepare a physical card and emergency RMB cash if the phone, app or network fails." },
    ],
    useCases: ["You linked a foreign Visa or Mastercard to Alipay", "You plan to rely on WeChat Pay", "You will use a travel eSIM", "You have not made a real test payment"],
    faqs: [
      { question: "Can foreigners use Alipay in China?", answer: "Eligible visitors can use supported foreign identity and card details. Complete verification and test a real transaction before relying on the setup." },
      { question: "Is a foreign card linked to Alipay enough?", answer: "No. Issuer settings, verification access and transaction approval can still fail. A tested path and independent backup are stronger evidence." },
      { question: "Should I carry cash in China?", answer: "A modest RMB cash reserve is useful when a phone, app, card or network problem interrupts digital payment." },
    ], relatedGuides: ["test-mobile-payment-before-china", "one-payment-method-is-not-enough", "cash-and-atms-in-china"],
  },
  {
    slug: "china-app-checker", eyebrow: "China app readiness", title: "China App Checker for Your Trip",
    description: "Find which China travel apps to install, register and verify for payment, maps, rides and train booking before departure.",
    intro: "You do not need every popular China app. You need a small set that matches your itinerary and is usable before arrival—not just downloaded.",
    checkSlug: "apps", cta: "Check My China Apps", duration: "3 minutes",
    outcomes: ["Apps required by your travel plans", "Registration and identity gaps", "Arrival-day app backups"],
    checks: [
      { title: "Payment apps", text: "Decide whether Alipay, WeChat Pay or both need to be verified for everyday spending." },
      { title: "Maps and rides", text: "Prepare navigation, saved Chinese destinations and a ride path for the airport or station." },
      { title: "Train apps", text: "Choose 12306, Trip.com or an offline booking channel and check the passenger identity status." },
      { title: "Account recovery", text: "Keep access to the number or approval method needed if an app challenges your account." },
    ],
    useCases: ["This is your first independent China trip", "You will use mobile payment", "You will take high-speed rail", "You need a ride from the airport"],
    faqs: [
      { question: "Which apps do I need for China?", answer: "Most independent trips need a working payment path, maps and an arrival transport option. Train and communication apps depend on your itinerary." },
      { question: "Do I need WeChat for China travel?", answer: "Not every traveler needs every WeChat feature, but it can help with communication and some services. Choose it based on your actual trip tasks." },
      { question: "Should I install China apps before departure?", answer: "Yes. Installation, registration, identity checks and recovery methods are easier to resolve before you are relying on the app locally." },
    ], relatedGuides: ["arrive-with-working-internet", "didi-without-chinese-number", "buy-sim-or-esim-for-china"],
  },
  {
    slug: "china-phone-checker", eyebrow: "China phone and SIM readiness", title: "China Phone and SIM Readiness Checker",
    description: "Check your China eSIM, dual-SIM, original number, SMS verification and payment account recovery plan before travel.",
    intro: "Mobile data alone does not guarantee access to bank messages or account recovery. Check how your travel SIM and original line will work together.",
    checkSlug: "payment", cta: "Check My Phone Resilience", duration: "3 minutes",
    outcomes: ["A tested dual-SIM plan", "Bank verification risk warnings", "Recovery options if one line fails"],
    checks: [
      { title: "Original number", text: "Confirm whether the number registered with your bank and payment apps remains active abroad." },
      { title: "Travel SIM or eSIM", text: "Separate mobile-data coverage from voice and incoming SMS capability." },
      { title: "Dual-SIM settings", text: "Test which line handles data and which can receive verification messages without being disabled." },
      { title: "Account recovery", text: "Keep bank-app approval and another payment route if an SMS code never arrives." },
    ],
    useCases: ["Your travel eSIM is data-only", "Your bank sends one-time SMS codes", "You will switch off your original SIM", "You use one phone for payment and connectivity"],
    faqs: [
      { question: "Will a China travel eSIM receive SMS?", answer: "Many travel eSIMs are data-only. Check the provider plan rather than assuming it includes a phone number or incoming messages." },
      { question: "Can I keep my original SIM active in China?", answer: "Often yes if roaming and the device configuration support it. Confirm charges, incoming message access and dual-SIM behavior with your carrier." },
      { question: "Why does my phone setup affect Alipay or WeChat Pay?", answer: "Banks or apps may challenge a transaction or login and require the registered number or another approval method." },
    ], relatedGuides: ["esim-bank-verification-messages", "buy-sim-or-esim-for-china", "arrive-with-working-internet"],
  },
  {
    slug: "china-booking-checker", eyebrow: "China booking readiness", title: "China Booking Readiness Checker",
    description: "Check passport names, issued tickets, hotel details, travel dates and booking backups before your China trip.",
    intro: "A reservation email does not prove every booking is ready. Match identities, confirm ticket status and protect the connections that hold the itinerary together.",
    checkSlug: "readiness", cta: "Check My China Bookings", duration: "4 minutes",
    outcomes: ["Booking and identity blockers", "Date and connection warnings", "Prioritized confirmations before departure"],
    checks: [
      { title: "Passenger identity", text: "Compare passport names and numbers with train, flight, hotel and attraction records." },
      { title: "Issued status", text: "Distinguish a confirmed ticket or room from a request, pending order or platform message." },
      { title: "Travel dates", text: "Identify public-holiday pressure that affects ticket, hotel and attraction availability." },
      { title: "Arrival chain", text: "Connect transport, payment, Chinese hotel details and late check-in confirmation." },
    ],
    useCases: ["You booked through multiple platforms", "Your itinerary includes trains and hotels", "You travel during a public holiday", "Your passport name format varies"],
    faqs: [
      { question: "How do I know a China booking is confirmed?", answer: "Check the provider's final issued or confirmed status, passenger or guest details, dates and direct property or operator instructions." },
      { question: "Why must booking names match the passport?", answer: "Real-name transport, accommodation and attraction systems may use the passport record for an identity check." },
      { question: "Should I keep China booking details offline?", answer: "Yes. Save issued tickets, Chinese hotel details and provider contacts in case connectivity or app access is interrupted." },
    ], relatedGuides: ["train-booking-for-foreign-visitors", "china-holidays-tickets-hotels", "save-hotel-name-address-in-chinese"],
  },
  {
    slug: "china-hotel-checker", eyebrow: "China hotel readiness", title: "China Hotel Arrival Checker for Foreign Guests",
    description: "Check foreign-guest hotel readiness, passport name matching, late arrival, Chinese address and arrival transport before check-in.",
    intro: "A confirmed room still needs a workable arrival path. Prepare the document, local address, front-desk timing and transport details the first transfer depends on.",
    checkSlug: "hotel-arrival", cta: "Check My Hotel Arrival", duration: "3 minutes",
    outcomes: ["Late-arrival blocker warnings", "Passport and booking checks", "A practical backup hotel plan"],
    checks: [
      { title: "Guest and passport", text: "Confirm the booked guest name matches the original passport used at check-in." },
      { title: "Late check-in", text: "Get direct written confirmation if arrival may be after the regular front-desk hours." },
      { title: "Chinese destination", text: "Save the official hotel name, full Chinese address and direct phone number offline." },
      { title: "Arrival backup", text: "Prepare transport, payment and a nearby 24-hour property if the first plan fails." },
    ],
    useCases: ["You arrive late at night", "You booked through an international platform", "A driver needs the hotel in Chinese", "You are unsure about foreign-guest check-in"],
    faqs: [
      { question: "Do China hotels need a foreign guest's passport?", answer: "Hotels generally use the original travel document for guest identity and accommodation registration. Bring the passport used for the booking." },
      { question: "How should I confirm a late hotel arrival in China?", answer: "Contact the property directly and keep written confirmation of the arrival time and front-desk arrangement." },
      { question: "Why save the hotel address in Chinese?", answer: "Drivers, local maps and support staff may not recognize the English property name. The official Chinese name and address provide a precise reference." },
    ], relatedGuides: ["confirm-late-hotel-check-in-china", "save-hotel-name-address-in-chinese", "didi-without-chinese-number"],
  },
  {
    slug: "china-train-checker", eyebrow: "China train readiness", title: "China Train Booking Checker for Foreign Visitors",
    description: "Check 12306 or Trip.com booking, foreign-passport identity, ticket status, station access and train-day backups.",
    intro: "Choosing a booking app is only the first step. Verify the passenger record, issued ticket, original passport and station-day connection before travel.",
    checkSlug: "train-booking", cta: "Check My China Train", duration: "4 minutes",
    outcomes: ["Passenger identity warnings", "Booking-channel and ticket-status checks", "Station-day action and backup plan"],
    checks: [
      { title: "12306 or Trip.com", text: "Choose a channel deliberately and understand where passenger verification and support happen." },
      { title: "Foreign passport", text: "Match the passenger name, number and identity status with the original document." },
      { title: "Ticket status", text: "Confirm the ticket is issued rather than pending, requested or waitlisted." },
      { title: "Train day", text: "Prepare the original passport, station, connection time, internet access and payment fallback." },
    ],
    useCases: ["You are deciding between 12306 and Trip.com", "Your passport verification is pending", "You travel during a holiday", "You have a same-day connection"],
    faqs: [
      { question: "Can foreigners book China train tickets with a passport?", answer: "Supported foreign passports can be used for real-name passenger records. The details and verification status should match the original passport." },
      { question: "Should I use 12306 or Trip.com?", answer: "12306 is the official channel, while third-party platforms may offer a different interface and support model. Choose based on verification readiness, fees and support needs." },
      { question: "Do I need my original passport for a China train?", answer: "Carry the original passport used in the passenger record for station and onboard identity checks or manual assistance." },
    ], relatedGuides: ["train-booking-for-foreign-visitors", "china-holidays-tickets-hotels", "travel-during-china-national-day"],
  },
];

export const landingPagesBySlug = Object.fromEntries(landingPages.map((page) => [page.slug, page])) as Record<LandingSlug, LandingPageConfig>;
