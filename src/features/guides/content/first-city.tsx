import { ArticleSections } from "./article-sections";

export function FirstCityGuide() {
  return (
    <ArticleSections
      answer="Choose the first city based on your arrival flight, hotel confirmation strength and how quickly you need working payment and transport—not on a generic ranking of attractions."
      sections={[
        {
          title: "A useful decision frame",
          paragraphs: [
            "Shanghai and Beijing are both workable first stops. The better choice is usually the one that matches your inbound flight, late-arrival hotel plan and tolerance for long transfers on day one.",
          ],
        },
        {
          title: "Compare the first 24 hours",
          steps: [
            "Check whether your flight arrives near a hotel with confirmed late check-in.",
            "Confirm you have Chinese hotel details and a working payment path.",
            "Estimate transfer time from airport to hotel after midnight.",
            "Decide whether you need a buffer night before intercity travel.",
          ],
        },
        {
          title: "Avoid the wrong optimization",
          paragraphs: [
            "Do not choose a first city only because it looks more iconic online. A fragile late arrival, untested payment setup or missing Chinese address can erase the first day regardless of the skyline.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Is Shanghai easier than Beijing for first-time visitors?",
          answer: "It depends on your flight and hotel plan. Ease comes from confirmed arrival logistics, not from the city brand.",
        },
        {
          question: "Should I fly into one city and leave from another?",
          answer: "Yes if the itinerary is clear and tickets are issued. Keep the first night simple so you can recover from jet lag and payment setup issues.",
        },
      ]}
    />
  );
}
