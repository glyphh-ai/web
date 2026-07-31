/**
 * CliHeadless — the CLI's own USP: it runs where no window is. The snippet
 * shows the machine-host attach — real behavior today.
 *
 * TODO(chris): swap the snippet for the canonical piped/scheduled
 * invocation once the headless flags are settled.
 */

export default function CliHeadless() {
  return (
    <section className="cli-headless" id="headless">
      <div className="container">
        <h2 className="section-title reveal">Headless in your pipe.</h2>
        <p className="section-subtitle reveal">
          Run it in CI, cron it, pipe into it. Expose everything you&rsquo;ve
          connected and built as an MCP endpoint any other AI can call &mdash;
          your tools, served from your machine, governed by your rules.
        </p>

        <div className="cli-snippet reveal">
          <div className="cli-snippet-bar" aria-hidden="true">
            <span /><span /><span />
            <em>build-box:~/work/api</em>
          </div>
          <pre className="cli-snippet-body"><code>{`$ glyphh
◇ signed in — org acme · loop: default
◇ machine host online — this box is reachable
◇ serving your tools over MCP

› triage the overnight Sentry issues and file the real ones`}</code></pre>
        </div>
      </div>
    </section>
  );
}
