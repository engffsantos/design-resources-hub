# Strata — decisões de curadoria dos 37 candidatos + descobertas

Legenda: ADD (integrado), ENRICH, REVIEW, REJECT, DEFER. `reviewStatus=verified` é pré-requisito para ADD.

| # | candidato | categoria | decisão | score | motivo |
|---|---|---|---|---|---|
| 1 | Prompt Engineering Guide | ai-prompts | ADD | 0.861 | Distinct entity from the existing OpenAI prompt guide; verified official site and MIT repository. |
| 2 | OpenAI Cookbook | ai-prompts | ADD | 0.925 | First-party, actively maintained examples; complements but does not duplicate the OpenAI guide entry. |
| 3 | One Page Love | landings | ADD | 0.824 | Distinct gallery with primary-source evidence of free browsing and premium templates. |
| 4 | Lapa Ninja | landings | REVIEW | 0.446 | Site answered with a bot-protection challenge; no primary evidence for content, pricing or license. Not promoted. |
| 5 | Ark UI | components | ADD | 0.916 | Cross-framework accessible primitives not yet represented; license and activity verified. |
| 6 | React Spectrum | components | ADD | 0.92 | Implementation library with documented a11y behavior; primary source verified. |
| 7 | Theatre.js | motion | ADD | 0.827 | Unique timeline-based motion workflow with verified license; maintenance risk recorded in pendings. |
| 8 | Anime.js | motion | ADD | 0.894 | Established animation engine with verified license and recent activity. |
| 9 | Rive | motion | ADD | 0.926 | Distinct agent-native motion tool with primary-source pricing and mechanism evidence. |
| 10 | AutoAnimate | micro-interactions | ADD | 0.901 | Fills micro-interaction utility gap with verified license and multi-framework adapters. |
| 11 | Atropos | micro-interactions | ADD | 0.849 | Distinct micro-interaction primitive with explicit license evidence on the official site. |
| 12 | Fontsource | typography | ADD | 0.901 | Self-hosting workflow distinct from font discovery catalogs; license scope explicitly bounded. |
| 13 | Bunny Fonts | typography | REVIEW | 0.6 | Typography asset licenses must be verified per family; accessible primary source did not provide that evidence. |
| 14 | Google Fonts | typography | ADD | 0.932 | Canonical font discovery source with explicit open-source statement and machine-readable CSS API. |
| 15 | Pttrns | ux-flows | ADD | 0.814 | URL and product validated with an explicit free-access statement on the primary source. |
| 16 | SaaSUI | ux-flows | ADD | 0.823 | Validated URL/product with a distinct SaaS pattern corpus; pricing left unknown per policy. |
| 17 | SaaSFrame | ux-flows | ADD | 0.858 | URL and product validated with explicit pricing; complements existing UX-flow sources. |
| 18 | Storybook | libraries | ADD | 0.946 | Missing foundational frontend workshop with explicit primary-source pricing/license evidence. |
| 19 | FilePond | libraries | ADD | 0.884 | Distinct upload utility with verified license and active maintenance. |
| 20 | OSV Scanner | security | ADD | 0.935 | First-party scanner with verified license and machine-readable CLI; fills supply-chain gap. |
| 21 | Trivy | security | REJECT | 0.826 | Exact ID/URL/repo match with the existing catalog record; no new verified canonical field to apply. |
| 22 | zizmor | security | ADD | 0.916 | Focused CI static-analysis tool with verified license and recent activity. |
| 23 | OpenSSF Scorecard | security | ADD | 0.941 | Authoritative supply-chain scoring project with verified license and structured output. |
| 24 | skills.sh | agent-skills | ADD | 0.914 | Registry/discovery layer distinct from individual skill collections already catalogued. |
| 25 | Anthropic Skills | agent-skills | ADD | 0.923 | Canonical reference implementation/specification, distinct from third-party skill lists. |
| 26 | agent-browser | agent-skills | ADD | 0.925 | Explicit agent-facing CLI with primary-source license and activity evidence. |
| 27 | AG-UI Protocol | mcp-protocols | ADD | 0.936 | Distinct protocol with verified license and official scope documentation. |
| 28 | A2UI Protocol | mcp-protocols | ADD | 0.941 | Agent-facing UI protocol with verified license; semantic boundaries explicitly documented. |
| 29 | Arize Phoenix | agent-infra | ADD | 0.925 | High-value observability/evaluation entry with explicitly bounded license and pricing evidence. |
| 30 | DeepEval | agent-infra | ADD | 0.918 | Verified programmatic evaluation framework with distinct pytest-native workflow. |
| 31 | Deep Agents | agent-infra | ADD | 0.916 | Agent harness with verified license and dedicated documentation. |
| 32 | json-render | agent-infra | ADD | 0.912 | Explicit agent-facing generative UI mechanism with verified license. |
| 33 | Tabler Icons | icons-assets | ADD | 0.925 | High-value icon set with explicit license evidence; strengthens a smaller category. |
| 34 | Iconify | icons-assets | ADD | 0.923 | Distinct universal icon framework with explicit project-vs-asset license scope. |
| 35 | Carbon Design System | design-systems | ADD | 0.936 | Canonical enterprise design system with repository-based license and activity evidence. |
| 36 | Fluent 2 | design-systems | ADD | 0.921 | Major design system absent from catalog with verified site and MIT license. |
| 37 | Adobe Spectrum | design-systems | ADD | 0.9 | Design-system guidelines complement the React implementation entry; primary source verified. |
| 38 | Amsterdam Design System | design-systems | DEFER | 0.521 | Discovered via search but no primary-source license/maintainer verification performed; no automatic addition. |
| 39 | SkillMD | agent-skills | DEFER | 0.512 | Discovery-only result; needs primary-source verification before any catalog action. |
| 40 | Gentleface Icons | icons-assets | DEFER | 0.547 | Search-discovered MIT claim not yet confirmed on the official site/license file. |

ADD=34, REVIEW=2, REJECT=1, DEFER=3
