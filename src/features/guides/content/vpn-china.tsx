import { ArticleSections, type ArticleFaq } from "./article-sections";

export const vpnChinaFaqs: ArticleFaq[] = [
  {
    question: "Do I need a VPN to use Alipay or WeChat Pay?",
    answer: "Usually no. Alipay, WeChat Pay, maps for local travel and many hotel apps work on mainland networks without a VPN.",
  },
  {
    question: "Will hotel Wi-Fi unlock every foreign site?",
    answer: "No. Hotel or cafe Wi-Fi can still block or slow common foreign services. Plan offline copies of bookings and a working local data path.",
  },
  {
    question: "What should I download before arrival?",
    answer: "Offline maps for your first city, hotel Chinese address notes, booking confirmations, and any banking app you need for card approvals.",
  },
];

export function VpnChinaGuide() {
  return (
    <ArticleSections
      answer="Plan for limited access to some foreign websites and apps on mainland networks. Build local connectivity and offline backups first; do not treat a VPN as your only recovery plan."
      sections={[
        {
          title: "What actually breaks for visitors",
          paragraphs: [
            "Many foreign messaging, search, map and social apps are unreliable or unavailable on mainland networks. Payment apps used inside China, local ride-hailing and hotel contact usually do not depend on those foreign services.",
            "The practical risk is arrival friction: you cannot open a booking email, translate a Chinese address, or message a host because the tools you use at home do not load.",
          ],
        },
        {
          title: "Prepare without relying on one tool",
          steps: [
            "Install and test a mainland-capable data plan before departure.",
            "Save hotel name, Chinese address, booking codes and emergency contacts offline.",
            "Screenshot tickets and reservation pages you may need at check-in.",
            "Keep a second way to reach the hotel: phone number, booking platform chat, or email already downloaded.",
          ],
        },
        {
          title: "Decide what you truly need online",
          paragraphs: [
            "Separate must-work local tools (Alipay or WeChat Pay, maps, hotel contact) from nice-to-have home tools (foreign social apps, cloud docs). Prioritize the local stack. If you need access to home services, confirm a lawful and reliable method with your employer or provider before travel鈥攄o not invent a last-minute workaround at the airport.",
          ],
        },
        {
          title: "If a foreign service fails on landing",
          paragraphs: [
            "Switch to the offline copies and local apps you prepared. Restore connectivity for payment and transport first. Do not block the transfer to your hotel while troubleshooting a blocked website.",
          ],
        },
      ]}
      faqs={vpnChinaFaqs}
    />
  );
}
