'use client';

import { useEffect, useState } from 'react';
import { getUser, clearTokens } from '../lib/api';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      window.location.href = '/auth/login';
      return;
    }
    setUser(u);
    setReady(true);
  }, []);

  function handleLogout() {
    clearTokens();
    window.location.href = '/auth/login';
  }

  if (!ready) return <div className="dash-loading">Loading...</div>;

  const isOrgAdmin = user.role === 'org_admin' || user.role === 'super_admin';

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <a href="/" className="dash-logo"><span className="auth-dot">.</span>Yo</a>
        <nav className="dash-nav">
          <a href="/dashboard" className="dash-nav-item">Overview</a>
          {isOrgAdmin && <a href="/dashboard/members" className="dash-nav-item">Members</a>}
          {isOrgAdmin && <a href="/dashboard/billing" className="dash-nav-item">Billing</a>}
          <a href="/dashboard/settings" className="dash-nav-item">Settings</a>
          {user.role === 'super_admin' && <a href="/admin" className="dash-nav-item dash-nav-admin">Admin</a>}
        </nav>
        <div className="dash-user">
          <span className="dash-user-email">{user.email}</span>
          <button onClick={handleLogout} className="dash-logout">Sign out</button>
        </div>
      </aside>
      <main className="dash-main">
        {children}
      </main>
    </div>
  );
}
