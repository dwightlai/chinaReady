import { ArticleSections } from "./article-sections";

export function PaymentTestGuide() {
  return (
    <ArticleSections
      answer="A linked card in Alipay or WeChat Pay is only a setup milestone. Complete a small real transaction before departure and keep a separate backup."
      sections={[
        {
          title: "What “set up” often misses",
          paragraphs: [
            "Identity checks, card linking and transaction approval are separate steps. An Alipay or WeChat Pay setup can look complete while the card issuer, verification channel or app still blocks a purchase.",
          ],
        },
        {
          title: "Do this before you fly",
          steps: [
            "Complete identity verification in Alipay or WeChat Pay.",
            "Link the card you plan to use and enable overseas transactions with its issuer.",
            "Keep access to any number or banking app used for approval.",
            "Prepare a second card and a modest amount of RMB cash.",
          ],
        },
        {
          title: "Prove it with a real purchase",
          steps: [
            "Make a small purchase through the same Alipay or WeChat Pay and card combination you plan to use.",
            "Confirm that the transaction appears correctly with your issuer.",
            "Repeat the test after any card, phone number or app account change.",
          ],
        },
        {
          title: "If the test fails",
          paragraphs: [
            "Record the exact error, check the app identity details, then contact the card issuer. Do not keep retrying one route without preparing another way to pay.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Is linking a foreign card enough?",
          answer: "No. Linking proves setup, not that a live transaction will succeed abroad.",
        },
        {
          question: "Should I test with a tiny amount?",
          answer: "Yes. A small real purchase is the clearest way to confirm the full approval path.",
        },
      ]}
    />
  );
}
