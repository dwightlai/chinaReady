import { ArticleSections, type ArticleFaq } from "./article-sections";

export const didiFaqs: ArticleFaq[] = [
  {
    question: "Can I use DiDi without a Chinese phone number?",
    answer: "Often yes with an international number during signup, but verification rules change. Complete account setup and a test ride request before you depend on it after midnight.",
  },
  {
    question: "What if DiDi will not accept my payment?",
    answer: "Link a working Alipay or WeChat Pay method in advance, keep a second card, and carry RMB cash for a taxi desk backup.",
  },
  {
    question: "Do I need the Chinese hotel address for DiDi?",
    answer: "Yes. Drivers and in-app destination search work far better with the Chinese name and address saved offline.",
  },
];

export function DidiGuide() {
  return (
    <ArticleSections
      answer="Set up DiDi before you need a late-night airport transfer. Confirm account verification, payment and a Chinese destination address while you still have time to fix failures."
      sections={[
        {
          title: "Why airport transfers expose gaps",
          paragraphs: [
            "After a long flight you need data, a working ride app or taxi desk, payment and a clear destination. A DiDi account that still needs SMS verification or a payment method that declines becomes a hard stop at midnight.",
          ],
        },
        {
          title: "Setup checklist",
          steps: [
            "Install DiDi and complete signup while you still have reliable SMS or email verification.",
            "Add Alipay, WeChat Pay or a card the app accepts, then confirm the method stays selected.",
            "Save your first hotel鈥檚 Chinese name and address as a favorite destination.",
            "Test that the app opens on cellular data, not only hotel Wi-Fi.",
          ],
        },
        {
          title: "Phone number realities",
          paragraphs: [
            "Some travelers complete DiDi with an international number; others hit verification walls that need a local number or alternate channel. Do not discover that at PVG or PEK baggage claim. If signup stalls, keep the official taxi desk plan and hotel phone number ready.",
          ],
        },
        {
          title: "Backup if DiDi fails",
          paragraphs: [
            "Use the airport taxi queue with the Chinese hotel address on paper or phone, or ask hotel staff to arrange a pickup if they offer it. Keep enough RMB cash for a metered taxi if mobile payment fails.",
          ],
        },
      ]}
      faqs={didiFaqs}
    />
  );
}
