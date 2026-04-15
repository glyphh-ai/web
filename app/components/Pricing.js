import dynamic from 'next/dynamic';

const SupernovaCanvas = dynamic(() => import('./SupernovaCanvas'), { ssr: false });

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';

const plans = [
  {
    name: 'Basic',
    price: '8',
    period: '/month',
    desc: 'For power users who want more from the extension.',
    cta: 'Start Basic',
    href: `${SERVER_URL}/api/checkout?plan=basic`,
    btnStyle: 'btn-ghost-green',
    features: [
      { text: '100 library items', included: true },
      { text: '25 skills', included: true },
      { text: 'Cloud sync across devices', included: true },
      { text: 'All 5 dot-commands', included: true },
      { text: 'AI-powered search', included: true },
      { text: 'MCP server access', included: false },
      { text: 'API keys for Claude Code / Cursor', included: false },
    ],
  },
  {
    name: 'Advanced',
    price: '12',
    period: '/month',
    desc: 'For developers who want .Yo in their IDE and AI tools.',
    cta: 'Start Advanced',
    href: `${SERVER_URL}/api/checkout?plan=advanced`,
    popular: true,
    btnStyle: 'btn-primary',
    features: [
      { text: 'Unlimited library items', included: true },
      { text: 'Unlimited skills', included: true },
      { text: 'Cloud sync across devices', included: true },
      { text: 'All 5 dot-commands', included: true },
      { text: 'AI-powered search', included: true },
      { text: 'MCP server access', included: true },
      { text: 'API keys for Claude Code / Cursor', included: true },
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <SupernovaCanvas />
      <div className="container">
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">The extension is free forever. Upgrade for more storage, cloud sync, and MCP.</p>

        <div className="pricing-grid">
          {/* Free card */}
          <div className="pricing-card pricing-card-free reveal">
            <div className="pricing-header">
              <span className="pricing-plan-name">Free</span>
              <div className="pricing-amount">
                <span className="pricing-dollar">$</span>
                <span className="pricing-number">0</span>
              </div>
              <span className="pricing-period">forever</span>
            </div>
            <ul className="pricing-features">
              <li><span className="check">&#10003;</span> 25 library items</li>
              <li><span className="check">&#10003;</span> 5 skills</li>
              <li><span className="check">&#10003;</span> All 5 dot-commands</li>
              <li><span className="check">&#10003;</span> Works on any website</li>
              <li><span className="check">&#10003;</span> BYOK — use your own API key</li>
              <li className="excluded"><span className="x">&times;</span> Cloud sync</li>
              <li className="excluded"><span className="x">&times;</span> MCP server</li>
            </ul>
            <a href="https://chrome.google.com/webstore" className="btn btn-ghost-green btn-lg btn-full group">
              <span className="btn-label">Install Extension</span>
              <span className="btn-fill"></span>
            </a>
          </div>

          {/* Paid plans */}
          {plans.map((plan, i) => (
            <div key={i} className={`pricing-card reveal${plan.popular ? ' pricing-card-popular' : ''}`}>
              {plan.popular && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-header">
                <span className="pricing-plan-name">{plan.name}</span>
                <div className="pricing-amount">
                  <span className="pricing-dollar">$</span>
                  <span className="pricing-number">{plan.price}</span>
                </div>
                <span className="pricing-period">{plan.period}</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map((f, j) => (
                  <li key={j} className={f.included ? '' : 'excluded'}>
                    <span className={f.included ? 'check' : 'x'}>{f.included ? '\u2713' : '\u00D7'}</span> {f.text}
                  </li>
                ))}
              </ul>
              <a href={plan.href} className={`btn ${plan.btnStyle} btn-lg btn-full group`}>
                <span className="btn-label">{plan.cta}</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          ))}
        </div>
        <p className="pricing-note">Cancel anytime. No questions asked.</p>
      </div>
    </section>
  );
}
