import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("mobile navigation and tool order fit without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();

  const names = await page.getByTestId("check-card").getByRole("heading").allTextContents();
  expect(names).toEqual([
    "China Readiness Check",
    "China App Readiness Checker",
    "Payment & Phone Resilience Check",
    "Passport Carry & Identity Checker",
    "Train Booking Readiness Checker",
    "Travel Date Check",
    "Hotel Arrival Check",
  ]);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(hasOverflow).toBe(false);
});
