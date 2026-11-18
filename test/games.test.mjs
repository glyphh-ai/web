// The games pages are plain files in public/: every game public/games.js lists has its page and its picture, every
// file a page names is there, and no page names the old host or any address but support@glyphh.ai.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { GAMES } from '../public/games.js';

const PUBLIC = new URL('../public', import.meta.url).pathname;
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
      const file = path.endsWith('/') ? `${path}index.html` : path;
      assert.ok(existsSync(`${PUBLIC}${file}`), `${page} names ${path}`);
    }
  }
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
