# AGENTS.md — design-resources-hub (live brand: Strata)

## Commands / verification
- `npm run dev` → Vite on http://localhost:5173. `npm run build` runs the `prebuild` codegen first, then `tsc && vite build`. `npm run preview` serves `dist/`.
- Fast check: `npx tsc --noEmit` (strict, passes). `npm run lint` currently **fails** (exit 2): ESLint 8 has no config file in this repo. There is no test script, no test files, and no CI workflow — verify with tsc + build + manual check.
- Run codegen alone with `npx tsx scripts/generate-agent-layer.ts` (no need for a full build).

## Build-generated agent layer
- `scripts/generate-agent-layer.ts` reads `src/data/resources.ts` and **overwrites tracked files**: `public/.well-known/agent.json`, `public/.well-known/agent-card.json`, `public/catalog.json`, `public/agents/index.html`, `public/llms.txt`, `public/llms-full.txt`, and injects `<noscript>` + JSON-LD into **root `index.html`** (replace between `AGENT-NOSCRIPT:START/END`). Expect a dirty git tree after builds; edit the data/generator, not the outputs. The script logs `public/index.html` but actually writes root `index.html`.
- Generated URLs come from `VERCEL_PROJECT_PRODUCTION_URL` → `SITE_URL` → `design-resources-hub.vercel.app`. Set `SITE_URL` for local/preview runs to avoid production links in artifacts.
- `enrichResource()` is duplicated in the generator and `api/a2a.ts`; category defaults must be changed in both. Counts in `llms.txt` and `agents/index.html` are dynamic — treat `src/data/resources.ts` as the source of truth, not generated copy.
- `dist/` is gitignored build output; don't edit it directly.

## Architecture / routing
- React 18 SPA: `src/main.tsx` → `src/App.tsx`. `@/` alias → `src/` in both `vite.config.ts` and `tsconfig.json`. The catalog is static: `src/data/resources.ts` exports `resources`, `categories`, `Category`, `searchResources` and is imported directly by the UI (no fetch).
- `api/a2a.ts` is a Vercel serverless function: POST-only JSON-RPC 2.0 (`message/send`), 4 read-only skills, `OPTIONS` → 204, CORS `*`. It dynamically imports `src/data/resources.ts` at runtime — not `public/catalog.json` — so packaging of that source file matters for deployment.
- `vercel.json` SPA rewrite uses a negative lookahead exempting `/api`, `/.well-known`, `/agents`, `/llms.txt`, `/llms-full.txt`, `/catalog.json`, `/robots.txt`, `/assets`, `/favicon.svg`. Add any new static route here or it will be rewritten to `/index.html`. Vercel project is linked via `.vercel/project.json`.

## Conventions / gotchas
- README is stale: it says "Design Resources Hub", 19 resources, 8 categories. Source/HTML use "Strata", 219 resources, 15 categories. Trust config and source.
- Adding a category requires: `Category` union + `categories[]` in `src/data/resources.ts`, color map in `src/lib/utils.ts`, labels in `src/locales/pt-BR.ts`, plus the hardcoded `agentConsumableCats` / `visualRefCats` lists in the generator and enrichment defaults in both generator and API.
- UI copy lives in `src/locales/pt-BR.ts` despite the English values in that file; some strings are still inline in components.
- Dark mode toggles the `dark` class on `<html>` and persists to localStorage key `darkMode` (`src/components/Header.tsx`, `src/hooks/index.ts`). Tailwind uses `darkMode: 'class'`, but `tailwind.config.js` defines no `dark` color scale — classes like `dark:bg-dark-800/950` emit no CSS. Defined tokens are `background/foreground/card/muted/primary/...` and `*Light` variants.
