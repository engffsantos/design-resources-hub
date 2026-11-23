# AGENTS.md — design-resources-hub (live brand: Strata)

## Commands / verification
- `npm run dev` → Vite at http://localhost:5173. `npm run build` = `prebuild` codegen → `tsc` → `vite build`; `npm run preview` serves `dist/`. Codegen alone: `npx tsx scripts/generate-agent-layer.ts`.
- `npm run lint` (config `.eslintrc.cjs`) and `npm run typecheck` pass. `npm test` is Vitest watch mode; use `npm run test:run` for a one-shot run, `npx vitest run tests/catalog.test.ts -t "<name>"` for one file/test. Tests are jsdom + globals with `tests/setup.ts` and the `@/` alias.
- **Baseline (2026-11-22): the suite is red — 8/53 tests fail in 5 files.** Count snapshots still assert 219 resources while canonical data now has 316 (15 categories, 3 tracks); several UI/A2A filter tests fail too. Don't assume your change caused these.
- CI (`.github/workflows/ci.yml`): `npm ci → lint → test:run → typecheck → build` (with `SITE_URL` set) `→ git diff --check → rg` checks that ban `bg-dark-|border-dark-` in `src/` and `opacity-0.*group-hover` in `src/components/`. It currently fails at the test step.

## Catalog & generated agent layer
- `src/lib/catalog.ts` is the shared normalization layer imported by the UI, the generator and `api/a2a.ts` (`catalogResources`, `catalogCategories`, `searchCatalog`, `computeStats`, `TRACKS`, `EDITORIAL_IDS`). `src/data/resources.ts` is the raw data source of truth. No runtime data fetching in the UI.
- `scripts/generate-agent-layer.ts` overwrites tracked files: `public/.well-known/agent.json`, `public/.well-known/agent-card.json`, `public/catalog.json`, `public/agents/index.html`, `public/llms.txt`, `public/llms-full.txt`, and rewrites root `index.html` between `AGENT-NOSCRIPT:START/END` and `AGENT-JSONLD:START/END` markers. Expect a dirty tree after builds; edit data/generator, not outputs. `dist/` is gitignored.
- Generated URLs: `VERCEL_PROJECT_PRODUCTION_URL` → `SITE_URL` → `design-resources-hub.vercel.app`. Set `SITE_URL` locally to avoid production links. Artifact timestamps come from `SOURCE_DATE_EPOCH` or the last commit touching `src/data/resources.ts` (never wall clock) so builds are byte-identical.
- Metadata policy: declared values are preserved; absent values stay unknown/null — never inferred from a category (enforced by catalog layer, generator and API). Category readiness in generated artifacts is derived from each resource's `agentConsumable`, not a hardcoded category list.

## Architecture / routing
- React 18 SPA: `src/main.tsx` → `src/App.tsx`; `@/` → `src/` in vite, tsconfig and vitest. Search/filter/track state is shareable in the URL (`src/hooks/useCatalogUrlState.ts`).
- `api/a2a.ts` is a Vercel serverless function: POST-only JSON-RPC 2.0 `message/send`, 4 read-only skills, `OPTIONS` → 204, CORS `*`. It imports the `src/lib/catalog.ts` source via `.js`-suffixed ESM paths at runtime — keep that source packaged for deployment.
- `vercel.json` SPA rewrite uses a negative lookahead exempting `/api`, `/.well-known`, `/agents`, `/llms.txt`, `/llms-full.txt`, `/catalog.json`, `/robots.txt`, `/assets`, `/favicon.svg`. Add any new static route here or it will be rewritten to `/index.html`. Vercel project linked via `.vercel/project.json`.

## Conventions / gotchas
- README is stale ("Design Resources Hub", 19 resources, 8 categories), and count-snapshot tests are stale too. Trust `src/data/resources.ts` + `src/lib/catalog.ts`.
- Adding a category: `Category` union + `categories[]` in `src/data/resources.ts`; color in `getCategoryColor()` (`src/lib/utils.ts`); `categoryIds` in a `TRACKS` entry (`src/lib/catalog.ts`); labels in both `ptBR` and `en` in `src/locales/index.ts` (`src/locales/pt-BR.ts` is a deprecated re-export). Add to `EDITORIAL_IDS` only if it belongs in the homepage shortlist.
- UI copy lives in `src/locales/index.ts` via `useI18n()`; a few strings are still inline in components.
- Theme via `src/context/ThemeContext.tsx`: `light|dark|system`, persisted under localStorage key `strata-theme`, toggles the `dark` class on `<html>`. Tailwind uses `darkMode: 'class'` but defines no `dark` color scale — `dark:bg-dark-800/950` emits no CSS. Use semantic tokens (`background/foreground/card/muted/primary/...` from `src/styles/globals.css`); CI bans the deprecated `bg-dark-`/`border-dark-` classes.
