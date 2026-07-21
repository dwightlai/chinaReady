import { ArticleSections, type ArticleFaq } from "./article-sections";

export const trainBookingFaqs: ArticleFaq[] = [
  {
    question: "Can foreign visitors buy China train tickets?",
    answer: "Yes, eligible foreign passengers can buy real-name tickets with a valid passport. 12306 still has to accept and verify the passenger record before you rely on the booking.",
  },
  {
    question: "How early can I buy a ticket?",
    answer: "The normal 12306 sales window is 15 days including the travel day. Set a reminder for the opening time instead of assuming a ticket can be purchased weeks ahead.",
  },
  {
    question: "What should I carry to the station?",
    answer: "Carry the original passport used in the passenger record. An itinerary sheet or reimbursement receipt is not the ticket, and the passport is the identity document checked for the journey.",
  },
];

export function TrainBookingGuide() {
  return (
    <ArticleSections
      answer="A train plan is ready when the booking channel, foreign-passport passenger record, issued ticket and station-day fallback are all confirmed. A pending order is not a ticket."
      sections={[
        {
          title: "Choose the booking path",
          paragraphs: [
            "Use 12306 when you want the railway operator's own inventory and rules. Trip.com can be easier for some visitors who need English support, but it is still a separate provider with its own fees and support process. A staffed station counter is a useful recovery path when online identity verification stalls.",
          ],
          steps: [
            "Choose one primary booking channel before you plan around a departure.",
            "Save the official 12306 account email and the provider support route offline.",
          ],
        },
        {
          title: "Set up the foreign-passport passenger",
          steps: [
            "Register with the foreign passport and email you will actually use for the trip.",
            "Enter the passenger name, passport number, date of birth and expiry exactly as shown on the passport.",
            "Add the passenger and wait for the provider to show a verified or ready-to-be-verified status.",
            "Do not book connecting plans around a passenger record that is still rejected or unclear.",
          ],
        },
        {
          title: "Buy at the right moment",
          paragraphs: [
            "The normal 12306 sales window is 15 days including the travel day. Hotels and attractions can become scarce much earlier, but an official rail ticket normally requires a reminder for the opening day and local sales time. Confirm any special holiday announcement on 12306 before relying on a different window.",
          ],
          steps: [
            "Put the ticket-release date and local opening time in your calendar.",
            "Prepare one acceptable alternative train or departure time before sales open.",
          ],
        },
        {
          title: "Verify the ticket before travel day",
          steps: [
            "Confirm the order says the ticket is issued, not pending, waitlisted or awaiting payment.",
            "Compare the issued passenger details with the original passport one more time.",
            "Save the train number, departure station, arrival station and booking reference offline.",
            "Carry the original passport used for the booking; do not rely on a screenshot as a substitute for the identity document.",
          ],
        },
        {
          title: "Build a station-day fallback",
          steps: [
            "Allow at least 30 minutes for an unfamiliar station, security screening and a platform change; add more for a connection.",
            "Save the station name and the destination in Chinese.",
            "Keep a second route, later train or staffed ticket counter as a recovery option.",
          ],
        },
      ]}
      faqs={trainBookingFaqs}
    />
  );
}
