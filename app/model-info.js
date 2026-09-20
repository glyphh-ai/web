// What each model IS — the editorial layer over the live catalog. The prod DB
// owns the roster and the prices (app/pricing/page.js fetches those on every
// request); this file owns the parts a catalog row can't say: the provider
// icon, the link back to the model's origin, and what the model is good for.
//
// Keyed by catalog id (`provider::model`). Anything the catalog serves that
// isn't listed here falls back to its PROVIDER entry, so new models render
// with an icon, origin link, and a sane blurb before this file catches up.
// `modality` is forward-looking: image / voice models slot in with their own
// value when they land in the catalog.

// Standardized icon: every model shows its provider's favicon at one size via
// the same service the Connections wall uses — one visual system, no bespoke
// logo assets to maintain.
export const PROVIDERS = {
  anthropic: {
    domain: 'claude.ai',
    origin: { label: 'anthropic.com', href: 'https://www.anthropic.com/claude' },
    blurb: 'A Claude model from Anthropic — strong reasoning with careful, steerable output.',
  },
  openai: {
    domain: 'chatgpt.com',
    origin: { label: 'platform.openai.com', href: 'https://platform.openai.com/docs/models' },
    blurb: 'An OpenAI model — broad general capability with dependable tool use.',
  },
  google: {
    domain: 'gemini.google.com',
    origin: { label: 'ai.google.dev', href: 'https://ai.google.dev/gemini-api/docs/models' },
    blurb: 'A Google Gemini model — long multimodal context at strong price-performance.',
  },
  moonshot: {
    domain: 'kimi.com',
    origin: { label: 'platform.moonshot.ai', href: 'https://platform.moonshot.ai' },
    blurb: 'A Kimi model from Moonshot AI — long context and agentic strength at an aggressive price.',
  },
  xai: {
    domain: 'grok.com',
    origin: { label: 'x.ai', href: 'https://x.ai/grok' },
    blurb: 'A Grok model from xAI — reasoning with real-time knowledge from X.',
  },
  mistral: {
    domain: 'mistral.ai',
    origin: { label: 'mistral.ai', href: 'https://mistral.ai/models' },
    blurb: 'A Mistral model — efficient European frontier work with strong multilingual output.',
  },
  groq: {
    domain: 'groq.com',
    origin: { label: 'groq.com', href: 'https://groq.com' },
    blurb: 'Open-weight models served on Groq LPUs — near-instant tokens.',
  },
  deepseek: {
    domain: 'deepseek.com',
    origin: { label: 'deepseek.com', href: 'https://www.deepseek.com' },
    blurb: 'A DeepSeek model — standout price-to-performance on reasoning and code.',
  },
  local: {
    domain: 'qwen.ai',
    origin: { label: 'qwen.ai', href: 'https://qwen.ai' },
    blurb: 'Runs entirely on your machine inside Glyphh — free, private, and offline.',
  },
  openweights: {
    domain: 'llama.com',
    origin: { label: 'llama.com', href: 'https://www.llama.com' },
    blurb: 'An open-weight model you can run on your own hardware — no per-token cost.',
  },
};

export const MODEL_INFO = {
  // ── Anthropic ─────────────────────────────────────────────────────────
  'anthropic::claude-fable-5': {
    goodFor:
      "Anthropic's most capable model — a new tier above Opus. The pick for deep multi-step reasoning, long autonomous agent runs, and the hardest coding and analysis problems.",
    strengths: ['Deepest reasoning', 'Agentic work', 'Hard coding'],
  },
  'anthropic::claude-opus-5': {
    goodFor:
      "The flagship Opus line — top-tier reasoning, careful long-form writing, and reliable tool use across complex agent workflows.",
    strengths: ['Reasoning', 'Writing', 'Tool use'],
  },
  'anthropic::claude-opus-4-8': {
    goodFor:
      'Frontier-grade reasoning and coding with fast output — the workhorse for hard tasks that still need to feel snappy.',
    strengths: ['Reasoning', 'Coding', 'Fast output'],
  },
  'anthropic::claude-sonnet-5': {
    goodFor:
      'The balance point: near-frontier quality at a mid rate. A great default for everyday coding, drafting, and analysis.',
    strengths: ['Everyday coding', 'Drafting', 'Value'],
  },
  'anthropic::claude-haiku-4-5-20251001': {
    goodFor:
      'Small, fast, and cheap — built for high-volume work: classification, extraction, quick chat, and tool-heavy loops where latency matters.',
    strengths: ['Speed', 'High volume', 'Low cost'],
  },

  // ── Moonshot / Kimi ───────────────────────────────────────────────────
  'moonshot::kimi-k3': {
    goodFor:
      'A 1M-token context window with strong agentic coding at an aggressive price — whole repositories, book-length documents, and long-running agents.',
    strengths: ['1M context', 'Agentic coding', 'Value'],
  },
  'moonshot::kimi-k2.7-code': {
    goodFor:
      'Code-tuned Kimi — repo-scale edits, long pairing sessions, and multi-file refactors.',
    strengths: ['Coding', 'Long context'],
  },
  'moonshot::kimi-k2.7-code-highspeed': {
    goodFor:
      'The code-tuned Kimi on faster serving — the same repo-scale strength with tighter feedback loops for interactive work.',
    strengths: ['Coding', 'Speed'],
  },
  'moonshot::kimi-k2.6': {
    goodFor:
      'General-purpose Kimi — capable chat, writing, and summarization with long context at a low rate.',
    strengths: ['Chat', 'Long context', 'Value'],
  },

  // ── xAI ───────────────────────────────────────────────────────────────
  'xai::grok-4': {
    goodFor:
      'Strong reasoning with real-time knowledge of X — current events, market chatter, and research that needs to be minutes old, not months.',
    strengths: ['Reasoning', 'Real-time knowledge'],
  },

  // ── OpenAI ────────────────────────────────────────────────────────────
  'openai::gpt-5.2': {
    goodFor:
      "OpenAI's newest flagship — broad general intelligence, strong tool use, and dependable structured output across writing, analysis, and code.",
    strengths: ['General intelligence', 'Tool use', 'Structured output'],
  },
  'openai::gpt-5.1': {
    goodFor:
      'The GPT-5 flagship line — strong general reasoning and reliable formatting, a solid all-rounder for mixed workloads.',
    strengths: ['General reasoning', 'All-rounder'],
  },
  'openai::gpt-5': {
    goodFor:
      'The first of the GPT-5 line — capable general reasoning and coding with mature tooling behavior.',
    strengths: ['General reasoning', 'Coding'],
  },
  'openai::gpt-5-mini': {
    goodFor:
      'The flagship line at a mid price — solid reasoning for everyday tasks, summaries, and support flows.',
    strengths: ['Value', 'Everyday tasks'],
  },
  'openai::gpt-5-nano': {
    goodFor:
      'Tiny and near-instant — routing, extraction, classification, and bulk processing at minimal cost.',
    strengths: ['Speed', 'Bulk processing', 'Low cost'],
  },
  'openai::gpt-4.1': {
    goodFor:
      'The long-context coding specialist — a 1M-token window with precise instruction following for large-codebase work.',
    strengths: ['Coding', '1M context', 'Instruction following'],
  },
  'openai::gpt-4.1-mini': {
    goodFor:
      'The 4.1 coding strengths at a fraction of the rate — great for iterative dev loops and CI-style automation.',
    strengths: ['Coding', 'Value'],
  },
  'openai::gpt-4.1-nano': {
    goodFor:
      'The smallest 4.1 — fast, cheap completions for autocomplete-style and high-frequency calls.',
    strengths: ['Speed', 'Low cost'],
  },
  'openai::gpt-4o': {
    goodFor:
      'Natively multimodal — text and images in one conversation with a quick, natural feel. A strong pick for vision tasks and everyday chat.',
    strengths: ['Multimodal', 'Vision', 'Fast'],
  },
  'openai::gpt-4o-mini': {
    goodFor:
      'The cheap multimodal workhorse — vision and chat at volume prices.',
    strengths: ['Multimodal', 'High volume', 'Low cost'],
  },

  // ── Google / Gemini ───────────────────────────────────────────────────
  'google::gemini-3.1-pro-preview': {
    goodFor:
      "Google's deep-work model — a 1M-token multimodal window for large codebases, video, and whole document sets in a single pass.",
    strengths: ['1M context', 'Multimodal', 'Deep work'],
  },
  'google::gemini-3.6-flash': {
    goodFor:
      'The newest Flash — fast, inexpensive, and multimodal; the volume engine for summarization and agent fleets.',
    strengths: ['Speed', 'Multimodal', 'Value'],
  },
  'google::gemini-3.5-flash': {
    goodFor:
      'Fast and cheap with long context — high-volume summarization, extraction, and everyday agent steps.',
    strengths: ['Speed', 'Long context', 'Value'],
  },
  'google::gemini-3.5-flash-lite': {
    goodFor:
      'The lightest 3.5 tier — near-free calls for routing, tagging, and bulk transforms.',
    strengths: ['Lowest cost', 'Bulk processing'],
  },
  'google::gemini-3-flash-preview': {
    goodFor:
      'The Flash preview line — quick multimodal calls at low rates for experimentation and volume work.',
    strengths: ['Speed', 'Multimodal'],
  },
  'google::gemini-3.1-flash-lite': {
    goodFor:
      'Minimal-cost Gemini — classification, routing, and simple transforms at scale.',
    strengths: ['Lowest cost', 'High volume'],
  },

  // ── Mistral ───────────────────────────────────────────────────────────
  'mistral::mistral-large-latest': {
    goodFor:
      "Europe's frontier lab — efficient reasoning, strong multilingual output, and solid function calling, with an EU data-residency story.",
    strengths: ['Multilingual', 'Function calling', 'Efficient'],
  },

  // ── Groq ──────────────────────────────────────────────────────────────
  'groq::llama-3.3-70b-versatile': {
    goodFor:
      "Meta's open-weight Llama 3.3 served on Groq LPUs — near-instant tokens, ideal for latency-sensitive agents and interactive tools.",
    strengths: ['Ultra-fast serving', 'Open weight'],
  },

  // ── DeepSeek ──────────────────────────────────────────────────────────
  'deepseek::deepseek-chat': {
    goodFor:
      'Standout price-to-performance — strong reasoning and coding at one of the lowest rates in the catalog.',
    strengths: ['Value', 'Reasoning', 'Coding'],
  },

  // ── On-device (local) ─────────────────────────────────────────────────
  'local::qwen2.5-14b': {
    goodFor:
      'The largest on-device Qwen — capable chat, drafting, and coding that runs entirely on your machine. Free, private, and offline.',
    strengths: ['On-device', 'Free', 'Private'],
  },
  'local::qwen2.5-7b': {
    goodFor:
      'The balanced on-device pick — solid quality on mainstream hardware, no key, no bill, nothing leaves your machine.',
    strengths: ['On-device', 'Free', 'Private'],
  },
  'local::qwen2.5-3b': {
    goodFor:
      'Light on-device model — quick local summaries, tagging, and drafts on modest hardware.',
    strengths: ['On-device', 'Free', 'Light'],
  },
  'local::qwen2.5-1.5b': {
    goodFor:
      'The smallest local Qwen — instant on-device completions for simple tasks, even on low-power machines.',
    strengths: ['On-device', 'Free', 'Instant'],
  },

  // ── Open weights ──────────────────────────────────────────────────────
  'openweights::llama-3-8b': {
    goodFor:
      "Meta's open-weight Llama 3 8B — a light general model for chat and drafts you can run on your own hardware.",
    strengths: ['Open weight', 'On-device', 'Light'],
  },
};

// The merged view a row renders from. Text models are the whole catalog
// today; image / voice / transcription models declare their `modality` here
// when they land.
export function infoFor(model) {
  const provider = PROVIDERS[model.providerSlug] || {
    domain: null,
    origin: null,
    blurb: 'A model from the live Glyphh catalog.',
  };
  const info = MODEL_INFO[model.id] || {};
  return {
    domain: info.domain || provider.domain,
    origin: info.origin || provider.origin,
    goodFor: info.goodFor || provider.blurb,
    strengths: info.strengths || [],
    modality: info.modality || 'text',
  };
}
