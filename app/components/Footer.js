/**
 * Footer — the same on every page (site refactor 2026-09-22), inside the
 * frame's rails: the brand cell with the tagline and the social row, three
 * link columns with hairlines between, and a bottom bar. Contact is
 * support@glyphh.ai; Discord and Support are here for customers.
 */

// Discord and X: no URL is recorded anywhere in the repos, so neither is guessed.
// Each link appears only when its env var is set.
const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL || '';
const GITHUB_URL = 'https://github.com/glyphh-ai';
const YOUTUBE_URL = 'https://www.youtube.com/@glyphhai';
const X_URL = process.env.NEXT_PUBLIC_X_URL || '';

const COLS = [
  {
    title: 'Product',
    links: [
      ['Ada', '/products/ada'],
      ['Use cases', '/use-cases'],
      ['Pricing', '/pricing'],
      ['Platform', 'https://platform.glyphh.ai'],
      ['FAQ', '/faq'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Docs', 'https://docs.glyphh.ai'],
      ['Run rrotor', 'https://docs.glyphh.ai/run-rrotor'],
      ['Self-hosting', 'https://github.com/glyphh-ai/rrotor/tree/main/docs/self-hosting'],
      ['Plugin and SDKs', 'https://github.com/glyphh-ai/glyphh'],
      ['Blog', '/blog'],
      ['GitHub', GITHUB_URL],
    ],
  },
  {
    title: 'Company',
    links: [
      ['Support', 'mailto:support@glyphh.ai'],
      ...(DISCORD_URL ? [['Discord', DISCORD_URL]] : []),
      ['Terms of Use', '/terms'],
      ['Privacy Policy', '/privacy'],
      ['Refund Policy', '/refund'],
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
              <img className="logo-dark" src="/glyphh-logo-text-white.png" alt="Glyphh" />
              <img className="logo-light" src="/glyphh-logo-text-black.png" alt="" />
            </a>
            <p className="ft-tagline">Ada, a self-hosted classifier that learns from precedent and hands the cases it is unsure of to an LLM.</p>
            <p className="ft-contact">
              <a href="mailto:support@glyphh.ai">support@glyphh.ai</a>
            </p>
            <div className="ft-social" aria-label="Glyphh elsewhere">
              {X_URL ? <a href={X_URL} aria-label="X" {...Ext(X_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L0 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.9L7 3.9H5z"/></svg>
              </a> : null}
              <a href={GITHUB_URL} aria-label="GitHub" {...Ext(GITHUB_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>
              </a>
              {DISCORD_URL ? <a href={DISCORD_URL} aria-label="Discord" {...Ext(DISCORD_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.2.4a18 18 0 0 1 4.4 1.8 15.6 15.6 0 0 0-15.2 0A18 18 0 0 1 8.8 3.4L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.6 9 0 13.4.3 17.8a20 20 0 0 0 6 3l1.3-2a12.8 12.8 0 0 1-2-1l.5-.4a14.3 14.3 0 0 0 11.8 0l.5.4a12.8 12.8 0 0 1-2 1l1.3 2a20 20 0 0 0 6-3c.4-5-1-9.4-3.4-13.4zM8.5 15.1c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-1 2.4-2.1 2.4zm7 0c-1.2 0-2.1-1.1-2.1-2.4s.9-2.4 2.1-2.4 2.1 1.1 2.1 2.4-.9 2.4-2.1 2.4z"/></svg>
              </a> : null}
              <a href={YOUTUBE_URL} aria-label="YouTube" {...Ext(YOUTUBE_URL)}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
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
          <span>We put the human back in intelligence.</span>
          <span>&copy; 2026 Glyphh AI LLC</span>
          <span className="ft-bottom-brand">
            <img src="/glyphh-mascot.png" alt="" width="16" height="16" aria-hidden="true" /> Glyphh
          </span>
        </div>
      </div>
    </footer>
  );
}
