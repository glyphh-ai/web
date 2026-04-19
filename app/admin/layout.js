'use client';

import { useEffect, useState } from 'react';
import { getUser, clearTokens } from '../lib/api';

export default function AdminLayout({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u || u.role !== 'super_admin') {
      window.location.href = '/dashboard';
      return;
    }
    setReady(true);
  }, []);

  if (!ready) return <div className="dash-loading">Loading...</div>;

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <a href="/" className="dash-logo"><span className="auth-dot">.</span>Yo <span className="admin-badge">Admin</span></a>
        <nav className="dash-nav">
          <a href="/admin" className="dash-nav-item">Stats</a>
          <a href="/admin/orgs" className="dash-nav-item">Organizations</a>
          <a href="/admin/users" className="dash-nav-item">Users</a>
          <a href="/dashboard" className="dash-nav-item">Back to Dashboard</a>
        </nav>
        <div className="dash-user">
          <button onClick={() => { clearTokens(); window.location.href = '/auth/login'; }} className="dash-logout">Sign out</button>
        </div>
      </aside>
      <main className="dash-main">
        {children}
      </main>
    </div>
  );
}
