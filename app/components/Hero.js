import HeroTabs from './HeroTabs';

/**
 * Hero — the fresh-start home hero (2026-08 rebuild).
 * The new keynote type up top; below it, the original hero screen — the
 * Chat/Work/Code tab stage with the command-center switch beat.
 */
export default function Hero() {
  return (
    <section className="fh">
      <div className="container">
        {/* The thesis up top; the product line supports it. */}
        <h1 className="fh-title">One app for every job you do.</h1>
        <p className="fh-sub">
          Chat, work &amp; code with every AI, in one app, from anywhere.
        </p>
        <p className="fh-lede">
          Clear your inbox with Mistral. Build slides with Claude &amp; Gemini.
          Plan features with GPT. Build apps with all four.{' '}
          <strong>
            Glyphh carries your flow from task to task — the right models for
            every job, powered by you.
          </strong>
        </p>
        <div className="fh-ctas">
          {/* Primary funnel: straight into the app (login-first). Dev points at
              the local app-web serve; prod at the hosted app. */}
          <a
            href={process.env.NEXT_PUBLIC_APP_URL || 'https://app.glyphh.ai'}
            className="btn btn-primary btn-lg group"
          >
            <span className="btn-label">Try it Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="/products/desktop#layouts" className="btn btn-ghost btn-lg group">
            <span className="btn-label">Watch the demo</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>

      {/* The pre-rebuild hero screen: tab stage + command-center switch. */}
      <HeroTabs />
    </section>
  );
}
