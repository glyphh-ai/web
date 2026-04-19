'use client';

import { useEffect, useState } from 'react';
import { api, getUser } from '../../lib/api';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/api/user/me').then(async (res) => {
      if (res.ok) setUser(await res.json());
    });
  }, []);

  async function handlePasswordChange(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.post('/api/user/change-password', { currentPassword, newPassword });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Password change failed');
        return;
      }

      setSuccess('Password updated');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Settings</h1>

      <div className="dash-card">
        <h3 className="dash-card-label">Profile</h3>
        <div className="dash-profile-info">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role.replace('_', ' ')}</p>
          <p><strong>Organization:</strong> {user.orgName || '—'}</p>
        </div>
      </div>

      <div className="dash-card">
        <h3 className="dash-card-label">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="dash-pw-form">
          <label className="auth-label">Current password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="auth-input"
            required
            disabled={loading}
          />
          <label className="auth-label">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="auth-input"
            placeholder="Min 8 characters"
            required
            disabled={loading}
          />
          {error && <p className="auth-error">{error}</p>}
          {success && <p className="dash-success">{success}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
