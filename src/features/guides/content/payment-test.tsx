import { ArticleSections, type ArticleFaq } from "./article-sections";

export const paymentTestFaqs: ArticleFaq[] = [
  {
    question: "Is linking a foreign card enough?",
    answer: "No. Linking proves setup, not that a live transaction will succeed abroad.",
  },
  {
    question: "Should I test with a tiny amount?",
    answer: "Yes. A small real purchase is the clearest way to confirm the full approval path.",
  },
  {
    question: "Where can I test before flying?",
    answer: "Any merchant that accepts your Alipay or WeChat Pay foreign-card flow works. Convenience stores and small online top-ups are common low-risk tests.",
  },
];

export function PaymentTestGuide() {
  return (
    <ArticleSections
      answer="A linked card in Alipay or WeChat Pay is only a setup milestone. Complete a small real transaction before departure and keep a separate backup."
      sections={[
        {
          title: "What \"set up\" often misses",
          paragraphs: [
            "Identity checks, card linking and transaction approval are separate steps. An Alipay or WeChat Pay setup can look complete while the card issuer, verification channel or app still blocks a purchase.",
            "In practice, visitors often discover the failure at a Shanghai metro gate top-up, a Beijing convenience-store QR code, or a Guangzhou hotel deposit—not during the in-app \"card linked\" confirmation.",
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
            "If you can, test once on home Wi-Fi and once on cellular data so you know both paths work.",
          ],
        },
        {
          title: "City-level failure patterns",
          paragraphs: [
            "Shanghai and Shenzhen often surface QR failures first because everyday retail expects mobile payment. Beijing hotel desks may still ask for a card imprint or deposit even when Alipay works for shops. Canton Fair weeks in Guangzhou add crowded payment retries and weaker hotel Wi-Fi—test before you rely on either.",
          ],
        },
        {
          title: "If the test fails",
          paragraphs: [
            "Record the exact error, check the app identity details, then contact the card issuer. Do not keep retrying one route without preparing another way to pay.",
          ],
        },
      ]}
      faqs={paymentTestFaqs}
    />
  );
}
