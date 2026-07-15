import { ArticleSections } from "./article-sections";

export function CashAtmGuide() {
  return (
    <ArticleSections
      answer="Carry a modest amount of RMB cash as a backup, not as your only payment plan. ATMs and foreign cards can fail without warning, so cash is insurance rather than a daily strategy."
      sections={[
        {
          title: "Where cash still helps",
          paragraphs: [
            "Cash is useful for small purchases, some transport desks, taxis that prefer cash, and recovery when Alipay, WeChat Pay or a foreign card fails. Many everyday merchants still expect mobile payment.",
          ],
        },
        {
          title: "Practical cash setup",
          steps: [
            "Exchange or withdraw a modest emergency amount before you need it.",
            "Split cash between wallet and luggage.",
            "Keep a physical card from a second issuer.",
            "Test mobile payment before departure so cash remains a backup.",
          ],
        },
        {
          title: "ATM and card pitfalls",
          paragraphs: [
            "Overseas ATM access can be blocked by issuer settings, daily limits or network issues. Do not assume every ATM will accept your card. Enable overseas withdrawals with your bank before travel.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How much cash should I carry?",
          answer: "Enough for a disrupted half-day: transport, a meal and a backup hotel night buffer. Exact amounts vary by city and itinerary.",
        },
        {
          question: "Can I rely only on ATMs after arrival?",
          answer: "No. Treat ATM access as uncertain and keep another payment path ready.",
        },
      ]}
    />
  );
}
