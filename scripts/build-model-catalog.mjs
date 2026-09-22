// Build the public model catalog from the LiteLLM fork's price/context table —
// the same file models.litellm.ai renders. Writes a compact JSON the site
// serves statically (public/data/model-catalog.json) plus the headline stats.
//
//   node scripts/build-model-catalog.mjs [path/to/model_prices_and_context_window.json]
//
// Re-run after an upstream bump (server/docs/upstream-bump.md).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(process.argv[2] || resolve(here, '../../server/model_prices_and_context_window.json'));
const raw = JSON.parse(readFileSync(src, 'utf8'));

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const models = [];
for (const [id, m] of Object.entries(raw)) {
  if (id === 'sample_spec' || !m || typeof m !== 'object') continue;
  const features = [];
  for (const [k, v] of Object.entries(m)) if (k.startsWith('supports_') && v === true) features.push(k.slice(9));
  models.push({
    id,
    p: m.litellm_provider || '',
    mode: m.mode || '',
    in: num(m.max_input_tokens) ?? num(m.max_tokens),
    out: num(m.max_output_tokens),
    ic: num(m.input_cost_per_token),
    oc: num(m.output_cost_per_token),
    cr: num(m.cache_read_input_token_cost),
    cw: num(m.cache_creation_input_token_cost),
    img: num(m.output_cost_per_image),
    sec: num(m.output_cost_per_second) ?? num(m.input_cost_per_second),
    chr: num(m.input_cost_per_character),
    f: features,
    dep: m.deprecation_date || null,
  });
}
models.sort((a, b) => a.id.localeCompare(b.id));
const providers = [...new Set(models.map((m) => m.p).filter(Boolean))].sort();
const modes = [...new Set(models.map((m) => m.mode).filter(Boolean))].sort();
const combos = new Set(models.filter((m) => m.p && m.mode).map((m) => `${m.p}/${m.mode}`)).size;
const out = {
  builtAt: new Date().toISOString(),
  stats: { models: models.length, providers: providers.length, modes: modes.length, combos },
  providers,
  modes,
  models,
};
// The home page's ticker: chat models from the well-known providers, short ids,
// no provider prefix, deduped — a few hundred names, not the whole table.
const TICKER_PROVIDERS = new Set(['anthropic', 'openai', 'gemini', 'vertex_ai-language-models', 'xai', 'mistral', 'groq', 'deepseek', 'together_ai', 'fireworks_ai', 'cohere_chat', 'perplexity', 'ollama', 'openrouter', 'moonshot', 'cerebras']);
const tickerNames = [...new Set(models
  .filter((m) => m.mode === 'chat' && TICKER_PROVIDERS.has(m.p))
  .map((m) => m.id.split('/').pop())
  .filter((n) => n.length <= 34 && !/\d{8}|-\d{4}-\d{2}-\d{2}|:/.test(n)))].sort();
writeFileSync(resolve(here, '../public/data/model-ticker.json'), JSON.stringify(tickerNames));
console.log(`ticker: ${tickerNames.length} names`);

const dest = resolve(here, '../public/data/model-catalog.json');
writeFileSync(dest, JSON.stringify(out));
console.log(`wrote ${dest}: ${models.length} models, ${providers.length} providers, ${modes.length} modes, ${combos} combos (${(JSON.stringify(out).length / 1024).toFixed(0)} KB)`);
