'use client';

import { useEffect, useState } from 'react';
import LetterField from './LetterField';
import { APP_URL, DOWNLOADS, RELEASES_URL, byId, detectDownload } from './downloads';

/**
 * DownloadDesktop — the Download section on the home page (his order,
 * 2026-10-04: the desktop download as a section and a CTA between the
 * others, in the frame's style). A kicker row, then a High Vis panel: the
 * visitor's own build as the big cell, with the letter hall behind it, the
 * release tag read live from /api/version, and the four builds as hairline
 * rows beside it, the visitor's own outlined in the accent. The foot sends
 * the browser crowd to app.glyphh.ai. The builds come from ./downloads.js,
 * the one source of truth; every link resolves against the latest release.
 */
export default function DownloadDesktop() {
  const [here, setHere] = useState('mac-arm');
  const [sel, setSel] = useState('mac-arm');
  const [version, setVersion] = useState(null);

  useEffect(() => {
    const id = detectDownload();
    setHere(id);
    setSel(id);
    let live = true;
    fetch('/api/version', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (live && j?.version) setVersion(j.version); })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  const pick = byId(sel);

  return (
    <section className="dls" id="download">
      <div className="qs-head">
        <span className="qs-kicker">Download</span>
        <a href={RELEASES_URL} className="qs-more" target="_blank" rel="noopener noreferrer">All releases &rarr;</a>
      </div>

      <div className="hv-panel dls-panel">
        <div className="dls-main">
          <div className="dls-hero">
            <LetterField seed={21} />
            <span className="dls-tag">{sel === here ? 'this machine' : 'selected'} &middot; {pick.os} {pick.arch}</span>
            <h3 className="dls-title">Glyphh Desktop</h3>
            <p className="dls-sub">
              The same app as app.glyphh.ai, on your machine. Sessions run in a folder on your desktop or
              in your org&rsquo;s cloud; the CLIs you already use ride along. Free to install.
            </p>
            <a href={pick.href} className="os-cta os-cta-primary dls-cta">
              Download for {pick.os} ({pick.arch})
            </a>
            <span className="dls-version">
              {version ? <>{version} &middot; </> : null}{pick.asset} &middot; {pick.requires}
            </span>
          </div>

          <ul className="dls-list" aria-label="Every build">
            {DOWNLOADS.map((d) => (
              <li key={d.id} className={`dls-row${d.id === sel ? ' sel' : ''}${d.id === here ? ' here' : ''}`}>
                <a href={d.href} onMouseEnter={() => setSel(d.id)} onFocus={() => setSel(d.id)}>
                  <span className="dls-os">{d.os}</span>
                  <span className="dls-arch">{d.arch}</span>
                  <span className="dls-asset">{d.asset}</span>
                  <span className="dls-go" aria-hidden="true">&darr;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="ww-foot dls-foot">
          <a href={APP_URL}>Or use it in your browser at app.glyphh.ai &rarr;</a>
          <a href="https://docs.glyphh.ai/install">Install and sign in &rarr;</a>
        </div>
      </div>
    </section>
  );
}
