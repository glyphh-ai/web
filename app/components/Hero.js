import dynamic from 'next/dynamic';

const MatrixParticles = dynamic(() => import('./MatrixParticles'), { ssr: false });

export default function Hero() {
  return (
    <section className="hero">
      <MatrixParticles />
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Now available for macOS &amp; Windows
        </div>
        <h1 className="hero-title">
          <span className="dot dot-hidden" id="hero-dot">.</span>Yo <span className="dot">.</span>Sup <span className="dot">.</span>Dip
        </h1>
        <p className="hero-sub-big">
          The only three commands you need to become superhuman.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download .Yo</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#how-it-works" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
