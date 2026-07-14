import { expect, test } from "@playwright/test";

const routes = ["/", "/checks", "/guides", "/how-it-works", "/about", "/privacy", "/terms"];

for (const route of routes) {
  test(`keeps excluded product scope off ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).not.toContainText(/China Ready|coming soon|train checker|station transfer checker/i);
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasOverflow).toBe(false);
  });
}
