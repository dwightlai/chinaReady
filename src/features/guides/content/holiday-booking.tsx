import { ArticleSections } from "./article-sections";

export function HolidayBookingGuide() {
  return <ArticleSections answer="Chinese public holiday periods can compress availability and increase demand. Check official dates, book critical legs early and keep flexible alternatives." sections={[
    { title: "Why timing matters", paragraphs: ["Major holiday periods change domestic travel patterns. Popular routes, hotels and attractions can become harder to secure, including in the days around the official break."] },
    { title: "What to prepare", steps: ["Compare your full itinerary with the official holiday calendar.", "Prioritize intercity transport and the first night in each city.", "Use the exact passport details required by the provider.", "Keep one acceptable alternative route, time or hotel."] },
    { title: "How to verify", steps: ["Check that each booking is issued, not only requested.", "Reconfirm cancellation terms and arrival deadlines.", "Review opening notices from the attraction or operator close to travel."] },
    { title: "If availability disappears", paragraphs: ["Reduce unnecessary city changes, shift timing where possible and choose a simpler route with fewer fragile connections."] },
  ]} />;
}
