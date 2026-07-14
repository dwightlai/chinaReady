import { ArticleSections } from "./article-sections";

export function ForeignCardFailureGuide() {
  return <ArticleSections answer="If a foreign card fails, switch to a prepared backup first. Diagnose the issuer, verification and app setup only when you still have a usable payment path." sections={[
    { title: "Why cards fail", paragraphs: ["A declined purchase in Alipay, WeChat Pay or at a terminal can originate with the card issuer, overseas transaction settings, identity verification, the payment app or the merchant acceptance path. The error shown at checkout may not identify the source."] },
    { title: "Before you travel", steps: ["Tell the issuer how you will approve unusual transactions.", "Carry a card from another issuer in a separate place.", "Keep emergency RMB cash.", "Save issuer support details outside the payment app."] },
    { title: "When it happens", steps: ["Try your second prepared method instead of repeating the same decline.", "Check for an issuer alert or approval request.", "Confirm your identity and card details match.", "Contact the issuer using a verified number if the card remains blocked."] },
    { title: "Avoid one point of failure", paragraphs: ["A phone, app, card and verification number can fail together. Build backups that do not all depend on the same device or issuer."] },
  ]} />;
}
