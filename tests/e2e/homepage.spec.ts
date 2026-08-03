import { expect, test } from "@playwright/test";

test("homepage exposes the approved seven-check experience", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "China Travel Readiness Checker" })).toBeVisible();
  await expect(page.getByTestId("check-card")).toHaveCount(7);
  await expect(page.getByRole("link", { name: "Start Free Readiness Check" }).first()).toHaveAttribute("href", "/checks/readiness");
  await expect(page.getByText(/China Ready|coming soon|train checker/i)).toHaveCount(0);
});

test("guide cards open real guide pages", async ({ page }) => {
  await page.goto("/guides");
  await expect(page.getByRole("link", { name: "Read supporting guide" })).toHaveCount(16);
  await page.locator('a[href="/guides/test-mobile-payment-before-china"]').click();
  await expect(page).toHaveURL(/\/guides\/test-mobile-payment-before-china$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Alipay or WeChat Pay");
});
