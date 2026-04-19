'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CodeInput from '../components/CodeInput';
import { api, setTokens } from '../lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.yosup.dev';

function RegisterFlow() {
  const searchParams = useSearchParams();
  const flow = searchParams.get('flow'); // 'electron' for client auth
  const [step, setStep] = useState('email'); // email → code → profile → done
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      setStep('code');
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeComplete(codeValue) {
    setCode(codeValue);
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: codeValue }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed');
        setLoading(false);
        return;
      }

      setStep('profile');
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/complete-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          confirmPassword,
          orgName: orgName || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Account creation failed');
        return;
      }

      // Store tokens
      setTokens(data);

      // Handle device flow — generate device code and redirect to client
      if (flow === 'electron') {
        await handleDeviceRedirect(data.accessToken);
        return;
      }

      // Normal web flow — redirect to dashboard
      window.location.href = '/dashboard';
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeviceRedirect(accessToken) {
    try {
      const res = await fetch(`${API_URL}/api/auth/device-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStep('device-done');
      // The Electron BrowserWindow will intercept this navigation
      window.location.href = `/auth/callback?code=${data.code}`;
    } catch {
      setError('Failed to connect to app — please try again');
    }
  }

  async function handleResendCode() {
    setError('');
    setLoading(true);
    try {
      await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setError(''); // Clear any errors
    } catch {
      setError('Failed to resend code');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a href="/" className="auth-title"><span className="auth-dot">.</span>Yo</a>
        {step === 'email' && (
          <>
            <h2 className="auth-subtitle">Create your account</h2>
            <form onSubmit={handleEmailSubmit}>
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
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Continue'}
              </button>
            </form>
            <p className="auth-footer-text">
              Already have an account? <a href="/auth/login" className="auth-link">Sign in</a>
            </p>
            <p className="auth-legal">
              By creating an account, you agree to our <a href="/terms" className="auth-legal-link">Terms of Service</a>, <a href="/privacy" className="auth-legal-link">Privacy Policy</a>, and <a href="/refund" className="auth-legal-link">Refund Policy</a>.
            </p>
          </>
        )}

        {step === 'code' && (
          <>
            <p className="auth-subtitle">Check your email</p>
            <p className="auth-desc">We sent a 6-digit code to <strong>{email}</strong></p>
            <CodeInput onComplete={handleCodeComplete} />
            {error && <p className="auth-error">{error}</p>}
            {loading && <p className="auth-loading">Verifying...</p>}
            <button onClick={handleResendCode} className="auth-resend" disabled={loading}>
              Resend code
            </button>
          </>
        )}

        {step === 'profile' && (
          <>
            <p className="auth-subtitle">Complete your profile</p>
            <form onSubmit={handleProfileSubmit}>
              <div className="auth-row">
                <div>
                  <label className="auth-label">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="auth-input"
                    required
                    autoFocus
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="auth-label">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="auth-input"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              <label className="auth-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Min 8 characters"
                required
                disabled={loading}
              />
              <label className="auth-label">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
                disabled={loading}
              />
              <label className="auth-label">Organization <span className="auth-optional">(optional)</span></label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="auth-input"
                placeholder="Your company or team"
                disabled={loading}
              />
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg auth-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          </>
        )}

        {step === 'device-done' && (
          <>
            <p className="auth-subtitle">Redirecting to Yo...</p>
            <p className="auth-desc">You can close this window and return to the app.</p>
          </>
        )}
      </div>
      <p className="auth-copyright">&copy; {new Date().getFullYear()} Glyphh AI LLC. All rights reserved.</p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="auth-page"><div className="auth-card"><p>Loading...</p></div></div>}>
      <RegisterFlow />
    </Suspense>
  );
}
