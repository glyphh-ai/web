// The four tiers on one row, the ledger card: what a seat costs, which is also
// the budget it carries dollar for dollar, then what the tier unlocks. Plain
// markup; the numbers and copy arrive from Pricing.js.
export default function PricingCards({ tiers, salesEmail, platformUrl }) {
  return (
    <div className="pricing-grid pricing-grid-four">
      {tiers.map((t) => (
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

          <ul className="pricing-features">
            {t.lead && <li className="pricing-lead">{t.lead}</li>}
            {t.featureList.map((f, i) => (
              <li key={i}><span className="check">✓</span> {f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
