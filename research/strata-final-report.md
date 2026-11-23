# MISSÃO STRATA — relatório final verificável (2026-11-22)

**Resultado: COMPLETE.** Nenhum gate P0 de integridade ou proveniência ficou vermelho. Todos os comandos abaixo foram executados no working tree real; nenhum resultado foi inferido. Nenhum commit, push, merge, PR ou deploy foi realizado.

---

## 1. Baseline do repositório

| Item | Valor observado |
|---|---|
| Branch / HEAD | `main` / `a59cc68d731a1c5c6447d2768b01af2299ca9123` |
| Working tree no início | sujo: `src/data/resources.ts` com 316 recursos, 15 categorias declaradas / 14 usadas, `agent-infra` = 0, 12 IDs do HEAD ausentes, 108 IDs novos, IDs/URLs duplicados |
| HEAD | 219 recursos, 15 categorias, 3 trilhas, 85 preços desconhecidos |
| Testes no início | vermelho: 8/53 falhas em 5 arquivos (snapshots de contagem 219 vs. dados canônicos 316) |
| Alterações preexistentes | preservadas; nada foi restaurado, descartado ou sobrescrito automaticamente |

**Reconciliação P0 (aprovada pelo usuário, documentada em `research/strata-reconciliation.md`):** 5 renames com alias e prova de equivalência (`aider-coding-agent→aider`, `biome→biome-tool`, `browserbase-stagehand→stagehand`, `langfuse→langfuse-tool`, `openhands-agent→openhands`), 7 IDs restaurados verbatim do HEAD (`arcjet`, `better-auth`, `gitleaks`, `mobbin`, `oxc`, `refero-design`, `semgrep`), os 7 recursos de `agent-infra` restaurados na categoria original e 4 merges de duplicatas (`react-bits`, `magic-ui-lib`, `landing-love-ux`, `promptfoo-tool`). Após P0: 319 recursos, 319 IDs únicos, 15/15 categorias, `agent-infra` = 7, `uncoveredHeadIds: []`, `brokenAliases: []`, `duplicateUrls: []`.

Riscos registrados: working tree sujo (isolamento usado para build/generator), snapshots obsoletos (corrigidos por invariantes dinâmicos, não por bump de número), e metadados ausentes que não devem ser inferidos.

---

## 2. Mapa da pesquisa

Matriz completa das 15 categorias em `research/strata-research-map.md`. Famílias de fontes independentes:

- **Descoberta:** Exa `web_search_exa` — apenas para encontrar candidatos, nunca como prova de licença/preço.
- **Fonte primária 1 (site/docs oficial):** `curl https://r.jina.ai/<URL>` no domínio oficial; excertos curtos em `/tmp/opencode/web/` (39 arquivos).
- **Fonte primária 2 (metadados de repositório):** GitHub REST API via `gh api` — licença SPDX, `pushed_at`, `archived`, homepage; em `/tmp/opencode/gh-metadata.tsv` e `gh-metadata2.tsv`.
- **Cruzamento local:** `catalog-crosscheck.json`, `alias-check.json`, `/tmp/opencode/verify-p0.ts`.

Nenhum código/pacote/skill/MCP server de terceiros foi executado. Tendências relevantes: consolidação de registries de skills (`skills.sh`, `anthropics/skills`), proliferação de protocolos de UI generativa com fronteiras semânticas distintas (AG-UI ≠ A2UI ≠ MCP ≠ A2A), e forte presença de scanners de supply chain com saída legível por máquina. `agent-templates` foi pesquisada e não produziu candidato qualificado nesta passagem.

---

## 3. Matriz de 37 candidatos

Ficha completa (campos, evidências, scores por dimensão) em `research/strata-candidates.jsonl`, `research/strata-evidence.md` e `research/strata-decisions.md`.

| Decisão | Qtd. | Candidatos |
|---|---|---|
| **ADD** | 34 | Prompt Engineering Guide, OpenAI Cookbook, One Page Love, Ark UI, React Spectrum, Theatre.js, Anime.js, Rive, AutoAnimate, Atropos, Fontsource, Google Fonts, Pttrns, SaaSUI, SaaSFrame, Storybook, FilePond, OSV Scanner, zizmor, OpenSSF Scorecard, skills.sh, Anthropic Skills, agent-browser, AG-UI Protocol, A2UI Protocol, Arize Phoenix, DeepEval, Deep Agents, json-render, Tabler Icons, Iconify, Carbon Design System, Fluent 2, Adobe Spectrum |
| **REVIEW** | 2 | Lapa Ninja (Cloudflare challenge; sem evidência primária de conteúdo/licença/preço), Bunny Fonts (licença por família de fonte não verificável na página acessível) |
| **REJECT** | 1 | Trivy (ID/URL/repo idênticos ao registro existente; nenhum campo novo verificado) |
| **DEFER** | 0 | — (os 3 DEFER abaixo são descobertas novas, fora da lista inicial) |

Todos os ADD têm `reviewStatus=verified`, fonte primária por afirmação, `pricing` explícito ou `null`, `agentConsumable` tri-state com mecanismo declarado e score ≥ 0,75. Nenhum GitHub público foi tratado como open source sem LICENSE/declaração oficial: Arize Phoenix está registrado como `freemium` com licença **Elastic-2.0 (não OSI)** e escopo/hosted cost separados; Anthropic Skills tem escopo parcial (sem LICENSE root); Fontsource/Iconify separam licença do projeto da licença dos ativos.

---

## 4. Novos candidatos descobertos fora da lista

| Candidato | Categoria | Decisão | Motivo |
|---|---|---|---|
| Amsterdam Design System | design-systems | **DEFER** | Apenas resultado de busca; licença/mantenedor não verificados na fonte primária |
| SkillMD | agent-skills | **DEFER** | Alegação de registry "open, verified" não confirmada na fonte primária |
| Gentleface Icons | icons-assets | **DEFER** | Afirmação MIT obtida só do excerpt de busca; não confirmada no site/LICENSE |

Nenhum foi adicionado ao catálogo.

---

## 5. Inventário antes/depois

"Antes" = após reconciliação P0, imediatamente antes dos lotes de curadoria. "Depois" = estado final.

| Dimensão | Antes | Depois |
|---|---|---|
| Total | 319 | **353** (+34) |
| IDs únicos / URLs duplicadas | 319 / 0 | 353 / 0 |
| Categorias usadas / declaradas | 15 / 15 | 15 / 15 |

**Por categoria:** ai-prompts 28→30, motion 19→22, micro-interactions 9→11, landings 10→11, components 32→34, typography 19→21, ux-flows 18→21, libraries 48→50, security 16→19, agent-skills 22→25, mcp-protocols 51→53, agent-infra 7→11, icons-assets 4→6, design-systems 3→6, agent-templates 33→33.

**Por trilha:** design-ui 114→132, ai-agents 141→152, dev-tools 64→69.

**Por preço:** open-source 156→183, free 39→41, freemium 39→43, unknown/null 85→86 (o único novo desconhecido é SaaSUI, sem preço afirmado na fonte primária).

**Cobertura de metadados:** `whenToUse` 234→268, `stack` 197→231, `resourceType` 234→268, `repoUrl` 164→192, `agentConsumable` (tri-state preenchido) 234→267. Ausências permanecem `unknown`/`null`; nenhum fallback inventado.

---

## 6. Deduplicação

- Aliases P0 validados por repo/URL idênticos; `aliasCoverage: true`, `brokenAliases: []`.
- Trivy: REJECT por ID/URL/repo idênticos — nenhum segundo registro criado.
- Adobe Spectrum vs. React Spectrum: mesma família de repositório (`adobe/react-spectrum`), mantidos como superfícies distintas (guidelines de design system vs. biblioteca de componentes), com risco registrado.
- SaaSUI vs. SaaSFrame: corpus e modelo de preço distintos; mantidos separados.
- `skills.sh` mantido distinto das coleções de skills individuais já catalogadas.
- AG-UI, A2UI, A2A e MCP descritos como protocolos diferentes; nenhum afirmado como implementação de outro.
- 4 merges de duplicatas do working tree pré-missão documentados em `research/strata-reconciliation.md`.
- Nenhuma URL canônica duplicada no estado final (`duplicateUrls: 0`).

---

## 7. Mudanças realizadas

| Arquivo:linha | Mudança | Causa | Testes / impacto |
|---|---|---|---|
| `src/data/resources.ts:2960-3460` | 34 registros ADD inseridos em 14 lotes por categoria, com marcador `[curadoria 2026-11-22]` | Expansão validada por evidência primária | Validação após cada lote: IDs/URLs únicos, 15 categorias, `agent-infra` preservado, typecheck |
| `research/strata-candidates.jsonl` | 40 fichas (37 + 3 descobertas) com campos completos | Requisito de staging e auditoria | N/A (manifesto separado do schema canônico) |
| `research/strata-evidence.md` | Afirmações por candidato com sourceUrl, tipo, publisher, confidence, conflictStatus | Rastreabilidade claim-level | N/A |
| `research/strata-decisions.md` | Matriz de decisões e scores | Gate de promoção | N/A |
| `research/strata-reconciliation.md` | Decisões P0 aprovadas | Gate P0 | `tests/catalog.test.ts:26-35` |
| `research/strata-research-map.md` | Matriz das 15 categorias | Protocolo de cobertura do Passo 1 | N/A |
| `tests/catalog.test.ts:26-59` | Invariantes dinâmicos substituindo contagens fixas; proteção de IDs/categorias P0 | Baseline vermelho por snapshots 219/316; corrigir a causa, não mascarar | `npm run test:run` verde |
| `tests/a2a.test.ts:10,95-103` | `unknownPricing` derivado de `computeStats()` | Evitar número hardcoded 85 | 53/53 testes |
| `tests/app.test.tsx`, `tests/generated-artifacts.test.ts`, `tests/second-pass.test.tsx` | Contagens/paginação derivadas da fonte canônica | Mesmo baseline obsoleto | Build + testes verdes |
| `index.html:30-76`, `public/{catalog.json,llms.txt,llms-full.txt,agents/index.html,.well-known/*}` | Regenerados a partir de 353 recursos | Paridade da camada agent-facing | 353 IDs em `catalog.json`, `llms-full.txt` e `/agents`; conjuntos idênticos |

Nenhuma interface, contrato de API, union de `resourceType` ou taxonomy foi alterada.

---

## 8. Compatibilidade A2A/LLM

Resultados reais de `handleA2ARequest` sobre o estado final:

| Consulta | Estado | Resultado |
|---|---|---|
| `search_resources: tailwind` | `completed` | `(20 de 353)`, exemplos `21st-magic-mcp`, `aceternity-ui` |
| `search_resources: pricing:open-source track:ai-agents limit:2` | `completed` | `(2 de 353)`, `a2a-official-samples`, `addyosmani-agent-skills` |
| `search_resources: pricing: open-source track: ai-agents limit: 2` | `completed` | `(2 de 353)`, mesmos IDs — variante com espaços funciona |
| `get_resource_details: arize-phoenix` | `completed` | ID, URL, categoria `agent-infra`, trilha `ai-agents` |

`agent-card` expõe as 4 skills (`list_categories`, `filter_by_category`, `search_resources`, `get_resource_details`). Artefatos: `catalog.json` 353 recursos com IDs idênticos à fonte canônica; `llms-full.txt` 353 headings com o mesmo conjunto de IDs; `/agents` 353 URLs canônicas válidas. Determinismo: duas gerações consecutivas no clone isolado produziram SHA-256 idênticos para os 5 artefatos (`/tmp/opencode/hashes-before.txt` = `hashes-after.txt`). Busca permanece compacta (20 resultados padrão) com detalhes progressivos.

---

## 9. Gates

| Comando | Resultado |
|---|---|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run test:run` | **Test Files 10 passed (10) / Tests 53 passed (53)** |
| `npm run build` (clone isolado, `SITE_URL` definido) | exit 0 — 1849 módulos, `✓ built in 2.00s` |
| `npx tsx scripts/generate-agent-layer.ts` (isolado) | 353 recursos em 15 categorias (254 featured), 86 preços desconhecidos |
| `git diff --check` | limpo |
| `rg -n 'bg-dark-\|border-dark-' src/` | nenhum resultado |
| `rg -n 'opacity-0.*group-hover' src/components/` | nenhum resultado |
| Verificação P0/identidade/artefatos/A2A (`/tmp/opencode/final-audit.ts`) | exit 0; `uncovered: []`, `aliasCoverage: true`, paridade 353/353/353 |

Divergências encontradas e corrigidas na causa: 2 testes ainda assinalavam `unknownPricing = 85` após o aumento do catálogo; passaram a derivar o valor de `computeStats()`/`rawResources`. Nenhum teste foi removido ou excluído.

---

## 10. Pendências e aprovações

- **REVIEW (não promovidos):** Lapa Ninja (bloqueio bot/Cloudflare) e Bunny Fonts (licença de ativos por família não verificada).
- **DEFER (não promovidos):** Amsterdam Design System, SkillMD, Gentleface Icons.
- **Riscos registrados nos registros:** Theatre.js sem push desde 2024-08-14; Arize Phoenix sob Elastic-2.0 com restrição de hosted service; Anthropic Skills com licença parcial/sem LICENSE root; Fontsource e Iconify exigem verificação da licença de cada família/set; SaaSUI com preço `null`; skills de terceiros exigem revisão individual antes de instalação; automação de browser exige sandboxing; exports gratuitos do Rive exibem splash screen.
- **Decisões aprovadas pelo usuário:** 5 renames com aliases, restauração dos 7 IDs do HEAD, restauração de `agent-infra`, merges de duplicatas, aplicação do patch P0 e execução direta da pesquisa (sem dependência dos recruits Maestri, que atingiram limite de quota).
- **Deploy:** não autorizado e não executado. Recheque automatizado de domínios/licenças/preços não ativado (requer autorização específica).

---

## 11. Git final

- Branch: `main` · HEAD: `a59cc68d731a1c5c6447d2768b01af2299ca9123` (inalterado).
- `git diff --stat`: 12 arquivos modificados, 14783 inserções, 2539 remoções.
- `git status --short`: `M AGENTS.md`, `M index.html`, `M public/agents/index.html`, `M public/catalog.json`, `M public/llms-full.txt`, `M public/llms.txt`, `M src/data/resources.ts`, `M tests/a2a.test.ts`, `M tests/app.test.tsx`, `M tests/catalog.test.ts`, `M tests/generated-artifacts.test.ts`, `M tests/second-pass.test.tsx`; untracked: `PROMPT_EXPANSAO_CATALOGO_STRATA_2026-11-22.md`, `research/`.
- `git diff --check`: limpo.
- **Confirmação explícita:** nenhum `commit`, `push`, `merge`, PR ou `deploy` foi realizado. Nenhuma alteração preexistente foi descartada. Todos os arquivos gerados foram atualizados apenas a partir da fonte canônica em cópia isolada e sincronizados de forma revisável.
