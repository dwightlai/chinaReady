import { ArticleSections } from "./article-sections";

export function EsimVerificationGuide() {
  return <ArticleSections answer="Many travel eSIM plans are designed for data, not text messages to your usual number. Keep the original number available if your bank relies on it." sections={[
    { title: "Why it matters", paragraphs: ["A payment can be ready in the app but still require approval from your card issuer. If that approval is sent to a number you cannot receive, the transaction may stop."] },
    { title: "Check before departure", steps: ["Confirm whether the eSIM includes a phone number and incoming SMS.", "Ask your bank whether approvals can happen in its app instead.", "Test receiving a bank message while the travel data plan is active.", "Understand roaming charges for keeping your original SIM enabled."] },
    { title: "Build a fallback", steps: ["Keep the bank app signed in on a trusted device.", "Carry another card with a different approval route.", "Store emergency support numbers and carry some RMB cash."] },
    { title: "If messages do not arrive", paragraphs: ["Use the issuer app or verified support channel. Do not change account phone numbers during the trip unless the bank confirms the full recovery process."] },
  ]} />;
}
