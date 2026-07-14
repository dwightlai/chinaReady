import { ArticleSections } from "./article-sections";

export function NationalDayGuide() {
  return <ArticleSections answer="Travel during the National Day holiday only if the dates are essential or you are comfortable booking early, accepting crowds and keeping a flexible plan." sections={[
    { title: "Make the decision deliberately", paragraphs: ["National Day is a major domestic travel period. The right choice depends on whether you value fixed dates more than lower demand and easier last-minute changes."] },
    { title: "If you keep the dates", steps: ["Book critical transport and accommodation as early as practical.", "Limit same-day connections and optional city changes.", "Confirm the exact passport details on issued bookings.", "Reserve attractions where required and plan lower-priority alternatives."] },
    { title: "How to reduce risk", steps: ["Stay longer in fewer places.", "Allow more time at busy transport hubs.", "Avoid making one sold-out leg responsible for the rest of the itinerary.", "Keep cancellation and change terms available offline."] },
    { title: "If plans fail", paragraphs: ["Protect the essentials first: a safe place to stay and a confirmed route onward. Drop optional activities before creating a chain of rushed replacements."] },
  ]} />;
}
