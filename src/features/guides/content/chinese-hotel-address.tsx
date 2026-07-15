import { ArticleSections, type ArticleFaq } from "./article-sections";

export const chineseHotelAddressFaqs: ArticleFaq[] = [
  {
    question: "Is a Google Maps pin enough?",
    answer: "Keep the Chinese address as text too. Drivers and local apps may not open the same map pin you saved at home.",
  },
  {
    question: "Where do I get the Chinese address?",
    answer: "Ask the hotel by email or chat and paste their reply into a note you can open offline.",
  },
];

export function ChineseHotelAddressGuide() {
  return (
    <ArticleSections
      answer="Save the hotel name and full address in Chinese as text and as an offline screenshot. An English booking screen may not be enough for a driver or local map search."
      sections={[
        {
          title: "Why English alone is fragile",
          paragraphs: [
            "Translated hotel brands, branches and street names can be ambiguous. The locally used name and address give drivers and support staff a more precise reference.",
          ],
        },
        {
          title: "Save these four items",
          steps: [
            "The hotel name in Chinese characters.",
            "The complete Chinese street address, district and city.",
            "The hotel telephone number.",
            "A map pin and an exterior or entrance note if the property provides one.",
          ],
        },
        {
          title: "Check it still works offline",
          steps: [
            "Ask the hotel to confirm the Chinese text directly.",
            "Compare the address in the booking with the property location on a local map.",
            "Open the saved material with mobile data and Wi-Fi turned off.",
          ],
        },
        {
          title: "If the driver still cannot find it",
          paragraphs: [
            "Call the hotel and let staff speak with the driver, or go to a staffed transport or information point. Do not rely on a translated name alone when several branches exist.",
          ],
        },
      ]}
      faqs={chineseHotelAddressFaqs}
    />
  );
}
