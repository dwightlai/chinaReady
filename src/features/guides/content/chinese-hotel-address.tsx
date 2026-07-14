import { ArticleSections } from "./article-sections";

export function ChineseHotelAddressGuide() {
  return <ArticleSections answer="Save the hotel name and full address in Chinese as text and as an offline screenshot. An English booking screen may not be enough for a driver or local map search." sections={[
    { title: "Why the Chinese version helps", paragraphs: ["Translated hotel brands, branches and street names can be ambiguous. The locally used name and address give drivers and support staff a more precise reference."] },
    { title: "What to save", steps: ["The hotel name in Chinese characters.", "The complete Chinese street address, district and city.", "The hotel telephone number.", "A map pin and an exterior or entrance note if the property provides one."] },
    { title: "How to verify", steps: ["Ask the hotel to confirm the Chinese text directly.", "Compare the address in the booking with the property location on a local map.", "Open the saved material with mobile data and Wi-Fi turned off."] },
    { title: "If the destination is unclear", paragraphs: ["Call the hotel and let staff speak with the driver, or go to a staffed transport or information point. Do not rely on a translated name alone when several branches exist."] },
  ]} />;
}
