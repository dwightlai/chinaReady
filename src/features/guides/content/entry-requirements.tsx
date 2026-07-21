import { ArticleSections, type ArticleFaq } from "./article-sections";

export const entryRequirementsFaqs: ArticleFaq[] = [
  {
    question: "Is this an official visa checklist?",
    answer: "No. It is a preparation checklist. Confirm visa, entry and customs rules with the Chinese embassy, consulate or official government sources for your nationality.",
  },
  {
    question: "What documents should I keep offline?",
    answer: "Passport bio page, visa or entry authorization proof, return or onward ticket, hotel bookings and any invitation letters your itinerary requires.",
  },
  {
    question: "Do payment and hotel checks replace entry documents?",
    answer: "No. Entry documents get you through the border. Payment and hotel checks reduce disruption after you land.",
  },
];

export function EntryRequirementsGuide() {
  return (
    <ArticleSections
      answer="Confirm passport validity, visa or visa-free eligibility, return tickets and first-night accommodation with official sources before you buy non-refundable add-ons."
      sections={[
        {
          title: "Start with official eligibility",
          paragraphs: [
            "Entry rules depend on nationality, passport type, stay length, purpose and the route through China. Use the current NIA country list and the Chinese embassy or official government channel for your passport country—not a social media summary.",
            "The NIA's unilateral visa-exemption list and 240-hour visa-free transit policy are different routes with different conditions. A transit itinerary through China to a third country is not the same as a normal one-way holiday entry.",
          ],
        },
        {
          title: "Documents to assemble early",
          steps: [
            "Check passport validity against the rule that applies to you.",
            "Confirm whether you need a visa, a listed unilateral visa exemption, 240-hour visa-free transit or another authorization.",
            "Keep proof of onward or return travel and the first hotel booking.",
            "Carry printed or offline copies in case phones or foreign email apps fail on arrival.",
          ],
        },
        {
          title: "Connect entry prep to trip readiness",
          paragraphs: [
            "Once entry papers are clear, run the payment, dates and hotel-arrival checks. A valid visa does not fix a declined foreign card, a sold-out holiday train or a hotel that will not admit a midnight arrival.",
          ],
        },
        {
          title: "Before you leave for the airport",
          steps: [
            "Re-read the latest official note for your nationality and passport type.",
            "Pack the physical passport and any required printouts.",
            "Confirm the first hotel can still receive you at the planned China local time.",
            "Keep emergency contacts for your embassy or consulate offline.",
          ],
        },
      ]}
      faqs={entryRequirementsFaqs}
    />
  );
}
