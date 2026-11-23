# P0 reconciliation — decisions (2026-11-22)

HEAD: a59cc68. Isolated copy only; source of truth remains src/data/resources.ts.

## Accepted renames (alias -> canonical ID)

| HEAD ID | Canonical ID | Equivalence proof |
|---|---|---|
| aider-coding-agent | aider | identical repo https://github.com/Aider-AI/aider |
| biome | biome-tool | identical URL https://biomejs.dev/ |
| browserbase-stagehand | stagehand | identical repo https://github.com/browserbase/stagehand |
| langfuse | langfuse-tool | identical repo https://github.com/langfuse/langfuse |
| openhands-agent | openhands | identical repo https://github.com/All-Hands-AI/OpenHands |

## Restored from HEAD (verbatim, no new metadata)

- arcjet
- better-auth
- gitleaks
- mobbin
- oxc
- refero-design
- semgrep

## agent-infra restored

- vercel-ai-sdk
- mastra
- langgraph
- pydantic-ai
- e2b-sandboxes
- langfuse-tool
- promptfoo

## Duplicate merges (URL + name identity)

- react-bits (2 identical entries) -> one entry; tags union; kept resourceType=library.
- magic-ui-lib -> magic-ui; tags union.
- landing-love-ux -> landing-love; tags union; original category landings preserved.
- promptfoo-tool -> promptfoo; tags union; category restored to agent-infra.
