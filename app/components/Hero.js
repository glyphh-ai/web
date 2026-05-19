import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MatrixParticles = dynamic(() => import("./MatrixParticles"), {
  ssr: false,
});

export default function Hero() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch("/api/version")
      .then((r) => r.json())
      .then((d) => {
        if (d.version) setVersion(d.version);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="hero">
      <MatrixParticles />
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Available for Mac &amp; Windows{version ? ` — ${version}` : ""}
        </div>
        <h1 className="hero-title">
          <span className="dot dot-hidden" id="hero-dot">
            .
          </span>
          Yo <span className="dot">.</span>Sup <span className="dot">.</span>Dip
        </h1>
        <p className="hero-sub-big">
          One agent, or a swarm of them — all yours, all local.
        </p>
        <p className="hero-sub">
          Solve what one agent can't. Tell the .yo agent a goal and it spins up
          a swarm — your own agents, split across the work and running in
          parallel on your machine. Or work solo: one AI workspace, your context
          everywhere.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#swarm" className="btn btn-ghost btn-lg group">
            <span className="btn-label">What's a Swarm?</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
