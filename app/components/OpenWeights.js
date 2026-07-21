/**
 * OpenWeights — the model story we alone can tell: frontier AND open weights
 * in one picker, one subscription, priced in credits. The mock IS the claim —
 * a close-up of the picker with the open-weight group front and center.
 */

const FRONTIER = [
  { name: 'Fable 5', by: 'Anthropic' },
  { name: 'GPT-5', by: 'OpenAI' },
  { name: 'Gemini', by: 'Google' },
];

const OPEN = [
  { name: 'Llama 4', by: 'Meta', cr: '2 cr / M' },
  { name: 'Gemma 3', by: 'Google', cr: '1 cr / M' },
  { name: 'Qwen 3', by: 'Alibaba', cr: '1 cr / M' },
  { name: 'Mistral Large', by: 'Mistral', cr: '2 cr / M' },
];

export default function OpenWeights() {
  return (
    <section className="openweights" id="models">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">MODELS</span> {'}'}</div>
        <h2 className="section-title reveal">Any model. Including the open ones.</h2>
        <p className="ow-sub reveal">
          Frontier when it matters. Open weights when it doesn&apos;t.
          One subscription, priced in credits — never locked to one lab.
        </p>

        <div className="ow-picker reveal" aria-hidden="true">
          <div className="ow-group">
            <div className="ow-group-label">Frontier</div>
            {FRONTIER.map((m) => (
              <div className="ow-row" key={m.name}>
                <i className="ch-dot ch-dot-frontier" />
                <span className="ow-name">{m.name}</span>
                <span className="ow-by">{m.by}</span>
              </div>
            ))}
          </div>
          <div className="ow-group ow-group-open">
            <div className="ow-group-label">Open weights</div>
            {OPEN.map((m) => (
              <div className="ow-row" key={m.name}>
                <i className="ch-dot ch-dot-open" />
                <span className="ow-name">{m.name}</span>
                <span className="ow-by">{m.by}</span>
                <span className="ow-cr">{m.cr}</span>
              </div>
            ))}
            <div className="ow-more">+ hundreds more in the index</div>
          </div>
        </div>
      </div>
    </section>
  );
}
