/**
 * record-demo.mjs — records the /video-demo stage into a 1920×1080 webm.
 *
 *   node scripts/record-demo.mjs [baseUrl] [outDir]
 *
 * Defaults: http://localhost:3000, .video-out/. The page idles on black until
 * window.__startDemo() fires, so the recording has a clean sub-second lead-in.
 * Total timeline ≈ 50.8s; we record ~52s then stop.
 */

import { chromium } from 'playwright';
import { mkdirSync, renameSync } from 'fs';
import { join } from 'path';

const BASE = process.argv[2] || 'http://localhost:3000';
const OUT_DIR = process.argv[3] || '.video-out';
const TOTAL_MS = 52_000;

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2, // render @2x, downscaled into the video = crisper text
  recordVideo: { dir: OUT_DIR, size: { width: 1920, height: 1080 } },
});
const page = await ctx.newPage();

console.log(`→ loading ${BASE}/video-demo`);
await page.goto(`${BASE}/video-demo`, { waitUntil: 'load', timeout: 60_000 });
await page.waitForSelector('.vd-root', { timeout: 30_000 });
// Give favicons/fonts a beat to settle so scene 1 starts fully painted.
await page.waitForTimeout(1500);

console.log('→ starting timeline');
await page.evaluate(() => window.__startDemo());
await page.waitForTimeout(TOTAL_MS);

const video = page.video();
await ctx.close(); // flushes the recording
const raw = await video.path();
const out = join(OUT_DIR, 'glyphh-desktop-demo.webm');
renameSync(raw, out);
await browser.close();
console.log(`✓ recorded ${out}`);
