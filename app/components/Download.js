'use client';

import { useState, useEffect } from 'react';

const DOWNLOAD_BASE = process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL
  || 'https://github.com/glyphh-ai/yo-client/releases/latest/download';

const DOWNLOADS = {
  mac: {
    label: 'Download for Mac',
    file: 'Yo.dmg',
    note: 'macOS 12+ (Apple Silicon & Intel)',
  },
  windows: {
    label: 'Download for Windows',
    file: 'Yo-Setup.exe',
    note: 'Windows 10+',
  },
};

export default function Download() {
  const [os, setOs] = useState('mac');

  useEffect(() => {
    const ua = (navigator.userAgent || '').toLowerCase();
    if (ua.includes('win')) setOs('windows');
  }, []);

  const primary = DOWNLOADS[os];
  const secondary = DOWNLOADS[os === 'mac' ? 'windows' : 'mac'];

  return (
    <section className="download" id="download">
      <div className="container">
        <h2 className="section-title reveal">Get <span className="dot">.</span>Yo</h2>
        <p className="section-subtitle reveal">Free forever. No account required.</p>

        <div className="download-buttons reveal">
          <a
            href={`${DOWNLOAD_BASE}/${primary.file}`}
            className="btn btn-primary btn-xl group"
          >
            <span className="btn-label">{primary.label}</span>
            <span className="btn-fill"></span>
          </a>
          <a
            href={`${DOWNLOAD_BASE}/${secondary.file}`}
            className="btn btn-ghost-green btn-lg group"
          >
            <span className="btn-label">{secondary.label}</span>
            <span className="btn-fill"></span>
          </a>
        </div>

        <p className="download-note reveal">{primary.note}</p>
      </div>
    </section>
  );
}
