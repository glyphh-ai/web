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
        {/* The original hero text, set in the new keynote type. */}
        <h1 className="fh-title">
          Chat, work &amp; code{' '}
          <span className="fh-accent">with every AI, in one app, from anywhere.</span>
        </h1>
        <p className="fh-lede">
          Emails with Mistral. Slides with Claude &amp; Gemini. Plans with
          GPT. Apps with all four.{' '}
          <strong>
            Glyphh carries your flow from task to task — the right models for
            every job.
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
