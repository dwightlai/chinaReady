import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import GuidePage from "@/app/guides/[slug]/page";

it("serves the payment answer before the optional diagnostic CTA", async () => {
  render(await GuidePage({ params: Promise.resolve({ slug: "test-mobile-payment-before-china" }) }));
  const answer = screen.getByRole("heading", { name: "How do I test if WeChat Pay or Alipay works?" });
  expect(screen.queryByText("Start with the tool")).not.toBeInTheDocument();
  const cta = screen.getByText(/Need help applying this to your trip/);
  expect(answer.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByRole("link", { name: "Prepare an independent payment backup" })).toHaveAttribute("href", "/alipay-backup-payment-checker");
});
