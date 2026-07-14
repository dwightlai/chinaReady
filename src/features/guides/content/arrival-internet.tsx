import { ArticleSections } from "./article-sections";

export function ArrivalInternetGuide() {
  return (
    <ArticleSections
      answer="Do not assume airport Wi-Fi or a single eSIM will cover payment, maps and hotel contact the moment you land. Set a working data plan before arrival and keep offline copies of key details."
      sections={[
        {
          title: "Why arrival internet matters",
          paragraphs: [
            "Mobile payment, ride-hailing, translation and hotel confirmation often need data immediately after landing. A delayed SIM, broken eSIM profile or blocked hotspot can turn a short transfer into a hard stop.",
          ],
        },
        {
          title: "What to prepare",
          steps: [
            "Confirm a data plan that works on arrival, such as a travel eSIM installed and tested before departure.",
            "Keep a backup route: a second eSIM, airport SIM purchase plan, or a confirmed hotspot from a travel companion.",
            "Save hotel name, address in Chinese, booking reference and emergency contacts offline.",
            "Test that Alipay or WeChat Pay still open and that maps load on the same device.",
          ],
        },
        {
          title: "How to verify it",
          steps: [
            "Install and activate the eSIM or SIM before you leave home, then confirm data works.",
            "Disable Wi-Fi and load a map, a payment app and the hotel contact page over cellular data.",
            "Write down the steps to buy a local SIM at the arrival airport if your primary plan fails.",
          ],
        },
        {
          title: "If connectivity fails on arrival",
          paragraphs: [
            "Use offline hotel details to reach staff or a taxi desk, then restore data before relying on payment apps. Do not wait until you need a ride or a transfer to discover that you have no working connection.",
          ],
        },
      ]}
    />
  );
}
