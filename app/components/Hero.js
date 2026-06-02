import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const MatrixParticles = dynamic(() => import('./MatrixParticles'), { ssr: false });

export default function Hero() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('/api/version')
      .then(r => r.json())
      .then(d => { if (d.version) setVersion(d.version); })
      .catch(() => {});
  }, []);

  return (
    <section className="hero">
      <MatrixParticles />
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Available for Mac &amp; Windows{version ? ` — ${version}` : ''}
        </div>
        <h1 className="hero-title">
          The AI workspace for<br/>builders and operators.
        </h1>
        <p className="hero-sub-big">
          Automate work, run RPA flows, and vibe-code in a full IDE.
          Every tool you use speaks MCP. Every workflow starts with a dot.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#features" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
