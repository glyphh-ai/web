export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-label">{'{'}
          <span className="accent">HOW IT WORKS</span>
          {'}'}</div>
        <h2 className="section-title">One conversation. Every panel.</h2>

        <div className="steps">
          <div className="step reveal">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Open your panels</h3>
              <p>Claude, Gemini, Slack, your IDE — each running in its own panel.
                As you work, context is collected in the background. You never have to capture anything manually.</p>
            </div>
            <div className="step-visual">
              <div className="step-window">
                <div className="step-panels">
                  <div className="step-panel active">Claude</div>
                  <div className="step-panel">Gemini</div>
                  <div className="step-panel">Slack</div>
                </div>
              </div>
            </div>
          </div>

          <div className="step step-reverse reveal">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>.yo to speak</h3>
              <p>Drop .yo anywhere. You&apos;re in the conversation. Background context from every open panel is right there —
                ask, refine, direct. The AI that responds is the .sup.</p>
            </div>
            <div className="step-visual">
              <div className="step-capture">
                <div className="step-cmd">
                  <span className="step-prompt">&gt;</span> .yo what do you think of the code changes we just made?
                </div>
                <div className="step-arrow">&#8595;</div>
                <div className="step-result">gemini .sup — context loaded</div>
              </div>
            </div>
          </div>

          <div className="step reveal">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>.dip to move</h3>
              <p>Head to a new panel with .dip. Drop .yo again and your context follows.
                Crystallize the conversation into a summary, a spec, a message — wherever you land.</p>
            </div>
            <div className="step-visual">
              <div className="step-recall">
                <div className="step-cmd">
                  <span className="step-prompt">&gt;</span> .dip slack
                </div>
                <div className="step-arrow">&#8595;</div>
                <div className="step-loaded">Context travels with you</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
