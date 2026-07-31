'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * HomeDemo — the 75-second demo, click-to-play (never autoplay with
 * sound). Until clicked, the poster is a muted loop of the model-swap
 * moment; under prefers-reduced-motion the loop stays parked on its first
 * frame. `id="demo"` is the hero's secondary-CTA target.
 *
 * TODO(chris): swap DEMO_SRC for the final 75s cut (ends on the mid-task
 * model swap) and POSTER_SRC for the 5-second muted swap loop.
 */

const DEMO_SRC = '/screen-shots/glyphh-hero.mp4';
const POSTER_SRC = '/screen-shots/glyphh-hero.mp4';

export default function HomeDemo() {
  const [playing, setPlaying] = useState(false);
  const loopRef = useRef(null);

  useEffect(() => {
    const vid = loopRef.current;
    if (!vid) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    vid.play().catch(() => { /* poster frame is the fallback */ });
  }, [playing]);

  return (
    <section className="home-demo" id="demo">
      <div className="container">
        <h2 className="section-title reveal">Watch a Tuesday morning.</h2>
        <div className="home-demo-frame reveal">
          {playing ? (
            <video src={DEMO_SRC} controls autoPlay playsInline className="home-demo-video" />
          ) : (
            <button
              type="button"
              className="home-demo-poster"
              onClick={() => setPlaying(true)}
              aria-label="Play the 75-second demo"
            >
              <video ref={loopRef} src={POSTER_SRC} muted loop playsInline preload="metadata" className="home-demo-video" />
              <span className="home-demo-play" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
