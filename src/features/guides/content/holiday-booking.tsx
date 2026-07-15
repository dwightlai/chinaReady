import { ArticleSections, type ArticleFaq } from "./article-sections";

export const holidayBookingFaqs: ArticleFaq[] = [
  {
    question: "Which holidays disrupt travel most?",
    answer: "Spring Festival and National Day Golden Week usually create the densest domestic demand. Surrounding weekends can stay busy too.",
  },
  {
    question: "How early should I book trains and hotels?",
    answer: "Book the first night and any long-distance train as soon as your dates are fixed. Popular city pairs can fill weeks ahead of major holidays.",
  },
  {
    question: "Do foreign passport bookings work the same way?",
    answer: "Many platforms accept foreign passports, but name matching and ID fields must be exact. Confirm the ticket is issued, not only reserved.",
  },
];

export function HolidayBookingGuide() {
  return (
    <ArticleSections
      answer="Chinese public holiday periods can compress availability and increase demand. Check official dates, book critical legs early and keep flexible alternatives."
      sections={[
        {
          title: "Why timing matters",
          paragraphs: [
            "Major holiday periods change domestic travel patterns. Popular routes, hotels and attractions can become harder to secure, including in the days around the official break.",
            "Spring Festival travel peaks around family return journeys. National Day week fills Beijing, Shanghai, Xi鈥檃n and coastal resort corridors. Labor Day and Mid-Autumn weekends are shorter but still tighten hotel inventory in core cities.",
          ],
        },
        {
          title: "What to prepare",
          steps: [
            "Compare your full itinerary with the official holiday calendar, including the days immediately before and after.",
            "Prioritize intercity transport and the first night in each city.",
            "Use the exact passport details required by the provider.",
            "Keep one acceptable alternative route, time or hotel.",
          ],
        },
        {
          title: "Concrete booking order",
          paragraphs: [
            "Secure the inbound hotel night first, then the longest train or flight, then secondary city hops. If Canton Fair, a concert week or a local marathon overlaps your stay, treat that city like a mini holiday even when the national calendar is quiet.",
          ],
        },
        {
          title: "How to verify",
          steps: [
            "Check that each booking is issued, not only requested.",
            "Reconfirm cancellation terms and arrival deadlines.",
            "Review opening notices from the attraction or operator close to travel.",
          ],
        },
        {
          title: "If availability disappears",
          paragraphs: [
            "Reduce unnecessary city changes, shift timing where possible and choose a simpler route with fewer fragile connections.",
          ],
        },
      ]}
      faqs={holidayBookingFaqs}
    />
  );
}
