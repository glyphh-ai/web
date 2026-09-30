// The self-serve tiers as hairlined cells in the frame (restyled 2026-09-22):
// the plan, what it is for, the seat price — which is also the budget it
// carries, dollar for dollar — the door, then what the tier unlocks. A tier
// sold through sales (Enterprise) has no figure to line up, so it sits in a
// band UNDER the grid (his order, 2026-09-22) with its bullets across and the
// door on the right. The numbers and copy arrive from Pricing.js.
export default function PricingCards({ tiers, salesEmail, platformUrl }) {
  const cards = tiers.filter((t) => !t.contactSales);
  const bands = tiers.filter((t) => t.contactSales);
  const salesHref = `mailto:${salesEmail}?subject=${encodeURIComponent('Glyphh Enterprise')}`;
  return (
    <>
      <div className={`ix-grid ix-grid-${cards.length} pp-grid`}>
        {cards.map((t) => (
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
            <a href={t.href ?? platformUrl} className={`os-cta os-cta-wide ${t.popular ? 'os-cta-primary' : 'os-cta-ghost'}`}>
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
      {bands.map((t) => (
        <div key={t.tier} className="pp-band">
          <div className="pp-band-head">
            <span className="pp-plan">{t.name}</span>
            <p className="pp-desc">{t.desc}</p>
            <p className="pp-band-sub">{t.priceSub}</p>
          </div>
          <ul className="pp-features pp-band-features">
            {t.lead && <li className="pp-lead">{t.lead}</li>}
            {t.featureList.map((f, i) => (
              <li key={i}><span className="pp-check" aria-hidden="true">+</span>{f}</li>
            ))}
          </ul>
          <a href={salesHref} className="os-cta os-cta-ghost pp-band-cta">{t.cta}</a>
        </div>
      ))}
    </>
  );
}
