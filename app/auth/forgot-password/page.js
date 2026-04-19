'use client';

import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.yosup.dev';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          <span className="auth-dot">.</span>Yo
        </h1>

        {sent ? (
          <>
            <p className="auth-subtitle">Check your email</p>
            <p className="auth-desc">If an account exists for <strong>{email}</strong>, we sent a password reset link.</p>
            <a href="/auth/login" className="btn btn-ghost-green btn-lg auth-btn">Back to sign in</a>
          </>
        ) : (
          <>
            <p className="auth-subtitle">Reset your password</p>
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
              <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <a href="/auth/login" className="auth-link auth-forgot">Back to sign in</a>
          </>
        )}
      </div>
    </div>
  );
}
