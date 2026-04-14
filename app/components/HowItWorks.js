export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">HOW IT WORKS</span>
          {'}'}</div>
        <h2 className="section-title">From conversation to context in seconds</h2>

        <div className="steps">
          <div className="step reveal">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Chat with any AI</h3>
              <p>Use Claude, Gemini, ChatGPT — Yo works alongside them all.
                Each AI runs in its own panel inside Yo&apos;s desktop app.</p>
            </div>
            <div className="step-visual">
              <div className="step-window">
                <div className="step-panels">
                  <div className="step-panel active">Claude</div>
                  <div className="step-panel">Gemini</div>
                  <div className="step-panel">ChatGPT</div>
                </div>
              </div>
            </div>
          </div>

          <div className="step step-reverse reveal">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Type &quot;yo&quot; to capture</h3>
              <p>One command grabs the conversation. Yo&apos;s AI extracts the useful parts,
                strips the noise, and opens it in the context workbench for refinement.</p>
            </div>
            <div className="step-visual">
              <div className="step-capture">
                <div className="step-cmd">
                  <span className="step-prompt">&gt;</span> yo extract the api design decisions
                </div>
                <div className="step-arrow">&#8595;</div>
                <div className="step-result">api-design-decisions.md</div>
              </div>
            </div>
          </div>

          <div className="step reveal">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Type &quot;sup&quot; to recall</h3>
              <p>When you need that context again — in any AI, any conversation —
                just type &quot;sup&quot; and describe what you&apos;re looking for. It loads instantly.</p>
            </div>
            <div className="step-visual">
              <div className="step-recall">
                <div className="step-cmd">
                  <span className="step-prompt">&gt;</span> sup api decisions
                </div>
                <div className="step-arrow">&#8595;</div>
                <div className="step-loaded">Context loaded into Claude</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
