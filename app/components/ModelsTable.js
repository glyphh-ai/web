'use client';

import { Fragment, useState } from 'react';
import { infoFor } from '../model-info';

/**
 * ModelsTable — the live catalog, one clickable row per model. A row opens
 * into its card: the provider icon (standardized — favicons at one size,
 * same system as the Connections wall), what the model is good for, its
 * strengths, the context/output numbers, and a link back to its origin.
 * Rows and prices come from the server (app/pricing/page.js); the editorial
 * layer lives in app/model-info.js.
 */

// Dollars per million tokens, the vendor's own list price on the customer's
// keys. Sub-cent rates keep up to three decimals; whole dollars stay whole.
function fmtUsd(n) {
  if (n === 0) return 'Free';
  const num = Number(n);
  if (!Number.isFinite(num)) return '—';
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}`;
}

function fmtCtx(n) {
  if (!n) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function ModelIcon({ domain, name }) {
  return (
    <span className="mt-icon" aria-hidden="true">
      {domain ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }}
        />
      ) : null}
      <span className="mt-icon-fallback">{name.charAt(0)}</span>
    </span>
  );
}

function DetailRow({ model }) {
  const info = infoFor(model);
  return (
    <tr className="mt-detail">
      <td colSpan={5}>
        <div className="mt-detail-card">
          <ModelIcon domain={info.domain} name={model.name} />
          <div className="mt-detail-body">
            <p className="mt-detail-blurb">{info.goodFor}</p>
            {info.strengths.length > 0 && (
              <div className="mt-chips">
                {info.strengths.map((s) => (
                  <span key={s} className="mt-chip">{s}</span>
                ))}
              </div>
            )}
            <dl className="mt-detail-meta">
              <div><dt>Context</dt><dd>{fmtCtx(model.contextWindow)} tokens</dd></div>
              {model.maxOutputTokens ? (
                <div><dt>Max output</dt><dd>{fmtCtx(model.maxOutputTokens)} tokens</dd></div>
              ) : null}
              <div><dt>Provider</dt><dd>{model.providerName}</dd></div>
            </dl>
            {info.origin ? (
              <a
                className="mt-origin"
                href={info.origin.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {model.name} at {info.origin.label} &#8599;
              </a>
            ) : null}
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function ModelsTable({ providers, newIds = [] }) {
  const [openId, setOpenId] = useState(null);
  // Providers START CLOSED (his order, 2026-09-11: a 10k-long page isn't
  // usable) — a search filters models and auto-opens the providers that match.
  const [openProviders, setOpenProviders] = useState(() => new Set());
  const [q, setQ] = useState('');
  const newSet = new Set(newIds);
  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));
  const toggleProvider = (name) => setOpenProviders((cur) => {
    const next = new Set(cur);
    if (next.has(name)) next.delete(name); else next.add(name);
    return next;
  });
  const query = q.trim().toLowerCase();
  // 15 everywhere — the one pagination size: providers page at 15, and an
  // open provider's models page at 15 inside it.
  const PAGE = 15;
  const [page, setPage] = useState(0);
  const [modelPages, setModelPages] = useState({});
  const all = providers
    .map(([provider, list]) => [provider, query ? list.filter((m) => m.name.toLowerCase().includes(query)) : list])
    .filter(([, list]) => list.length > 0);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE));
  const pageClamped = Math.min(page, totalPages - 1);
  const shown = all.slice(pageClamped * PAGE, (pageClamped + 1) * PAGE);
  const setQuery = (v) => { setQ(v); setPage(0); setModelPages({}); };

  return (
    <div className="models-table-wrap">
      <div className="mt-toolbar">
        <input
          type="search"
          className="mt-search"
          placeholder="Search models…"
          value={q}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck={false}
        />
        <span className="mt-count">{all.reduce((a, [, l]) => a + l.length, 0)} models · {all.length} providers</span>
      </div>
      <table className="models-table">
        <thead>
          <tr>
            <th className="mt-model">Model</th>
            <th className="mt-use">Best for</th>
            <th className="mt-ctx">Context</th>
            <th className="mt-num">
              Input<span className="mt-unit"> $ / 1M tokens</span>
            </th>
            <th className="mt-num">
              Output<span className="mt-unit"> $ / 1M tokens</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {shown.map(([provider, list]) => {
            const openProv = !!query || openProviders.has(provider);
            const cheapest = list[0]?.inputUsdPerMTok;
            const mPage = Math.min(modelPages[provider] ?? 0, Math.ceil(list.length / PAGE) - 1);
            const rows = list.slice(mPage * PAGE, (mPage + 1) * PAGE);
            return (
            <Fragment key={provider}>
              <tr className="mt-group mt-group-click" onClick={() => toggleProvider(provider)}>
                <td colSpan={5}>
                  <span className={`mt-caret${openProv ? ' is-open' : ''}`} aria-hidden="true">&#9656;</span>
                  {provider}
                  <span className="mt-group-meta">{list.length} model{list.length === 1 ? '' : 's'}{Number.isFinite(Number(cheapest)) && Number(cheapest) > 0 ? ` · from ${fmtUsd(cheapest)} / MTok` : ''}</span>
                </td>
              </tr>
              {openProv && rows.map((m) => {
                const isNew = newSet.has(m.id);
                const open = openId === m.id;
                return (
                  <Fragment key={m.id}>
                    <tr
                      className={`mt-row mt-row-click${isNew ? ' mt-row-new' : ''}${open ? ' mt-row-open' : ''}`}
                      onClick={() => toggle(m.id)}
                    >
                      <td className="mt-model">
                        {/* The button is the accessible control; the row
                            click is a bigger target for the same toggle. */}
                        <button
                          type="button"
                          className="mt-name-btn"
                          aria-expanded={open}
                          aria-controls={`mt-detail-${m.id}`}
                          onClick={(e) => { e.stopPropagation(); toggle(m.id); }}
                        >
                          <span className={`mt-caret${open ? ' is-open' : ''}`} aria-hidden="true">&#9656;</span>
                          <span className="mt-name">{m.name}</span>
                        </button>
                        {isNew ? <span className="mt-new">NEW</span> : null}
                        {m.kind === 'open_weight' ? (
                          <span className="mt-tag">on-device</span>
                        ) : null}
                      </td>
                      <td className="mt-use">
                        <span className="mt-chips mt-chips-row">
                          {infoFor(m).strengths.map((s) => (
                            <span key={s} className="mt-chip">{s}</span>
                          ))}
                        </span>
                      </td>
                      <td className="mt-ctx">{fmtCtx(m.contextWindow)}</td>
                      <td className="mt-num">{fmtUsd(m.inputUsdPerMTok)}</td>
                      <td className="mt-num">{fmtUsd(m.outputUsdPerMTok)}</td>
                    </tr>
                    {open ? <DetailRow model={m} /> : null}
                  </Fragment>
                );
              })}
              {openProv && list.length > PAGE ? (
                <tr className="mt-pager-row">
                  <td colSpan={5}>
                    <button type="button" className="mt-pager-btn" disabled={mPage === 0}
                      onClick={() => setModelPages((c) => ({ ...c, [provider]: mPage - 1 }))}>‹</button>
                    <span className="mt-pager-label">{mPage + 1} / {Math.ceil(list.length / PAGE)}</span>
                    <button type="button" className="mt-pager-btn" disabled={(mPage + 1) * PAGE >= list.length}
                      onClick={() => setModelPages((c) => ({ ...c, [provider]: mPage + 1 }))}>›</button>
                  </td>
                </tr>
              ) : null}
            </Fragment>
            );
          })}
        </tbody>
      </table>
      {totalPages > 1 ? (
        <div className="mt-pager">
          <button type="button" className="mt-pager-btn" disabled={pageClamped === 0} onClick={() => setPage(pageClamped - 1)}>‹</button>
          <span className="mt-pager-label">Providers {pageClamped + 1} / {totalPages}</span>
          <button type="button" className="mt-pager-btn" disabled={pageClamped + 1 >= totalPages} onClick={() => setPage(pageClamped + 1)}>›</button>
        </div>
      ) : null}
    </div>
  );
}
