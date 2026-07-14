import { ArticleSections } from "./article-sections";

export function PaymentTestGuide() {
  return <ArticleSections answer="A linked card is only a setup milestone. Complete a small real transaction before departure and keep a separate backup." sections={[
    { title: "Why a real test matters", paragraphs: ["Identity checks, card linking and transaction approval are separate steps. A setup can look complete while the card issuer, verification channel or payment app still blocks a purchase."] },
    { title: "What to prepare", steps: ["Complete identity verification in the payment app.", "Link the card you plan to use and enable overseas transactions with its issuer.", "Keep access to any number or banking app used for approval.", "Prepare a second card and a modest amount of RMB cash."] },
    { title: "How to verify it", steps: ["Make a small purchase through the same app and card combination you plan to use.", "Confirm that the transaction appears correctly with your issuer.", "Repeat the test after any card, phone number or app account change."] },
    { title: "If the test fails", paragraphs: ["Record the exact error, check the app identity details, then contact the card issuer. Do not keep retrying one route without preparing another way to pay."] },
  ]} />;
}
