# Portfolio

Personal portfolio site built with [Next.js](https://nextjs.org), [next-intl](https://next-intl.dev), and [Tailwind CSS](https://tailwindcss.com). The contact flow uses [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/), persists submissions to [Cloudflare D1](https://developers.cloudflare.com/d1/), and is deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [OpenNext for Cloudflare](https://opennext.js.org/cloudflare).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/)

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` for local Next.js development, or use [`.dev.vars`](https://developers.cloudflare.com/workers/testing/local-development/) for secrets when running Wrangler / OpenNext preview.

| Variable | Scope | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical site URL without a trailing slash (e.g. `https://bartoszbuczkowski.pl`). **Required for production builds** — powers canonical URLs, hreflang, sitemap, and Open Graph absolute URLs. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public | Turnstile widget site key from the Cloudflare dashboard. |
| `TURNSTILE_SECRET_KEY` | Server only | Turnstile secret for server-side `siteverify`. In production, set with `pnpm exec wrangler secret put TURNSTILE_SECRET_KEY`. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Public | Optional. LinkedIn profile URL for JSON-LD `sameAs`. |
| `NEXT_PUBLIC_GITHUB_URL` | Public | Optional. GitHub profile URL for JSON-LD `sameAs`. |
| `NEXT_PUBLIC_TWITTER_URL` | Public | Optional. Twitter/X profile URL for JSON-LD `sameAs`. |
| `NEXT_PUBLIC_TWITTER_HANDLE` | Public | Optional. Twitter handle for Open Graph/Twitter card metadata. |
| `GOOGLE_SITE_VERIFICATION` | Server | Optional. Google Search Console HTML tag verification value. |

D1 is configured in [`wrangler.toml`](./wrangler.toml) (`portfolio_db` binding), not in `.env`.

## Install

```bash
pnpm install
```

## Local development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). `initOpenNextCloudflareForDev` in [`next.config.ts`](./next.config.ts) wires Cloudflare bindings (including D1) into the Next dev server when Wrangler is available.

To exercise the same runtime as production (Workers), build and preview:

```bash
pnpm preview
```

## Lint and format

```bash
pnpm lint
pnpm format
```

## Cloudflare D1

1. Create a database (once per account / name):

   ```bash
   pnpm exec wrangler d1 create portfolio-db
   ```

2. Put the printed `database_id` into [`wrangler.toml`](./wrangler.toml) under `[[d1_databases]]` (replace `REPLACE_WITH_WRANGLER_D1_CREATE_OUTPUT`).

3. Apply migrations:

   ```bash
   pnpm exec wrangler d1 migrations apply portfolio-db --local
   pnpm exec wrangler d1 migrations apply portfolio-db --remote
   ```

   Use `--local` for the local D1 used by `pnpm dev` / `pnpm preview`, and `--remote` for the hosted database before or after deploy.

## Deploy to Cloudflare Workers

1. Log in with Wrangler if you have not already: `pnpm exec wrangler login`.
2. Set `NEXT_PUBLIC_SITE_URL` for production (already in [`wrangler.toml`](./wrangler.toml) `[vars]` — change if your canonical domain differs). Use the **apex** URL without `www` and without a trailing slash.
3. In Cloudflare **DNS / Workers custom domains**: attach both `bartoszbuczkowski.pl` and `www.bartoszbuczkowski.pl` to the Worker, **or** add a **Redirect Rule** `www.bartoszbuczkowski.pl/*` → `https://bartoszbuczkowski.pl/$1` (301). Without this, `https://www.…/sitemap.xml` returns 522.
4. Set the Turnstile secret on the Worker: `pnpm exec wrangler secret put TURNSTILE_SECRET_KEY`.
5. Deploy:

   ```bash
   pnpm deploy
   ```

This runs `opennextjs-cloudflare build` (which runs `next build`) and then deploys the Worker.

On **Windows**, OpenNext may fail during the copy step with `EPERM` when creating symlinks unless [Developer Mode](https://learn.microsoft.com/en-us/windows/apps/get-started/enable-your-device-for-development) is enabled or you build inside **WSL**. CI and Cloudflare’s remote build environment are unaffected.

Optional: regenerate binding types after changing `wrangler.toml`:

```bash
pnpm cf-typegen
```

## Project structure (high level)

- `app/` — App Router routes and [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) (for example `app/actions/contact.ts`).
- `components/` — React components, including the contact form and footer CTA modal.
- `migrations/` — D1 SQL migrations.
- `wrangler.toml` — Worker name, assets, D1 binding, and compatibility flags for OpenNext.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
