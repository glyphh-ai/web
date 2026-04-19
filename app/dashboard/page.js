'use client';

import { useEffect, useState } from 'react';
import { api, getUser } from '../lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);

  useEffect(() => {
    setUser(getUser());

    api.get('/api/user/me').then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    });

    api.get('/api/org/me').then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setOrg(data);
      }
    }).catch(() => {});
  }, []);

  if (!user) return null;

  const daysLeft = user.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(user.trialEndsAt) - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Dashboard</h1>

      <div className="dash-grid">
        <div className="dash-card">
          <h3 className="dash-card-label">Account</h3>
          <p className="dash-card-value">{user.firstName} {user.lastName}</p>
          <p className="dash-card-sub">{user.email}</p>
        </div>

        <div className="dash-card">
          <h3 className="dash-card-label">Organization</h3>
          <p className="dash-card-value">{user.orgName || '—'}</p>
          {org && <p className="dash-card-sub">{org.memberCount} / {org.max_seats} seats</p>}
        </div>

        <div className="dash-card">
          <h3 className="dash-card-label">Plan</h3>
          <p className="dash-card-value dash-tier">{user.tier === 'pro' ? 'Pro' : 'Free'}</p>
          {user.billingStatus === 'trial' && daysLeft !== null && (
            <p className="dash-card-sub">{daysLeft} days left in trial</p>
          )}
          {user.billingStatus === 'active' && (
            <p className="dash-card-sub dash-active">Active subscription</p>
          )}
        </div>

        <div className="dash-card">
          <h3 className="dash-card-label">Role</h3>
          <p className="dash-card-value">{user.role.replace('_', ' ')}</p>
        </div>
      </div>
    </div>
  );
}
