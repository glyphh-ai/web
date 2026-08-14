import Nav from '../components/Nav';
import Reveal from '../components/Reveal';
import Pricing from '../components/Pricing';
import ModelsTable from '../components/ModelsTable';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Pricing & Models — Glyphh',
  description:
    'One credit system across every Glyphh product. 1 credit = 30 seconds of compute. See every model we support and its live credit price — no token markup, ever.',
};

// The model table must reflect the live catalog in the prod DB — never a baked
// snapshot — so this page renders dynamically and no-stores that fetch.
export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';
const NEW_MODEL_IDS = new Set(['moonshot::kimi-k3']);

const RULES = [
  {
    title: '1 credit = 30 seconds',
    desc: 'Every product meters the same way: 30 seconds of compute per credit, rounded up, 1-credit minimum per call.',
  },
  {
    title: 'Browsing is free',
    desc: 'Listing tools, browsing apps, and reading your own data never costs a credit. You pay when Glyphh computes for you.',
  },
  {
    title: 'Prepaid, itemized',
    desc: 'Credits are prepaid — never billed in arrears — and every charge is itemized per call in your usage feed.',
  },
];

async function loadCatalog() {
  try {
    const res = await fetch(`${API_BASE}/api/catalog/public/models`, {
      cache: 'no-store',
    });
    if (!res.ok) return { billing: null, models: [], error: `HTTP ${res.status}` };
    const json = await res.json();
    const data = json?.data ?? json ?? {};
    return {
      billing: data.billing ?? null,
      models: Array.isArray(data.models) ? data.models : [],
      error: null,
    };
  } catch (e) {
    return { billing: null, models: [], error: e?.message || 'fetch failed' };
  }
}

export default async function PricingPage() {
  const { billing, models, error } = await loadCatalog();

  // Group by provider (alphabetical); cheapest input rate first within each.
  const byProvider = new Map();
  for (const m of models) {
    const key = m.providerName || m.providerSlug || 'Other';
    if (!byProvider.has(key)) byProvider.set(key, []);
    byProvider.get(key).push(m);
  }
  const providers = [...byProvider.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [, list] of providers) {
    list.sort((a, b) => (a.inputCreditsPerMTok ?? 0) - (b.inputCreditsPerMTok ?? 0));
  }

  return (
    <div className="pricing-page">
      <Reveal />
      <Nav />
      <header className="page-hero page-hero-tight">
        <div className="pricing-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true"></span>
            PRICING
          </div>
          <h1 className="page-hero-title">
            One credit system<span className="dot">.</span>{' '}
            <span className="hero-accent">Every model.</span>
          </h1>
          <p className="page-hero-sub">
            Glyphh Desktop — and everything we ship next — draws from the same
            pool of credits. Each product spends them differently; the meter
            never changes.
          </p>
          <div className="credit-rules">
            {RULES.map((r) => (
              <div key={r.title} className="credit-rule reveal">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <Pricing />

      {/* Every supported model + its live credit price, pulled from the prod
          catalog on every request. */}
      <section className="models-section" id="models">
        <div className="container">
          <div className="models-table-head">
            <h2>Every model, and what it costs</h2>
            <span className="models-live">
              <span className="models-live-dot" aria-hidden="true"></span>
              Live from the catalog
            </span>
          </div>
          <p className="models-intro">
            Switch between any of these mid-task, loop agents on the hard ones,
            and pay the same transparent credit rate per model — no token
            markup. On-device models run on your own hardware and never cost a
            credit.
          </p>

          {error ? (
            <div className="models-error">
              Live pricing is temporarily unavailable. Please refresh in a moment.
            </div>
          ) : (
            /* Click a row for the model's card: icon, what it's good for,
               strengths, and the link to its origin (ModelsTable). */
            <ModelsTable providers={providers} newIds={[...NEW_MODEL_IDS]} />
          )}

          {billing ? (
            <p className="models-foot">
              Cached writes cost {billing.cacheWriteMultiplier}× the input rate;
              cached reads {billing.cacheReadMultiplier}×.
              {billing.computeSecondsPerCredit
                ? ` 1 credit = ${billing.computeSecondsPerCredit} seconds of compute.`
                : ''}
            </p>
          ) : null}
        </div>
      </section>

      <Footer />
    </div>
  );
}
