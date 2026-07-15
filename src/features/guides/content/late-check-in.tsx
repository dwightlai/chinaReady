import { ArticleSections } from "./article-sections";

export function LateCheckInGuide() {
  return (
    <ArticleSections
      answer="If you may arrive after the front desk closes, get written late-arrival confirmation and keep a 24-hour backup hotel. A booking confirmation alone is not enough."
      sections={[
        {
          title: "The real failure mode",
          paragraphs: [
            "Late flights and long transfers often push arrival past 23:00. Hotels without a 24-hour desk may release the room or leave no staff to check you in.",
          ],
        },
        {
          title: "Confirm these three things",
          steps: [
            "Ask whether the front desk is open at your expected arrival time.",
            "Request written late-arrival confirmation with the booking name and date.",
            "Save the hotel phone number and Chinese address offline.",
            "Identify one nearby 24-hour backup hotel.",
          ],
        },
        {
          title: "If confirmation never arrives",
          paragraphs: [
            "Treat the stay as incomplete. Change to a 24-hour property or delay intercity travel until morning. Do not gamble on an unlocked door after midnight.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Does the booking platform late-arrival note count?",
          answer: "Only if the hotel itself confirms it. Prefer written confirmation from the property.",
        },
        {
          question: "What time counts as late?",
          answer: "Treat arrivals after 23:00 China local time as late unless the hotel confirms a 24-hour desk.",
        },
      ]}
    />
  );
}
