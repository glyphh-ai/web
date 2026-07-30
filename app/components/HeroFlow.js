'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroFlow — the flowing-data-streams hero backdrop. Animated dashed strokes
 * with bright pulses riding a few of them and twinkling scatter clusters at
 * the ends. Pure 2D canvas, no deps, aria-hidden.
 *
 * One effect, three orientations — each surface tells the same visual story
 * in its own pattern:
 *   mode="fan"      (default, home) — bundled at the left, fanning right.
 *   mode="converge" (Desktop)       — streams from BOTH edges converging on
 *                                     the center: many sources, one workspace.
 *   mode="fall"     (CLI)           — bundled at the top, cascading down like
 *                                     terminal output.
 * `colors` tints the strokes/scatter (rgb triplet strings), `pulseRGB` the
 * riding highlight; defaults are the home purple set, so existing call sites
 * render exactly as before.
 */

const DEFAULT_COLORS = ['179, 107, 251', '140, 59, 242', '236, 72, 153']; // light-purple / purple / pink
const WHITE = '255, 255, 255';
const N = 28; // number of streams

function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function HeroFlow({
  mode = 'fan',
  colors = DEFAULT_COLORS,
  pulseRGB = '255, 236, 180',
  seed = 1337,
} = {}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // stream params, size-independent (fractions), built once. The rand()
    // call ORDER is identical across modes so a given seed produces the same
    // family of streams whatever the orientation.
    const rand = mulberry(seed);
    const streams = Array.from({ length: N }, (_, i) => {
      const y0 = 0.5 + (rand() - 0.5) * 0.14;          // bundled near the origin edge
      const endRaw = rand();
      // fan/fall run most of the way across; converge stops mid-canvas so the
      // two sides' endpoints cluster around the center.
      const endX = mode === 'converge' ? 0.34 + endRaw * 0.28 : 0.42 + endRaw * 0.56;
      const y1 = 0.5 + (rand() - 0.5) * 0.95;          // fanned out at the far end
      return {
        y0, endX, y1,
        mirror: mode === 'converge' && i % 2 === 1,     // converge: odd streams enter from the far edge
        alpha: 0.12 + rand() * 0.24,
        tint: rand() < 0.72 ? 0 : rand() < 0.6 ? 1 : 2,
        dashSpeed: 0.02 + rand() * 0.05,
        dashPhase: rand() * 40,
        pulse: rand() < 0.5,
        pSpeed: 0.00010 + rand() * 0.00014,
        pPhase: rand(),
        scatter: Array.from({ length: 4 + Math.floor(rand() * 7) }, () => ({
          dx: rand() * 46, dy: (rand() - 0.5) * 26,
          s: 1 + rand() * 2, a: 0.3 + rand() * 0.6,
          tw: rand() * Math.PI * 2, tr: 0.5 + rand() * 1.5,
          tint: rand() < 0.5 ? 0 : rand() < 0.5 ? 2 : 3,
        })),
      };
    });

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

    // Map a unit-space point (run ∈ 0..1 along the flow axis, fan ∈ 0..1
    // across it) to canvas pixels for the current orientation.
    function mapPt(S, run, fan) {
      if (mode === 'fall') return [fan * w, run * h];
      const x = S.mirror ? (1 - run) * w : run * w;
      return [x, fan * h];
    }

    /** The stream's 4 cubic control points in canvas space. */
    function ctrl(S) {
      return [
        mapPt(S, 0, S.y0),
        mapPt(S, S.endX * 0.42, S.y0),
        mapPt(S, S.endX * 0.72, S.y1),
        mapPt(S, S.endX, S.y1),
      ];
    }

    // cubic bezier point at parameter t (0..1)
    function pointAt(P, t) {
      const u = 1 - t;
      const x = u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0];
      const y = u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1];
      return [x, y];
    }

    let raf = 0, running = true;

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);

      // ── streams (animated dashes) ───────────────────────────────────
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (let i = 0; i < streams.length; i++) {
        const S = streams[i];
        const P = ctrl(S);
        ctx.setLineDash([2, 5]);
        ctx.lineDashOffset = reduced ? 0 : -(now * S.dashSpeed) - S.dashPhase;
        ctx.strokeStyle = `rgba(${colors[S.tint]}, ${S.alpha})`;
        ctx.beginPath();
        ctx.moveTo(P[0][0], P[0][1]);
        ctx.bezierCurveTo(P[1][0], P[1][1], P[2][0], P[2][1], P[3][0], P[3][1]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // ── end scatter clusters + pulses (additive glow) ───────────────
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < streams.length; i++) {
        const S = streams[i];
        const P = ctrl(S);
        const ex = P[3][0], ey = P[3][1];

        for (const d of S.scatter) {
          const tw = reduced ? 0.8 : 0.45 + 0.55 * Math.sin(now * 0.0018 * d.tr + d.tw);
          const col = d.tint === 3 ? WHITE : colors[d.tint];
          // Scatter trails the flow direction: past the end for fan, back
          // toward the entering edge for converge, downward for fall.
          const sx = mode === 'fall' ? d.dy : (S.mirror ? -d.dx : d.dx);
          const sy = mode === 'fall' ? d.dx : d.dy;
          ctx.fillStyle = `rgba(${col}, ${d.a * tw})`;
          ctx.beginPath();
          ctx.arc(ex + sx, ey + sy, d.s / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (S.pulse && !reduced) {
          const t = (now * S.pSpeed + S.pPhase) % 1;
          const [x, y] = pointAt(P, t);
          const g = Math.sin(t * Math.PI); // fade in/out along the run
          ctx.fillStyle = `rgba(${pulseRGB}, ${0.9 * g})`;
          ctx.shadowColor = `rgba(${colors[S.tint]}, 0.9)`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      ctx.globalCompositeOperation = 'source-over';

      // ── center vignette so the copy stays legible ───────────────────
      const vg = ctx.createRadialGradient(w / 2, h * 0.46, 0, w / 2, h * 0.46, h * 0.62);
      vg.addColorStop(0, 'rgba(8, 6, 12, 0.6)');
      vg.addColorStop(0.55, 'rgba(8, 6, 12, 0.12)');
      vg.addColorStop(1, 'rgba(8, 6, 12, 0)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      if (reduced) running = false;
    }

    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; raf = requestAnimationFrame(frame); }
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [mode, colors, pulseRGB, seed]);

  return (
    <div className="hero-flow" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-flow-canvas" />
    </div>
  );
}
