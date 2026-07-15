import { ArticleSections, type ArticleFaq } from "./article-sections";

export const simEsimFaqs: ArticleFaq[] = [
  {
    question: "Is airport Wi-Fi enough for the first day?",
    answer: "Usually not. Captive portals, weak coverage and login friction make it unreliable for payment and transport apps.",
  },
  {
    question: "Should I buy a local SIM or use an eSIM?",
    answer: "An eSIM installed before departure is usually smoother. Keep a local SIM purchase plan as backup if the eSIM fails.",
  },
];

export function SimEsimGuide() {
  return (
    <ArticleSections
      answer="Choose a data plan that works on landing, then keep a backup SIM purchase path at the airport. Do not wait until you need maps or payment apps to discover you have no connectivity."
      sections={[
        {
          title: "What usually works for visitors",
          paragraphs: [
            "Most independent travelers use a travel eSIM installed before departure, a local SIM bought at the arrival airport, or a hotel/companion hotspot as a temporary bridge. Airport Wi-Fi alone is a weak primary plan.",
          ],
        },
        {
          title: "Before you leave",
          steps: [
            "Install and activate an eSIM that covers mainland China data.",
            "Confirm the plan works by disabling Wi-Fi and loading a map.",
            "Save the hotel Chinese address and phone number offline.",
            "Write down where you can buy a local SIM if the eSIM fails.",
          ],
        },
        {
          title: "When a plan fails on arrival",
          paragraphs: [
            "Use offline hotel details to reach staff or a taxi desk first. Restore data before relying on Alipay, WeChat Pay or ride-hailing. Keep a second connectivity option ready rather than troubleshooting one route indefinitely.",
          ],
        },
      ]}
      faqs={simEsimFaqs}
    />
  );
}
