// The games pages are plain files in public/: every game public/games.js lists has its page and its picture, every
// file a page names is there, and no page names the old host or any address but support@glyphh.ai.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { GAMES } from '../public/games.js';
import { FOOTER } from '../public/footer.js';

const PUBLIC = new URL('../public', import.meta.url).pathname;
const APP = new URL('../app', import.meta.url).pathname;
const LEGAL = ['/terms', '/privacy', '/refund'];
const live = GAMES.filter((g) => !g.soon);
const pages = ['/index.html', ...live.map((g) => `${g.href}index.html`)];

test('every live game has a page and a picture', () => {
  assert.ok(live.length > 0);
  for (const g of live) {
    assert.match(g.href, /^\/[a-z0-9-]+\/$/);
    assert.ok(existsSync(`${PUBLIC}${g.href}index.html`), `${g.href}index.html`);
    assert.ok(existsSync(`${PUBLIC}${g.art}`), g.art);
  }
});

test('every file a page names is there', () => {
  for (const page of pages) {
    const html = readFileSync(`${PUBLIC}${page}`, 'utf8');
    const own = [...html.matchAll(/(?:src|href|poster)="(\/[^"#?]*)/g)].map((m) => m[1]);
    assert.ok(own.length > 3, page);
    for (const path of own) {
      // The legal pages are the app's (app/<name>/page.js); everything else is a file in public/.
      if (LEGAL.includes(path)) {
        assert.ok(existsSync(`${APP}${path}/page.js`), `${page} names ${path}`);
        continue;
      }
      const file = path.endsWith('/') ? `${path}index.html` : path;
      assert.ok(existsSync(`${PUBLIC}${file}`), `${page} names ${path}`);
    }
  }
});

test('every page ends in the one footer: the games, About, Advertise, the legal pages, the company', () => {
  for (const g of live) assert.ok(FOOTER.includes(`<a href="${g.href}">`), `the footer links ${g.href}`);
  for (const href of ['/#about', ...LEGAL, 'mailto:support@glyphh.ai', 'mailto:support@glyphh.ai?subject=Advertise%20in%20a%20Glyphh%20game']) {
    assert.ok(FOOTER.includes(`href="${href}"`), `the footer links ${href}`);
  }
  assert.ok(FOOTER.includes('&copy; 2026 Glyphh AI LLC'));
  assert.ok(FOOTER.includes('src="/glyphh-logo-black.png"'));
  for (const page of pages) {
    const html = readFileSync(`${PUBLIC}${page}`, 'utf8');
    assert.ok(html.includes(FOOTER), `${page} carries the footer of public/footer.js, to the letter`);
    assert.equal(html.match(/<footer/g).length, 1, `${page} has one footer`);
  }
  const layout = readFileSync(`${APP}/layout.js`, 'utf8');
  assert.match(layout, /import \{ FOOTER \} from '\.\.\/public\/footer\.js'/);
  assert.match(layout, /__html: FOOTER/);
});

test('the front page is the studio: header, hero, games, what makes them ours, about, about me, contact', () => {
  const html = readFileSync(`${PUBLIC}/index.html`, 'utf8');
  // The parts, in the order they are read.
  const parts = ['class="head"', '<h1>We make games.</h1>', 'id="stage"', 'id="games"', 'id="ours"', 'id="about"', 'id="me"', 'id="contact"', '<footer'];
  const at = parts.map((part) => html.indexOf(part));
  at.forEach((index, i) => assert.ok(index > (at[i - 1] ?? -1), `${parts[i]} is in its place`));
  for (const anchor of ['#games', '#about', '#contact']) assert.ok(html.includes(`<a href="${anchor}">`), `the header links ${anchor}`);
  assert.equal(html.match(/<h1/g).length, 1);
  assert.ok(html.includes('<a class="btn primary big" href="#games">Play the games</a>'));
  assert.ok(html.includes('<!-- ABOUT ME: draft from known facts only; Chris to supply the real story -->'));
  assert.ok(html.includes('id="cards"'), 'the cards are drawn from games.js');
  for (const g of live) assert.ok(html.includes(g.title.replace('&', '&amp;')), `the page names ${g.title}`);

  // The hero's videos: one per live game, silent loops that wait for the script, each with a poster to fall back on.
  const videos = [...html.matchAll(/<video ([^>]*)>/g)].map((m) => m[1]);
  assert.equal(videos.length, live.length);
  for (const video of videos) {
    for (const word of ['muted', 'loop', 'playsinline', 'preload="none"', 'poster="/', 'aria-label="']) assert.ok(video.includes(word), `a hero video has ${word}`);
    assert.ok(!video.includes('autoplay'), 'home.js starts the videos, and not for a visitor who asked for less motion');
  }
  // Every picture says what it shows, and nothing below the hero loads before it is scrolled to.
  for (const [img] of html.matchAll(/<img [^>]*>/g)) assert.match(img, /alt="[^"]+"/, img);
  for (const [img] of html.slice(html.indexOf('id="games"')).matchAll(/<img [^>]*>/g)) assert.ok(img.includes('loading="lazy"'), img);

  // The brand is the logo's picture, never the name typed out as a mark; and the page keeps to the games.
  const words = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, ' ');
  assert.ok(!/\bglyphh\b/.test(words.replace(/support@glyphh\.ai/g, '')), 'the name is written Glyphh, in sentences only');
  for (const gone of [/\bAda\b/, /rrotor/i, /\bAI\b(?! LLC)/, /presents/i, /\(\d{3}\)/]) assert.ok(!gone.test(words), `the front page does not say ${gone}`);

  const css = readFileSync(`${PUBLIC}/home.css`, 'utf8');
  assert.ok(css.includes('prefers-reduced-motion'));
  const js = readFileSync(`${PUBLIC}/home.js`, 'utf8');
  assert.ok(js.includes('prefers-reduced-motion'));
});

test('the legal pages are the studio\'s: the company, the one address, and nothing of what Glyphh no longer offers', () => {
  // Read as written, comments included: a word that is not in the file cannot reach the page.
  const gone = [
    /\bAda\b/, /adaL/i, /hosted model/i, /rrotor/i, /plugin/i, /\bSDKs?\b/i, /API key/i, /\b(?:Basic|Pro|Team|Enterprise)\b/,
    /\bFree plan\b/i, /prepaid/i, /precedent/i, /pricing/i, /platform/i, /api\.glyphh\.ai/i, /analytics/i, /pixel/i,
    /reviewed by counsel/i, /\[\[OWNER/, /\(\d{3}\)/,
  ];
  for (const path of LEGAL) {
    const page = readFileSync(`${APP}${path}/page.js`, 'utf8');
    for (const word of gone) assert.ok(!word.test(page), `${path} does not say ${word}`);
    assert.ok(page.includes('support@glyphh.ai'), `${path} names support@glyphh.ai`);
    assert.ok(page.includes('Glyphh AI LLC'), `${path} names Glyphh AI LLC`);
    for (const [address] of page.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) assert.equal(address, 'support@glyphh.ai', path);
    assert.ok(page.includes('<strong>Last updated 18 November 2026</strong>'), `${path} says when it was last updated`);
    assert.ok(page.includes('It was updated on 18 November 2026'), `${path} opens with the notice`);
    assert.ok(!/\bglyphh\b/.test(page.replace(/support@glyphh\.ai|glyphh\.ai/g, '')), `${path} writes the name Glyphh, in sentences only`);
  }
  // Every purchase is final, in the same words wherever it is said, with the one carve-out.
  const final = 'We give no refunds, except where the law gives you a right we cannot exclude.';
  for (const path of ['/terms', '/refund']) assert.ok(readFileSync(`${APP}${path}/page.js`, 'utf8').includes(final), `${path} says purchases are final`);
  // The prices are the games' own: Free Fall Frank's two at $0.99, the pass and a league in Bams & Brags.
  for (const path of ['/terms', '/refund']) {
    const page = readFileSync(`${APP}${path}/page.js`, 'utf8');
    assert.deepEqual([...page.matchAll(/\$\d+(?:\.\d+)?/g)].map((m) => m[0]), ['$0.99', '$0.99', '$2.99', '$29.99'], `${path} prices`);
  }
  assert.ok(!/\$\d/.test(readFileSync(`${APP}/privacy/page.js`, 'utf8')));
});

test('pages name glyphh.ai as their address, and support@glyphh.ai as the only one to write to', () => {
  for (const page of pages) {
    const html = readFileSync(`${PUBLIC}${page}`, 'utf8');
    assert.ok(!html.includes('games.glyphh.ai'), `${page} names games.glyphh.ai`);
    const canonical = `https://glyphh.ai${page.replace(/index\.html$/, '')}`;
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), `${page} canonical`);
    for (const [address] of html.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)) assert.equal(address, 'support@glyphh.ai', page);
  }
});
