'use client';

import { useEffect, useState } from 'react';
import { api, getUser } from '../../lib/api';

export default function BillingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/user/me').then(async (res) => {
      if (res.ok) setUser(await res.json());
    });
  }, []);

  async function handleUpgrade() {
    const res = await api.get('/api/billing/checkout/url');
    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url;
    }
  }

  async function handlePortal() {
    const res = await api.get('/api/billing/portal');
    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url;
    }
  }

  if (!user) return null;

  const daysLeft = user.trialEndsAt
    ? Math.max(0, Math.ceil((new Date(user.trialEndsAt) - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Billing</h1>

      <div className="dash-card dash-billing-card">
        <h3 className="dash-card-label">Current Plan</h3>
        <p className="dash-card-value dash-tier">{user.tier === 'pro' ? 'Pro' : 'Free'}</p>

        {user.billingStatus === 'trial' && daysLeft !== null && (
          <p className="dash-card-sub">{daysLeft} days remaining in trial</p>
        )}
        {user.billingStatus === 'active' && (
          <p className="dash-card-sub dash-active">Active subscription</p>
        )}
        {user.billingStatus === 'past_due' && (
          <p className="dash-card-sub dash-warning">Payment past due</p>
        )}
        {user.billingStatus === 'canceled' && (
          <p className="dash-card-sub">Subscription canceled</p>
        )}

        <div className="dash-billing-actions">
          {user.tier !== 'pro' && (
            <button onClick={handleUpgrade} className="btn btn-primary btn-lg">
              Upgrade to Pro
            </button>
          )}
          {user.billingStatus === 'active' && (
            <button onClick={handlePortal} className="btn btn-ghost-green">
              Manage Subscription
            </button>
          )}
        </div>
      </div>

      <div className="dash-card">
        <h3 className="dash-card-label">Invoices</h3>
        <p className="dash-card-sub">
          Invoices are managed through the Stripe billing portal.
        </p>
        <button onClick={handlePortal} className="btn btn-ghost-green btn-sm">
          View Invoices
        </button>
      </div>
    </div>
  );
}
