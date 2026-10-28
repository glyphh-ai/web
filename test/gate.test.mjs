// The Ada gate's decisions and its challenge, without a server: node --test test/
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  observe, _state, makeNonce, validProof, makePass, validPass, leadingZeros, isPage, challengePage,
  PASS_COOKIE, PROOF_COOKIE, WORK_BITS,
} from '../app/lib/gate.js';

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

function req(path, { ua = UA, cookies = {}, headers = {}, method = 'GET', ip = '203.0.113.7' } = {}) {
  return {
    url: `https://glyphh.ai${path}`,
    method,
    headers: new Headers({ 'user-agent': ua, 'cf-connecting-ip': ip, ...headers }),
    cookies: { get: (name) => (name in cookies ? { value: cookies[name] } : undefined) },
  };
}

// Ada answers what the test says; the gate's call to her is awaited before the next request
const ada = (answer) => async () => ({ ok: true, json: async () => ({ outcome: 'human', ask: false, probabilities: {}, ...answer }) });

async function session(answer, { count = 5, ...opts } = {}) {
  const pending = [];
  let last;
  for (let i = 0; i < count; i++) {
    last = await observe(req(i % 2 ? '/logo.png' : '/pricing', opts), (p) => pending.push(p), { now: Date.now() + i, log: () => {}, fetcher: ada(answer) });
    await Promise.all(pending);
  }
  return last;
}

const next = (path = '/pricing', opts) => observe(req(path, opts), () => {}, { log: () => {}, fetcher: ada({}) });

function solve(nonce) {
  for (let i = 0; ; i++) if (leadingZeros(createHash('sha256').update(nonce + i).digest('hex'))) return i;
}

beforeEach(() => {
  _state.reset();
  process.env.GLYPHH_API_KEY = 'test';
  process.env.ADA_GATE = 'enforce';
  process.env.ADA_GATE_SECRET = 'a-test-secret';
  delete process.env.ADA_GATE_DAILY;
});

test('leading zero bits', () => {
  assert.equal(leadingZeros('0003ff', 14), true);
  assert.equal(leadingZeros('0004ff', 14), false);
  assert.equal(leadingZeros('00ff', 8), true);
  assert.equal(leadingZeros('01ff', 8), false);
});

test('a proof is our nonce, fresh, with the work done', async () => {
  const nonce = await makeNonce();
  const answer = solve(nonce);
  assert.equal(await validProof(`${nonce}:${answer}`), true);
  assert.equal(await validProof(`${nonce}:${answer + 1}`), leadingZeros(createHash('sha256').update(nonce + (answer + 1)).digest('hex')));
  const [issued, random] = nonce.split('.');
  assert.equal(await validProof(`${issued}.${random}.${'0'.repeat(32)}:${answer}`), false, 'a forged signature');
  assert.equal(await validProof(`${nonce}:${answer}`, Date.now() + 6 * 60 * 1000), false, 'stale');
  process.env.ADA_GATE_SECRET = 'another';
  assert.equal(await validProof(`${nonce}:${answer}`), false, 'signed with another secret');
});

test('a pass is bound to its user agent and expires', async () => {
  const pass = await makePass(UA);
  assert.equal(await validPass(pass, UA), true);
  assert.equal(await validPass(pass, 'curl/8.7.1'), false);
  assert.equal(await validPass(pass, UA, Date.now() + 13 * 60 * 60 * 1000), false);
  assert.equal(await validPass('9999999999999.deadbeef', UA), false);
});

test('pages, not assets or background fetches', () => {
  assert.equal(isPage(req('/pricing')), true);
  assert.equal(isPage(req('/')), true);
  assert.equal(isPage(req('/logo.png')), false);
  assert.equal(isPage(req('/_next/data/x.json')), false);
  assert.equal(isPage(req('/pricing?_rsc=abc')), false);
  assert.equal(isPage(req('/pricing', { headers: { rsc: '1' } })), false);
  assert.equal(isPage(req('/pricing', { method: 'POST' })), false);
});

test('the challenge page carries the nonce and the work', () => {
  const html = challengePage('1.2.3');
  assert.match(html, /"1\.2\.3"/);
  assert.match(html, new RegExp(`b=${WORK_BITS}`));
  assert.match(html, new RegExp(PROOF_COOKIE));
  assert.match(html, /noindex/);
});

test('enforce: a doubtful session gets the challenge on its pages, not its assets', async () => {
  await session({ ask: true, outcome: 'bot' });
  const page = await next('/pricing');
  assert.ok(page.challenge);
  assert.equal(page.blocked, false);
  assert.equal(page.header, 'challenge');
  const asset = await next('/logo.png');
  assert.equal(asset.challenge, null);
});

test('enforce: the proof becomes a pass, and a pass is not challenged again', async () => {
  await session({ ask: true, outcome: 'bot' });
  const nonce = await makeNonce();
  const proved = await next('/pricing', { cookies: { [PROOF_COOKIE]: `${nonce}:${solve(nonce)}` } });
  assert.equal(proved.challenge, null);
  assert.ok(proved.setPass);
  assert.equal(proved.clearProof, true);
  const later = await next('/docs', { cookies: { [PASS_COOKIE]: proved.setPass } });
  assert.equal(later.challenge, null);
  assert.equal(later.blocked, false);
});

test('enforce: a robot is refused, pass or not', async () => {
  await session({ outcome: 'bot' });
  assert.equal((await next()).blocked, true);
  const pass = await makePass(UA);
  assert.equal((await next('/pricing', { cookies: { [PASS_COOKIE]: pass } })).blocked, true);
});

test('enforce without a secret: no challenge to sign, the doubtful pass', async () => {
  delete process.env.ADA_GATE_SECRET;
  await session({ ask: true, outcome: 'bot' });
  const r = await next();
  assert.equal(r.challenge, null);
  assert.equal(r.blocked, false);
});

test('the day budget spent: never a block or a challenge', async () => {
  process.env.ADA_GATE_DAILY = '0';
  await session({ outcome: 'bot' }, { count: 25 });
  const r = await next();
  assert.equal(r.blocked, false);
  assert.equal(r.challenge, null);
});

test('Ada unreachable: never a block', async () => {
  const pending = [];
  for (let i = 0; i < 6; i++) {
    await observe(req('/pricing'), (p) => pending.push(p), { log: () => {}, fetcher: async () => { throw new Error('down'); } });
    await Promise.all(pending);
  }
  assert.equal((await next()).blocked, false);
});

test('health checks and declared crawlers are not gated', async () => {
  for (const ua of ['Consul Health Check', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0)']) {
    const r = await session({ outcome: 'bot' }, { ua });
    assert.equal(r.blocked, false);
    assert.equal(r.setCookie, null);
  }
  assert.equal(_state.sessions.size, 0);
});

test('shadow: enforces nothing, says the verdict', async () => {
  process.env.ADA_GATE = 'shadow';
  await session({ outcome: 'bot' });
  const r = await next();
  assert.equal(r.blocked, false);
  assert.equal(r.challenge, null);
  assert.equal(r.header, 'shadow:block');
});
