import { expect, test } from "@playwright/test";

test("completes a critical payment report", async ({ page }) => {
  await page.goto("/checks/payment");
  await page.getByRole("button", { name: "Start payment check" }).click();
  await page.getByRole("checkbox", { name: "Neither" }).check();
  await page.getByRole("button", { name: "Continue" }).click();

  for (let index = 0; index < 11; index += 1) {
    await page.getByRole("radio", { name: "No", exact: true }).click();
    await page.getByRole("button", { name: index === 10 ? "See my report" : "Continue" }).click();
  }

  await expect(page.getByText("ACTION REQUIRED")).toBeVisible();
  await expect(page.getByText(/single point of failure/i)).toBeVisible();
  await expect(page.getByText(/do not have a practical payment path/i)).toBeVisible();
});

test("restores a draft after refresh and clears its report", async ({ page }) => {
  await page.goto("/checks/readiness");
  await page.getByRole("button", { name: "Start readiness check" }).click();
  await page.getByRole("radio", { name: "Yes", exact: true }).click();
  await page.reload();

  await page.getByRole("button", { name: "Continue my check" }).click();
  await expect(page.getByRole("radio", { name: "Yes", exact: true })).toBeChecked();
});

test("completes a low-risk readiness report and clears local data", async ({ page }) => {
  await page.goto("/checks/readiness");
  await page.getByRole("button", { name: "Start readiness check" }).click();

  for (let index = 0; index < 9; index += 1) {
    await page.getByRole("radio", { name: "Yes", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await page.getByRole("radio", { name: "No", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "No", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("radio", { name: "Yes", exact: true }).click();
  await page.getByRole("button", { name: "See my report" }).click();

  await expect(page.getByText("READY", { exact: true })).toBeVisible();
  await expect(page.getByText("No major blockers found")).toBeVisible();
  await page.getByRole("button", { name: "Clear report" }).click();
  await expect(page.getByRole("button", { name: "Start readiness check" })).toBeVisible();
});

test("flags an invalid date order", async ({ page }) => {
  await page.goto("/checks/dates");
  await page.getByRole("button", { name: "Start dates check" }).click();
  await page.locator('input[type="date"]').fill("2026-08-10");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.locator('input[type="date"]').fill("2026-08-05");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("textbox").fill("Shanghai");
  await page.getByRole("button", { name: "Continue" }).click();
  for (let index = 0; index < 5; index += 1) {
    await page.getByRole("radio", { name: "No", exact: true }).click();
    await page.getByRole("button", { name: index === 4 ? "See my report" : "Continue" }).click();
  }
  await expect(page.getByText(/departure date is earlier/i)).toBeVisible();
});

test("flags an unconfirmed late hotel arrival", async ({ page }) => {
  await page.goto("/checks/hotel-arrival");
  await page.getByRole("button", { name: "Start hotel arrival check" }).click();
  await page.getByRole("textbox").fill("Shanghai");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.locator('input[type="time"]').fill("00:30");
  await page.getByRole("button", { name: "Continue" }).click();
  for (let index = 0; index < 10; index += 1) {
    await page.getByRole("radio", { name: "No", exact: true }).click();
    await page.getByRole("button", { name: index === 9 ? "See my report" : "Continue" }).click();
  }
  await expect(page.getByText(/late arrival has no confirmed check-in path/i)).toBeVisible();
});
