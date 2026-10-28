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

// ── the challenge: a proof of browser ────────────────────────────────────────────────────────────────────────
//
// A session Ada answers `challenge` for gets, on its next page (not on its assets), a small page whose script does
// a little work (a SHA-256 search, about a tenth of a second in a browser) over a nonce the gate signed, leaves
// the answer in a cookie and reloads. The gate checks the signature, the age and the work, and answers with a
// pass: an HttpOnly cookie signed with ADA_GATE_SECRET, bound to the visitor's user agent, good for 12 hours.
// A session holding a pass is a browser that runs scripts; it is no longer asked of Ada (its line in the log,
// `passed`, is a label for the model). A plain scraper (fetch, curl, requests) never runs the script, so every
// page it asks for is the challenge. A headless browser does run it: the challenge stops scrapers, not agents
// driving a real browser; those are Ada's to block on behaviour.

export const PASS_COOKIE = 'glyphh_pass';
export const PROOF_COOKIE = 'glyphh_proof';
export const PASS_MS = 12 * 60 * 60 * 1000;
const NONCE_MS = 5 * 60 * 1000;
export const WORK_BITS = 14; // leading zero bits of SHA-256(nonce + answer): 16,384 tries on average

// Health checks and the crawlers that say who they are (search, AI search, link previews) are not gated: they are
// welcome, and robots.txt is their rule. A user agent can lie; one that claims to be Googlebot passes here, and
// telling the real one from a liar needs its address checked (reverse DNS, or Cloudflare's verified-bot rule).
const UNGATED_UA = /^Consul Health Check|Googlebot|bingbot|Applebot|DuckDuckBot|YandexBot|Claude-SearchBot|OAI-SearchBot|PerplexityBot|LinkedInBot|Twitterbot|facebookexternalhit|Slackbot|Discordbot|WhatsApp|TelegramBot/i;

export const secret = () => process.env.ADA_GATE_SECRET || '';

const hex = (buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');

async function hmac(text, key = secret()) {
  const k = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, new TextEncoder().encode(text))).slice(0, 32);
}

async function sha256(text) {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}

/** Does this hex digest start with `bits` zero bits? */
export function leadingZeros(digestHex, bits = WORK_BITS) {
  const full = Math.floor(bits / 4);
  if (!/^0*$/.test(digestHex.slice(0, full))) return false;
  const rest = bits % 4;
  return rest === 0 || parseInt(digestHex[full], 16) < 1 << (4 - rest);
}

/** A pass for this user agent, until `until` (ms). */
export async function makePass(ua, now = Date.now()) {
  const until = now + PASS_MS;
  const uah = (await sha256(ua)).slice(0, 16);
  return `${until}.${await hmac(`pass|${until}|${uah}`)}`;
}

export async function validPass(value, ua, now = Date.now()) {
  if (!secret() || !value) return false;
  const [until, sig] = value.split('.');
  if (!(Number(until) > now) || !sig) return false;
  const uah = (await sha256(ua)).slice(0, 16);
  return sig === (await hmac(`pass|${until}|${uah}`));
}

/** A signed nonce for the challenge page: `issued.random.sig`. */
export async function makeNonce(now = Date.now()) {
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  return `${now}.${random}.${await hmac(`nonce|${now}|${random}`)}`;
}

/** The proof cookie, `nonce:answer`: signed by us, fresh, and the work done. */
export async function validProof(value, now = Date.now()) {
  if (!secret() || !value) return false;
  const at = value.lastIndexOf(':');
  if (at < 0) return false;
  const nonce = value.slice(0, at);
  const answer = value.slice(at + 1);
  const [issued, random, sig] = nonce.split('.');
  if (!issued || !random || !sig || !/^\d{1,12}$/.test(answer)) return false;
  const age = now - Number(issued);
  if (!(age >= 0 && age < NONCE_MS)) return false;
  if (sig !== (await hmac(`nonce|${issued}|${random}`))) return false;
  return leadingZeros(await sha256(nonce + answer));
}

/** The challenge page: no assets of its own (the proxy would gate them too), works without the site's code. */
export function challengePage(nonce) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>One moment · Glyphh</title><style>html,body{height:100%;margin:0;background:#000;color:#fff;font:16px/1.5 system-ui,-apple-system,sans-serif}main{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:24px}p{margin:0;color:#999}</style></head><body><main><div>Checking your browser…</div><p>This takes a moment and happens once.</p><noscript><p>Glyphh needs JavaScript to let you in.</p></noscript></main><script>
(async()=>{const n=${JSON.stringify(nonce)},b=${WORK_BITS},e=new TextEncoder();
const ok=(h)=>{let z=0;for(const x of h){if(x===0){z+=8;continue}z+=Math.clz32(x)-24;break}return z>=b};
for(let i=0;;i++){const h=new Uint8Array(await crypto.subtle.digest('SHA-256',e.encode(n+i)));if(ok(h)){document.cookie='${PROOF_COOKIE}='+n+':'+i+'; path=/; max-age=300; samesite=lax'+(location.protocol==='https:'?'; secure':'');location.reload();return}}})();
</script></body></html>`;
}

/** An asset or a background request (files, Next's RSC fetches and prefetches): never answered with the page. */
export function isPage(request, url = new URL(request.url)) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;
  if (FILE.test(url.pathname) || url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/')) return false;
  if (url.searchParams.has('_rsc') || request.headers.get('rsc') === '1' || request.headers.get('next-router-prefetch')) return false;
  return true;
}

/**
 * One request seen: kept against its session; Ada asked when it is time. Returns what the proxy does with it:
 * {blocked, challenge: html | null, header, setCookie: sid | null, setPass: value | null, clearProof}.
 * `log` and `fetcher` are the tests' hooks.
 */
export async function observe(request, waitUntil, { now = Date.now(), log = console.log, fetcher } = {}) {
  const m = mode();
  const none = { blocked: false, challenge: null, header: null, setCookie: null, setPass: null, clearProof: false };
  if (m === 'off') return none;
  const url = new URL(request.url);
  const cookie = request.cookies?.get?.(COOKIE)?.value || null;
  const ua = (request.headers.get('user-agent') || '').slice(0, 160);
  if (UNGATED_UA.test(ua)) return none;

  const ip = request.headers.get('cf-connecting-ip') || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const key = cookie ? `c:${cookie}` : `a:${await digest(`${ip}|${ua}`)}`;

  // a browser that has proved itself: a fresh proof becomes a pass (and its session's facts a labelled line in the
  // log); a pass is never challenged again, but Ada still watches it, and a session she decides is a robot is
  // still refused (a headless browser runs the challenge's script too)
  const proof = request.cookies?.get?.(PROOF_COOKIE)?.value || null;
  let setPass = null;
  let passed = await validPass(request.cookies?.get?.(PASS_COOKIE)?.value, ua, now);
  if (!passed && (await validProof(proof, now))) {
    setPass = await makePass(ua, now);
    passed = true;
    const held = sessions.get(key) || sessions.get(`a:${await digest(`${ip}|${ua}`)}`);
    log(JSON.stringify({ ada_gate: { mode: m, key, ua, passed: true, verdict: held?.verdict ?? null, n: held?.events.length ?? 0, data: held ? facts(held.events) : null } }));
  }

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
          log(JSON.stringify({ ada_gate: { mode: m, key, n, ua, cookie: s.cookie, passed, verdict: d.verdict, outcome: d.outcome, ask: d.ask, probabilities: d.probabilities, expected_cost: d.expected_cost, version: d.version, ms: d.ms, data } }));
        })
        .catch((e) => log(JSON.stringify({ ada_gate: { mode: m, key, n, error: String(e).slice(0, 200) } })));
      if (waitUntil) waitUntil(asked);
    }
  }
  const setCookie = cookie ? null : crypto.randomUUID().replace(/-/g, '');
  if (setCookie) {
    // the rest of this visit arrives under the cookie: the same session answers to both keys, so a visitor that
    // keeps the cookie continues under it and one that drops it (a scraper) still accumulates under its address
    sessions.set(`c:${setCookie}`, s);
  }
  // Enforce: a robot's session is refused; a doubtful one is shown the challenge on its pages (its assets and
  // background fetches pass, so a person mid-load is not broken). Without ADA_GATE_SECRET there is no challenge
  // to sign, and a doubtful session passes. No verdict (not yet asked, the day's budget spent, Ada unreachable)
  // is never a block.
  const enforce = m === 'enforce';
  const challenge = enforce && !passed && s.verdict === 'challenge' && Boolean(secret()) && isPage(request, url) ? challengePage(await makeNonce(now)) : null;
  return {
    ...none,
    blocked: enforce && s.verdict === 'block',
    challenge,
    header: m === 'shadow' ? `shadow:${s.verdict || 'pending'}${passed ? ':passed' : ''}` : challenge ? 'challenge' : null,
    setCookie,
    setPass,
    clearProof: Boolean(proof),
  };
}

export const COOKIE_NAME = COOKIE;

/** The tests' and the probe's view: how many sessions are held, and one by key. */
export const _state = { sessions, reset: () => sessions.clear() };
