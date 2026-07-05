'use client';

import { useEffect, useRef } from 'react';

const GITHUB_URL = 'https://github.com/glyphh-ai';

// ── Hyperspace hero ─────────────────────────────────────────────────
// A single point cloud (~1,100 particles) morphs between projections of
// the things we research: a hypervector shell, Ada's layered fact
// lattice, a binding torus, and two hypervectors mid-bind. Random pairs
// "bind" with a bright flash line. Pure 2D canvas, no deps.

const N = 1100;
const SHAPE_HOLD_MS = 5200;
const MORPH_MS = 2400;

function makeShapes() {
  const shapes = [];

  // 1 — hypervector shell (fibonacci sphere)
  {
    const pts = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = ga * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    shapes.push(pts);
  }

  // 2 — layered lattice: 7 stacked planes (Ada's 7-layer schema)
  {
    const pts = [];
    const layers = 7;
    const perLayer = Math.floor(N / layers);
    const side = Math.ceil(Math.sqrt(perLayer));
    for (let i = 0; i < N; i++) {
      const l = Math.min(layers - 1, Math.floor(i / perLayer));
      const j = i - l * perLayer;
      const gx = (j % side) / (side - 1) - 0.5;
      const gz = Math.floor(j / side) / (side - 1) - 0.5;
      const gy = (l / (layers - 1) - 0.5) * 1.15;
      pts.push([gx * 1.7, gy, gz * 1.7]);
    }
    shapes.push(pts);
  }

  // 3 — binding torus
  {
    const pts = [];
    const R = 0.72, r = 0.34;
    for (let i = 0; i < N; i++) {
      const u = (i / N) * Math.PI * 2 * 19; // winds around
      const v = (i / N) * Math.PI * 2;
      pts.push([
        (R + r * Math.cos(u)) * Math.cos(v),
        r * Math.sin(u),
        (R + r * Math.cos(u)) * Math.sin(v),
      ]);
    }
    shapes.push(pts);
  }

  // 4 — two hypervectors mid-bind: interlocked rings
  {
    const pts = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2;
      const w = 0.07 * Math.sin(i * 12.9898); // slight ribbon width
      if (i % 2 === 0) {
        pts.push([Math.cos(t) * 0.78 - 0.34, Math.sin(t) * 0.78, w]);
      } else {
        pts.push([Math.cos(t) * 0.78 + 0.34, w, Math.sin(t) * 0.78]);
      }
    }
    shapes.push(pts);
  }

  return shapes;
}

export default function ResearchHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const shapes = makeShapes();
    // per-particle state: current pos, morph source, stagger, color
    const px = new Float32Array(N), py = new Float32Array(N), pz = new Float32Array(N);
    const sx = new Float32Array(N), sy = new Float32Array(N), sz = new Float32Array(N);
    const stagger = new Float32Array(N);
    const tint = new Uint8Array(N); // 0 violet, 1 light, 2 pink, 3 white spark
    for (let i = 0; i < N; i++) {
      const [x, y, z] = shapes[0][i];
      px[i] = sx[i] = x; py[i] = sy[i] = y; pz[i] = sz[i] = z;
      stagger[i] = (Math.sin(i * 78.233) * 0.5 + 0.5) * 0.35;
      const r = Math.sin(i * 12.9898) * 43758.5453;
      const f = r - Math.floor(r);
      tint[i] = f > 0.98 ? 3 : f > 0.82 ? 2 : f > 0.55 ? 1 : 0;
    }
    const COLORS = ['140, 59, 242', '179, 107, 251', '236, 72, 153', '255, 255, 255'];

    let shapeIdx = 0;
    let morphStart = -Infinity;
    let lastSwitch = 0;

    // binding flashes: {a, b, t0}
    const flashes = [];
    let lastFlash = 0;

    let w = 0, h = 0, dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // pointer parallax
    let targetRX = -0.28, targetRY = 0, curRX = -0.28, curRY = 0;
    function onPointer(e) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetRY = nx * 0.5;
      targetRX = -0.28 + ny * 0.35;
    }

    const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let raf = 0;
    let running = true;

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);

      // shape switching
      if (!reduced && now - lastSwitch > SHAPE_HOLD_MS + MORPH_MS) {
        lastSwitch = now;
        morphStart = now;
        for (let i = 0; i < N; i++) { sx[i] = px[i]; sy[i] = py[i]; sz[i] = pz[i]; }
        shapeIdx = (shapeIdx + 1) % shapes.length;
      }

      // binding flash spawn
      if (!reduced && now - lastFlash > 1150 && flashes.length < 3) {
        lastFlash = now;
        flashes.push({
          a: Math.floor(Math.random() * N),
          b: Math.floor(Math.random() * N),
          t0: now,
        });
      }

      const target = shapes[shapeIdx];
      const spin = now * 0.00011;
      curRY += (targetRY + spin - curRY) * 0.04;
      curRX += (targetRX - curRX) * 0.04;
      const cy = Math.cos(curRY), sy_ = Math.sin(curRY);
      const cx_ = Math.cos(curRX), sx_ = Math.sin(curRX);

      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w, h) * 0.36;
      const cxp = w * 0.5, cyp = h * 0.52;
      const proj = new Float32Array(N * 3); // sx, sy, depth-alpha

      for (let i = 0; i < N; i++) {
        // morph toward target with per-particle stagger
        const mt = (now - morphStart) / MORPH_MS;
        let k = Math.min(1, Math.max(0, (mt - stagger[i]) / (1 - stagger[i])));
        k = ease(k);
        const wob = reduced ? 0 : Math.sin(now * 0.0012 + i * 1.7) * 0.012;
        px[i] = sx[i] + (target[i][0] - sx[i]) * k + wob;
        py[i] = sy[i] + (target[i][1] - sy[i]) * k + Math.cos(now * 0.001 + i * 2.3) * (reduced ? 0 : 0.012);
        pz[i] = sz[i] + (target[i][2] - sz[i]) * k;

        // rotate Y then X
        let x = px[i] * cy - pz[i] * sy_;
        let z = px[i] * sy_ + pz[i] * cy;
        let y = py[i] * cx_ - z * sx_;
        z = py[i] * sx_ + z * cx_;

        const persp = 1 / (1 + z * 0.32);
        const X = cxp + x * scale * persp;
        const Y = cyp + y * scale * persp;
        const depth = Math.max(0.08, Math.min(1, (1.1 - z) * 0.62));
        proj[i * 3] = X; proj[i * 3 + 1] = Y; proj[i * 3 + 2] = depth;

        const size = (tint[i] === 3 ? 2.4 : 1.6) * persp;
        ctx.fillStyle = `rgba(${COLORS[tint[i]]}, ${depth})`;
        ctx.fillRect(X - size / 2, Y - size / 2, size, size);
      }

      // binding flashes: line draws in, pulses, fades
      for (let f = flashes.length - 1; f >= 0; f--) {
        const fl = flashes[f];
        const t = (now - fl.t0) / 1000;
        if (t > 1) { flashes.splice(f, 1); continue; }
        const ax = proj[fl.a * 3], ay = proj[fl.a * 3 + 1];
        const bx = proj[fl.b * 3], by = proj[fl.b * 3 + 1];
        const drawT = Math.min(1, t / 0.4);
        const fade = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
        const mx = ax + (bx - ax) * drawT;
        const my = ay + (by - ay) * drawT;
        ctx.strokeStyle = `rgba(236, 72, 153, ${0.55 * fade})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(mx, my);
        ctx.stroke();
        if (drawT === 1) {
          const pr = 2.5 + (t - 0.4) * 10;
          ctx.strokeStyle = `rgba(179, 107, 251, ${0.5 * fade})`;
          ctx.beginPath();
          ctx.arc(bx, by, pr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (reduced) { running = false; }
    }

    raf = requestAnimationFrame(frame);
    lastSwitch = performance.now();

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <section className="rhero">
      <div className="rhero-canvas-wrap" aria-hidden="true">
        <canvas ref={canvasRef} className="rhero-canvas" />
        <div className="rhero-vignette"></div>
      </div>
      <div className="rhero-inner">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true"></span>
          AI research &amp; development — everything open source
        </div>
        <h1 className="rhero-title">
          Building the <span className="hero-accent">substrate</span> of machine intelligence.
        </h1>
        <p className="rhero-sub">
          Glyphh is an AI research and development company. We work at the
          frontier of vector-symbolic architectures, hyperdimensional
          computing, memory systems, and agentic runtimes — and everything
          we build ships in the open.
        </p>
        <div className="hero-ctas rhero-ctas">
          <a href="/research" className="btn btn-primary btn-lg group">
            <span className="btn-label">Explore the research</span>
            <span className="btn-fill"></span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg group">
            <span className="btn-label">github.com/glyphh-ai ↗</span>
            <span className="btn-fill"></span>
          </a>
        </div>
        <div className="rhero-ticker" aria-hidden="true">
          <span>[ vsa ]</span>
          <span>[ hdc ]</span>
          <span>[ memory ]</span>
          <span>[ agentic runtimes ]</span>
        </div>
      </div>
    </section>
  );
}
