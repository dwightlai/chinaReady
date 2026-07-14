import { ArticleSections } from "./article-sections";

export function PaymentBackupGuide() {
  return (
    <ArticleSections
      answer="Use at least two independent payment paths. A second Alipay or WeChat Pay option is useful only when it does not share every failure point with the first."
      sections={[
        {
          title: "What independence means",
          paragraphs: [
            "Two cards from one issuer in one phone wallet may fail together. Stronger coverage combines different issuers, a physical card, Alipay or WeChat Pay and a small cash reserve.",
          ],
        },
        {
          title: "A practical setup",
          steps: [
            "Use a tested primary Alipay or WeChat Pay method.",
            "Carry a physical card from another issuer.",
            "Keep a modest RMB cash reserve.",
            "Store the backup separately from your phone and main wallet.",
          ],
        },
        {
          title: "Verify each path",
          steps: [
            "Test the primary method with a real purchase.",
            "Confirm both issuers allow overseas transactions.",
            "Check how each issuer handles verification and support.",
            "Make sure the cash reserve remains accessible after a lost phone or wallet.",
          ],
        },
        {
          title: "If the primary method fails",
          paragraphs: [
            "Switch to the backup, preserve the error details and troubleshoot later. Your first priority is maintaining a working payment path.",
          ],
        },
      ]}
    />
  );
}
