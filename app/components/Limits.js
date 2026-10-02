import Process from './Process';

/**
 * Limits: the section after Products (his words, 2026-10-01, cleaned up).
 * Why generation has hard limits, and the direction Glyphh came from.
 */
export default function Limits() {
  return (
    <section className="hiw limits" id="limits">
      <div className="qs-head">
        <span className="qs-kicker">Why Glyphh</span>
      </div>
      <h2 className="ix-h2 lt-h2">AI is amazing, but it has hard limits.</h2>
      <div className="limits-grid">
        <p>
          AI at build time is good at what it does. But generation is bounded twice: by how the generator was
          trained, and by the person prompting it. Reinforcement learning from human feedback (RLHF) optimizes
          a model to please, which leaves it biased toward agreement and bound to respond. That is why
          generation still needs a human in the loop.
        </p>
        <p>
          Glyphh came at the problem from another direction. Vector-symbolic architectures (VSA), a branch of
          good old-fashioned AI (GOFAI), compute with meaning instead of generating it. Super human language
          generators now supply the context they need, at a scale no human could. Combining RLHF with
          hyperdimensional computing (HDC) inverts the equation: the LLM works at build time, and what it
          builds runs without it.
        </p>
      </div>
      <Process />
    </section>
  );
}
