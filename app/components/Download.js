'use client';

import { useEffect, useState } from 'react';

/**
 * OS + arch detection.
 *
 *   - Windows / Mac is reliable from User-Agent.
 *   - Mac arch is the tricky bit: Safari on Apple Silicon still reports
 *     "Intel" in UA for backwards-compat. We use NavigatorUAData where
 *     available (Chromium browsers expose `architecture`) and fall back
 *     to assuming arm64 — by 2026 the vast majority of Mac shipments are
 *     Apple Silicon, so this is the right default. Intel users get a
 *     "Got an Intel Mac?" link below the primary CTA.
 */
async function detectTarget() {
  if (typeof navigator === 'undefined') return { os: 'mac', arch: 'arm64' };
  const ua = navigator.userAgent || '';

  let os = 'mac';
  if (/windows/i.test(ua)) os = 'win';
  else if (/mac|darwin/i.test(ua)) os = 'mac';
  else if (/linux/i.test(ua)) os = 'linux';

  let arch = 'arm64';
  if (os === 'mac') {
    try {
      const uaData = navigator.userAgentData;
      if (uaData?.getHighEntropyValues) {
        const v = await uaData.getHighEntropyValues(['architecture']);
        if (v.architecture && /x86|x64/i.test(v.architecture)) arch = 'x64';
        else if (v.architecture && /arm/i.test(v.architecture)) arch = 'arm64';
      }
    } catch { /* default to arm64 */ }
  }

  return { os, arch };
}

export default function Download() {
  const [target, setTarget] = useState({ os: 'mac', arch: 'arm64' });
  const [archOverride, setArchOverride] = useState(null);

  useEffect(() => { detectTarget().then(setTarget); }, []);

  const arch = archOverride || target.arch;
  const isWin = target.os === 'win';

  const primaryHref = isWin
    ? '/api/download?platform=win'
    : `/api/download?platform=mac&arch=${arch}`;

  const primaryLabel = isWin
    ? 'Download for Windows'
    : `Download for Mac (${arch === 'x64' ? 'Intel' : 'Apple Silicon'})`;

  const altPlatformHref = isWin
    ? '/api/download?platform=mac&arch=arm64'
    : '/api/download?platform=win';
  const altPlatformLabel = isWin ? 'Download for Mac' : 'Download for Windows';

  return (
    <section className="download" id="download">
      <div className="container">
        <h2 className="section-title reveal">Get <span className="dot">.</span>Yo</h2>
        <p className="section-subtitle reveal">Free 14-day trial. No credit card required.</p>

        <div className="download-buttons reveal">
          <a href={primaryHref} className="btn btn-primary btn-xl group">
            <span className="btn-label">{primaryLabel}</span>
            <span className="btn-fill"></span>
          </a>
          <a href={altPlatformHref} className="btn btn-ghost-green btn-xl group">
            <span className="btn-label">{altPlatformLabel}</span>
            <span className="btn-fill"></span>
          </a>
        </div>

        {!isWin && (
          <p className="download-arch-toggle reveal" style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-2)' }}>
            {arch === 'arm64' ? (
              <>
                On an Intel Mac?{' '}
                <a
                  href="/api/download?platform=mac&arch=x64"
                  onClick={(e) => { e.preventDefault(); setArchOverride('x64'); }}
                  style={{ color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Get the Intel build
                </a>
              </>
            ) : (
              <>
                On Apple Silicon?{' '}
                <a
                  href="/api/download?platform=mac&arch=arm64"
                  onClick={(e) => { e.preventDefault(); setArchOverride('arm64'); }}
                  style={{ color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Get the Apple Silicon build
                </a>
              </>
            )}
          </p>
        )}

        <p className="download-note reveal">macOS 12+ (Apple Silicon &amp; Intel) &middot; Windows 10+</p>
      </div>
    </section>
  );
}
