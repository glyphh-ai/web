// Renders reel.html frame by frame (the clock is window.seek, so every frame is exact) into PNGs, then ffmpeg
// makes the videos: rrotor-reel.mp4 (a silent audio track, for the site and social), rrotor-reel-graphic.mp4
// (no audio track, the Camtasia clip), one clip per scene (clips/), and cover.jpg.
//
//   node render.mjs            # everything
//   node render.mjs --stills   # only the stills in stills/, one per scene, for a quick look
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.dirname(new URL(import.meta.url).pathname);
const FPS = 30, DUR = 56.5, W = 1920, H = 1080;
const SCENES = [
  ['01-hook', 0, 5], ['02-session', 5, 13], ['03-race', 13, 27], ['04-apps', 27, 35],
  ['05-clis', 35, 43], ['06-programs', 43, 50], ['07-end', 50, 56.5],
];
const stillsOnly = process.argv.includes('--stills');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(DIR, 'reel.html'));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

if (stillsOnly) {
  const out = path.join(DIR, 'stills'); fs.mkdirSync(out, { recursive: true });
  for (const [name, a, b] of SCENES) {
    await page.evaluate((t) => window.seek(t), a + (b - a) * 0.8);
    await page.screenshot({ path: path.join(out, `${name}.png`), type: 'png' });
  }
  await browser.close();
  process.exit(0);
}

const frames = path.join(DIR, 'frames');
fs.rmSync(frames, { recursive: true, force: true });
fs.mkdirSync(frames, { recursive: true });
const N = Math.round(FPS * DUR);
for (let f = 0; f < N; f++) {
  await page.evaluate((t) => window.seek(t), f / FPS);
  await page.screenshot({ path: path.join(frames, `${String(f).padStart(5, '0')}.png`), type: 'png' });
  if (f % 150 === 0) console.log(`frame ${f}/${N}`);
}
await browser.close();

const ff = (args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
const V = ['-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart'];
const seq = (start) => ['-framerate', String(FPS), '-start_number', String(start), '-i', path.join(frames, '%05d.png')];

ff([...seq(0), '-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo', '-shortest', ...V, '-c:a', 'aac', '-b:a', '64k', path.join(DIR, 'rrotor-reel.mp4')]);
ff([...seq(0), ...V, path.join(DIR, 'rrotor-reel-graphic.mp4')]);
const clips = path.join(DIR, 'clips'); fs.mkdirSync(clips, { recursive: true });
for (const [name, a, b] of SCENES) {
  ff([...seq(Math.round(a * FPS)), '-frames:v', String(Math.round((b - a) * FPS)), ...V, path.join(clips, `${name}.mp4`)]);
}
ff(['-i', path.join(frames, '00126.png'), '-q:v', '2', path.join(DIR, 'cover.jpg')]);
fs.rmSync(frames, { recursive: true, force: true });
console.log('done');
