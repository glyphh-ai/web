'use client';

import { useEffect, useState } from 'react';

/**
 * OS detection (Mac / Win / Linux) from User-Agent. Reliable.
 *
 * Mac arch deliberately defaults to **Apple Silicon (arm64)** without
 * sniffing. By 2026 the vast majority of Mac shipments are Apple
 * Silicon, and Safari/Firefox don't expose architecture anyway —
 * sniffing only helps Chromium users and risks mis-labeling everyone
 * else. Intel users flip the CTA via the override link below the
 * buttons.
 */
function detectOS() {
  if (typeof navigator === 'undefined') return 'mac';
  const ua = navigator.userAgent || '';
  if (/windows/i.test(ua)) return 'win';
  if (/mac|darwin/i.test(ua)) return 'mac';
  if (/linux/i.test(ua)) return 'linux';
  return 'mac';
}

export default function Download() {
  const [os, setOs] = useState('mac');
  const [archOverride, setArchOverride] = useState(null);

  useEffect(() => { setOs(detectOS()); }, []);

  const arch = archOverride || 'arm64';
  const isWin = os === 'win';

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
        <h2 className="section-title reveal">Get Glyphh</h2>
        <p className="section-subtitle reveal">Free 14-day trial. No credit card required.</p>

        <div className="download-buttons reveal">
          <a href={primaryHref} className="btn btn-primary btn-xl group">
            <span className="btn-label">{primaryLabel}</span>
            <span className="btn-fill"></span>
          </a>
          <a href={altPlatformHref} className="btn btn-secondary btn-xl group">
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
