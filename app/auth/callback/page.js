'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  // This page exists for Electron's BrowserWindow to detect via will-navigate.
  // The Electron client intercepts navigation to /auth/callback?code=XXX
  // and extracts the device code. If the user somehow lands here in a real browser,
  // show a helpful message.

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          <span className="auth-dot">.</span>Yo
        </h1>
        {code ? (
          <>
            <p className="auth-subtitle">Authentication complete</p>
            <p className="auth-desc">You can close this window and return to the Yo app.</p>
          </>
        ) : (
          <>
            <p className="auth-subtitle">Invalid callback</p>
            <p className="auth-desc">This page should only be accessed from the Yo desktop app.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card"><p>Loading...</p></div></div>}>
      <CallbackContent />
    </Suspense>
  );
}
