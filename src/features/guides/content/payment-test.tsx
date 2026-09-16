import { ArticleSections, type ArticleFaq } from "./article-sections";
import Link from "next/link";

export const paymentTestFaqs: ArticleFaq[] = [
  {
    question: "Is linking a foreign card enough?",
    answer: "No. Linking proves setup, not that a live transaction will succeed in China.",
  },
  {
    question: "Can I fully test a China merchant before flying?",
    answer: "Not reliably. A home-market transaction can test app, card and issuer mechanics, but it cannot guarantee that a mainland merchant or transport operator will accept the route.",
  },
  {
    question: "What should I carry for the first purchase?",
    answer: "Keep a small amount of RMB cash and a physical card accessible until you have completed a small live purchase in China.",
  },
];

export function PaymentTestGuide() {
  return (
    <>
    <section className="mb-10 space-y-4 rounded-2xl bg-[var(--surface)] p-6" aria-labelledby="payment-test-answer">
      <h2 id="payment-test-answer" className="text-2xl font-bold">How do I test if WeChat Pay or Alipay works?</h2>
      <p className="leading-7">Before departure, check that your card is linked and complete any verification requested by the app. That is setup, not a successful payment. After arrival, make a small purchase at a legitimate merchant, confirm the app shows payment success and ask the merchant to confirm receipt. Keep a backup available.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><h3 className="font-bold">Still outside China?</h3><p className="mt-2 leading-7">You may not have a supported transaction to test. Do not send money to strangers or use an unknown QR code as a test. Leave your status as “set up, not yet tested in China.”</p></div>
        <div><h3 className="font-bold">Already in China?</h3><p className="mt-2 leading-7">Check the merchant and amount, use the card you intend to rely on, and inspect the payment result. A pending bank authorization alone is not proof the merchant was paid; confirm the order before retrying.</p></div>
      </div>
      <p className="leading-7">One successful purchase proves that transaction, not every shop, transfer or future payment. This website cannot test your wallet or charge your card, and does not provide a payment test account.</p>
      <Link className="block font-bold underline" href="/checks/payment">Payment failed or setup incomplete? Open the payment diagnostic</Link>
      <Link className="block font-bold underline" href="/alipay-backup-payment-checker">Prepare an independent payment backup</Link>
    </section>
    <ArticleSections
      answer="A linked card in Alipay or WeChat Pay is only a setup milestone. Prove each setup layer before departure, then keep a separate backup for the first live purchase in China."
      sections={[
        {
          title: "What setup often misses",
          paragraphs: [
            "Identity checks, card linking and transaction approval are separate steps. An Alipay or WeChat Pay setup can look complete while the card issuer, verification channel or app still blocks a purchase.",
            "A successful setup screen does not prove that a mainland merchant, transport operator or hotel deposit will accept the same route. Treat any home-market test as a check of app, card and issuer mechanics—not a guarantee of China-side acceptance.",
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
          title: "Prove the layers before departure",
          steps: [
            "Complete a supported low-value transaction in your home market only if the app presents one; do not treat it as proof of every China merchant path.",
            "Confirm that the transaction or authorization appears correctly with your issuer.",
            "Repeat the setup test after any card, phone number or app account change.",
            "Test the approval route on cellular data if your bank requires an app or message while travelling.",
          ],
        },
        {
          title: "Make the first China purchase recoverable",
          steps: [
            "Keep a small amount of RMB cash and a physical card accessible during your first transfer and meal.",
            "Make the first China purchase small enough that a decline is recoverable.",
            "If it fails, use the backup first and record the exact issuer or app message before troubleshooting.",
          ],
        },
        {
          title: "If the setup test fails",
          paragraphs: [
            "Record the exact error, check the app identity details, then contact the card issuer. Do not keep retrying one route without preparing another way to pay.",
          ],
        },
      ]}
      faqs={paymentTestFaqs}
    />
    </>
  );
}
