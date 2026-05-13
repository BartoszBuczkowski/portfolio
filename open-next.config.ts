import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// OpenNext runs the package "build" script by default (`pnpm build`). This repo
// uses that script for `opennextjs-cloudflare build`, which would recurse without
// an explicit inner command. See https://opennext.js.org/cloudflare/config
export default {
  ...defineCloudflareConfig({}),
  buildCommand: "pnpm exec next build",
};
