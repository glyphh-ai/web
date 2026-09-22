// The four tiers as hairlined cells in the frame (restyled 2026-09-22): the
// plan, what it is for, the seat price — which is also the budget it carries,
// dollar for dollar — the door, then what the tier unlocks. The numbers and
// copy arrive from Pricing.js.
export default function PricingCards({ tiers, salesEmail, platformUrl }) {
  return (
    <div className="ix-grid ix-grid-4 pp-grid">
      {tiers.map((t) => (
        <div key={t.tier} className={`ix-card pp-card${t.popular ? ' pp-card-popular' : ''}`}>
          <div className="pp-card-top">
            <span className="pp-plan">{t.name}</span>
            {t.popular && <span className="pp-badge">Most popular</span>}
          </div>
          <p className="pp-desc">{t.desc}</p>
          <div className="pp-price">
            <b>{t.priceFigure}</b>
            <span>{t.priceSub}</span>
          </div>
          <a
            href={t.contactSales ? `mailto:${salesEmail}?subject=${encodeURIComponent('Glyphh Enterprise')}` : platformUrl}
            className={`os-cta os-cta-wide ${t.popular ? 'os-cta-primary' : 'os-cta-ghost'}`}
          >
            {t.cta}
          </a>
          <ul className="pp-features">
            {t.lead && <li className="pp-lead">{t.lead}</li>}
            {t.featureList.map((f, i) => (
              <li key={i}><span className="pp-check" aria-hidden="true">+</span>{f}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
