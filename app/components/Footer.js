/**
 * Footer — the same on every page: the brand cell with the tagline and the social row, link columns, and a bottom
 * bar. The studio's footer (2026-11-25): no product, no plans, no platform.
 */
import { YOUTUBE_URL, GITHUB_URL, EMAIL, TAGLINE, CTA } from '../lib/site';

const COLS = [
  {
    title: 'Studio',
    links: [
      ['Projects', '/projects'],
      ['Journal', '/journal'],
      ['Labs', '/labs'],
      ['About', '/about'],
    ],
  },
  {
    title: 'Work together',
    links: [
      ['Work With Us', '/work-with-us'],
      ['Submit a problem', '/submit-a-problem'],
      ['Email', `mailto:${EMAIL}`],
    ],
  },
  {
    title: 'Elsewhere',
    links: [
      ['YouTube', YOUTUBE_URL],
      ['GitHub', GITHUB_URL],
      ['Journal RSS', '/journal/rss.xml'],
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
    ],
  },
];

function Ext(href) {
  return /^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}

export default function Footer() {
  return (
    <footer className="ft">
      <div className="site-frame ft-frame">
        <div className="ft-grid">
          <div className="ft-brand">
            <a href="/" className="ft-logo" aria-label="Glyphh">
              <img src="/glyphh-logo-black.png" alt="Glyphh" width="650" height="215" />
            </a>
            <p className="ft-tagline">{TAGLINE} Real problems. Real engineering. No hype.</p>
            <p className="ft-contact">
              <a href="/work-with-us">{CTA}</a>
              <br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <br />
              <span>Austin, Texas</span>
            </p>
            <div className="ft-social" aria-label="Glyphh elsewhere">
              <a href={YOUTUBE_URL} aria-label="YouTube" {...Ext(YOUTUBE_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              </a>
              <a href={GITHUB_URL} aria-label="GitHub" {...Ext(GITHUB_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
              </a>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="ft-col">
              <h4>{c.title}</h4>
              {c.links.map(([label, href]) => (
                <a key={label} href={href} {...Ext(href)}>{label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="ft-bottom">
          <span>Build. Experiment. Share. Repeat.</span>
          <span>&copy; 2026 Glyphh AI LLC</span>
          <span className="ft-bottom-brand">
            <img src="/glyphh-mascot.png" alt="" width="16" height="16" aria-hidden="true" /> Glyphh
          </span>
        </div>
      </div>
    </footer>
  );
}
