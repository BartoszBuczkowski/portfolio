import type { D1Database } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    portfolio_db: D1Database;
  }
}

export {};
