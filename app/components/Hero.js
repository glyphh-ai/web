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
          The apps you use,<br/>all in one window.
        </h1>
        <p className="hero-sub-big">
          Glyphh opens your email, chat, docs, spreadsheets, and favorite
          AI side by side in one app. An AI assistant watches over your
          shoulder — ask it questions, write a reply, fill a form, or
          hand off small jobs while you keep working.
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
