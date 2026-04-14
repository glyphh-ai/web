import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

const features = [
  'Unlimited AI panels',
  'Unlimited context capture',
  'AI-powered search & refine',
  'Local markdown library',
  'VS Code integration',
  'macOS & Windows',
  'All future updates',
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple pricing. No subscriptions.</h2>
        <div className="pricing-card reveal">
          <div className="pricing-header">
            <span className="pricing-logo"><span className="dot">.</span>Yo</span>
            <div className="pricing-amount">
              <span className="pricing-dollar">$</span>
              <span className="pricing-number">29</span>
            </div>
            <span className="pricing-period">one-time purchase</span>
          </div>
          <ul className="pricing-features">
            {features.map((f, i) => (
              <li key={i}><span className="check">&#10003;</span> {f}</li>
            ))}
          </ul>
          <a href="#download" className="btn btn-primary btn-lg btn-full group">
            <span className="btn-label">Download .Yo</span>
            <span className="btn-fill"></span>
          </a>
          <p className="pricing-note">Free to try. Pay when you&apos;re ready.</p>
        </div>
      </div>
    </section>
  );
}
