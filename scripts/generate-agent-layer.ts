#!/usr/bin/env node
/**
 * generate-agent-layer.ts
 * Build-time script que gera artefatos A2A/LLMs a partir de src/data/resources.ts
 * Executa via tsx no prebuild
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
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
}

interface CategorySummary {
  id: string;
  label: string;
  count: number;
}

// ---------------------------------------------------------------------------
// Caminhos
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const srcDataPath = path.join(projectRoot, 'src/data/resources.ts');
const publicDir = path.join(projectRoot, 'public');

// ---------------------------------------------------------------------------
// Carregar catálogo via import dinâmico (compatível com tsx/ESM)
// ---------------------------------------------------------------------------

async function loadCatalog(): Promise<{ resources: Resource[]; categories: Category[] }> {
  const mod = await import('file://' + srcDataPath);
  return {
    resources: mod.resources || [],
    categories: mod.categories || [],
  };
}

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🔄 Carregando catálogo...');
  const { resources, categories } = await loadCatalog();

  // Normalizar recursos
  const normalizedResources: NormalizedResource[] = resources.map((r) => {
    const catInfo = categories.find((c) => c.id === r.category);
    return {
      id: r.id,
      name: r.name,
      url: r.url,
      description: r.description,
      category: r.category,
      categoryLabel: catInfo?.label ?? r.category.replace('-', ' '),
      tags: r.tags || [],
      featured: r.featured ?? false,
    };
  });

  // Resumo por categoria
  const categorySummaries: CategorySummary[] = categories.map((c) => ({
    id: c.id,
    label: c.label,
    count: resources.filter((r) => r.category === c.id).length,
  }));

  const totalResources = resources.length;
  const totalCategories = categories.length;
  const featuredCount = resources.filter((r) => r.featured).length;

  console.log(`📚 ${totalResources} recursos em ${totalCategories} categorias (${featuredCount} em destaque)`);

  // Garante diretórios
  fs.mkdirSync(path.join(publicDir, '.well-known'), { recursive: true });
  fs.mkdirSync(path.join(publicDir, 'agents'), { recursive: true });

  // ---------------------------------------------------------------------------
  // 1. Agent Card (.well-known/agent.json)
  // ---------------------------------------------------------------------------

  const siteUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || 'https://design-resources-hub.vercel.app';
  const a2aEndpoint = `${siteUrl}/api/a2a`;

  const agentCard = {
    name: 'Hub de Recursos de Design — Agent',
    description:
      'Catálogo curado de recursos de design e desenvolvimento. Suporta consulta estruturada: listagem de categorias, filtros por categoria, busca por nome/descrição/tags e detalhes de recurso individual.',
    url: a2aEndpoint,
    version: '1.0.0',
    provider: { name: 'Design Resources Hub', url: siteUrl },
    capabilities: { streaming: false, pushNotifications: false },
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['application/json', 'text/markdown'],
    authentication: { type: 'none' },
    skills: [
      {
        id: 'list_categories',
        name: 'Listar Categorias',
        description: 'Lista todas as 10 categorias disponíveis com contagem de recursos.',
        tags: ['categories', 'list', 'catalog'],
        examples: ['Quais categorias existem?', 'Liste as categorias de recursos.'],
      },
      {
        id: 'filter_by_category',
        name: 'Filtrar por Categoria',
        description: 'Retorna recursos de uma ou mais categorias. Aceita nomes com ou sem acentos.',
        tags: ['filter', 'category', 'resources'],
        examples: ['Recursos de prompts de IA', 'Mostre componentes de UI'],
      },
      {
        id: 'search_resources',
        name: 'Buscar Recursos',
        description: 'Busca por nome, descrição, categoria ou tags. Suporta filtros combinados.',
        tags: ['search', 'query', 'resources'],
        examples: ['Busque por tailwind', 'Recursos de animação com tag motion'],
      },
      {
        id: 'get_resource_details',
        name: 'Detalhes do Recurso',
        description: 'Metadados completos e URL externa validada por ID ou nome.',
        tags: ['details', 'resource', 'metadata'],
        examples: ['Detalhes do getlayers', 'Informações sobre sceneai.art'],
      },
    ],
  };

  fs.writeFileSync(
    path.join(publicDir, '.well-known/agent.json'),
    JSON.stringify(agentCard, null, 2) + '\n',
    'utf-8',
  );
  fs.writeFileSync(
    path.join(publicDir, '.well-known/agent-card.json'),
    JSON.stringify(agentCard, null, 2) + '\n',
    'utf-8',
  );

  // ---------------------------------------------------------------------------
  // 2. Página Zero-JS (/agents/index.html) COM JSON-LD
  // ---------------------------------------------------------------------------

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
              ${r.featured ? '<span class="badge">Em destaque</span>' : ''}
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

  // JSON-LD: CollectionPage + ItemList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Hub de Recursos de Design — Agentes',
    description: 'Catálogo curado de recursos de design e desenvolvimento para consulta estruturada por agentes de IA (protocolo A2A).',
    url: `${siteUrl}/agents`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: normalizedResources.map((r, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product', // ou CreativeWork
          name: r.name,
          description: r.description,
          url: r.url,
          category: r.categoryLabel,
          additionalProperty: r.tags.map((tag, ti) => ({
            '@type': 'PropertyValue',
            name: 'tag',
            value: tag,
          })),
        },
      })),
      numberOfItems: totalResources,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/api/a2a?query={search_term_string}`,
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const agentsHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Design Resources Hub - Agentes A2A</title>
<meta name="description" content="Camada de consulta estruturada para agentes de IA (protocolo A2A). Sem JavaScript, sem React." />
<!-- JSON-LD estruturado para busca semântica -->
<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #111; background: #fff; padding: 2rem; }
  .container { max-width: 800px; margin: 0 auto; }
  header { border-bottom: 2px solid #0ea5e9; padding-bottom: 1rem; margin-bottom: 2rem; }
  h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
  h2 { font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.75rem; color: #0ea5e9; }
  ul { list-style: none; padding-left: 0; }
  li { margin-bottom: 0.4rem; }
  a { color: #0ea5e9; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .count { font-size: 0.875rem; color: #666; font-weight: normal; }
  .resource-list { margin-left: 1.5rem; }
  .resource-list li { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
  .resource-list h3 { font-size: 1.1rem; margin-bottom: 0.3rem; }
  .resource-list p { font-size: 0.95rem; color: #444; margin-bottom: 0.5rem; }
  .tags { margin-bottom: 0.5rem; }
  .tag { display: inline-block; background: #f0f0f0; color: #666; font-size: 0.8rem; padding: 0.15rem 0.4rem; border-radius: 0.25rem; margin-right: 0.3rem; margin-bottom: 0.2rem; }
  .url { font-family: monospace; font-size: 0.85rem; color: #0ea5e9; word-break: break-all; }
  .badge { display: inline-block; background: #f59e0b; color: #fff; font-size: 0.75rem; padding: 0.1rem 0.4rem; border-radius: 0.25rem; margin-left: 0.5rem; }
  footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.9rem; color: #666; }
  code { background: #f0f0f0; padding: 0.1rem 0.3rem; border-radius: 0.2rem; font-family: monospace; font-size: 0.9rem; }
</style>
</head>
<body>
<div class="container">
<header>
  <h1>Hub de Recursos de Design - Agentes</h1>
  <p>Camada de consulta estruturada para agentes de IA (protocolo A2A). Sem JavaScript, sem React.</p>
  <p>
    <strong>Agent Card:</strong> <a href="/.well-known/agent.json">/.well-known/agent.json</a> |
    <strong>Endpoint A2A:</strong> <code>/api/a2a</code> |
    <strong>LLMs index:</strong> <a href="/llms.txt">/llms.txt</a>
  </p>
</header>

<nav>
  <h2>Categorias (${totalCategories})</h2>
  <ul>
    ${categoriesHtml}
  </ul>
</nav>

<main>
  <h2>Recursos por Categoria (${totalResources} total)</h2>
  ${resourcesHtml}
</main>

<footer>
  <p>
    Gerado em build-time a partir de <code>src/data/resources.ts</code>.<br />
    <a href="/llms.txt">Ver llms.txt</a> |
    <a href="/llms-full.txt">Ver llms-full.txt</a>
  </p>
</footer>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'agents/index.html'), agentsHtml, 'utf-8');

  // ---------------------------------------------------------------------------
  // 3. llms.txt
  // ---------------------------------------------------------------------------

  const llmsTxt = `# Design Resources Hub

Catálogo curado de recursos de design e desenvolvimento para agentes de IA e desenvolvedores.

## Categorias (${totalCategories})

${categorySummaries.map((c) => `- [${c.label}] (${c.count}) resource(s)`).join('\n')}

## Como consultar este hub

- Página legível por agentes: /agents
- Índice completo: /llms-full.txt
- Agent Card (protocolo A2A): /.well-known/agent.json
- Endpoint A2A (JSON-RPC 2.0): /api/a2a

## Exemplos de consulta A2A

### Listar categorias
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"type":"text","text":"list_categories"}]}},"id":1}

### Filtrar por categoria
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"type":"text","text":"filter_by_category: components"}]}},"id":2}

### Buscar recursos
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"type":"text","text":"search_resources: tailwind"}]}},"id":3}

### Detalhes de um recurso
POST /api/a2a
{"jsonrpc":"2.0","method":"message/send","params":{"message":{"role":"user","parts":[{"type":"text","text":"get_resource_details: getlayers"}]}},"id":4}

## Modo de operação

Somente leitura / consulta estruturada. Não executa ações externas.
`;

  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');

  // ---------------------------------------------------------------------------
  // 4. llms-full.txt
  // ---------------------------------------------------------------------------

  let llmsFull = `# Design Resources Hub - Catálogo Completo

Total de recursos: ${totalResources}
Categorias: ${totalCategories}
Gerado em build-time a partir de src/data/resources.ts

`;

  for (const cat of categorySummaries) {
    const items = resourcesByCategory[cat.id];
    llmsFull += `\n## ${cat.label} (${items.length})\n\n`;
    for (const r of items) {
      llmsFull += `- **${r.name}**\n`;
      llmsFull += `  - URL: ${r.url}\n`;
      llmsFull += `  - ID: ${r.id}\n`;
      llmsFull += `  - Categoria: ${r.categoryLabel}\n`;
      llmsFull += `  - Tags: ${r.tags.join(', ')}\n`;
      llmsFull += `  - Destacado: ${r.featured ? 'Sim' : 'Não'}\n`;
      llmsFull += `  - Descrição: ${r.description}\n\n`;
    }
  }

  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFull, 'utf-8');

  console.log('✅ Agent layer gerado com sucesso:');
  console.log(`   - public/.well-known/agent.json`);
  console.log(`   - public/.well-known/agent-card.json`);
  console.log(`   - public/agents/index.html (com JSON-LD)`);
  console.log(`   - public/llms.txt`);
  console.log(`   - public/llms-full.txt`);
  console.log(`   Total de recursos: ${totalResources}`);
  console.log(`   Total de categorias: ${totalCategories}`);
  console.log(`   Recursos destacados: ${featuredCount}`);
}

main().catch((err) => {
  console.error('❌ Erro:', err);
  process.exit(1);
});
