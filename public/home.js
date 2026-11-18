// glyphh.ai's front page: a card per game (games.js), the hero's three videos, and the slow reveal on scroll.
import { GAMES } from '/games.js?v=5';

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

function card(g) {
  const tags = g.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const art = g.art
    ? `<img class="card-art" src="${esc(g.art)}" alt="" width="1280" height="720" loading="lazy">`
    : '<div class="card-art empty">Coming soon</div>';
  const inner = `${art}
    <div class="card-body">
      <div class="card-top"><h3>${esc(g.title)}</h3>${g.soon ? '<span class="soon">Coming soon</span>' : '<span class="go" aria-hidden="true">→</span>'}</div>
      <p>${esc(g.blurb)}</p>
      ${tags ? `<div class="tags">${tags}</div>` : ''}
    </div>`;
  return g.soon ? `<div class="card is-soon" data-reveal>${inner}</div>` : `<a class="card" href="${esc(g.href)}" data-reveal>${inner}</a>`;
}

document.getElementById('cards').innerHTML = GAMES.map(card).join('');

// The reveal: a part of the page rises into place the first time it is scrolled to. Without an observer, or for a
// visitor who asked for less motion (home.css), everything is simply there.
const parts = [...document.querySelectorAll('[data-reveal]')];
if ('IntersectionObserver' in window) {
  const seen = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      seen.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  // What is already on screen stays as it is; only from here on is anything hidden to be revealed (home.css).
  for (const part of parts) if (part.getBoundingClientRect().top < innerHeight) part.classList.add('in');
  document.documentElement.classList.add('reveal');
  parts.forEach((part) => seen.observe(part));
} else {
  parts.forEach((part) => part.classList.add('in'));
}

// The hero's videos: muted loops of the three games, streamed from the games' own sites. They play only while the
// hero is on screen, never for a visitor who asked for less motion or to save data, and a button stops them. A
// video that cannot play keeps showing its poster.
const stage = document.getElementById('stage');
const toggle = document.getElementById('stage-toggle');
const videos = [...stage.querySelectorAll('video')];
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData === true;
let wanted = !calm;
let onScreen = false;

function sync() {
  for (const video of videos) {
    if (wanted && onScreen) {
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }
  toggle.textContent = wanted ? 'Pause the videos' : 'Play the videos';
}

if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  }, { threshold: 0.15 }).observe(stage);
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    wanted = !wanted;
    sync();
  });
  sync();
}
