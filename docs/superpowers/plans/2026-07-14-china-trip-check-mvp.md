# China Trip Check MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready English MVP at `chinatripcheck.com` with four working pre-trip risk checks, deterministic local rules, actionable reports, eight supporting guides, local persistence, and the approved cool-neutral visual system.

**Architecture:** A Next.js App Router site statically renders marketing and guide pages while client-leaf components run questionnaires and local persistence. Typed tool configurations feed a pure rule engine and a shared report presenter, keeping business rules independent from React and ready for future email or analytics adapters.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright, pnpm

---

## File map

```text
package.json                            scripts and dependencies
next.config.ts                         static-safe Next.js configuration
tsconfig.json                          strict TypeScript configuration
eslint.config.mjs                      Next.js ESLint flat configuration
postcss.config.mjs                     Tailwind PostCSS plugin
vitest.config.ts                       unit and component test configuration
playwright.config.ts                   browser test configuration
src/app/layout.tsx                     global metadata and public shell
src/app/page.tsx                       homepage
src/app/checks/page.tsx                four-check index
src/app/checks/[slug]/page.tsx         tool route and static params
src/app/guides/page.tsx                guide index
src/app/guides/[slug]/page.tsx         guide route and static params
src/app/how-it-works/page.tsx          method, privacy, and limitations
src/app/about/page.tsx                 brand purpose and disclaimer
src/app/not-found.tsx                  branded 404
src/app/globals.css                    design tokens and shared styles
src/components/site/*                  header, footer, section components
src/features/checks/types.ts           shared question, rule, report types
src/features/checks/operators.ts       pure condition operators
src/features/checks/evaluate.ts        rule evaluation pipeline
src/features/checks/merge-findings.ts  risk and action de-duplication
src/features/checks/score.ts           score and overall status
src/features/checks/storage.ts         versioned local persistence adapter
src/features/checks/catalog.ts         public four-tool catalog
src/features/checks/configs/*          questions and rules per tool
src/features/checks/components/*       intro, questionnaire, report UI
src/features/guides/catalog.ts         exact eight-guide catalog
src/features/guides/content/*          guide content modules
src/lib/site.ts                        brand, domain, and metadata constants
src/test/setup.ts                      DOM test setup
tests/unit/*                            pure engine and config tests
tests/components/*                      questionnaire and report tests
tests/e2e/*                             full browser journeys
```

### Task 1: Scaffold the tested Next.js application

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Test: `tests/unit/site.test.ts`

- [ ] **Step 1: Create the package manifest and install current compatible packages**

Use `package.json` with these scripts:

```json
{
  "name": "china-trip-check",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Run:

```powershell
pnpm add next@latest react@latest react-dom@latest @phosphor-icons/react
pnpm add -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react @playwright/test
```

Expected: dependencies install and `pnpm-lock.yaml` is created.

- [ ] **Step 2: Write the failing brand constant test**

Create `tests/unit/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site";

describe("siteConfig", () => {
  it("uses the approved public brand and canonical domain", () => {
    expect(siteConfig.name).toBe("China Trip Check");
    expect(siteConfig.wordmark).toBe("ChinaTripCheck");
    expect(siteConfig.url).toBe("https://chinatripcheck.com");
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `pnpm test -- tests/unit/site.test.ts`  
Expected: FAIL because `@/lib/site` does not exist.

- [ ] **Step 4: Add strict configuration, test setup, site constants, and root layout**

Create `src/lib/site.ts`:

```ts
export const siteConfig = {
  name: "China Trip Check",
  wordmark: "ChinaTripCheck",
  url: "https://chinatripcheck.com",
  description:
    "Find payment, travel date and hotel arrival risks before they disrupt your China trip.",
} as const;
```

Configure `tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess: true`, and alias `@/*` to `./src/*`. Configure Vitest for `jsdom`, `src/test/setup.ts`, and the same alias. Import `@testing-library/jest-dom/vitest` from the setup file.

Use these build-tool configurations:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

```js
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "coverage/**", "playwright-report/**"]),
]);
```

Create `src/app/layout.tsx` with metadata base `new URL(siteConfig.url)`, title template `%s | China Trip Check`, canonical metadata, and an English `<html lang="en">` root.

Create `src/app/globals.css` with Tailwind import plus approved tokens:

```css
@import "tailwindcss";

:root {
  --canvas: #ffffff;
  --surface: #f4f7f9;
  --ink: #142b3e;
  --muted: #60717f;
  --line: #dce4ea;
  --primary: #1769ff;
  --critical: #c93a30;
  --high: #dc7829;
  --ready: #2d8655;
  --pending: #77838d;
  --warm: #d9844b;
  --radius-sm: 0.75rem;
  --radius-md: 1.125rem;
  --radius-lg: 1.75rem;
}
```

- [ ] **Step 5: Run baseline verification**

Run: `pnpm test -- tests/unit/site.test.ts && pnpm typecheck`  
Expected: PASS with no TypeScript errors.

- [ ] **Step 6: Commit**

```powershell
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json eslint.config.mjs postcss.config.mjs vitest.config.ts playwright.config.ts src tests/unit/site.test.ts
git commit -m "chore: scaffold China Trip Check app"
```

### Task 2: Build the pure rule engine with TDD

**Files:**
- Create: `src/features/checks/types.ts`
- Create: `src/features/checks/operators.ts`
- Create: `src/features/checks/merge-findings.ts`
- Create: `src/features/checks/score.ts`
- Create: `src/features/checks/evaluate.ts`
- Test: `tests/unit/rule-engine.test.ts`

- [ ] **Step 1: Write failing tests for conditions, merged findings, actions, and score**

Create tests covering:

```ts
const answers = {
  paymentTested: false,
  backupCard: false,
  cashBackup: false,
};

expect(evaluateCondition(answers, {
  field: "paymentTested",
  operator: "eq",
  value: false,
})).toBe(true);

expect(evaluateCheck(sampleTool, answers)).toMatchObject({
  overallStatus: "action-required",
  counts: { critical: 1, high: 0, ready: 0 },
});

expect(evaluateCheck(sampleTool, answers).findings[0]).toMatchObject({
  group: "payment-resilience",
  severity: "critical",
  title: "Your payment setup has a single point of failure.",
});

expect(evaluateCheck(sampleTool, answers).actions).toEqual([
  "Test a small payment before departure.",
  "Add a second card from another issuer.",
  "Carry emergency RMB cash.",
]);
```

Include individual tests for `eq`, `neq`, `includes`, `missing`, `gt`, `gte`, `lt`, `lte`, and `date-overlaps`.

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm test -- tests/unit/rule-engine.test.ts`  
Expected: FAIL because engine modules do not exist.

- [ ] **Step 3: Define exact engine types**

In `types.ts`, define:

```ts
export type Severity = "critical" | "high" | "information" | "ready";
export type OverallStatus = "not-ready" | "action-required" | "review" | "ready";
export type AnswerValue = string | number | boolean | string[] | null;
export type Answers = Record<string, AnswerValue>;
export type Operator =
  | "eq" | "neq" | "includes" | "missing"
  | "gt" | "gte" | "lt" | "lte" | "date-overlaps";

export interface Condition {
  field: string;
  operator: Operator;
  value?: AnswerValue | { start: string; end: string };
}

export interface RiskRule {
  code: string;
  severity: Severity;
  priority: number;
  group: string;
  all?: Condition[];
  any?: Condition[];
  title: string;
  explanation: string;
  actions: string[];
  backup?: string;
  relatedGuides?: string[];
  relatedCheck?: "readiness" | "payment" | "dates" | "hotel-arrival";
}
```

Also define `Question`, `ToolConfig`, `Finding`, `RiskReport`, `HolidayEvent`, and count types using the same property names used in the tests.

- [ ] **Step 4: Implement operators and deterministic evaluation**

Implement `evaluateCondition`, `matchesRule`, `mergeFindings`, `scoreReport`, and `evaluateCheck`. Rules match when every `all` condition and at least one `any` condition pass. Findings merge by `group`, keep the strongest severity and lowest priority number, and de-duplicate actions while preserving first appearance.

Score starts at 100 and deducts 24 for each Critical finding, 12 for each High finding, and 4 for each Information finding, clamped to 0. Overall status is `not-ready` for any Critical, `action-required` for any High, `review` for Information only, and `ready` otherwise.

- [ ] **Step 5: Run rule tests and typecheck**

Run: `pnpm test -- tests/unit/rule-engine.test.ts && pnpm typecheck`  
Expected: all engine tests PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/features/checks tests/unit/rule-engine.test.ts
git commit -m "feat: add deterministic travel risk engine"
```

### Task 3: Add versioned local persistence

**Files:**
- Create: `src/features/checks/storage.ts`
- Test: `tests/unit/storage.test.ts`

- [ ] **Step 1: Write failing persistence tests**

Test these exact behaviors:

```ts
saveDraft("payment", { currentStep: 3, answers: { paymentTested: false } });
expect(loadDraft("payment")).toEqual({
  version: 1,
  currentStep: 3,
  answers: { paymentTested: false },
});

localStorage.setItem("ctc:check:payment:draft", "broken-json");
expect(loadDraft("payment")).toBeNull();
expect(localStorage.getItem("ctc:check:payment:draft")).toBeNull();

clearCheckData("payment");
expect(loadDraft("payment")).toBeNull();
expect(loadReport("payment")).toBeNull();
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm test -- tests/unit/storage.test.ts`  
Expected: FAIL because storage functions do not exist.

- [ ] **Step 3: Implement guarded storage**

Use keys `ctc:check:${slug}:draft` and `ctc:check:${slug}:report`. Validate `version === 1`, answer shape, and step number before returning data. Wrap all browser storage access in `try/catch`; return `null` when unavailable and never prevent questionnaire use.

Export `saveDraft`, `loadDraft`, `saveReport`, `loadReport`, `clearCheckData`, and `clearAllCheckData`.

- [ ] **Step 4: Run tests**

Run: `pnpm test -- tests/unit/storage.test.ts`  
Expected: PASS including corrupt JSON recovery.

- [ ] **Step 5: Commit**

```powershell
git add src/features/checks/storage.ts tests/unit/storage.test.ts
git commit -m "feat: persist check drafts and reports locally"
```

### Task 4: Configure the exact four working checks

**Files:**
- Create: `src/features/checks/catalog.ts`
- Create: `src/features/checks/configs/readiness.ts`
- Create: `src/features/checks/configs/payment.ts`
- Create: `src/features/checks/configs/dates.ts`
- Create: `src/features/checks/configs/hotel-arrival.ts`
- Create: `src/features/checks/configs/holiday-events.ts`
- Create: `src/features/checks/configs/index.ts`
- Test: `tests/unit/check-configs.test.ts`
- Test: `tests/unit/check-scenarios.test.ts`

- [ ] **Step 1: Write failing catalog and configuration integrity tests**

Assert the public catalog contains exactly these slugs and no fifth item:

```ts
expect(checkCatalog.map((tool) => tool.slug)).toEqual([
  "readiness",
  "payment",
  "dates",
  "hotel-arrival",
]);
```

For every config, assert 8 to 15 visible questions, unique question IDs, unique rule codes, valid guide references, non-empty actions, and `lastReviewedAt` in ISO date form.

- [ ] **Step 2: Run integrity tests to verify failure**

Run: `pnpm test -- tests/unit/check-configs.test.ts`  
Expected: FAIL because the catalog and configs do not exist.

- [ ] **Step 3: Implement question sets**

Use these stable question IDs:

```text
readiness:
mobilePayment, identityVerified, paymentTested, backupCard, cashBackup,
arrivalInternet, backupInternet, bankVerificationAccess, hotelChineseDetails,
lateHotelArrival, lateArrivalConfirmed, trainTravel, trainTicketIssued,
trainPassportChecked, holidayDatesChecked

payment:
paymentApps, identityVerified, foreignCardLinked, overseasTransactions,
bankVerificationAccess, paymentTested, backupCard, physicalCard,
cashBackup, originalNumberAvailable, esimReceivesSms, reliesOnOneApp

dates:
arrivalDate, departureDate, cities, intercityTravel, highSpeedRail,
popularAttractions, datesFlexible, bookingsComplete

hotel-arrival:
city, hotelArrivalTime, frontDesk24Hours, lateArrivalConfirmed,
chineseHotelName, chineseAddress, hotelPhone, bookingNameMatches,
mainstreamPlatform, freeCancellation, backupHotel, arrivalTransport
```

The readiness renderer may conditionally hide train follow-up questions when `trainTravel` is false. It must not describe a separate train tool.

- [ ] **Step 4: Implement core rule groups**

Create rules for these exact groups:

```text
readiness:
payment-unverified, payment-single-point, no-arrival-internet,
verification-unavailable, hotel-location-unusable, late-arrival-unconfirmed,
train-ticket-unissued, train-passport-unchecked, holiday-unchecked

payment:
no-payment-path, payment-untested, payment-single-point,
verification-unavailable, overseas-transactions-disabled,
no-physical-card, no-cash, data-only-esim, one-app-only

dates:
invalid-verified-window, holiday-overlap, holiday-edge-window,
rail-booking-risk, hotel-price-risk, attraction-booking-risk,
inflexible-dates, incomplete-bookings

hotel-arrival:
late-arrival-unconfirmed, front-desk-closed, hotel-details-unusable,
booking-name-mismatch, no-hotel-phone, no-arrival-transport,
no-cancellation-option, no-backup-hotel
```

Use Critical only for a genuinely blocked path such as no payment path, arrival internet absent, late arrival with no confirmation and no 24-hour desk, or booking-name mismatch. Use High for single points of failure and Information for review reminders.

- [ ] **Step 5: Add verified holiday dataset behavior**

Before writing official date records, verify current 2026 national holiday arrangements from official Chinese government sources. Store the source URL and `lastReviewedAt` beside each event. Add conservative seasonal windows for summer travel with `official: false`.

For dates after the verified dataset, produce the `invalid-verified-window` Information finding: “These dates are outside our currently verified holiday calendar. Check the latest official schedule before booking.”

- [ ] **Step 6: Write and run scenario tests**

Add low-risk, high-risk, Critical, and uncertain scenarios for every tool. Include:

```ts
expect(evaluateCheck(paymentConfig, criticalPaymentAnswers).findings)
  .toEqual(expect.arrayContaining([
    expect.objectContaining({ group: "no-payment-path", severity: "critical" }),
  ]));

expect(evaluateCheck(hotelArrivalConfig, safeHotelAnswers).overallStatus)
  .toBe("ready");

expect(evaluateCheck(readinessConfig, noTrainAnswers).findings)
  .not.toEqual(expect.arrayContaining([
    expect.objectContaining({ group: "train-ticket-unissued" }),
  ]));
```

Run: `pnpm test -- tests/unit/check-configs.test.ts tests/unit/check-scenarios.test.ts`  
Expected: PASS for all four tool scenario suites.

- [ ] **Step 7: Commit**

```powershell
git add src/features/checks/catalog.ts src/features/checks/configs tests/unit/check-configs.test.ts tests/unit/check-scenarios.test.ts
git commit -m "feat: configure four China travel risk checks"
```

### Task 5: Build accessible questionnaire and report components

**Files:**
- Create: `src/features/checks/components/check-experience.tsx`
- Create: `src/features/checks/components/check-intro.tsx`
- Create: `src/features/checks/components/questionnaire.tsx`
- Create: `src/features/checks/components/question-field.tsx`
- Create: `src/features/checks/components/progress.tsx`
- Create: `src/features/checks/components/risk-report.tsx`
- Create: `src/features/checks/components/risk-finding.tsx`
- Create: `src/features/checks/components/report-metrics.tsx`
- Test: `tests/components/questionnaire.test.tsx`
- Test: `tests/components/risk-report.test.tsx`

- [ ] **Step 1: Write failing questionnaire interaction tests**

Test that the first question renders, Continue is blocked without a required answer, selecting an answer advances, Back preserves the answer, conditional train questions stay hidden when train travel is false, progress has an accessible label, and restored storage resumes at the saved step.

Use user-event assertions such as:

```tsx
await user.click(screen.getByRole("button", { name: /continue/i }));
expect(screen.getByText("Choose an answer to continue.")).toBeInTheDocument();

await user.click(screen.getByRole("radio", { name: /no, i will not take a train/i }));
await user.click(screen.getByRole("button", { name: /continue/i }));
expect(screen.queryByText(/has your train ticket been issued/i)).not.toBeInTheDocument();
```

- [ ] **Step 2: Run questionnaire tests to verify failure**

Run: `pnpm test -- tests/components/questionnaire.test.tsx`  
Expected: FAIL because components do not exist.

- [ ] **Step 3: Implement the questionnaire state machine**

`CheckExperience` owns the phases `intro | questions | report`. `Questionnaire` derives visible questions from current answers, validates the current question, saves after every answer or step change, restores once after hydration, and announces step changes in an `aria-live="polite"` region.

Render single choice as radio groups, multiple choice as checkboxes, dates as date inputs, time as time input, and short text as a normal text field. Use native controls inside large clickable labels.

- [ ] **Step 4: Write failing report tests**

Assert that Critical and High counts render with text labels, findings are ordered Critical before High, actions are numbered and de-duplicated, the last-reviewed date and disclaimer are present, and clear report returns to the intro after confirmation.

- [ ] **Step 5: Implement report components**

Use status text plus color and a Lucide icon. Render the score as secondary context, followed by metrics, findings, actions, backup plan, related guides, and only relevant existing checks. Do not render a train checker, coming-soon item, or disabled card.

- [ ] **Step 6: Run component tests**

Run: `pnpm test -- tests/components/questionnaire.test.tsx tests/components/risk-report.test.tsx`  
Expected: PASS with no accessibility-query failures.

- [ ] **Step 7: Commit**

```powershell
git add src/features/checks/components tests/components
git commit -m "feat: add accessible check and report experience"
```

### Task 6: Implement the public shell and approved homepage

**Files:**
- Create: `src/components/site/header.tsx`
- Create: `src/components/site/footer.tsx`
- Create: `src/components/site/container.tsx`
- Create: `src/components/site/result-preview.tsx`
- Create: `src/components/site/tool-grid.tsx`
- Create: `src/components/site/trust-strip.tsx`
- Create: `src/components/site/site-json-ld.tsx`
- Create: `public/images/china-trip-check-hero.png`
- Create: `src/app/page.tsx`
- Create: `src/app/checks/page.tsx`
- Create: `src/app/checks/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`
- Test: `tests/components/homepage.test.tsx`

- [ ] **Step 1: Write failing homepage scope and copy test**

Assert:

```tsx
expect(screen.getByText("Find the risks before they disrupt your China trip.")).toBeInTheDocument();
expect(screen.getByText("ChinaTripCheck")).toBeInTheDocument();
expect(screen.getAllByRole("link", { name: /check|start/i })).toHaveLength(5);
expect(screen.queryByText(/train station|coming soon/i)).not.toBeInTheDocument();
```

Also assert all four tool names are present and no fifth tool card exists.

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm test -- tests/components/homepage.test.tsx`  
Expected: FAIL because homepage components do not exist.

- [ ] **Step 3: Implement the site shell**

Header navigation contains Checks, How it works, About, and the `Check my trip` action. The wordmark is `ChinaTripCheck`. Mobile navigation uses an accessible disclosure button and closes after navigation. Footer contains method, privacy, disclaimer, review information, and copyright.

`SiteJsonLd` renders `Organization` and `WebSite` JSON-LD with name `China Trip Check`, URL `https://chinatripcheck.com`, and the approved description. Serialize a fixed object created from `siteConfig`; do not inject user-provided data.

- [ ] **Step 4: Implement the approved homepage composition**

Use the confirmed v2 layout and the generated project asset `public/images/china-trip-check-hero.png` through `next/image` with explicit dimensions and `priority`:

- white hero with editorial display heading;
- blue primary button and quiet secondary link;
- one warm, authentic travel image with compact report preview;
- cool white/pale blue-grey tool section;
- blue Readiness card spanning two grid rows;
- Payment and Dates cards side by side;
- Hotel Arrival card spanning the right width;
- no large yellow or beige area;
- warm accent limited to a small note line or image lighting;
- private-by-design, conservative-guidance, and rules-reviewed trust statements.

On mobile, collapse to one column in Readiness, Payment, Dates, Hotel order. Keep the primary CTA visible without horizontal overflow.

- [ ] **Step 5: Implement tool routes and metadata**

Generate only the four catalog slugs. Unknown slugs call `notFound()`. Each route supplies a distinct title, description, canonical URL, and Open Graph metadata using `siteConfig.url`.

- [ ] **Step 6: Run homepage tests and typecheck**

Run: `pnpm test -- tests/components/homepage.test.tsx && pnpm typecheck`  
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/app src/components/site tests/components/homepage.test.tsx
git commit -m "feat: build China Trip Check public experience"
```

### Task 7: Add the exact eight guides and trust pages

**Files:**
- Create: `src/features/guides/types.ts`
- Create: `src/features/guides/catalog.ts`
- Create: `src/features/guides/content/payment-test.tsx`
- Create: `src/features/guides/content/foreign-card-failure.tsx`
- Create: `src/features/guides/content/esim-verification.tsx`
- Create: `src/features/guides/content/payment-backup.tsx`
- Create: `src/features/guides/content/holiday-booking.tsx`
- Create: `src/features/guides/content/national-day.tsx`
- Create: `src/features/guides/content/late-check-in.tsx`
- Create: `src/features/guides/content/chinese-hotel-address.tsx`
- Create: `src/app/guides/page.tsx`
- Create: `src/app/guides/[slug]/page.tsx`
- Create: `src/app/how-it-works/page.tsx`
- Create: `src/app/about/page.tsx`
- Test: `tests/unit/guides.test.ts`

- [ ] **Step 1: Write failing guide scope tests**

Assert the catalog has exactly eight unique slugs, every guide has `title`, `description`, `lastReviewedAt`, `applicableChecks`, `sourceNotes`, and a renderable content component. Assert there is no guide about a dedicated train checker.

- [ ] **Step 2: Run test to verify failure**

Run: `pnpm test -- tests/unit/guides.test.ts`  
Expected: FAIL because guide modules do not exist.

- [ ] **Step 3: Write the guide catalog and content**

Use these exact slugs:

```text
test-mobile-payment-before-china
foreign-card-fails-in-china
esim-bank-verification-messages
one-payment-method-is-not-enough
china-holidays-tickets-hotels
travel-during-china-national-day
confirm-late-hotel-check-in-china
save-hotel-name-address-in-chinese
```

Every guide opens with a concise answer, then covers why it matters, what to prepare, how to verify, what to do if it fails, and a related working check. Use official sources for changeable factual claims and record the review date. Do not copy third-party prose.

- [ ] **Step 4: Implement guide and trust routes**

Generate static guide params from the catalog. Render review metadata, source notes, related checks, and a conservative disclaimer. `how-it-works` explains deterministic local evaluation and local-only answers. `about` explains the brand purpose and boundaries without exposing the China Ready working name.

- [ ] **Step 5: Run guide tests and build**

Run: `pnpm test -- tests/unit/guides.test.ts && pnpm build`  
Expected: PASS and all eight guide paths appear in build output.

- [ ] **Step 6: Commit**

```powershell
git add src/features/guides src/app/guides src/app/how-it-works src/app/about tests/unit/guides.test.ts
git commit -m "feat: publish essential China travel risk guides"
```

### Task 8: Add browser journeys, SEO safeguards, and final verification

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `tests/e2e/homepage.spec.ts`
- Create: `tests/e2e/checks.spec.ts`
- Create: `tests/e2e/mobile.spec.ts`
- Create: `tests/e2e/scope.spec.ts`
- Create: `.env.example`
- Create: `README.md`

- [ ] **Step 1: Write failing Playwright journeys**

Cover:

```ts
test("completes a critical payment report", async ({ page }) => {
  await page.goto("/checks/payment");
  await page.getByRole("button", { name: "Start payment check" }).click();
  // Answer the configured critical scenario by accessible option names.
  await expect(page.getByText("ACTION REQUIRED")).toBeVisible();
  await expect(page.getByText(/single point of failure/i)).toBeVisible();
});
```

Also test low-risk readiness, invalid date order, late hotel arrival Critical, refresh/resume, clear report, keyboard-only completion, desktop and 390px mobile overflow, and direct invalid report recovery.

- [ ] **Step 2: Add scope and brand safeguards**

Scan every rendered public page and assert:

```ts
await expect(page.getByText(/China Ready/i)).toHaveCount(0);
await expect(page.getByText(/coming soon|train checker|station transfer checker/i)).toHaveCount(0);
await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
```

- [ ] **Step 3: Implement robots, sitemap, environment example, and README**

`robots.ts` allows public crawling and references `https://chinatripcheck.com/sitemap.xml`. `sitemap.ts` lists the homepage, four checks, checks index, eight guides, guide index, how-it-works, and about pages using the canonical domain.

`.env.example` documents optional future variables without activating integrations:

```text
NEXT_PUBLIC_ANALYTICS_PROVIDER=
REPORT_EMAIL_PROVIDER=
REPORT_EMAIL_API_KEY=
```

README includes Node/pnpm prerequisites, install, dev, test, build, and local-data behavior.

- [ ] **Step 4: Run the complete automated suite**

Run:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Expected: every command exits 0; four check routes and eight guide routes build successfully.

- [ ] **Step 5: Run real-browser visual verification**

Open the built site at desktop 1440×900, laptop 1280×720, tablet 768×1024, and mobile 390×844. Verify:

- hero CTA is visible on laptop without horizontal scrolling;
- the tool bento has no empty cell at desktop;
- the tool order is correct on mobile;
- no large yellow or beige section appears;
- focus states are visible;
- Critical, High Risk, Ready, Information, and Pending states include text or icons;
- reduced-motion preference disables nonessential movement;
- no unbuilt feature appears;
- question and result content remain readable at 200% zoom.

- [ ] **Step 6: Fix any verification failures and rerun affected checks**

For each failure, add or update the smallest automated regression test before changing implementation. Rerun the failed command and then the complete suite.

- [ ] **Step 7: Commit the verified release**

```powershell
git add src tests README.md .env.example playwright.config.ts
git commit -m "test: verify China Trip Check MVP journeys"
```

## Completion gate

Before reporting completion, verify all of the following:

- The public brand is China Trip Check and the wordmark is ChinaTripCheck.
- Canonical URLs use `https://chinatripcheck.com`.
- Exactly four working checks are visible.
- Exactly eight supporting guides are visible.
- No unbuilt or coming-soon product is mentioned.
- Rules produce merged, ordered, conservative reports.
- Draft and report persistence recover safely.
- Users can clear local data.
- The homepage matches the approved cool-neutral v2 direction.
- Unit, component, browser, lint, typecheck, and production build commands pass.
