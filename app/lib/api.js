/**
 * API client for yo-server.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.glyphh.ai';
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

/** Get stored auth tokens. */
export function getTokens() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('yo_auth');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/** Store auth tokens. */
export function setTokens(tokens) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('yo_auth', JSON.stringify(tokens));
  const domain = location.hostname === 'localhost' ? '' : '; domain=.glyphh.ai';
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `yo_logged_in=1; path=/${domain}; max-age=${60 * 60 * 24 * 30}; SameSite=Lax${secure}`;
}

/** Clear auth tokens. */
export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('yo_auth');
  const domain = location.hostname === 'localhost' ? '' : '; domain=.glyphh.ai';
  document.cookie = `yo_logged_in=; path=/${domain}; max-age=0`;
}

/** Get current user from stored auth. */
export function getUser() {
  const tokens = getTokens();
  return tokens?.user || null;
}

/** Make an authenticated API request. */
async function request(path, opts = {}) {
  const tokens = getTokens();
  const headers = {
    'Content-Type': 'application/json',
    ...(tokens?.accessToken ? { 'Authorization': `Bearer ${tokens.accessToken}` } : {}),
    ...opts.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers,
    credentials: 'include',
  });

  if (res.status === 401 && tokens?.refreshToken) {
    // Try refresh
    const refreshRes = await fetch(`${API_URL}/api/session/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: tokens.refreshToken }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      setTokens({ ...data, user: data.user });
      headers['Authorization'] = `Bearer ${data.accessToken}`;
      return fetch(`${API_URL}${path}`, { ...opts, headers, credentials: 'include' });
    } else {
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = `${PLATFORM_URL}/auth/login`;
      }
      throw new Error('Session expired');
    }
  }

  return res;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
