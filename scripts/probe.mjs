// Three sessions against the site, each asked of Ada the way the gate asks (2026-10-25): a scraper (plain
// fetches, no pauses, no cookies), an agent (a headless browser walking the pages the way an LLM agent does: load,
// read the links, pick one, a second or two of thinking between), and a person (a browser that reads, scrolls and
// takes its time). Each session's requests are kept as the proxy would keep them (what passes its matcher), turned
// into the same facts (app/lib/gate.js), and sent to Ada Cloud's bots-edge model. Prints the verdicts.
//
//   GLYPHH_API_KEY=... node scripts/probe.mjs [https://glyphh.ai] [--pages 12]
//   node scripts/probe.mjs --facts                 # no key: each session's facts, to decide or record elsewhere
//   PROBE_CHANNEL=chrome node scripts/probe.mjs    # the installed Chrome, where Playwright's own is not installed
//
// Low volume by design: under 60 requests a session. The person is still a script; it says so in its row.

import { chromium } from 'playwright';
import { facts, measures, decide, DECIDE_AT } from '../app/lib/gate.js';

const BASE = process.argv.find((a) => a.startsWith('http')) || 'https://glyphh.ai';
const PAGES = Number(process.argv[process.argv.indexOf('--pages') + 1]) || 12;
const host = new URL(BASE).host;
const matcher = (path) => !path.startsWith('/_next/static') && !path.startsWith('/_next/image') && path !== '/favicon.svg';
const FACTS_ONLY = process.argv.includes('--facts');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function linksIn(html, from) {
  const out = [];
  for (const m of html.matchAll(/href="([^"#?]+)[^"]*"/g)) {
    try {
      const u = new URL(m[1], from);
      if (u.host === host && !/\.[a-z0-9]+$/i.test(u.pathname)) out.push(u.pathname);
    } catch {}
  }
  return [...new Set(out)];
}

async function scraper() {
  const events = [];
  const queue = ['/'];
  const seen = new Set();
  while (queue.length && events.length < PAGES * 3) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    events.push({ t: Date.now(), method: 'GET', path });
    const res = await fetch(BASE + path, { headers: { 'user-agent': 'glyphh-probe-scraper/1 (python-requests shaped)' }, redirect: 'manual' });
    if (res.status === 200) queue.push(...linksIn(await res.text(), BASE + path).filter((p) => !seen.has(p)));
  }
  return events;
}

async function browse(kind) {
  const browser = await chromium.launch(process.env.PROBE_CHANNEL ? { channel: process.env.PROBE_CHANNEL } : {});
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const events = [];
  page.on('request', (r) => {
    const u = new URL(r.url());
    if (u.host === host && matcher(u.pathname)) events.push({ t: Date.now(), method: r.method(), path: u.pathname });
  });
  const visited = new Set();
  let path = '/';
  for (let i = 0; i < PAGES; i++) {
    visited.add(path);
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' }).catch(() => {});
    if (kind === 'person') {
      // reads: a few scrolls and a pause of 6 to 15 seconds, the mouse wandering
      for (let s = 0; s < 3; s++) {
        await page.mouse.move(200 + Math.random() * 800, 200 + Math.random() * 400, { steps: 12 });
        await page.mouse.wheel(0, 400 + Math.random() * 600);
        await sleep(1500 + Math.random() * 2500);
      }
      await sleep(1000 + Math.random() * 4000);
    } else {
      // the agent: reads the DOM as text, "thinks", moves on
      await sleep(800 + Math.random() * 1500);
    }
    const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    const next = links
      .map((h) => { try { return new URL(h, BASE); } catch { return null; } })
      .filter((u) => u && u.host === host && !/\.[a-z0-9]+$/i.test(u.pathname) && !visited.has(u.pathname))
      .map((u) => u.pathname);
    if (!next.length) break;
    path = kind === 'person' ? next[Math.floor(Math.random() * next.length)] : next.sort()[0];
  }
  await browser.close();
  return events;
}

function row(name, events, d) {
  const m = measures(events);
  return {
    session: name,
    requests: events.length,
    seconds: Math.round(m.total_duration),
    gap: Number(m.average_time.toFixed(2)),
    barrage: m.max_barrage,
    width: m.width,
    verdict: d.verdict,
    p_bot: d.probabilities?.bot ?? 0,
    ask: d.ask,
    ms: d.ms,
  };
}

const runs = [
  ['scraper (fetch, no pauses, no cookies)', scraper],
  ['agent (headless browser, 1-2 s a page)', () => browse('agent')],
  ['person (scripted: scrolls, 6-15 s a page)', () => browse('person')],
];
const out = [];
for (const [name, run] of runs) {
  const events = await run();
  const data = facts(events);
  const d = FACTS_ONLY ? {} : await decide(data);
  // what the gate itself asks Ada: the session so far at each of its decision points
  const gate = Object.fromEntries(DECIDE_AT.filter((n) => n <= events.length).map((n) => [n, facts(events.slice(0, n))]));
  out.push({ ...row(name, events, d), facts: data, gate });
  console.error(`${name}: ${events.length} requests → ${d.verdict} (bot ${(d.probabilities?.bot ?? 0).toFixed(2)}, ${d.ms} ms)`);
}
console.log(JSON.stringify({ base: BASE, at: new Date().toISOString(), sessions: out }, null, 1));
