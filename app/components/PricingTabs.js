'use client';

import { useState } from 'react';

// The pricing cards, in two views: who you are buying for. The numbers and
// copy arrive from the server component (Pricing.js); this only switches the
// view and renders the ledger-style card: what a seat costs, what budget it
// carries, what it unlocks.
export default function PricingTabs({ groups, salesEmail, platformUrl }) {
  const [active, setActive] = useState(groups[0]?.key ?? '');
  const group = groups.find((g) => g.key === active) ?? groups[0];
  if (!group) return null;
  const cols = group.tiers.length === 1 ? 'pricing-grid-single' : group.tiers.length === 2 ? 'pricing-grid-two' : 'pricing-grid-three';

  return (
    <>
      <div className="hs-tabs pricing-tabs" role="tablist" aria-label="Who the plan is for">
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            aria-selected={g.key === group.key}
            className={`hs-tab ${g.key === group.key ? 'active' : ''}`}
            onClick={() => setActive(g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={`pricing-grid ${cols}`} role="tabpanel">
        {group.tiers.map((t) => (
          <div key={t.tier} className={`pricing-card pricing-card-ledger${t.popular ? ' pricing-card-popular' : ''}`}>
            {t.popular && <span className="pricing-badge">Most popular</span>}
            <span className="pricing-plan-name">{t.name}</span>
            <p className="pricing-desc">{t.desc}</p>
            <a
              href={t.contactSales ? `mailto:${salesEmail}?subject=${encodeURIComponent('Glyphh Enterprise')}` : platformUrl}
              className={`btn ${t.btn} btn-lg btn-full group`}
            >
              <span className="btn-label">{t.cta}</span>
              <span className="btn-fill"></span>
            </a>

            <div className="pricing-row">
              <div className="pricing-row-head">
                <span className="pricing-row-title">{t.priceTitle}</span>
                <span className="pricing-row-figure">{t.priceFigure}</span>
              </div>
              <p className="pricing-row-sub">{t.priceSub}</p>
            </div>

            <div className="pricing-row">
              <div className="pricing-row-head">
                <span className="pricing-row-title">Budget included</span>
                <span className="pricing-row-figure">{t.budgetFigure}</span>
              </div>
              <p className="pricing-row-sub">{t.budgetSub}</p>
            </div>

            <ul className="pricing-features">
              {t.lead && <li className="pricing-lead">{t.lead}</li>}
              {t.featureList.map((f, i) => (
                <li key={i}><span className="check">✓</span> {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
