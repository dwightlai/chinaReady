# China Trip Check Cloudflare Workers Deployment Design

## Goal

Publish the existing `master` branch to `github.com/dwightlai/chinaReady`, deploy the full Next.js application to Cloudflare Workers through the OpenNext adapter, and serve it from `https://chinatripcheck.com`.

## Chosen approach

The repository owns all runtime configuration. The first production release is built and deployed locally with Wrangler so the exact artifact can be verified before it reaches Cloudflare. The checked-in configuration remains compatible with a later Cloudflare Workers Builds connection, but continuous deployment is outside this first-release task.

## Repository boundary

- Push the tracked project history from local `master` to the empty public GitHub repository `dwightlai/chinaReady`.
- Add an `origin` remote using the HTTPS GitHub URL.
- Do not add the three untracked Chinese source documents to Git. They remain local source material.
- Never commit Cloudflare credentials, OAuth state, `.dev.vars`, `.wrangler`, `.open-next`, or generated build output.

## Worker architecture

- Adapter: current `@opennextjs/cloudflare` release compatible with the installed Next.js version.
- Deployment CLI: Wrangler 4.68 or later.
- Worker name: `china-trip-check`.
- Entry point: `.open-next/worker.js`.
- Static assets: `.open-next/assets`, bound as `ASSETS`.
- Compatibility date: `2026-07-14`.
- Compatibility flag: `nodejs_compat`.
- Observability: enabled.
- OpenNext caching: default configuration. The MVP does not require ISR or an R2 cache because its public content is statically generated and questionnaire data stays in the browser.

## Domain routing

The Wrangler configuration declares one Custom Domain route:

```json
{ "pattern": "chinatripcheck.com", "custom_domain": true }
```

Cloudflare owns the zone, DNS record, certificate issuance, and Worker routing. This release does not add `www.chinatripcheck.com`; it can be added later with an explicit redirect decision.

## Commands and generated artifacts

The repository exposes:

- `pnpm preview`: build through OpenNext and run with the Workers runtime locally;
- `pnpm deploy`: build through OpenNext and deploy through Wrangler;
- `pnpm cf-typegen`: generate Cloudflare binding types when bindings are added.

OpenNext output and Wrangler state are ignored. Application tests remain separate from deployment commands.

## Verification and failure handling

Before deployment:

1. Run lint, TypeScript, Vitest, Next.js production build, and Playwright.
2. Run the OpenNext build and verify `.open-next/worker.js` plus static assets exist.
3. Run Wrangler dry-run validation where supported.

After deployment:

1. Confirm Wrangler reports the `china-trip-check` Worker and Custom Domain.
2. Request `https://chinatripcheck.com`, `/checks/readiness`, `/guides`, `/robots.txt`, and `/sitemap.xml`.
3. Confirm HTTPS, the `China Trip Check` brand, canonical URLs, and successful response codes.

If the domain cannot be attached, keep the Worker deployment and report the precise zone or permission blocker. Do not modify unrelated DNS records. If GitHub authentication fails, keep the local deployment commit intact and stop before force-pushing or changing repository history.
