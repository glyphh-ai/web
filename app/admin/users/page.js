'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => { loadUsers(); }, [search, statusFilter]);

  async function loadUsers() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (statusFilter) params.set('status', statusFilter);
    const res = await api.get(`/api/admin/users?${params}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
      setTotal(data.total);
    }
  }

  async function handleDisable(userId) {
    if (!confirm('Disable this user?')) return;
    const res = await api.post(`/api/admin/users/${userId}/disable`, { reason: 'Disabled by super admin' });
    if (res.ok) loadUsers();
  }

  async function handleEnable(userId) {
    const res = await api.post(`/api/admin/users/${userId}/enable`, {});
    if (res.ok) loadUsers();
  }

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Users ({total})</h1>

      <div className="dash-filters">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="auth-input dash-search"
          placeholder="Search by email..."
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="dash-role-select">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="expired">Expired</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <table className="dash-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.first_name || ''} {u.last_name || ''}</td>
              <td>{u.role}</td>
              <td><span className={`dash-status dash-status-${u.status}`}>{u.status}</span></td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
              <td>
                {u.status === 'disabled' ? (
                  <button onClick={() => handleEnable(u.id)} className="btn btn-sm btn-ghost-green">Enable</button>
                ) : (
                  <button onClick={() => handleDisable(u.id)} className="btn btn-sm btn-ghost dash-danger-btn">Disable</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
