import { ArticleSections, type ArticleFaq } from "./article-sections";

export const lateCheckInFaqs: ArticleFaq[] = [
  {
    question: "Does the booking platform late-arrival note count?",
    answer: "Only if the hotel itself confirms it. Prefer written confirmation from the property.",
  },
  {
    question: "What time counts as late?",
    answer: "Treat arrivals after 23:00 China local time as late unless the hotel confirms a 24-hour desk.",
  },
  {
    question: "What if my flight lands after midnight?",
    answer: "Ask the hotel for the night desk number, keep a nearby 24-hour backup, and save the Chinese address for a taxi or DiDi.",
  },
];

export function LateCheckInGuide() {
  return (
    <ArticleSections
      answer="If you may arrive after the front desk closes, get written late-arrival confirmation and keep a 24-hour backup hotel. A booking confirmation alone is not enough."
      sections={[
        {
          title: "The real failure mode",
          paragraphs: [
            "Late flights and long transfers often push arrival past 23:00 China local time. Hotels without a 24-hour desk may release the room or leave no staff to check you in.",
            "Typical fragile arrivals: PVG/SHA after a delayed European flight into Shanghai, PEK/PKX midnight landings into Beijing, and CAN evening arrivals during Canton Fair hotel turnover.",
          ],
        },
        {
          title: "Confirm these three things",
          steps: [
            "Ask whether the front desk is open at your expected arrival time in China local time.",
            "Request written late-arrival confirmation with the booking name and date.",
            "Save the hotel phone number and Chinese address offline.",
            "Identify one nearby 24-hour backup hotel within a short taxi ride.",
          ],
        },
        {
          title: "What \"written confirmation\" should include",
          paragraphs: [
            "A useful reply names your booking, arrival date, estimated time after 23:00, and whether staff will still check you in. Platform auto-notes and \"special requests\" are weaker than a direct hotel message.",
          ],
        },
        {
          title: "If confirmation never arrives",
          paragraphs: [
            "Treat the stay as incomplete. Change to a 24-hour property or delay intercity travel until morning. Do not gamble on an unlocked door after midnight.",
          ],
        },
      ]}
      faqs={lateCheckInFaqs}
    />
  );
}
