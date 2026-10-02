'use client';

import { useEffect, useState } from 'react';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

/**
 * QuickStart — get Glyphh, as a terminal (the deviation, 2026-09-22: tabs
 * were the reference's move; a prompt is ours). One block: the prompt line,
 * a "detected" line naming the visitor's platform, the highlighted target
 * with its command or artifact, then every other way to get it, one per
 * row, numbered. The rows are real links. Number keys and arrows move the
 * highlight; Enter follows it. The block never changes height.
 */

const TARGETS = [
  { id: 'mac-arm', key: '1', label: 'macOS · Apple Silicon', cmd: 'Glyphh-arm64.dmg', href: '/api/download?platform=mac&arch=arm64', verb: 'download' },
  { id: 'mac-x64', key: '2', label: 'macOS · Intel', cmd: 'Glyphh-x64.dmg', href: '/api/download?platform=mac&arch=x64', verb: 'download' },
  { id: 'win', key: '3', label: 'Windows · x64', cmd: 'Glyphh-Setup.exe', href: '/api/download?platform=win', verb: 'download' },
  { id: 'linux', key: '4', label: 'Linux · x64', cmd: 'Glyphh-x64.AppImage', href: '/api/download?platform=linux', verb: 'download' },
  { id: 'cli', key: '5', label: 'CLI · any OS', cmd: 'npm i -g @glyphh-ai/cli && glyphh', href: 'https://docs.glyphh.ai/cli', verb: 'install' },
  { id: 'web', key: '6', label: 'Web · the platform', cmd: 'platform.glyphh.ai', href: PLATFORM_URL, verb: 'open' },
];

function detect() {
  if (typeof navigator === 'undefined') return { id: 'mac-arm', name: 'macOS (Apple Silicon)' };
  const ua = navigator.userAgent || '';
  if (/windows/i.test(ua)) return { id: 'win', name: 'Windows' };
  if (/linux|x11|bsd/i.test(ua) && !/android/i.test(ua)) return { id: 'linux', name: 'Linux' };
  if (/mac|darwin/i.test(ua)) return { id: 'mac-arm', name: 'macOS (Apple Silicon)' };
  return { id: 'mac-arm', name: 'macOS (Apple Silicon)' };
}

export default function QuickStart() {
  const [det, setDet] = useState({ id: 'mac-arm', name: 'macOS (Apple Silicon)' });
  const [sel, setSel] = useState('mac-arm');
  useEffect(() => { const d = detect(); setDet(d); setSel(d.id); }, []);

  // keyboard: numbers pick, arrows move, Enter follows — only while the block has focus
  const onKey = (e) => {
    const idx = TARGETS.findIndex((t) => t.id === sel);
    const byKey = TARGETS.find((t) => t.key === e.key);
    if (byKey) { setSel(byKey.id); e.preventDefault(); return; }
    if (e.key === 'ArrowDown' || e.key === 'j') { setSel(TARGETS[(idx + 1) % TARGETS.length].id); e.preventDefault(); }
    if (e.key === 'ArrowUp' || e.key === 'k') { setSel(TARGETS[(idx - 1 + TARGETS.length) % TARGETS.length].id); e.preventDefault(); }
    if (e.key === 'Enter') { const t = TARGETS[idx]; if (t) window.location.href = t.href; }
  };

  const current = TARGETS.find((t) => t.id === sel) || TARGETS[0];

  return (
    <section className="qs" id="quick-start">
      <div className="qs-head">
        <span className="qs-kicker">Quick start</span>
        <a href="https://docs.glyphh.ai/install" className="qs-more">All download options &rarr;</a>
      </div>

      <div className="term" tabIndex={0} onKeyDown={onKey} aria-label="Quick start: pick how to get Glyphh">
        <div className="term-bar">
          <span className="term-dot" /><span className="term-dot" /><span className="term-dot" />
          <span className="term-title">glyphh — quick start</span>
          <span className="term-hint">1–6 · ↑↓ · enter</span>
        </div>
        <div className="term-body">
          <p className="term-line"><span className="term-prompt">$</span> glyphh quick-start</p>
          <p className="term-line term-dim">detected: {det.name}</p>
          <p className="term-line term-target">
            <span className="term-arrow">&rarr;</span>
            <a href={current.href} className="term-go">{current.verb} {current.cmd}</a>
            <span className="term-enter">[enter]</span>
          </p>
          <ol className="term-list">
            {TARGETS.map((t) => (
              <li key={t.id} className={`term-row${t.id === sel ? ' sel' : ''}${t.id === det.id ? ' here' : ''}`}>
                <a href={t.href} onMouseEnter={() => setSel(t.id)} onFocus={() => setSel(t.id)}>
                  <span className="term-key">{t.key}</span>
                  <span className="term-label">{t.label}</span>
                  <span className="term-cmd">{t.cmd}</span>
                  {t.id === det.id ? <span className="term-tag">this machine</span> : null}
                </a>
              </li>
            ))}
          </ol>
          <p className="term-line term-dim">
            free to install &middot; plans from $20 a month &middot; <a href="https://docs.glyphh.ai/install">docs/install</a>
            <span className="term-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
}
