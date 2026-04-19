'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { setTokens } from '../../lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.yosup.dev';

function LoginFlow() {
  const searchParams = useSearchParams();
  const flow = searchParams.get('flow');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      setTokens(data);

      if (flow === 'electron') {
        // Generate device code for client handoff
        const deviceRes = await fetch(`${API_URL}/api/auth/device-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.accessToken}`,
          },
        });
        const deviceData = await deviceRes.json();
        if (deviceRes.ok) {
          window.location.href = `/auth/callback?code=${deviceData.code}`;
          return;
        }
      }

      window.location.href = '/dashboard';
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-title"><span className="auth-dot">.</span>Yo</a>
        <h2 className="auth-subtitle">Sign in to your account</h2>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
            placeholder="you@example.com"
            required
            autoFocus
            disabled={loading}
          />
          <label className="auth-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
            required
            disabled={loading}
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <a href="/auth/forgot-password" className="auth-link auth-forgot">Forgot password?</a>

        <p className="auth-footer-text">
          Don&apos;t have an account? <a href="/auth" className="auth-link">Create one</a>
        </p>
      </div>
      <p className="auth-copyright">&copy; {new Date().getFullYear()} Glyphh AI LLC. All rights reserved.</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card"><p>Loading...</p></div></div>}>
      <LoginFlow />
    </Suspense>
  );
}
