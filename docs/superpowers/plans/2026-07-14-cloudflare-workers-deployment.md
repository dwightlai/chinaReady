# China Trip Check Cloudflare Workers Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Push China Trip Check to `dwightlai/chinaReady`, deploy its complete Next.js application on Cloudflare Workers with OpenNext, and bind `chinatripcheck.com`.

**Architecture:** The repository owns an explicit OpenNext and Wrangler configuration. A local verified build produces `.open-next`, Wrangler publishes that artifact to a `china-trip-check` Worker, and a Custom Domain route attaches the Cloudflare-managed apex domain.

**Tech Stack:** Next.js 16, pnpm, `@opennextjs/cloudflare`, Wrangler 4.68+, Cloudflare Workers, GitHub HTTPS remote.

---

### Task 1: Add reproducible Workers configuration

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `.gitignore`
- Create: `wrangler.jsonc`
- Create: `open-next.config.ts`

- [ ] **Step 1: Install current supported deployment dependencies**

Run:

```powershell
pnpm add @opennextjs/cloudflare@latest
pnpm add -D wrangler@latest
```

Expected: package installation succeeds and Wrangler resolves to version 4.68 or later.

- [ ] **Step 2: Add deployment scripts**

Add these scripts to `package.json`:

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

- [ ] **Step 3: Add explicit Worker and domain configuration**

Create `wrangler.jsonc` with `china-trip-check`, compatibility date `2026-07-14`, `nodejs_compat`, `.open-next` entry/assets, observability, and the `chinatripcheck.com` Custom Domain.

Create `open-next.config.ts` using `defineCloudflareConfig()` with the default cache behavior.

- [ ] **Step 4: Ignore generated deployment state**

Add `.open-next/`, `.wrangler/`, `.dev.vars*`, and `cloudflare-env.d.ts` while retaining an optional `.dev.vars.example` exception.

- [ ] **Step 5: Validate configuration**

Run:

```powershell
pnpm exec wrangler --version
pnpm exec wrangler deploy --dry-run
```

Expected: Wrangler meets the minimum version and validates the configured entry after the OpenNext build.

### Task 2: Verify the Workers artifact

**Files:**
- Verify: `.open-next/worker.js`
- Verify: `.open-next/assets/`

- [ ] **Step 1: Run the existing application verification**

Run:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Expected: every command exits zero, with 55 unit/component and 13 browser tests passing.

- [ ] **Step 2: Build with OpenNext**

Run:

```powershell
pnpm exec opennextjs-cloudflare build
```

Expected: `.open-next/worker.js` and `.open-next/assets` are generated without compatibility errors.

- [ ] **Step 3: Commit deployment configuration**

Run:

```powershell
git add package.json pnpm-lock.yaml .gitignore wrangler.jsonc open-next.config.ts docs/superpowers
git commit -m "chore: configure Cloudflare Workers deployment"
```

### Task 3: Publish the GitHub repository

**Files:**
- External: `https://github.com/dwightlai/chinaReady`

- [ ] **Step 1: Configure the empty repository as origin**

Run:

```powershell
git remote add origin https://github.com/dwightlai/chinaReady.git
git remote -v
```

- [ ] **Step 2: Push tracked history**

Run:

```powershell
git push -u origin master
```

Expected: GitHub `master` points at the deployment configuration commit. Never use force push.

- [ ] **Step 3: Verify remote state**

Run:

```powershell
git ls-remote --heads origin master
```

Expected: the remote hash equals local `master`.

### Task 4: Deploy and bind the domain

**Files:**
- External: Cloudflare Worker `china-trip-check`
- External: Cloudflare Custom Domain `chinatripcheck.com`

- [ ] **Step 1: Authenticate Wrangler**

Run:

```powershell
pnpm exec wrangler whoami
```

If unauthenticated, run `pnpm exec wrangler login`, complete Cloudflare OAuth in the already-open browser, then rerun `whoami`.

- [ ] **Step 2: Deploy the verified artifact**

Run:

```powershell
pnpm deploy
```

Expected: Wrangler publishes `china-trip-check` and attaches the configured Custom Domain without modifying unrelated DNS records.

- [ ] **Step 3: Verify production**

Request the apex homepage, readiness check, guide index, robots, and sitemap over HTTPS. Confirm successful status codes, the public brand, and the canonical domain.

- [ ] **Step 4: Push any deployment-generated tracked fix**

If deployment required a reviewed configuration correction, commit it normally and push `master`. Do not commit generated artifacts or credentials.
