'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

/**
 * ModelCatalog — the models Glyphh runs (his order, 2026-09-29: "we just list
 * the models we currently support"). Reads /api/models, the server's own list
 * proxied same-origin: search, provider and mode filters, and one row per
 * model, opening into its limits and a snippet that calls it. No rates: Glyphh
 * never charges per model (the pricing contract, 2026-10-18).
 *
 * `compact` drops the stats strip (the docs page shows them in its own words).
 */

const ROUTER_URL = process.env.NEXT_PUBLIC_ROUTER_URL || 'https://router.glyphh.ai/v1';

const fmtN = (n) => (n == null ? '—' : n.toLocaleString('en-US'));
const fmtCtx = (n) => {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
};
const modeLabel = (m) => (m || 'chat').replace(/_/g, ' ');

function Snippet({ model }) {
  const [tab, setTab] = useState('curl');
  const path = model.modality === 'embedding' ? '/embeddings' : '/chat/completions';
  const body = model.modality === 'embedding'
    ? `{"model": "${model.name}", "input": "Hello"}`
    : `{"model": "${model.name}", "messages": [{"role": "user", "content": "Hello"}]}`;
  const curl = `curl ${ROUTER_URL}${path} \\\n  -H "Authorization: Bearer $GLYPHH_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '${body}'`;
  const py = model.modality === 'embedding'
    ? `from openai import OpenAI\n\nclient = OpenAI(base_url="${ROUTER_URL}", api_key=GLYPHH_KEY)\n\nresponse = client.embeddings.create(\n    model="${model.name}",\n    input="Hello",\n)`
    : `from openai import OpenAI\n\nclient = OpenAI(base_url="${ROUTER_URL}", api_key=GLYPHH_KEY)\n\nresponse = client.chat.completions.create(\n    model="${model.name}",\n    messages=[{"role": "user", "content": "Hello"}],\n)`;
  return (
    <div className="mc-snippet">
      <div className="hv-tabs" role="tablist" aria-label="Call this model">
        <span className="hv-tabs-label">Router</span>
        <button type="button" role="tab" aria-selected={tab === 'curl'} className={`hv-tab${tab === 'curl' ? ' active' : ''}`} onClick={() => setTab('curl')}>curl</button>
        <button type="button" role="tab" aria-selected={tab === 'py'} className={`hv-tab${tab === 'py' ? ' active' : ''}`} onClick={() => setTab('py')}>Python (OpenAI SDK)</button>
      </div>
      <pre className="hv-code mc-code"><code>{tab === 'curl' ? curl : py}</code></pre>
      <p className="mc-snippet-note">
        One base URL in front of every model. Your key from the console carries the role, the budget, and the models
        your organization turned on. <a href="https://docs.glyphh.ai/own-cli">How the base-URL swap works &rarr;</a>
      </p>
    </div>
  );
}

function Detail({ m }) {
  return (
    <div className="mc-detail">
      <div className="mc-detail-grid">
        <div>
          <h4 className="mc-kicker">Model info</h4>
          <dl className="mc-info">
            <div><dt>Provider</dt><dd>{m.provider || '—'}</dd></div>
            <div><dt>Mode</dt><dd>{modeLabel(m.modality)}</dd></div>
            <div><dt>Max input</dt><dd>{m.contextWindow != null ? `${fmtN(m.contextWindow)} tokens` : '—'}</dd></div>
            <div><dt>Max output</dt><dd>{m.maxOutputTokens != null ? `${fmtN(m.maxOutputTokens)} tokens` : '—'}</dd></div>
          </dl>
        </div>
      </div>
      <Snippet model={m} />
    </div>
  );
}

export default function ModelCatalog({ compact = false }) {
  const [data, setData] = useState(null);
  const [q, setQ] = useState('');
  const [provider, setProvider] = useState('');
  const [mode, setMode] = useState('');
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetch('/api/models')
      .then((r) => (r.ok ? r.json() : { ok: false, plans: [], models: [] }))
      .then(setData)
      .catch(() => setData({ ok: false, plans: [], models: [] }));
  }, []);

  const models = data?.models ?? [];
  const providers = useMemo(() => [...new Set(models.map((m) => m.provider))].sort(), [models]);
  const modes = useMemo(() => [...new Set(models.map((m) => m.modality))].sort(), [models]);
  const needle = q.trim().toLowerCase();
  const shown = useMemo(() => models.filter((m) =>
    (!needle || m.name.toLowerCase().includes(needle) || (m.provider || '').toLowerCase().includes(needle)) &&
    (!provider || m.provider === provider) &&
    (!mode || m.modality === mode)), [models, needle, provider, mode]);

  if (!data) return <p className="ix-empty">Loading the models&hellip;</p>;
  if (!models.length) return <p className="ix-empty">The model list could not load right now. Try again in a minute.</p>;

  return (
    <div className="mc">
      {!compact && (
        <div className="ix-stats mc-stats">
          <div><b>{fmtN(models.length)}</b><span>Models</span></div>
          <div><b>{fmtN(providers.length)}</b><span>Providers</span></div>
          <div><b>{fmtN(modes.length)}</b><span>Modes</span></div>
          <div><b>$0</b><span>Charged per model</span></div>
        </div>
      )}

      <div className="mc-filters">
        <label className="ix-search mc-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search models (e.g., claude, gpt, gemini)" aria-label="Search models" autoComplete="off" spellCheck={false} />
        </label>
        <select className="mc-select" value={provider} onChange={(e) => setProvider(e.target.value)} aria-label="Provider">
          <option value="">All providers</option>
          {providers.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="mc-select" value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Mode">
          <option value="">All modes</option>
          {modes.map((m) => <option key={m} value={m}>{modeLabel(m)}</option>)}
        </select>
      </div>
      <p className="mc-count">{fmtN(shown.length)} models</p>

      <div className="mc-table-wrap">
        <table className="mc-table">
          <thead>
            <tr>
              <th className="mc-th-model">Model</th>
              <th>Context</th>
              <th>Max output</th>
              <th>Provider</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((m) => {
              const isOpen = open === m.name;
              return (
                <Fragment key={m.name}>
                  <tr className={`mc-row${isOpen ? ' open' : ''}`} onClick={() => setOpen(isOpen ? null : m.name)}>
                    <td className="mc-td-model">
                      <span className="mc-caret" aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                      <span className="mc-prov" aria-hidden="true">{(m.provider || '?').charAt(0)}</span>
                      <span className="mc-id">{m.name}</span>
                      {m.modality && m.modality !== 'chat' ? <span className="mc-chip mc-mode">{modeLabel(m.modality)}</span> : null}
                    </td>
                    <td><b>{fmtCtx(m.contextWindow)}</b></td>
                    <td>{m.maxOutputTokens != null ? fmtN(m.maxOutputTokens) : '—'}</td>
                    <td>{m.provider || '—'}</td>
                  </tr>
                  {isOpen ? (
                    <tr className="mc-row-detail"><td colSpan={4}><Detail m={m} /></td></tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mc-foot">
        Glyphh never charges per model, per seat or per install. What each plan includes is on the{' '}
        <a href="/pricing">pricing page</a>.
      </p>
    </div>
  );
}
