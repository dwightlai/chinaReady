import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// OpenNext's Turbopack bundle can omit server chunks when built on Windows.
// Webpack produces a complete, portable Worker bundle for local and CI deploys.
config.buildCommand = "pnpm exec next build --webpack";

export default config;
