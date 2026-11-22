#!/usr/bin/env node
/**
 * generate-agent-layer.ts
 * Build-time generator for Strata's A2A / LLM discovery artifacts.
 *
 * It consumes the same canonical normalization layer used by the UI and by
 * api/a2a.ts. Unknown metadata is emitted as unknown — never inferred from a
 * category or replaced by generic placeholders.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  catalogResources,
  catalogCategories,
  computeStats,
  EDITORIAL_IDS,
  TRACKS,
  type CatalogResource,
} from '../src/lib/catalog';

type NormalizedResource = CatalogResource;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const AGENT_NOSCRIPT_START = '<!-- AGENT-NOSCRIPT:START -->';
const AGENT_NOSCRIPT_END = '<!-- AGENT-NOSCRIPT:END -->';
const AGENT_JSONLD_START = '<!-- AGENT-JSONLD:START -->';
const AGENT_JSONLD_END = '<!-- AGENT-JSONLD:END -->';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSiteUrl(): string {
  const u = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.SITE_URL || 'design-resources-hub.vercel.app';
  return u.startsWith('http') ? u : 'https://' + u;
}

/**
 * Reproducible build time: an explicit SOURCE_DATE_EPOCH wins, otherwise the
 * commit that last changed the canonical data file. Never the wall clock.
 */
function getUpdatedAt(): string {
  const epoch = process.env.SOURCE_DATE_EPOCH;
  if (epoch && /^\d+$/.test(epoch)) return new Date(Number(epoch) * 1000).toISOString();
  try {
    const committed = execFileSync(
      'git', ['log', '-1', '--format=%cI', '--', 'src/data/resources.ts'],
      { cwd: projectRoot, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    if (committed) return new Date(committed).toISOString();
  } catch {
    // Deploy builds may not ship .git; a fixed epoch keeps output byte-stable.
  }
  return new Date(0).toISOString();
}

function display(value: string | null | undefined, fallback = 'Not specified'): string {
  return value && value.trim() ? value : fallback;
}

function main() {
  const normalizedResources: NormalizedResource[] = catalogResources.map((r) => ({ ...r }));
  const categorySummaries = catalogCategories.map((c) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
    description: c.description,
    count: normalizedResources.filter((r) => r.category === c.id).length,
  }));

  const stats = computeStats(normalizedResources);
  const totalResources = stats.total;
  const totalCategories = stats.categories;
  const featuredCount = stats.featured;
  const freeMcpCount = normalizedResources.filter((r) => r.tags.includes('free-mcp')).length;
  const agentTemplateCount = normalizedResources.filter((r) => r.category === 'agent-templates').length;
  const archetypeTags = [
    'template-starter', 'template-research', 'template-multi-agent', 'template-coding',
    'template-browser', 'template-voice', 'template-ui', 'template-local',
  ];
  const archetypeCounts = Object.fromEntries(
    archetypeTags.map((tag) => [tag, normalizedResources.filter((r) => r.tags.includes(tag)).length]),
  );
  const siteUrl = getSiteUrl();
  const updatedAt = getUpdatedAt();

  const categoriesByConsumable = (value: boolean | undefined) =>
    categorySummaries.filter((c) => normalizedResources.some(
      (r) => r.category === c.id && r.agentConsumable === value,
    ));
  const categoryOrder = (c: { id: string }) => {
    const priority = ['mcp-protocols', 'agent-templates', 'agent-infra', 'agent-skills', 'ai-prompts', 'components', 'libraries', 'security'];
    const index = priority.indexOf(c.id);
    return index < 0 ? priority.length : index;
  };
  const actionableCats = [...categoriesByConsumable(true)].sort((a, b) => categoryOrder(a) - categoryOrder(b));
  const visualRefCats = [...categoriesByConsumable(false)].sort((a, b) => categoryOrder(a) - categoryOrder(b));
  const unknownConsumableCats = categorySummaries.filter((c) =>
    normalizedResources.some((r) => r.category === c.id && r.agentConsumable === undefined),
  );

  console.log(`📚 ${totalResources} resources in ${totalCategories} categories (${featuredCount} featured)`);

  // --- Agent card ---
  const agentCard = {
    name: 'Strata — Design & Agent Engineering Index',
    description: 'Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery. Unknown metadata is reported as unknown.',
    url: siteUrl + '/api/a2a',
    version: '1.2.0',
    provider: { name: 'Strata', url: siteUrl },
    capabilities: { streaming: false, pushNotifications: false },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['application/json', 'text/markdown'],
    authentication: { type: 'none' },
    skills: [
      {
        id: 'list_categories',
        name: 'List Categories',
        description: 'Lists all categories and tracks with resource counts and metadata-governance summary.',
        tags: ['categories', 'list', 'catalog'],
        examples: ['What categories exist?', 'List categories'],
      },
      {
        id: 'filter_by_category',
        name: 'Filter by Category',
        description: 'Returns resources for one or more categories or a full discovery track.',
        tags: ['filter', 'category', 'resources', 'agent-templates'],
        examples: ['Show components for React', 'filter_by_category: agent-templates', 'filter_by_category: design-ui'],
      },
      {
        id: 'search_resources',
        name: 'Search Resources',
        description: 'Weighted search over name, tags, stack, purpose and description. Supports free-mcp, archetype tags, pricing/track/type filters and limit up to 60.',
        tags: ['search', 'query', 'resources', 'free-mcp', 'agent-template'],
        examples: ['Search tailwind', 'search_resources: free-mcp', 'search_resources: mcp database limit: 60', 'search_resources: template-voice', 'search_resources: pricing: open-source track: ai-agents'],
      },
      {
        id: 'get_resource_details',
        name: 'Get Resource Details',
        description: 'Returns full declared metadata and provenance for one resource by id or name.',
        tags: ['details', 'resource', 'metadata'],
        examples: ['Get details for getlayers', 'get_resource_details: mcp-reference-servers'],
      },
    ],
  };

  for (const file of ['.well-known/agent.json', '.well-known/agent-card.json']) {
    fs.writeFileSync(path.join(publicDir, file), JSON.stringify(agentCard, null, 2) + '\n', 'utf-8');
  }

  // --- catalog.json ---
  const catalogJson = {
    brand: 'Strata',
    version: '1.2.0',
    updatedAt,
    siteUrl,
    endpoints: {
      '/': siteUrl + '/?q={query}',
      '/agents': siteUrl + '/agents',
      '/llms.txt': siteUrl + '/llms.txt',
      '/llms-full.txt': siteUrl + '/llms-full.txt',
      '/.well-known/agent.json': siteUrl + '/.well-known/agent.json',
      '/api/a2a': siteUrl + '/api/a2a',
    },
    metadataPolicy: {
      rule: 'Declared metadata is preserved; absent metadata remains null/unknown.',
      provenance: ['declared', 'derived-from-url', 'unknown'],
      forbiddenFallbacks: ['category-based pricing', 'generic stack', 'generic when-to-use'],
    },
    categories: categorySummaries,
    tracks: TRACKS.map((t) => ({
      id: t.id,
      label: t.label,
      description: t.description,
      count: stats.byTrack[t.id],
      categoryIds: t.categoryIds,
    })),
    editorialIds: EDITORIAL_IDS,
    freeMcpCount,
    freeMcpQuery: 'search_resources: free-mcp',
    agentTemplateCount,
    agentTemplatesQuery: 'filter_by_category: agent-templates',
    archetypeTags,
    archetypeCounts,
    maxSearchLimit: 60,
    stats: {
      total: stats.total,
      categories: stats.categories,
      featured: stats.featured,
      agentReady: stats.agentReady,
      unknownPricing: stats.unknownPricing,
      byPricing: stats.byPricing,
      byTrack: stats.byTrack,
      metadataCoverage: stats.metadataCoverage,
    },
    resources: normalizedResources.map((r) => ({
      id: r.id,
      name: r.name,
      url: r.url,
      description: r.description,
      category: r.category,
      categoryLabel: r.categoryLabel,
      track: r.track,
      tags: r.tags,
      featured: r.featured,
      resourceType: r.resourceType ?? null,
      whenToUse: r.whenToUse ?? null,
      stack: r.stack ?? [],
      pricing: r.pricing,
      agentConsumable: r.agentConsumable ?? null,
      repoUrl: r.repoUrl ?? null,
      provenance: r.provenance,
    })),
  };

  fs.writeFileSync(path.join(publicDir, 'catalog.json'), JSON.stringify(catalogJson, null, 2) + '\n', 'utf-8');

  // --- Zero-JS agents page ---
  const categoriesHtml = categorySummaries.map((c) => `
    <li>
      <a href="#cat-${c.id}">${escapeHtml(c.label)}</a>
      <span class="count">(${c.count})</span>
    </li>`).join('');

  const resourcesByCategory: Record<string, NormalizedResource[]> = {};
  for (const cat of categorySummaries) {
    resourcesByCategory[cat.id] = normalizedResources.filter((r) => r.category === cat.id);
  }

  const resourcesHtml = categorySummaries.map((c) => {
    const items = resourcesByCategory[c.id];
    return `
    <section id="cat-${c.id}">
      <h2>${escapeHtml(c.label)} <span class="count">(${c.count})</span></h2>
      <ul class="resource-list">
        ${items.map((r) => `
          <li>
            <article>
              <h3><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.name)}</a></h3>
              <p>${escapeHtml(r.description)}</p>
              <div class="tags">${r.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
              <div class="url"><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.url)}</a></div>
              <div class="metadata">
                <span>Price: ${escapeHtml(r.pricing ?? 'unknown')}</span>
                <span>Agent-ready: ${r.agentConsumable === true ? 'yes' : r.agentConsumable === false ? 'no' : 'unknown'}</span>
                <span>Provenance: ${escapeHtml(r.provenance.pricing)}</span>
              </div>
              ${r.featured ? '<span class="badge">Editorial shortlist</span>' : ''}
            </article>
          </li>`).join('')}
      </ul>
    </section>`;
  }).join('');

  const agentsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Strata — Agents',
    description: 'Structured query layer for AI agents (A2A). Zero JS, zero React.',
    url: siteUrl + '/agents',
    inLanguage: ['pt-BR', 'en'],
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalResources,
      itemListElement: normalizedResources.map((r, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'CreativeWork',
          name: r.name,
          description: r.description,
          url: r.url,
          category: r.categoryLabel,
          keywords: r.tags.join(', '),
        },
      })),
    },
  };

  const agentsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Strata — Agents</title>
<meta name="description" content="Structured query layer for AI agents (A2A). Zero JS, zero React." />
<script type="application/ld+json">${JSON.stringify(agentsJsonLd, null, 2)}</script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui,-apple-system,sans-serif; line-height: 1.6; color: #111; background: #fff; padding: 2rem; }
.container { max-width: 900px; margin: 0 auto; }
header { border-bottom: 2px solid #10b981; padding-bottom: 1rem; margin-bottom: 2rem; }
h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
h2 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.75rem; color: #047857; }
ul { list-style: none; padding-left: 0; }
li { margin-bottom: 0.4rem; }
a { color: #047857; text-decoration: none; }
a:hover, a:focus-visible { text-decoration: underline; }
.count { font-size: 0.875rem; color: #444; font-weight: normal; }
.resource-list { margin-left: 1.5rem; }
.resource-list li { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd; }
.resource-list h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
.resource-list p { font-size: 0.95rem; color: #333; margin-bottom: 0.5rem; }
.tags { margin-bottom: 0.5rem; }
.tag { display: inline-block; background: #e5e7eb; color: #1f2937; font-size: 0.8rem; padding: 0.15rem 0.4rem; border-radius: 0.25rem; margin-right: 0.3rem; margin-bottom: 0.2rem; }
.url { font-family: monospace; font-size: 0.85rem; color: #065f46; word-break: break-all; }
.metadata { font-size: 0.8rem; color: #374151; display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.4rem; }
.badge { display: inline-block; background: #fef3c7; color: #78350f; font-size: 0.75rem; padding: 0.1rem 0.4rem; border-radius: 0.25rem; }
.agent-usage { margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; }
.agent-usage ol { padding-left: 1.5rem; }
.agent-usage li { margin-bottom: 0.5rem; }
footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.9rem; color: #374151; }
</style>
</head>
<body>
<div class="container">
<header>
  <h1>Strata — Agents</h1>
  <p>Structured query layer for AI agents (A2A). Zero JS, zero React.</p>
  <p><strong>Agent Card:</strong> <a href="/.well-known/agent.json">/.well-known/agent.json</a> |
  <strong>A2A endpoint:</strong> <code>POST /api/a2a</code> |
  <strong>JSON catalog:</strong> <a href="/catalog.json">/catalog.json</a></p>
</header>
<div class="agent-usage">
  <h2>How AI Agents Should Use Strata</h2>
  <ol>
    <li><strong>Actionable categories (declared agent-ready):</strong> ${actionableCats.map((c) => c.id).join(', ') || 'none'} — directly consumable through the agent endpoints.</li>
    <li><strong>Visual reference categories:</strong> ${visualRefCats.map((c) => c.id).join(', ') || 'none'} — inspiration where resources are explicitly not agent-consumable.</li>
    <li><strong>Categories with undeclared agent-readiness:</strong> ${unknownConsumableCats.map((c) => c.id).join(', ') || 'none'} — no status is assumed.</li>
    <li><strong>Discovery tracks:</strong> ${TRACKS.map((t) => `<code>${t.id}</code> (${stats.byTrack[t.id]})`).join(', ')}.</li>
    <li><strong>Free MCP servers:</strong> ${freeMcpCount} declared with the <code>free-mcp</code> tag — query with <code>search_resources: free-mcp</code>.</li>
    <li><strong>Agent templates:</strong> ${agentTemplateCount} in <code>agent-templates</code> — filter with <code>filter_by_category: agent-templates</code> or by archetype: <code>${archetypeTags.join('</code>, <code>')}</code>.</li>
    <li><strong>Metadata governance:</strong> ${stats.unknownPricing} resources have no declared price. Values are reported as <code>unknown</code>, never inferred.</li>
  </ol>
</div>
<nav><h2>Categories (${totalCategories})</h2><ul>${categoriesHtml}</ul></nav>
<main>
<h2>Resources by Category (${totalResources} total)</h2>${resourcesHtml}
</main>
<footer>
<p>Generated at build time from <code>src/data/resources.ts</code> via the shared canonical catalog layer.<br />
<a href="/llms.txt">llms.txt</a> | <a href="/llms-full.txt">llms-full.txt</a> | <a href="/">Interactive index</a></p>
</footer>
</div>
</body>
</html>`;

  fs.writeFileSync(
    path.join(publicDir, 'agents/index.html'),
    agentsHtml.split('\n').map((line) => line.trimEnd()).join('\n'),
    'utf-8',
  );

  // --- llms.txt ---
  const llmsTxt = `# Strata — Design & Agent Engineering Index

Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.

## Discovery tracks

${TRACKS.map((t) => `- **${t.id}** — ${t.label}: ${stats.byTrack[t.id]} resources across ${t.categoryIds.length} categories.`).join('\n')}

## Free MCP servers

**${freeMcpCount} free/open-source MCP servers** are declared with the \`free-mcp\` tag. Query with \`search_resources: free-mcp limit: 60\`. Subdomain aliases: \`mcp database\`, \`mcp design\`, \`mcp cloud\`, \`mcp coding\`, \`mcp browser\`, \`mcp automation\`, \`mcp proxy\`.

## Agent Templates

**${agentTemplateCount} deployable agent templates** are in the \`agent-templates\` category. Retrieve all with \`filter_by_category: agent-templates\` or \`search_resources: agent-template limit: 60\`. Archetypes: ${archetypeTags.map((tag) => `\`${tag}\` (${archetypeCounts[tag]})`).join(', ')}.

## Metadata governance

- Declared pricing: ${stats.total - stats.unknownPricing} resources.
- Unknown pricing: ${stats.unknownPricing} resources — reported as \`unknown\`, never inferred from category.
- Declared \`whenToUse\`: ${stats.metadataCoverage.whenToUse}.
- Declared \`stack\`: ${stats.metadataCoverage.stack}.
- Declared \`resourceType\`: ${stats.metadataCoverage.resourceType}.
- Declared \`repoUrl\`: ${stats.metadataCoverage.repoUrl} (includes values derived from explicit GitHub URLs; provenance is exposed in \`catalog.json\`).
- Declared \`agentConsumable\`: ${stats.metadataCoverage.agentConsumable}.

## Categories (${totalCategories})

${categorySummaries.map((c) => `- [${c.label}] (${c.count}) resource(s) — ${c.id}`).join('\n')}

## How AI Agents Should Use Strata

### Actionable categories (declared agent-ready)
${actionableCats.map((c) => `- **${c.label}** (${c.count}) — ${c.id}`).join('\n') || '- none'}

### Visual reference categories (declared not agent-ready)
${visualRefCats.map((c) => `- **${c.label}** (${c.count}) — ${c.id}`).join('\n') || '- none'}

### Endpoint selection guide
1. **/?q=...** — human UI with shareable search state.
2. **/llms.txt** — concise machine-readable index.
3. **/llms-full.txt** — complete Markdown dump of all ${totalResources} resources.
4. **/catalog.json** — complete JSON via GET with provenance.
5. **/api/a2a** — JSON-RPC 2.0 POST for filtered queries.

## A2A Examples

### List categories
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"list_categories"}]}},"id":1}

### Filter by category
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"filter_by_category: components"}]}},"id":2}

### Filter all agent templates
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"filter_by_category: agent-templates"}]}},"id":6}

### Search resources
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"search_resources: tailwind"}]}},"id":3}

### Search all free MCP servers
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"search_resources: free-mcp limit: 60"}]}},"id":5}

### Get resource details
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"get_resource_details: mcp-reference-servers"}]}},"id":4}

## Operating mode

Read-only / structured query. No external actions executed.
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

  // --- llms-full.txt ---
  let llmsFull = `# Strata — Complete Catalog

Total resources: ${totalResources}
Categories: ${totalCategories}
Tracks: ${TRACKS.length}
Generated at build-time from src/data/resources.ts
Updated: ${updatedAt}

Metadata rule: declared values are preserved; absent values are printed as "Not specified". No category-based fallback is applied.

`;

  for (const cat of categorySummaries) {
    const items = resourcesByCategory[cat.id];
    llmsFull += `\n## ${cat.label} (${items.length})\n\n`;
    for (const r of items) {
      llmsFull += `### ${r.name} (${r.id})\n`;
      llmsFull += `- **URL**: ${r.url}\n`;
      llmsFull += `- **Track**: ${r.track}\n`;
      llmsFull += `- **Type**: ${display(r.resourceType)}\n`;
      llmsFull += `- **Agent-Consumable**: ${r.agentConsumable === true ? 'Yes' : r.agentConsumable === false ? 'No' : 'Unknown'}\n`;
      llmsFull += `- **Price**: ${r.pricing ?? 'Unknown'}\n`;
      llmsFull += `- **When to use**: ${display(r.whenToUse)}\n`;
      llmsFull += `- **Stack**: ${r.stack?.length ? r.stack.join(', ') : 'Not specified'}\n`;
      llmsFull += `- **Tags**: ${r.tags.join(', ')}\n`;
      llmsFull += `- **Featured**: ${r.featured ? 'Yes' : 'No'}\n`;
      if (r.repoUrl) llmsFull += `- **Repo**: ${r.repoUrl} (${r.provenance.repoUrl})\n`;
      llmsFull += `- **Description**: ${r.description}\n\n`;
    }
  }

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull, 'utf-8');

  // --- index.html: idempotent noscript + JSON-LD markers ---
  const indexPath = path.join(projectRoot, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf-8');

  const noscriptBlock = `${AGENT_NOSCRIPT_START}
<noscript>
  <div style="padding:2rem;max-width:800px;margin:0 auto;font-family:system-ui,sans-serif;line-height:1.6">
    <h1>Strata — Design & Agent Engineering Index</h1>
    <p>Curated design resources, UI libraries, AI prompt packs, security tools and agent skills.</p>
    <p><strong>${totalResources} resources</strong> across <strong>${totalCategories} categories</strong> in <strong>${TRACKS.length} tracks</strong>.</p>
    <h2>Explore without JavaScript</h2>
    <ul>
      <li><a href="/agents">Zero-JS agent catalog</a></li>
      <li><a href="/catalog.json">Structured catalog (JSON)</a></li>
      <li><a href="/llms.txt">LLMs index (Markdown)</a></li>
      <li><a href="/llms-full.txt">Complete catalog (Markdown)</a></li>
      <li><a href="/.well-known/agent.json">A2A agent card</a></li>
    </ul>
    <p style="color:#374151;font-size:0.9rem">Metadata is declared or unknown — never inferred.</p>
  </div>
</noscript>
${AGENT_NOSCRIPT_END}`;

  const rootJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Strata',
    url: siteUrl,
    inLanguage: ['pt-BR', 'en'],
    description: 'Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: siteUrl + '/?q={search_term_string}',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdBlock = `${AGENT_JSONLD_START}
<script type="application/ld+json">${JSON.stringify(rootJsonLd, null, 2)}</script>
${AGENT_JSONLD_END}`;

  indexHtml = replaceBetween(indexHtml, AGENT_NOSCRIPT_START, AGENT_NOSCRIPT_END, noscriptBlock);
  indexHtml = replaceBetween(indexHtml, AGENT_JSONLD_START, AGENT_JSONLD_END, jsonLdBlock);

  if (!indexHtml.includes('rel="alternate" type="application/json" href="/catalog.json"')) {
    indexHtml = indexHtml.replace(
      '<link rel="alternate" type="text/html" href="/agents" />',
      '<link rel="alternate" type="text/html" href="/agents" />\n    <link rel="alternate" type="application/json" href="/catalog.json" />',
    );
  }

  fs.writeFileSync(indexPath, indexHtml, 'utf-8');

  console.log('✅ Agent layer generated from the canonical catalog:');
  console.log('   - public/.well-known/agent.json');
  console.log('   - public/.well-known/agent-card.json');
  console.log('   - public/agents/index.html (zero-JS + JSON-LD)');
  console.log('   - public/llms.txt');
  console.log('   - public/llms-full.txt');
  console.log(`   - public/catalog.json (${totalResources} resources, ${stats.unknownPricing} unknown prices)`);
  console.log('   - index.html (noscript + search JSON-LD)');
}

function replaceBetween(source: string, start: string, end: string, replacement: string): string {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (startIndex >= 0 && endIndex > startIndex) {
    return source.slice(0, startIndex) + replacement + source.slice(endIndex + end.length);
  }
  if (source.includes('</head>') && start === AGENT_JSONLD_START) {
    return source.replace('</head>', `  ${replacement}\n  </head>`);
  }
  return source.replace('</body>', `  ${replacement}\n  </body>`);
}

try {
  main();
} catch (err) {
  console.error('❌ Error:', err);
  process.exit(1);
}
