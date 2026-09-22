'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ModelTicker — a split-flap row between the connection rows (his order,
 * 2026-09-22): a strip of slots, each showing a model name; at random
 * moments a slot flips — the next name rises from the bottom and the old
 * one leaves off the top. Names come from public/data/model-ticker.json,
 * built from the catalog. Still under prefers-reduced-motion.
 */

const SLOTS = 6;
const FLIP_MS = 520;

function pick(names, avoid) {
  for (let i = 0; i < 8; i++) {
    const n = names[Math.floor(Math.random() * names.length)];
    if (!avoid.includes(n)) return n;
  }
  return names[Math.floor(Math.random() * names.length)];
}

export default function ModelTicker() {
  const [names, setNames] = useState(null);
  const [slots, setSlots] = useState(() => Array.from({ length: SLOTS }, () => ({ cur: '', next: null })));
  const timers = useRef([]);

  useEffect(() => {
    fetch('/data/model-ticker.json', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (!Array.isArray(list) || !list.length) return;
        // names that fit a slot without truncation
        const fit = list.filter((n) => n.length <= 24);
        setNames(fit.length > 50 ? fit : list);
        const first = [];
        const pool = fit.length > 50 ? fit : list;
        setSlots(Array.from({ length: SLOTS }, () => { const n = pick(pool, first); first.push(n); return { cur: n, next: null }; }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!names) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // each slot runs its own random clock: flip, settle, wait a random while, again
    const schedule = (i) => {
      const wait = 900 + Math.random() * 3200;
      timers.current[i] = setTimeout(() => {
        setSlots((s) => {
          const shown = s.map((x) => x.cur);
          const n = pick(names, shown);
          return s.map((x, j) => (j === i ? { ...x, next: n } : x));
        });
        timers.current[i] = setTimeout(() => {
          setSlots((s) => s.map((x, j) => (j === i && x.next ? { cur: x.next, next: null } : x)));
          schedule(i);
        }, FLIP_MS);
      }, wait);
    };
    for (let i = 0; i < SLOTS; i++) schedule(i);
    return () => timers.current.forEach(clearTimeout);
  }, [names]);

  return (
    <div className="mtk" aria-hidden="true">
      {slots.map((s, i) => (
        <div key={i} className="mtk-slot">
          <div className={`mtk-flip${s.next ? ' flipping' : ''}`}>
            <span className="mtk-name">{s.cur}</span>
            <span className="mtk-name">{s.next || ''}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
