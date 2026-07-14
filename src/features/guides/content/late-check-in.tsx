import { ArticleSections } from "./article-sections";

export function LateCheckInGuide() {
  return <ArticleSections answer="Tell the hotel your expected arrival time and obtain a direct confirmation whenever you may arrive late, especially after reception hours." sections={[
    { title: "Why confirmation matters", paragraphs: ["A booking confirmation does not always explain staffing hours, entrance access or when an unannounced room may be released. A delayed flight can turn a simple arrival into a closed-door problem."] },
    { title: "What to send", steps: ["Your booking name and confirmation number.", "Your expected local arrival time and flight or train details.", "A request to hold the room and explain after-hours entry.", "A reachable contact method for the day of arrival."] },
    { title: "How to verify", steps: ["Get a written reply from the property, not only the booking platform status.", "Save the reply, hotel phone number and entrance instructions offline.", "Check that the booking name matches your passport."] },
    { title: "If the hotel does not reply", paragraphs: ["Try a verified phone number or booking-platform support. Before departure, identify a staffed fallback near your arrival point rather than assuming access will be available."] },
  ]} />;
}
