export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">
          One workspace.<br/>Every tool.<br/>One assistant.
        </h1>
        <p className="hero-sub-big">
          Glyphh runs your editor, terminal, browser, chat, and inbox in
          one native app. An AI assistant works alongside you — answer
          questions, draft a reply, fix a bug, fill a form, or hand off
          a task while you keep working.
        </p>
        <div className="hero-ctas">
          <a href="#download" className="btn btn-primary btn-lg group">
            <span className="btn-label">Download Now</span>
            <span className="btn-fill"></span>
          </a>
          <a href="#features" className="btn btn-ghost btn-lg group">
            <span className="btn-label">See How It Works</span>
            <span className="btn-fill"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
