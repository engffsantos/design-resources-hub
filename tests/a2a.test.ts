// @vitest-environment node
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { handleA2ARequest } from '../api/a2a';
import { catalogResources } from '../src/lib/catalog';

interface JsonRpcTestResponse {
  jsonrpc: '2.0';
  result?: {
    artifacts: Array<{ parts: Array<{ kind?: string; text?: string; data?: unknown }> }>;
  };
  error?: { code: number; message: string };
}

function rpc(text: string): Record<string, unknown> {
  return {
    jsonrpc: '2.0',
    method: 'message/send',
    params: { message: { role: 'user', parts: [{ kind: 'text', text }] } },
    id: 1,
  };
}

function dataOf(response: JsonRpcTestResponse): unknown {
  if (!response.result) throw new Error(response.error?.message ?? 'No result');
  const artifact = response.result.artifacts.find((item) => item.parts.some((part) => part.kind === 'data'));
  const part = artifact?.parts.find((item) => item.kind === 'data');
  if (!part?.data) throw new Error('No data artifact');
  return part.data;
}

function markdownOf(response: JsonRpcTestResponse): string {
  if (!response.result) throw new Error(response.error?.message ?? 'No result');
  const part = response.result.artifacts
    .flatMap((item) => item.parts)
    .find((item) => item.kind === 'text');
  return part?.text ?? '';
}

interface MockResponse {
  statusCode: number;
  body?: unknown;
  headers: Record<string, string>;
  setHeader(key: string, value: string): MockResponse;
  status(code: number): MockResponse;
  json(payload: unknown): MockResponse;
  end(): MockResponse;
}

function mockResponse(): MockResponse {
  const response: MockResponse = {
    statusCode: 200,
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  return response;
}

type BundledHandler = (req: unknown, res: unknown) => Promise<void>;

describe('A2A JSON-RPC handler', () => {
  it('validates the envelope and method', async () => {
    const invalid = await handleA2ARequest({ jsonrpc: '1.0', method: 'message/send' });
    expect(invalid.error?.code).toBe(-32600);
    const method = await handleA2ARequest({ jsonrpc: '2.0', method: 'tasks/get' });
    expect(method.error?.code).toBe(-32601);
    const missing = await handleA2ARequest({ jsonrpc: '2.0', method: 'message/send', params: {} });
    expect(missing.error?.code).toBe(-32602);
  });

  it('lists 15 categories, 3 tracks and the unknown-price count', async () => {
    const response = await handleA2ARequest(rpc('list_categories')) as JsonRpcTestResponse;
    const data = dataOf(response) as { categories: unknown[]; tracks: unknown[]; unknownPricing: number };
    expect(data.categories).toHaveLength(15);
    expect(data.tracks).toHaveLength(3);
    expect(data.unknownPricing).toBe(85);
    expect(markdownOf(response)).toContain('85 recursos sem classificação de preço');
  });

  it('filters category aliases without returning other categories', async () => {
    const response = await handleA2ARequest(rpc('filter_by_category: agent-templates')) as JsonRpcTestResponse;
    const data = dataOf(response) as Array<{ category: string }>;
    expect(data).toHaveLength(40);
    expect(data.every((r) => r.category === 'agent-templates')).toBe(true);
  });

  it('resolves tag aliases and supports limit up to 60', async () => {
    const freeMcp = dataOf(await handleA2ARequest(rpc('search_resources: free-mcp')) as JsonRpcTestResponse) as unknown[];
    expect(freeMcp).toHaveLength(43);

    const templates = dataOf(await handleA2ARequest(rpc('search_resources: template-voice')) as JsonRpcTestResponse) as unknown[];
    expect(templates).toHaveLength(3);

    const database = dataOf(await handleA2ARequest(rpc('search_resources: mcp database limit: 60')) as JsonRpcTestResponse) as unknown[];
    expect(database).toHaveLength(8);
  });

  it('returns declared provenance and preserves unknown pricing in details', async () => {
    const unknownResource = catalogResources.find((r) => r.pricing === null);
    expect(unknownResource).toBeDefined();
    const response = await handleA2ARequest(rpc(`get_resource_details: ${unknownResource!.id}`)) as JsonRpcTestResponse;
    const data = dataOf(response) as { id: string; pricing: string | null; provenance: { pricing: string } };
    expect(data.id).toBe(unknownResource!.id);
    expect(data.pricing).toBeNull();
    expect(data.provenance.pricing).toBe('unknown');
  });
});

describe('A2A serverless bundle (production-equivalent)', () => {
  let tempDir: string;
  let handler: BundledHandler;
  let bundle: string;

  beforeAll(async () => {
    tempDir = await mkdtemp(path.join(tmpdir(), 'strata-a2a-'));
    const outfile = path.join(tempDir, 'a2a.mjs');
    await build({
      entryPoints: [path.resolve(process.cwd(), 'api/a2a.ts')],
      outfile,
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'node20',
      logLevel: 'silent',
      sourcemap: false,
    });
    bundle = await readFile(outfile, 'utf-8');
    const module = await import(pathToFileURL(outfile).href) as { default: BundledHandler };
    handler = module.default;
  });

  afterAll(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it('contains no runtime file:// import of TypeScript source', () => {
    expect(bundle).not.toContain('file://');
    expect(bundle).not.toContain('import(');
  });

  it('uses explicit .js extensions on relative imports for the Vercel ESM runtime', () => {
    const sources = ['api/a2a.ts', 'src/lib/catalog.ts'].map((file) =>
      readFileSync(path.resolve(process.cwd(), file), 'utf-8'),
    );
    for (const source of sources) {
      const imports = source.match(/from\s+['"]\.\.?\/[^'"]+['"]/g) ?? [];
      expect(imports.length).toBeGreaterThan(0);
      for (const statement of imports) expect(statement).toMatch(/\.js['"]$/);
    }
  });

  it('answers all four skills from a standalone bundle', async () => {
    const queries = [
      'list_categories',
      'filter_by_category: mcp-protocols',
      'search_resources: free-mcp',
      `get_resource_details: ${catalogResources[0].id}`,
    ];
    for (const query of queries) {
      const req = { method: 'POST', body: rpc(query), headers: {} };
      const res = mockResponse();
      await handler(req, res);
      expect(res.statusCode).toBe(200);
      const response = res.body as JsonRpcTestResponse;
      expect(response.jsonrpc).toBe('2.0');
      expect(response.error).toBeUndefined();
      expect(response.result?.artifacts).toHaveLength(2);
    }
  });

  it('handles OPTIONS and rejects GET without executing skills', async () => {
    const optionsRes = mockResponse();
    await handler({ method: 'OPTIONS', headers: {} }, optionsRes);
    expect(optionsRes.statusCode).toBe(204);

    const getRes = mockResponse();
    await handler({ method: 'GET', headers: {} }, getRes);
    expect(getRes.statusCode).toBe(405);
    expect((getRes.body as JsonRpcTestResponse).error?.code).toBe(-32601);
  });
});
