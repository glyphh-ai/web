'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AdminStatsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/api/admin/stats').then(async (res) => {
      if (res.ok) setStats(await res.json());
    });
  }, []);

  if (!stats) return <div className="dash-content"><p>Loading stats...</p></div>;

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Admin Dashboard</h1>

      <div className="dash-grid">
        <div className="dash-card">
          <h3 className="dash-card-label">Total Users</h3>
          <p className="dash-card-value">{stats.users.total}</p>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-label">Active</h3>
          <p className="dash-card-value">{stats.users.active || 0}</p>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-label">Trial</h3>
          <p className="dash-card-value">{stats.users.trial || 0}</p>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-label">Organizations</h3>
          <p className="dash-card-value">{stats.orgCount}</p>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-label">Expired</h3>
          <p className="dash-card-value">{stats.users.expired || 0}</p>
        </div>
        <div className="dash-card">
          <h3 className="dash-card-label">Disabled</h3>
          <p className="dash-card-value">{stats.users.disabled || 0}</p>
        </div>
      </div>
    </div>
  );
}
