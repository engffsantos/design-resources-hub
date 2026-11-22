#!/usr/bin/env node
/**
 * generate-agent-layer.ts
 * Build-time script that generates A2A/LLM artifacts from src/data/resources.ts
 * Runs via tsx in prebuild
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
  resourceType?: string;
  whenToUse?: string;
  stack?: string[];
  pricing?: string;
  agentConsumable?: boolean;
  repoUrl?: string;
}

interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface NormalizedResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  featured: boolean;
  resourceType: string;
  whenToUse: string;
  stack: string[];
  pricing: string;
  agentConsumable: boolean;
  repoUrl?: string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const srcDataPath = path.join(projectRoot, 'src/data/resources.ts');
const publicDir = path.join(projectRoot, 'public');

async function loadCatalog() {
  const mod = await import('file://' + srcDataPath);
  return {
    resources: mod.resources || [],
    categories: mod.categories || [],
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJson(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function enrichResource(r: any, catLabel: string, catDesc: string): NormalizedResource {
  const url: string = r.url || '';
  const isGithub = url.includes('github.com/');
  const repoUrl = (r.repoUrl || (isGithub ? url.replace(/\/$/, '') : undefined)) as string | undefined;
  const resourceType = (r.resourceType ||
    (r.category === 'agent-skills' ? 'agent-skill' :
      r.category === 'ai-prompts' ? 'prompt-pack' :
      r.category === 'security' ? 'tool' :
      r.category === 'libraries' ? 'library' :
      ['landings', 'typography', 'motion', 'micro-interactions', 'ux-flows'].includes(r.category)
        ? 'gallery' : 'docs') as string);
  const agentConsumable = r.agentConsumable !== undefined ? r.agentConsumable : ['mcp-protocols', 'agent-infra', 'agent-skills', 'ai-prompts', 'security', 'libraries', 'components'].includes(r.category);
  const pricing = (r.pricing || (r.category === 'agent-skills' || r.category === 'ai-prompts' || r.category === 'libraries' ? 'open-source' : 'free') as string);
  const whenToUse = r.whenToUse || (
    catDesc ? `Curated ${catLabel.toLowerCase()} resource for design and AI builder workflows.`
    : `Design resource from the ${catLabel} category.`
  );
  const stack = r.stack || (['design', 'engineering'].flatMap(s => [s]) as string[]);
  return {
    id: r.id,
    name: r.name,
    url,
    description: r.description,
    category: r.category,
    categoryLabel: catLabel,
    tags: r.tags || [],
    featured: r.featured ?? false,
    resourceType,
    whenToUse,
    stack,
    pricing,
    agentConsumable,
    repoUrl,
  };
}

function getSiteUrl(): string {
  const u = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.SITE_URL || 'design-resources-hub.vercel.app';
  return u.startsWith('http') ? u : 'https://' + u;
}

async function main() {
  console.log('🔄 Loading catalog...');
  const { resources, categories } = await loadCatalog();

  const normalizedResources: NormalizedResource[] = (resources as any[]).map((r) => {
    const catInfo = (categories as any[]).find((c) => c.id === r.category);
    const out = enrichResource(r, catInfo?.label ?? r.category, catInfo?.description ?? '');
    return out;
  });

  const categorySummaries = (categories as any[]).map((c) => ({
    id: c.id,
    label: c.label,
    count: (resources as any[]).filter((r) => r.category === c.id).length,
  }));

  const totalResources = normalizedResources.length;
  const totalCategories = categorySummaries.length;
  const featuredCount = normalizedResources.filter((r) => r.featured).length;
  const freeMcpCount = normalizedResources.filter((r) => r.tags.includes('free-mcp')).length;
  const agentTemplateCount = normalizedResources.filter((r) => r.tags.includes('agent-template')).length;
  const archetypeTags = ['template-starter', 'template-research', 'template-multi-agent', 'template-coding', 'template-browser', 'template-voice', 'template-ui', 'template-local'];
  const archetypeCounts = Object.fromEntries(archetypeTags.map((tag) => [tag, normalizedResources.filter((r) => r.tags.includes(tag)).length]));
  const siteUrl = getSiteUrl();
  const updatedAt = new Date().toISOString();

  const getCategoryGroups = () => {
    const priority = ['mcp-protocols', 'agent-templates', 'agent-infra', 'agent-skills', 'ai-prompts', 'components', 'libraries', 'security'];
    const hasFlag = (categoryId: string, consumable: boolean) => normalizedResources.some(
      (resource) => resource.category === categoryId && resource.agentConsumable === consumable,
    );
    const actionable = categorySummaries.filter((category) => hasFlag(category.id, true));
    const visual = categorySummaries.filter((category) => hasFlag(category.id, false));
    const order = (a: typeof categorySummaries[number], b: typeof categorySummaries[number]) => {
      const ai = priority.indexOf(a.id);
      const bi = priority.indexOf(b.id);
      return (ai < 0 ? priority.length : ai) - (bi < 0 ? priority.length : bi);
    };
    return { actionable: actionable.sort(order), visual: visual.sort(order) };
  };

  console.log(`📚 ${totalResources} resources in ${totalCategories} categories (${featuredCount} featured)`);

  // --- Write .well-known/agent.json (Strata) ---
  const agentCard = {
    name: 'Strata — Design & Agent Engineering Index',
    description: 'Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.',
    url: siteUrl + '/api/a2a',
    version: '1.1.0',
    provider: { name: 'Strata', url: siteUrl },
    capabilities: { streaming: false, pushNotifications: false },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['application/json', 'text/markdown'],
    authentication: { type: 'none' },
    skills: [
      { id: 'list_categories', name: 'List Categories', description: 'Lists all available design and agent categories with resource counts.', tags: ['categories', 'list', 'catalog'], examples: ['What categories exist?', 'List categories'] },
      { id: 'filter_by_category', name: 'Filter by Category', description: 'Returns resources for one or more categories, including agent-templates (deployable starter kits).', tags: ['filter', 'category', 'resources', 'agent-templates'], examples: ['Show components for React', 'Filter by mcp-protocols', 'Filter by agent-infra', 'filter_by_category: agent-templates'] },
      { id: 'search_resources', name: 'Search Resources', description: 'Searches by name, description, tags or category. Supports free-mcp, mcp-{database,design,cloud,coding,browser,automation} and agent-template archetype aliases (template-starter, template-research, template-multi-agent, template-coding, template-browser, template-voice, template-ui, template-local) with a limit of up to 60.', tags: ['search', 'query', 'resources', 'free-mcp', 'agent-template'], examples: ['Search tailwind', 'Find prompt packs', 'search_resources: free-mcp', 'search_resources: mcp database limit: 60', 'search_resources: template-voice', 'search_resources: agent-template limit: 60'] },
      { id: 'get_resource_details', name: 'Get Resource Details', description: 'Returns full metadata for one resource by id or name.', tags: ['details', 'resource', 'metadata'], examples: ['Get details for getlayers', 'Tell me about sceneai.art'] },
    ],
  };

  fs.writeFileSync(path.join(publicDir, '.well-known/agent.json'), JSON.stringify(agentCard, null, 2) + '\n', 'utf-8');
  fs.writeFileSync(path.join(publicDir, '.well-known/agent-card.json'), JSON.stringify(agentCard, null, 2) + '\n', 'utf-8');

  // --- Write catalog.json ---
  const catalogJson = {
    brand: 'Strata',
    version: '1.1.0',
    updatedAt,
    siteUrl,
    endpoints: {
      '/agents': siteUrl + '/agents',
      '/llms.txt': siteUrl + '/llms.txt',
      '/llms-full.txt': siteUrl + '/llms-full.txt',
      '/.well-known/agent.json': siteUrl + '/.well-known/agent.json',
      '/api/a2a': siteUrl + '/api/a2a',
    },
    categories: categorySummaries,
    freeMcpCount,
    freeMcpQuery: 'search_resources: free-mcp',
    agentTemplateCount,
    agentTemplatesQuery: 'filter_by_category: agent-templates',
    archetypeTags,
    archetypeCounts,
    maxSearchLimit: 60,
    resources: normalizedResources.map((r) => ({
      id: r.id,
      name: r.name,
      url: r.url,
      description: r.description,
      category: r.category,
      categoryLabel: r.categoryLabel,
      tags: r.tags,
      featured: r.featured,
      resourceType: r.resourceType,
      whenToUse: r.whenToUse,
      stack: r.stack,
      pricing: r.pricing,
      agentConsumable: r.agentConsumable,
      repoUrl: r.repoUrl,
    })),
  };

  fs.writeFileSync(path.join(publicDir, 'catalog.json'), JSON.stringify(catalogJson, null, 2) + '\n', 'utf-8');

  // --- Write agents/index.html (Strata) ---
  const categoriesHtml = categorySummaries
    .map(
      (c) => `
    <li>
      <a href="#cat-${c.id}">${escapeHtml(c.label)}</a>
      <span class="count">${c.count}</span>
    </li>
  `,
    )
    .join('');

  const resourcesByCategory: Record<string, NormalizedResource[]> = {};
  for (const cat of categorySummaries) {
    resourcesByCategory[cat.id] = normalizedResources.filter((r) => r.category === cat.id);
  }

  const resourcesHtml = categorySummaries
    .map(
      (c) => `
    <section id="cat-${c.id}">
      <h2>${escapeHtml(c.label)} <span class="count">(${c.count})</span></h2>
      <ul class="resource-list">
        ${resourcesByCategory[c.id]
          .map(
            (r) => `
          <li>
            <article>
              <h3><a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.name)}</a></h3>
              <p>${escapeHtml(r.description)}</p>
              <div class="tags">
                ${r.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
              </div>
              <div class="url">
                <a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.url)}</a>
              </div>
              ${r.featured ? '<span class="badge">Featured</span>' : ''}
            </article>
          </li>
        `,
          )
          .join('')}
      </ul>
    </section>
  `,
    )
    .join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Strata — Design & Agent Engineering Index',
    description: 'Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.',
    url: siteUrl + '/agents',
    mainEntity: { '@type': 'ItemList', itemListElement: normalizedResources.map((r, idx) => ({
      '@type': 'ListItem', position: idx + 1,
      item: { '@type': 'Product', name: r.name, description: r.description, url: r.url, category: r.categoryLabel },
    })), numberOfItems: totalResources },
  };

  const agentsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Strata — Agents</title>
<meta name="description" content="Structured query layer for AI agents (A2A). Zero JS, zero React." />
<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui,-apple-system,sans-serif; line-height: 1.6; color: #111; background: #fff; padding: 2rem; }
.container { max-width: 800px; margin: 0 auto; }
header { border-bottom: 2px solid #10b981; padding-bottom: 1rem; margin-bottom: 2rem; }
h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
h2 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.75rem; color: #10b981; }
ul { list-style: none; padding-left: 0; }
li { margin-bottom: 0.4rem; }
a { color: #10b981; text-decoration: none; }
a:hover { text-decoration: underline; }
.count { font-size: 0.875rem; color: #666; font-weight: normal; }
.resource-list { margin-left: 1.5rem; }
.resource-list li { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
.resource-list h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
.resource-list p { font-size: 0.95rem; color: #444; margin-bottom: 0.5rem; }
.tags { margin-bottom: 0.5rem; }
.tag { display: inline-block; background: #f0f0f0; color: #666; font-size: 0.8rem; padding: 0.15rem 0.4rem; border-radius: 0.25rem; margin-right: 0.3rem; margin-bottom: 0.2rem; }
.url { font-family: monospace; font-size: 0.85rem; color: #10b981; word-break: break-all; }
.badge { display: inline-block; background: #f59e0b; color: #fff; font-size: 0.75rem; padding: 0.1rem 0.4rem; border-radius: 0.25rem; margin-left: 0.5rem; }
.agent-usage { margin: 2rem 0; padding: 1.5rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
.agent-usage ol { padding-left: 1.5rem; }
.agent-usage li { margin-bottom: 0.5rem; }
footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.9rem; color: #666; }
</style>
</head>
<body>
<div class="container">
<header>
  <h1>Strata — Agents</h1>
  <p>Structured query layer for AI agents (A2A). Zero JS, zero React.</p>
  <p><strong>Agent Card:</strong> <a href="/.well-known/agent.json">/.well-known/agent.json</a> |
  <strong>Endpoint A2A:</strong> <code>/api/a2a</code> |
  <strong>LLMs index:</strong> <a href="/llms.txt">/llms.txt</a></p>
</header>
<div class="agent-usage">
  <h2>How AI Agents Should Use Strata</h2>
  <ol>
    <li><strong>Actionable categories (agent-consumable):</strong> ${getCategoryGroups().actionable.map((c) => c.id).join(', ')} -- these are directly consumable by agents via /llms.txt, /llms-full.txt, /catalog.json, /api/a2a.</li>
    <li><strong>Visual reference categories:</strong> ${getCategoryGroups().visual.map((c) => c.id).join(', ')} -- useful for inspiration where resources are not agent-consumable.</li>
    <li><strong>Endpoint selection:</strong> /llms.txt (index), /llms-full.txt (Markdown), /catalog.json (GET JSON), /api/a2a (JSON-RPC 2.0 POST for filtering/searching).</li>
    <li><strong>A2A examples:</strong> list_categories, filter_by_category, search_resources, get_resource_details.</li>
    <li><strong>Free MCP servers:</strong> ${freeMcpCount} indexed with the <code>free-mcp</code> tag — query them with <code>search_resources: free-mcp</code> (limit up to 60).</li>
    <li><strong>Agent Templates:</strong> ${agentTemplateCount} deployable starter kits indexed with the <code>agent-template</code> tag. Filter with <code>filter_by_category: agent-templates</code> or by archetype: <code>${archetypeTags.join('</code>, <code>')}</code>.</li>
  </ol>
</div>
<nav><h2>Categories (${totalCategories})</h2><ul>${categoriesHtml}</ul></nav>
<main>
<h2>Resources by Category (${totalResources} total)</h2>${resourcesHtml}
</main>
<footer>
<p>Generated at build-time from <code>src/data/resources.ts</code>.<br />
<a href="/llms.txt">View llms.txt</a> | <a href="/llms-full.txt">View llms-full.txt</a></p>
</footer>
</div>
</body>
</html>`;

  fs.writeFileSync(
    path.join(publicDir, 'agents/index.html'),
    agentsHtml.split('\n').map((line) => line.trimEnd()).join('\n'),
    'utf-8',
  );

  // --- Write llms.txt (Strata) ---
  const { actionable: agentConsumableCats, visual: visualRefCats } = getCategoryGroups();

  const llmsTxt = `# Strata — Design & Agent Engineering Index

Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.

## Free MCP servers

**${freeMcpCount} free/open-source MCP servers** are indexed with the \`free-mcp\` tag. Filter them through the A2A endpoint with \`search_resources: free-mcp\` (add \`limit: 60\` to retrieve all). Subdomain queries: \`mcp database\`, \`mcp design\`, \`mcp cloud\`, \`mcp coding\`, \`mcp browser\`, \`mcp automation\`, \`mcp proxy\`.

## Agent Templates (priority: directly actionable)

**${agentTemplateCount} deployable agent templates** are indexed with the \`agent-template\` tag in the \`agent-templates\` category. Retrieve all with \`filter_by_category: agent-templates\` or \`search_resources: agent-template limit: 60\`. Filter precisely by archetype tag: ${archetypeTags.map((tag) => `\`${tag}\` (${archetypeCounts[tag]})`).join(', ')}. Aliases for \`filter_by_category\`: \`templates\`, \`starters\`, \`boilerplates\`, \`modelos\`, \`exemplos\`, \`voice-agents\`, \`deep-research\`, \`rag-templates\`, \`copilots\`.

## Categories (${totalCategories})

${categorySummaries.map((c) => `- [${c.label}] (${c.count}) resource(s)`).join('\n')}

## How AI Agents Should Use Strata

### Actionable categories (directly consumable by agents)
${agentConsumableCats.map((cat) => `- **${cat.label}** (${cat.count}) — ${cat.id}`).join('\n')}

### Visual reference categories (inspiration only)
${visualRefCats.map((cat) => `- **${cat.label}** (${cat.count}) — ${cat.id}`).join('\n')}

### Endpoint selection guide
1. **/llms.txt** — This index (concise, machine-readable)
2. **/llms-full.txt** — Complete Markdown dump of all ${totalResources} resources
3. **/catalog.json** — Complete JSON via GET (structured, no POST needed)
4. **/api/a2a** — JSON-RPC 2.0 / A2A for filtered queries (list, filter, search, details)

## A2A Examples

### List categories
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"list_categories"}]}},"id":1}

### Filter by category
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"filter_by_category: components"}]}},"id":2}

### Filter all agent templates by archetype
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"filter_by_category: agent-templates"}]}},"id":6}
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"search_resources: template-voice"}]}},"id":7}

### Search resources
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"search_resources: tailwind"}]}},"id":3}

### Search all free MCP servers
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"search_resources: free-mcp limit: 60"}]}},"id":5}

### Get resource details
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"kind":"text","text":"get_resource_details: getlayers"}]}},"id":4}

## Operating mode

Read-only / structured query. No external actions executed.
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

  // --- Write llms-full.txt (Strata, uniform format) ---
  let llmsFull = `# Strata — Complete Catalog

Total resources: ${totalResources}
Categories: ${totalCategories}
Generated at build-time from src/data/resources.ts
Updated: ${updatedAt}

`;

  for (const cat of categorySummaries) {
    const items = resourcesByCategory[cat.id];
    llmsFull += `\n## ${cat.label} (${items.length})\n\n`;
    for (const r of items) {
      llmsFull += `### ${r.name} (${r.id})\n`;
      llmsFull += `- **URL**: ${r.url}\n`;
      llmsFull += `- **Type**: ${r.resourceType}\n`;
      llmsFull += `- **Agent-Consumable**: ${r.agentConsumable ? 'Yes' : 'No'}\n`;
      llmsFull += `- **When to use**: ${r.whenToUse}\n`;
      llmsFull += `- **Stack/Tags**: ${r.stack.concat(r.tags).join(', ')}\n`;
      llmsFull += `- **Featured**: ${r.featured ? 'Yes' : 'No'}\n`;
      if (r.repoUrl) llmsFull += `- **Repo**: ${r.repoUrl}\n`;
      llmsFull += `- **Description**: ${r.description}\n\n`;
    }
  }

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull, 'utf-8');

  // --- Inject noscript + JSON-LD into index.html (idempotent via markers) ---
  const indexPath = path.resolve(__dirname, '..', 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf-8');

  const noscriptBlock = `<!-- AGENT-NOSCRIPT:START -->
<noscript>
  <div style="padding:2rem;max-width:800px;margin:0 auto;font-family:system-ui,sans-serif;line-height:1.6">
    <h1>Strata — Design & Agent Engineering Index</h1>
    <p>Curated design resources, UI libraries, AI prompt packs, security tools and agent skills.</p>
    <p><strong>${totalResources} resources</strong> across <strong>${totalCategories} categories</strong>.</p>
    <h2>Categories</h2>
    <ul>
      ${categorySummaries.map((c) => `<li><a href="/agents#cat-${c.id}">${c.label}</a> (${c.count})</li>`).join('')}
    </ul>
    <h2>Agent Endpoints</h2>
    <ul>
      <li><a href="/.well-known/agent.json">Agent Card (A2A)</a></li>
      <li><a href="/catalog.json">Catalog JSON (GET)</a></li>
      <li><a href="/llms.txt">LLMs Index (Markdown)</a></li>
      <li><a href="/llms-full.txt">LLMs Full (Markdown)</a></li>
      <li><a href="/agents">Zero-JS Agent Page</a></li>
    </ul>
    <p style="color:#666;font-size:0.9rem">Enable JavaScript for the full interactive experience.</p>
  </div>
</noscript>
<!-- AGENT-NOSCRIPT:END -->`;

  const jsonLdRoot = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Strata',
    url: siteUrl,
    description: 'Curated design resources, UI libraries, AI prompt packs, security tools and agent skills for fast human browsing and native AI agent discovery.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: siteUrl + '/api/a2a?query={search_term_string}',
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLdRoot, null, 2)}</script>`;

  if (indexHtml.includes('<!-- AGENT-NOSCRIPT:START -->')) {
    indexHtml = indexHtml.replace(/<!-- AGENT-NOSCRIPT:START -->[\s\S]*?<!-- AGENT-NOSCRIPT:END -->/, noscriptBlock);
  } else {
    indexHtml = indexHtml.replace('</body>', `${noscriptBlock}\n</body>`);
  }

  if (!indexHtml.includes('application/ld+json')) {
    indexHtml = indexHtml.replace('</head>', `${jsonLdScript}\n</head>`);
  }

  if (!indexHtml.includes('type="application/json"')) {
    indexHtml = indexHtml.replace(
      '<link rel="alternate" type="text/html" href="/agents" />',
      `<link rel="alternate" type="text/html" href="/agents" />\n    <link rel="alternate" type="application/json" href="/catalog.json" />`,
    );
  }

  fs.writeFileSync(indexPath, indexHtml, 'utf-8');

  console.log('✅ Agent layer generated:');
  console.log(`   - public/.well-known/agent.json`);
  console.log(`   - public/.well-known/agent-card.json`);
  console.log(`   - public/agents/index.html (Strata + JSON-LD)`);
  console.log(`   - public/llms.txt (Strata + usage guide)`);
  console.log(`   - public/llms-full.txt (Strata + uniform format)`);
  console.log(`   - public/catalog.json (${totalResources} enriched resources)`);
  console.log(`   - public/index.html (noscript + JSON-LD injected)`);
  console.log(`   Total resources: ${totalResources}`);
  console.log(`   Total categories: ${totalCategories}`);
  console.log(`   Featured resources: ${featuredCount}`);
}

main().catch((err) => { console.error('❌ Error:', err); process.exit(1); });
