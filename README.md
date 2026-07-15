# China Trip Check

China Trip Check is an English, mobile-first preparation tool for international visitors to China. It contains four deterministic checks and twelve supporting guides. It does not require an account or a server database.

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

## Local data behavior

Questionnaire drafts and generated reports are stored in the current browser through `localStorage`. They are not sent to a server. Travelers can clear an individual report from its result screen, or clear all local check data from the Privacy page. Clearing browser site data also removes all saved answers and reports.

The public site uses Umami for privacy-focused page-view analytics. Check answers are not included in analytics events.

The check engine is deterministic: typed configuration and explicit rules produce the same report for the same answers. Time-sensitive content includes a review date and should be confirmed with the relevant official provider before travel.

## Optional future environment variables

Copy `.env.example` to `.env.local` only when integrating a future analytics or email provider. Blank variables do not activate any integration in this MVP.
