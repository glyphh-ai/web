// The Ada gate at the edge (2026-10-25): is this session a person or a robot, from how it behaves?
//
// Every request the proxy sees is kept against its session (the glyphh_sid cookie; without one, the visitor's
// address and user agent together, so a scraper that keeps no cookies is still one session). At the 5th, 20th and
// 60th request the session's behaviour is turned into facts (the same roles and transforms as rrotor
// `benchmarks/bots/run.py`, edge features) and Ada Cloud's `bots-edge` model is asked to decide: allow (human),
// challenge (ask: either answer is dear) or block (bot). The call never waits on the response: it runs after the
// response is sent (waitUntil) and its verdict applies from the session's next request.
//
// Modes (ADA_GATE): off; shadow (default when GLYPHH_API_KEY is set): log every decision, enforce nothing, answer
// the verdict in an x-ada-gate header so it can be read with curl; enforce: a blocked session gets 403 from its
// next request, a challenged one passes with the header (the challenge page is the next step).
//
// What the origin sees is less than a server log: Cloudflare answers most images, styles and scripts from its
// cache and the proxy's matcher skips _next/static, so the content features run low for everyone here. The
// model was seeded from another site's sessions (the benchmark's); its own precedents come from these logs.
// Nothing here imports Next: scripts/probe.mjs computes the same facts from the outside.

export const MODEL = 'bots-edge';
export const DECIDE_AT = [5, 20, 60]; // requests into a session at which Ada is asked
export const SESSION_IDLE_MS = 30 * 60 * 1000;
const MAX_SESSIONS = 5000;
const MAX_EVENTS = 500;
const DECIDE_TIMEOUT_MS = 1500;
const COOKIE = 'glyphh_sid';

const IMAGE = /\.(png|jpe?g|gif|webp|svg|ico|avif|bmp)$/i;
const FILE = /\.[a-z0-9]+$/i;

// Each role's transform, as the benchmark's: log is log10(1 + x) binned in quarters, rate is 0..1 in tenths.
const LOG = new Set([
  'number_of_requests', 'total_duration', 'average_time', 'standard_deviation', 'max_barrage',
  'html_to_image', 'width', 'std_depth',
]);
const LAYOUT = {
  pace: { volume: ['number_of_requests', 'total_duration'], rhythm: ['average_time', 'standard_deviation', 'max_barrage', 'night', 'repeated_requests'] },
  shape: { methods: ['get_method', 'post_method', 'head_method', 'other_method'], content: ['images', 'total_html', 'html_to_image'], walk: ['width', 'depth', 'std_depth'] },
};

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const stddev = (xs) => {
  const m = mean(xs);
  return Math.sqrt(mean(xs.map((x) => (x - m) ** 2)));
};
const round4 = (x) => Math.round(x * 10000) / 10000;

/** The raw measures of a session from its events [{t: ms, method, path}], in time order. */
export function measures(events) {
  const n = events.length;
  const t = events.map((e) => e.t);
  const gaps = [];
  for (let i = 1; i < n; i++) gaps.push((t[i] - t[i - 1]) / 1000);
  const perSecond = new Map();
  for (const x of t) perSecond.set(Math.floor(x / 1000), (perSecond.get(Math.floor(x / 1000)) || 0) + 1);
  const seen = new Set();
  let repeated = 0;
  for (const e of events) {
    const key = `${e.method} ${e.path}`;
    if (seen.has(key)) repeated++;
    seen.add(key);
  }
  const by = (m) => events.filter((e) => e.method === m).length / n;
  const images = events.filter((e) => IMAGE.test(e.path)).length;
  const html = events.filter((e) => !FILE.test(e.path)).length;
  const depths = events.map((e) => e.path.split('/').filter(Boolean).length);
  return {
    number_of_requests: n,
    total_duration: n > 1 ? (t[n - 1] - t[0]) / 1000 : 0,
    average_time: gaps.length ? mean(gaps) : 0,
    standard_deviation: gaps.length > 1 ? stddev(gaps) : null,
    max_barrage: Math.max(...perSecond.values()) - 1, // the requests beyond the first in the busiest second (the dataset's: 0 for one request)
    night: events.filter((e) => new Date(e.t).getUTCHours() < 7).length / n,
    repeated_requests: repeated / n,
    get_method: by('GET'),
    post_method: by('POST'),
    head_method: by('HEAD'),
    other_method: events.filter((e) => !['GET', 'POST', 'HEAD'].includes(e.method)).length / n,
    images: images / n,
    total_html: html / n,
    html_to_image: images ? html / images : html,
    width: new Set(events.map((e) => e.path)).size,
    depth: Math.max(...depths),
    std_depth: depths.length > 1 ? stddev(depths) : 0,
  };
}

/** The session's facts in the model's shape: layers of segments of roles, each transformed as the model learned. */
export function facts(events) {
  const m = measures(events);
  const data = {};
  for (const [layer, segments] of Object.entries(LAYOUT)) {
    for (const [segment, roles] of Object.entries(segments)) {
      for (const role of roles) {
        const v = m[role];
        if (v === null || v === undefined || !Number.isFinite(v)) continue;
        ((data[layer] ??= {})[segment] ??= {})[role] = round4(LOG.has(role) ? Math.log10(1 + Math.max(v, 0)) : v);
      }
    }
  }
  return data;
}

/** Ask Ada Cloud: {verdict: allow | challenge | block, ...the decision}. Throws on a failed call. */
export async function decide(data, { url = process.env.ADA_URL || 'https://ada.glyphh.ai', key = process.env.GLYPHH_API_KEY, model = MODEL, fetcher = fetch } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DECIDE_TIMEOUT_MS);
  try {
    const started = Date.now();
    const res = await fetcher(`${url}/v1/decide`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, data }),
      signal: controller.signal,
    });
    const body = await res.json();
    if (!res.ok) throw new Error(`decide ${res.status}: ${JSON.stringify(body).slice(0, 200)}`);
    return { verdict: body.ask ? 'challenge' : body.outcome === 'bot' ? 'block' : 'allow', ms: Date.now() - started, ...body };
  } finally {
    clearTimeout(timer);
  }
}

export function mode() {
  const m = process.env.ADA_GATE;
  if (m === 'off' || m === 'shadow' || m === 'enforce') return m;
  return process.env.GLYPHH_API_KEY ? 'shadow' : 'off';
}

// ── the sessions this process has seen ───────────────────────────────────────────────────────────────────────
const sessions = new Map(); // key → {events, verdict, decided: Set of counts, cookie: boolean}
let budget = { day: '', used: 0 };

function dailyBudget() {
  const day = new Date().toISOString().slice(0, 10);
  if (budget.day !== day) budget = { day, used: 0 };
  return Number(process.env.ADA_GATE_DAILY || 120) - budget.used;
}

function prune(now) {
  for (const [key, s] of sessions) if (now - s.events[s.events.length - 1].t > SESSION_IDLE_MS) sessions.delete(key);
  while (sessions.size > MAX_SESSIONS) sessions.delete(sessions.keys().next().value);
}

async function digest(text) {
  const bytes = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash)).slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * One request seen: kept against its session; Ada asked when it is time. Returns what the proxy does with it:
 * {blocked, header, setCookie: sid | null}. `log` and `fetcher` are the tests' hooks.
 */
export async function observe(request, waitUntil, { now = Date.now(), log = console.log, fetcher } = {}) {
  const m = mode();
  if (m === 'off') return { blocked: false, header: null, setCookie: null };
  const url = new URL(request.url);
  const cookie = request.cookies?.get?.(COOKIE)?.value || null;
  const ua = (request.headers.get('user-agent') || '').slice(0, 160);
  const ip = request.headers.get('cf-connecting-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const key = cookie ? `c:${cookie}` : `a:${await digest(`${ip}|${ua}`)}`;
  let s = sessions.get(key);
  if (!s) {
    s = { events: [], verdict: null, decided: new Set(), cookie: Boolean(cookie) };
    sessions.set(key, s);
  }
  s.events.push({ t: now, method: request.method, path: url.pathname });
  if (s.events.length > MAX_EVENTS) s.events.shift();
  if (s.events.length % 50 === 0) prune(now);
  const n = s.events.length;
  if (DECIDE_AT.includes(n) && !s.decided.has(n)) {
    s.decided.add(n);
    if (dailyBudget() <= 0) {
      log(JSON.stringify({ ada_gate: { key, n, skipped: 'daily budget spent' } }));
    } else {
      budget.used++;
      const data = facts(s.events);
      const asked = decide(data, { fetcher })
        .then((d) => {
          s.verdict = d.verdict;
          log(JSON.stringify({ ada_gate: { mode: m, key, n, ua, cookie: s.cookie, verdict: d.verdict, outcome: d.outcome, ask: d.ask, probabilities: d.probabilities, expected_cost: d.expected_cost, version: d.version, ms: d.ms, data } }));
        })
        .catch((e) => log(JSON.stringify({ ada_gate: { mode: m, key, n, error: String(e).slice(0, 200) } })));
      if (waitUntil) waitUntil(asked);
    }
  }
  const setCookie = cookie ? null : crypto.randomUUID().replace(/-/g, '');
  if (setCookie) {
    // the rest of this visit arrives under the cookie: move the session there
    sessions.delete(key);
    sessions.set(`c:${setCookie}`, { ...s, cookie: true });
  }
  return {
    blocked: m === 'enforce' && s.verdict === 'block',
    header: m === 'shadow' ? `shadow:${s.verdict || 'pending'}` : null,
    setCookie,
  };
}

export const COOKIE_NAME = COOKIE;

/** The tests' and the probe's view: how many sessions are held, and one by key. */
export const _state = { sessions, reset: () => sessions.clear() };
