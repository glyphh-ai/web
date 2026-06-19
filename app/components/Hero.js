'use client';

import { useEffect, useRef, useState } from 'react';

const PREFIX = 'Productivity ';
const SUFFIX = ' across every app you use.';
const VERBS = ['created', 'amplified', 'rebuilt', 'automated', 're-imagined', 'supercharged'];

function TypewriterLine() {
  const [text, setText] = useState('');
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    let cancelled = false;
    let timer;
    let current = '';
    let verbIdx = 0;

    const set = (s) => { current = s; setText(s); };
    const wait = (ms) => new Promise((r) => { timer = setTimeout(r, ms); });

    const type = (target) => new Promise((resolve) => {
      const step = () => {
        if (cancelled) return;
        if (current.length >= target.length) { resolve(); return; }
        set(target.slice(0, current.length + 1));
        timer = setTimeout(step, 55 + Math.random() * 40);
      };
      step();
    });

    const backspaceTo = (target) => new Promise((resolve) => {
      const step = () => {
        if (cancelled) return;
        if (current === target) { resolve(); return; }
        set(current.slice(0, -1));
        timer = setTimeout(step, 28 + Math.random() * 18);
      };
      step();
    });

    (async () => {
      while (!cancelled) {
        const full = PREFIX + VERBS[verbIdx] + SUFFIX;
        await type(full);
        await wait(2400);
        if (cancelled) return;
        await backspaceTo(PREFIX);
        await wait(220);
        verbIdx = (verbIdx + 1) % VERBS.length;
      }
    })();

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return (
    <span className="typewriter">
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title hero-title-type">
          <TypewriterLine />
        </h1>
        <p className="hero-sub-big">
          Glyphh brings an AI assistant into every app you already work in
          — your IDE, inbox, browser, chat, and beyond — all in one native
          workspace. No more jumping between tools: it answers questions,
          drafts replies, fixes bugs, and automates the busywork right
          alongside you, so you stay in flow.
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
