import type { CheckSlug } from "@/features/checks/types";
import type { GuideSlug } from "@/features/guides/types";

export type LandingSlug = "china-payment-checker" | "china-app-checker" | "china-phone-checker" | "china-booking-checker" | "china-hotel-checker" | "china-train-checker" | "12306-passport-verification-not-working" | "trip-com-reservation-vs-ticket-confirmed" | "china-train-ticket-waitlist-checker" | "alipay-card-linked-but-not-working" | "alipay-backup-payment-checker";

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
    checkSlug: "payment", cta: "Check My China Payments", duration: "5 minutes",
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
    checkSlug: "train-booking", cta: "Check My China Train", duration: "5 minutes",
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
  {
    slug: "12306-passport-verification-not-working", eyebrow: "12306 passport diagnosis", title: "12306 Passport Verification Not Working? Diagnose the Cause",
    description: "Diagnose why a foreign passport is pending, rejected or failing to upload on Railway 12306, then decide whether to retry, wait or use a backup booking channel.",
    intro: "A generic 12306 error does not tell you whether the blocker is the passenger name, passport image, review status or a temporary system response. Answer focused questions to narrow the likely failure point.",
    checkSlug: "train-booking", cta: "Check My 12306 Verification", duration: "5 minutes",
    outcomes: ["The most likely verification blocker", "A retry-or-wait recommendation", "A usable fallback booking path"],
    checks: [
      { title: "Verification status", text: "Separate a pending review from a failed, rejected or never-submitted passenger record." },
      { title: "Passport image", text: "Check whether the upload method or image quality is the likely blocker." },
      { title: "Passenger name", text: "Compare spelling, order and document details with the original passport." },
      { title: "Booking fallback", text: "Decide when Trip.com or a staffed station counter becomes the sensible recovery path." },
    ],
    useCases: ["12306 says system busy", "The passport photo will not upload", "The passenger name is rejected", "Verification remains pending before ticket sales"],
    faqs: [
      { question: "How long should I wait for 12306 passport verification?", answer: "Use the status and timing shown by 12306, then check again before ticket sales open. Keep another booking channel ready if the review remains pending." },
      { question: "Does 12306 require a Chinese phone number?", answer: "Do not treat the phone number alone as proof of passenger verification. Confirm the actual passenger status and keep reliable access to the account contact method." },
      { question: "Can I use Trip.com if 12306 verification fails?", answer: "Trip.com can be a fallback booking channel, but confirm its passenger requirements, fees and final issued-ticket status rather than assuming a request is a ticket." },
    ], relatedGuides: ["train-booking-for-foreign-visitors", "china-holidays-tickets-hotels", "travel-during-china-national-day"],
  },
  {
    slug: "trip-com-reservation-vs-ticket-confirmed", eyebrow: "Trip.com ticket diagnosis", title: "Trip.com Train Reservation vs Confirmed Ticket in China",
    description: "Check whether a Trip.com train order is only reserved, requested or pending, or whether the China train ticket has actually been issued for your passport.",
    intro: "A reservation acknowledgement proves that a request exists, not necessarily that a seat has been issued. Diagnose the displayed status before building hotels, flights or attractions around it.",
    checkSlug: "train-booking", cta: "Check My Trip.com Train Status", duration: "5 minutes",
    outcomes: ["A confirmed-or-not verdict", "The risk to linked itinerary bookings", "A deadline and backup train action"],
    checks: [
      { title: "Displayed status", text: "Interpret issued, ticketed, reserved, requested, pending and awaiting-payment states." },
      { title: "Passenger record", text: "Confirm that the issued status belongs to the correct foreign-passport passenger." },
      { title: "Time remaining", text: "Escalate an unissued order as departure approaches." },
      { title: "Itinerary dependency", text: "Protect fixed hotels, flights and attractions with an independent alternative." },
    ],
    useCases: ["Trip.com says reserved or requested", "The order is still pending", "A hotel depends on this train", "You are unsure whether the ticket is issued"],
    faqs: [
      { question: "Does reserved mean my China train ticket is confirmed?", answer: "No. Treat the seat as confirmed only when the provider shows the ticket as issued or ticketed for the correct passenger." },
      { question: "What does pending mean on a Trip.com train order?", answer: "Pending means the purchase or issuance process is incomplete. Check the provider deadline and keep another train or route available." },
      { question: "Should I cancel my backup train after making a reservation?", answer: "Wait until the required train is formally issued and check the cancellation terms of both bookings before removing your fallback." },
    ], relatedGuides: ["train-booking-for-foreign-visitors", "china-holidays-tickets-hotels", "travel-during-china-national-day"],
  },
  {
    slug: "china-train-ticket-waitlist-checker", eyebrow: "China train waitlist risk", title: "China Train Ticket Waitlist Checker",
    description: "Assess a 12306 or Trip.com train waitlist, success percentage, departure timing and itinerary dependency to see whether you need another China train now.",
    intro: "A waitlist percentage is an estimate, not a seat. This diagnostic checks how exposed the rest of your itinerary is and tells you when to choose another train or route.",
    checkSlug: "train-booking", cta: "Check My Train Waitlist Risk", duration: "5 minutes",
    outcomes: ["A waitlist risk verdict", "Critical itinerary dependency warnings", "A practical alternative-train plan"],
    checks: [
      { title: "Waitlist state", text: "Separate an issued ticket from a waitlist, sold-out result or estimated success rate." },
      { title: "Departure timing", text: "Raise urgency when the train is close and still unissued." },
      { title: "Fixed dependencies", text: "Identify flights, hotels and attractions that fail if this train does not clear." },
      { title: "Independent backup", text: "Confirm another train, route or flexible date that does not depend on the same queue." },
    ],
    useCases: ["12306 shows a waitlist", "Trip.com shows a success percentage", "The preferred train is sold out", "You have no backup train"],
    faqs: [
      { question: "Does a China train waitlist guarantee a ticket?", answer: "No. Until the status becomes issued or ticketed, plan as though the seat is not confirmed." },
      { question: "What does a train waitlist success percentage mean?", answer: "It is an estimate rather than a confirmed seat. The safe decision also depends on departure timing and the cost of missing linked bookings." },
      { question: "What backup should I prepare for a sold-out China train?", answer: "Look for an earlier or later train, another station or route, or a flexible travel date, and verify that the alternative can actually be booked." },
    ], relatedGuides: ["train-booking-for-foreign-visitors", "china-holidays-tickets-hotels", "travel-during-china-national-day"],
  },
  {
    slug: "alipay-card-linked-but-not-working", eyebrow: "Alipay payment diagnosis", title: "Alipay Card Linked but Not Working? Diagnose the Failure",
    description: "Diagnose why a foreign card linked to Alipay still fails at payment, including issuer declines, bank verification, merchant acceptance and account risk control.",
    intro: "A visible linked card only proves one stage of setup. The payment can still fail at bank authorization, verification, merchant processing or Alipay risk control. Identify the stage before retrying.",
    checkSlug: "payment", cta: "Diagnose My Alipay Payment", duration: "5 minutes",
    outcomes: ["The most likely failure stage", "A safe retry or recovery action", "An independent payment backup"],
    checks: [
      { title: "Issuer authorization", text: "Check whether the bank declined the transaction or received no payment attempt." },
      { title: "Verification access", text: "Confirm SMS, banking-app approval and original-number recovery." },
      { title: "Merchant scope", text: "Separate one merchant failure from an account-wide payment problem." },
      { title: "Risk control", text: "Recognize when to stop retrying and use the app's appeal or identity recovery flow." },
    ],
    useCases: ["Alipay shows the card as linked", "A real merchant payment still fails", "The bank approved but Alipay failed", "Another foreign card has not been tested"],
    faqs: [
      { question: "Why does Alipay decline a linked foreign card?", answer: "The issuer, verification challenge, Alipay account controls or merchant payment path can each stop the transaction. A linked status alone does not identify the failing stage." },
      { question: "Should I keep retrying a failed Alipay payment?", answer: "Avoid repeated rapid attempts, especially when the app shows a security or risk-control message. Preserve the error and use the official recovery path or another payment method." },
      { question: "Does adding money to Alipay fix a linked-card failure?", answer: "Do not assume balance top-up is required or supported as a workaround. First determine whether direct payment from the linked card is failing at the issuer, app or merchant stage." },
    ], relatedGuides: ["foreign-card-fails-in-china", "test-mobile-payment-before-china", "one-payment-method-is-not-enough"],
  },
  {
    slug: "alipay-backup-payment-checker", eyebrow: "China payment resilience", title: "Alipay Backup Payment Checker for China",
    description: "Check whether your Alipay setup has an independent WeChat Pay, bank card, verification and RMB cash backup before travelling to China.",
    intro: "Payment is resilient only when one failed wallet, issuer, verification channel or network path does not stop every way you can pay.",
    checkSlug: "payment", cta: "Check My Payment Backups", duration: "5 minutes",
    outcomes: ["Primary payment readiness", "Single points of failure", "Independent wallet, card and cash recovery paths"],
    checks: [
      { title: "Second wallet", text: "Check whether losing Alipay still leaves a usable WeChat Pay or non-phone route." },
      { title: "Independent card", text: "Use a second bank or card network so one issuer decision does not block both cards." },
      { title: "Recovery channel", text: "Keep the original number or banking-app approval needed for a challenge." },
      { title: "Network and cash fallback", text: "Know when to retry without a VPN and retain a modest emergency RMB reserve." },
    ],
    useCases: ["Alipay is your only wallet", "Both cards come from one bank", "You use a data-only travel eSIM", "You have not prepared RMB cash"],
    faqs: [
      { question: "Is Alipay alone enough for China travel?", answer: "It may work for many purchases, but a second wallet or non-phone option reduces the impact of an account, phone or merchant-specific failure." },
      { question: "What makes a backup bank card independent?", answer: "Prefer a card from another issuer or card network so the backup does not rely on the same authorization system as the primary card." },
      { question: "Can a VPN affect Alipay payment?", answer: "A VPN or unusual network path can complicate some risk or verification flows. If a payment fails, stop repeated attempts and retry once on a trusted connection without the VPN." },
    ], relatedGuides: ["one-payment-method-is-not-enough", "cash-and-atms-in-china", "esim-bank-verification-messages"],
  },
];

export const landingPagesBySlug = Object.fromEntries(landingPages.map((page) => [page.slug, page])) as Record<LandingSlug, LandingPageConfig>;
