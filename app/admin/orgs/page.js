'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function AdminOrgsPage() {
  const [orgs, setOrgs] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => { loadOrgs(); }, []);

  async function loadOrgs() {
    const res = await api.get('/api/admin/orgs');
    if (res.ok) {
      const data = await res.json();
      setOrgs(data.orgs);
      setTotal(data.total);
    }
  }

  async function handleLock(orgId) {
    if (!confirm('Lock this organization? All members will be disabled.')) return;
    const res = await api.post(`/api/admin/orgs/${orgId}/lock`, { reason: 'Locked by super admin' });
    if (res.ok) loadOrgs();
  }

  async function handleUnlock(orgId) {
    const res = await api.post(`/api/admin/orgs/${orgId}/unlock`, {});
    if (res.ok) loadOrgs();
  }

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Organizations ({total})</h1>

      <table className="dash-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Members</th>
            <th>Tier</th>
            <th>Billing</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orgs.map(o => (
            <tr key={o.id}>
              <td>{o.name}</td>
              <td className="dash-mono">{o.slug}</td>
              <td>{o.member_count} / {o.max_seats}</td>
              <td><span className={`dash-tier-badge dash-tier-${o.tier}`}>{o.tier}</span></td>
              <td><span className={`dash-status dash-status-${o.billing_status}`}>{o.billing_status}</span></td>
              <td>{new Date(o.created_at).toLocaleDateString()}</td>
              <td>
                {o.billing_status === 'canceled' ? (
                  <button onClick={() => handleUnlock(o.id)} className="btn btn-sm btn-ghost-green">Unlock</button>
                ) : (
                  <button onClick={() => handleLock(o.id)} className="btn btn-sm btn-ghost dash-danger-btn">Lock</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
