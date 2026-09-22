'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

/**
 * ModelCatalog — the whole LiteLLM model table, the way models.litellm.ai
 * shows it, in our theme (site refactor 2026-09-22). Reads the static JSON
 * built from the fork's price/context table (scripts/build-model-catalog.mjs):
 * a stats strip, search + provider + mode + minimum-token filters, the count,
 * and one row per model that opens into its pricing, its limits, its
 * features, and a snippet that calls it through the Router.
 *
 * `compact` drops the stats strip (the docs page shows them in its own words).
 */

const ROUTER_URL = process.env.NEXT_PUBLIC_ROUTER_URL || 'https://router.glyphh.ai/v1';
const PAGE = 120;

const fmtN = (n) => (n == null ? '—' : n.toLocaleString('en-US'));
const fmtCtx = (n) => {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
};
// dollars per million tokens, from the table's per-token price
const fmtPerM = (c) => {
  if (c == null) return '—';
  if (c === 0) return 'Free';
  const v = c * 1_000_000;
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: v < 0.1 ? 4 : 2 })}`;
};
const fmtImg = (c) => (c == null ? '—' : `$${c.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}/img`);
const fmtSec = (c) => (c == null ? '—' : `$${c.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 5 })}/s`);
const modeLabel = (m) => (m || 'chat').replace(/_/g, ' ');

// the price column, whichever unit the model bills in
function inCost(m) {
  if (m.ic != null) return fmtPerM(m.ic);
  if (m.chr != null) return `$${(m.chr * 1_000_000).toFixed(2)}/1M chars`;
  if (m.sec != null && m.mode === 'audio_transcription') return fmtSec(m.sec);
  return '—';
}
function outCost(m) {
  if (m.img != null) return fmtImg(m.img);
  if (m.oc != null) return fmtPerM(m.oc);
  if (m.sec != null) return fmtSec(m.sec);
  return '—';
}

function Snippet({ model }) {
  const [tab, setTab] = useState('curl');
  const isChat = ['chat', 'completion', 'responses'].includes(model.mode || 'chat');
  const path = model.mode === 'embedding' ? '/embeddings' : model.mode === 'image_generation' ? '/images/generations' : '/chat/completions';
  const body = model.mode === 'embedding'
    ? `{"model": "${model.id}", "input": "The operating system for frontier AI"}`
    : model.mode === 'image_generation'
      ? `{"model": "${model.id}", "prompt": "A cute baby sea otter"}`
      : `{"model": "${model.id}", "messages": [{"role": "user", "content": "Hello"}]}`;
  const curl = `curl ${ROUTER_URL}${path} \\\n  -H "Authorization: Bearer $GLYPHH_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${body}'`;
  const py = isChat
    ? `from openai import OpenAI\n\nclient = OpenAI(base_url="${ROUTER_URL}", api_key=GLYPHH_KEY)\n\nresponse = client.chat.completions.create(\n    model="${model.id}",\n    messages=[{"role": "user", "content": "Hello"}],\n)`
    : model.mode === 'embedding'
      ? `from openai import OpenAI\n\nclient = OpenAI(base_url="${ROUTER_URL}", api_key=GLYPHH_KEY)\n\nresponse = client.embeddings.create(\n    model="${model.id}",\n    input="The operating system for frontier AI",\n)`
      : `from openai import OpenAI\n\nclient = OpenAI(base_url="${ROUTER_URL}", api_key=GLYPHH_KEY)\n\n# ${modeLabel(model.mode)} — see the docs for this mode's call\nresponse = client.images.generate(\n    model="${model.id}",\n    prompt="A cute baby sea otter",\n)`;
  return (
    <div className="mc-snippet">
      <div className="hv-tabs" role="tablist" aria-label="Call this model">
        <span className="hv-tabs-label">Router</span>
        <button type="button" role="tab" aria-selected={tab === 'curl'} className={`hv-tab${tab === 'curl' ? ' active' : ''}`} onClick={() => setTab('curl')}>curl</button>
        <button type="button" role="tab" aria-selected={tab === 'py'} className={`hv-tab${tab === 'py' ? ' active' : ''}`} onClick={() => setTab('py')}>Python (OpenAI SDK)</button>
      </div>
      <pre className="hv-code mc-code"><code>{tab === 'curl' ? curl : py}</code></pre>
      <p className="mc-snippet-note">
        One base URL in front of every model. Your virtual key from the console carries the role, the budget, and the
        allow-list. <a href="/docs/own-cli">How the base-URL swap works &rarr;</a>
      </p>
    </div>
  );
}

function Detail({ m }) {
  return (
    <div className="mc-detail">
      <div className="mc-detail-grid">
        <div>
          <h4 className="mc-kicker">{m.img != null ? 'Image pricing' : m.sec != null ? 'Pricing per second' : 'Pricing per 1M tokens'}</h4>
          <div className="mc-cards">
            <div className="mc-card"><span>Input</span><b>{inCost(m)}</b></div>
            <div className="mc-card"><span>Output</span><b>{outCost(m)}</b></div>
            <div className="mc-card"><span>Cache read</span><b>{fmtPerM(m.cr)}</b></div>
            <div className="mc-card"><span>Cache write</span><b>{fmtPerM(m.cw)}</b></div>
          </div>
        </div>
        <div>
          <h4 className="mc-kicker">Model info</h4>
          <dl className="mc-info">
            <div><dt>Provider</dt><dd>{m.p || '—'}</dd></div>
            <div><dt>Mode</dt><dd>{modeLabel(m.mode)}</dd></div>
            <div><dt>Max input</dt><dd>{m.in != null ? `${fmtN(m.in)} tokens` : '—'}</dd></div>
            <div><dt>Max output</dt><dd>{m.out != null ? `${fmtN(m.out)} tokens` : '—'}</dd></div>
            {m.dep ? <div><dt>Deprecates</dt><dd>{m.dep}</dd></div> : null}
          </dl>
          {m.f?.length ? (
            <div className="mc-features">
              {m.f.map((f) => <span key={f} className="mc-chip">{f.replace(/_/g, ' ')}</span>)}
            </div>
          ) : null}
        </div>
      </div>
      <Snippet model={m} />
    </div>
  );
}

export default function ModelCatalog({ compact = false }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [q, setQ] = useState('');
  const [provider, setProvider] = useState('');
  const [mode, setMode] = useState('');
  const [minIn, setMinIn] = useState('');
  const [minOut, setMinOut] = useState('');
  const [open, setOpen] = useState(null);
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    fetch('/data/model-catalog.json', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setData)
      .catch((e) => setErr(e.message));
  }, []);

  const needle = q.trim().toLowerCase();
  const shown = useMemo(() => {
    if (!data) return [];
    const mi = Number(minIn) || 0, mo = Number(minOut) || 0;
    return data.models.filter((m) =>
      (!needle || m.id.toLowerCase().includes(needle) || m.p.toLowerCase().includes(needle)) &&
      (!provider || m.p === provider) &&
      (!mode || m.mode === mode) &&
      (!mi || (m.in || 0) >= mi) &&
      (!mo || (m.out || 0) >= mo));
  }, [data, needle, provider, mode, minIn, minOut]);

  useEffect(() => { setLimit(PAGE); }, [needle, provider, mode, minIn, minOut]);

  if (err) return <p className="ix-empty">The catalog could not load ({err}).</p>;
  if (!data) return <p className="ix-empty">Loading the catalog&hellip;</p>;

  const { stats } = data;
  return (
    <div className="mc">
      {!compact && (
        <div className="ix-stats mc-stats">
          <div><b>{fmtN(stats.models)}</b><span>Models</span></div>
          <div><b>{fmtN(stats.providers)}</b><span>Providers</span></div>
          <div><b>{fmtN(stats.modes)}</b><span>Modes</span></div>
          <div><b>{fmtN(stats.combos)}</b><span>Provider + mode combos</span></div>
        </div>
      )}

      <div className="mc-filters">
        <label className="ix-search mc-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search models (e.g., gpt-4o, claude, gemini)" aria-label="Search models" autoComplete="off" spellCheck={false} />
        </label>
        <select className="mc-select" value={provider} onChange={(e) => setProvider(e.target.value)} aria-label="Provider">
          <option value="">All providers</option>
          {data.providers.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="mc-select" value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Mode">
          <option value="">All modes</option>
          {data.modes.map((m) => <option key={m} value={m}>{modeLabel(m)}</option>)}
        </select>
      </div>
      <div className="mc-filters mc-filters-2">
        <label className="mc-field"><span>Min input tokens</span><input type="number" inputMode="numeric" value={minIn} onChange={(e) => setMinIn(e.target.value)} placeholder="e.g., 100000" /></label>
        <label className="mc-field"><span>Min output tokens</span><input type="number" inputMode="numeric" value={minOut} onChange={(e) => setMinOut(e.target.value)} placeholder="e.g., 4096" /></label>
      </div>
      <p className="mc-count">{fmtN(shown.length)} models</p>

      <div className="mc-table-wrap">
        <table className="mc-table">
          <thead>
            <tr>
              <th className="mc-th-model">Model</th>
              <th>Context</th>
              <th>Input cost</th>
              <th>Output cost</th>
              <th>Cache read</th>
              <th>Cache write</th>
            </tr>
          </thead>
          <tbody>
            {shown.slice(0, limit).map((m) => {
              const isOpen = open === m.id;
              return (
                <Fragment key={m.id}>
                  <tr className={`mc-row${isOpen ? ' open' : ''}`} onClick={() => setOpen(isOpen ? null : m.id)}>
                    <td className="mc-td-model">
                      <span className="mc-caret" aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                      <span className="mc-prov" aria-hidden="true">{(m.p || '?').charAt(0)}</span>
                      <span className="mc-id">{m.id}</span>
                      {m.mode && m.mode !== 'chat' ? <span className="mc-chip mc-mode">{modeLabel(m.mode)}</span> : null}
                    </td>
                    <td><b>{fmtCtx(m.in)}</b></td>
                    <td>{inCost(m)}</td>
                    <td>{outCost(m)}</td>
                    <td>{fmtPerM(m.cr)}</td>
                    <td>{fmtPerM(m.cw)}</td>
                  </tr>
                  {isOpen ? (
                    <tr className="mc-row-detail"><td colSpan={6}><Detail m={m} /></td></tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {shown.length > limit ? (
        <div className="mc-more">
          <button type="button" className="os-cta os-cta-ghost" onClick={() => setLimit(limit + PAGE * 2)}>
            Show more ({fmtN(shown.length - limit)} left)
          </button>
        </div>
      ) : null}
      <p className="mc-foot">
        From the LiteLLM price and context table in the Glyphh Router, built {new Date(data.builtAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}.
        Prices are the vendor&rsquo;s list prices on your own keys &mdash; no markup.
      </p>
    </div>
  );
}
