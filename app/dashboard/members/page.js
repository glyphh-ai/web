'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadMembers(); }, []);

  async function loadMembers() {
    const res = await api.get('/api/org/members');
    if (res.ok) {
      const data = await res.json();
      setMembers(data);
    }
  }

  async function handleInvite(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await api.post('/api/org/members/invite', { email: inviteEmail });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invite failed');
        return;
      }

      setSuccess(`Invited ${inviteEmail}`);
      setInviteEmail('');
      loadMembers();
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(userId) {
    if (!confirm('Remove this member?')) return;
    const res = await api.delete(`/api/org/members/${userId}`);
    if (res.ok) loadMembers();
  }

  async function handleRoleChange(userId, role) {
    await api.patch(`/api/org/members/${userId}/role`, { role });
    loadMembers();
  }

  return (
    <div className="dash-content">
      <h1 className="dash-h1">Members</h1>

      <form onSubmit={handleInvite} className="dash-invite-form">
        <input
          type="email"
          value={inviteEmail}
          onChange={e => setInviteEmail(e.target.value)}
          className="auth-input dash-invite-input"
          placeholder="colleague@company.com"
          required
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Inviting...' : 'Invite'}
        </button>
      </form>

      {error && <p className="auth-error">{error}</p>}
      {success && <p className="dash-success">{success}</p>}

      <table className="dash-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.email}</td>
              <td>{m.first_name || ''} {m.last_name || ''}</td>
              <td>
                <select
                  value={m.role}
                  onChange={e => handleRoleChange(m.id, e.target.value)}
                  className="dash-role-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="org_admin">Org Admin</option>
                </select>
              </td>
              <td><span className={`dash-status dash-status-${m.status}`}>{m.status}</span></td>
              <td>
                <button onClick={() => handleRemove(m.id)} className="dash-remove-btn">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
