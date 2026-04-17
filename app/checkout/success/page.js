'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001';
const DOWNLOAD_BASE = process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL
  || 'https://github.com/glyphh/yo-desktop/releases/latest/download';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [state, setState] = useState('loading'); // loading | success | error | retrying
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(`${DOWNLOAD_BASE}/Yo.dmg`);

  useEffect(() => {
    const ua = (navigator.userAgent || '').toLowerCase();
    if (ua.includes('win')) setDownloadUrl(`${DOWNLOAD_BASE}/Yo-Setup.exe`);
  }, []);

  useEffect(() => {
    if (!sessionId) {
      setState('error');
      setError('No session ID found. Please try again from the pricing page.');
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;

    async function fetchSession() {
      try {
        const res = await fetch(`${SERVER_URL}/api/checkout/session?session_id=${sessionId}`);
        const json = await res.json();

        if (res.ok && json.ok) {
          setData(json);
          setState('success');
          return;
        }

        // License not provisioned yet — webhook may be slow
        attempts++;
        if (attempts < maxAttempts) {
          setState('retrying');
          setTimeout(fetchSession, 3000);
        } else {
          setState('error');
          setError('Your payment was received but your license is still being provisioned. Please refresh in a minute or contact support.');
        }
      } catch (err) {
        attempts++;
        if (attempts < maxAttempts) {
          setState('retrying');
          setTimeout(fetchSession, 3000);
        } else {
          setState('error');
          setError('Unable to reach the server. Please refresh or contact support.');
        }
      }
    }

    fetchSession();
  }, [sessionId]);

  function copyKey() {
    if (data?.licenseKey) {
      navigator.clipboard.writeText(data.licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (state === 'loading' || state === 'retrying') {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-logo">
            <span className="success-logo-dot">.</span>
            <span className="success-logo-text">Yo</span>
          </div>
          <h1>{state === 'retrying' ? 'Setting up your account...' : 'Processing payment...'}</h1>
          <p className="success-sub">This usually takes just a moment.</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon success-icon-error">!</div>
          <h1>Something went wrong</h1>
          <p className="success-sub">{error}</p>
          <a href="/#pricing" className="btn btn-ghost-green btn-lg group">
            <span className="btn-label">Back to Pricing</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    );
  }

  const tierLabel = data.tier === 'pro' ? 'Pro' : data.tier;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#25C75E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h1>Welcome to <span className="dot">.</span>Yo {tierLabel}</h1>
        <p className="success-sub">Your subscription is active. Here&apos;s your license key:</p>

        <div className="success-key-box" onClick={copyKey}>
          <code className="success-key">{data.licenseKey}</code>
          <button className="success-copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
        </div>

        <div className="success-steps">
          <h2>Get started in 3 steps</h2>
          <ol>
            <li>
              <span className="success-step-num">1</span>
              <span>Download and install the <strong>.Yo</strong> desktop app</span>
            </li>
            <li>
              <span className="success-step-num">2</span>
              <span>Open the app (<code>Cmd+Shift+Y</code>)</span>
            </li>
            <li>
              <span className="success-step-num">3</span>
              <span>Go to <strong>Account</strong> and paste your license key</span>
            </li>
          </ol>
        </div>

        <div className="success-actions">
          <a href={downloadUrl} className="btn btn-primary btn-lg group">
            <span className="btn-label">Download .Yo</span>
            <span className="btn-fill"></span>
          </a>
          <a href="/" className="btn btn-ghost btn-lg group">
            <span className="btn-label">Back to Home</span>
            <span className="btn-fill"></span>
          </a>
        </div>

        <p className="success-email">A confirmation has been sent to <strong>{data.email}</strong></p>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="success-page">
        <div className="success-card">
          <div className="success-logo">
            <span className="success-logo-dot">.</span>
            <span className="success-logo-text">Yo</span>
          </div>
          <h1>Loading...</h1>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
