/**
 * Controls — "Security and governance." The gradient canvas again, and the
 * admin's actual levers as one abstract screen: org connections with their
 * toggles, one connection chosen with its TOOLS narrowed, and the usage
 * chart with the budget line the gateway enforces.
 */

const favicon = (d) => `https://www.google.com/s2/favicons?domain=${d}&sz=64`;

const CONNECTIONS = [
  { name: 'Gmail', d: 'mail.google.com', on: true, selected: true },
  { name: 'Slack', d: 'app.slack.com', on: true },
  { name: 'Drive', d: 'drive.google.com', on: true },
  { name: 'Salesforce', d: 'salesforce.com', on: false },
];

const TOOLS = [
  { name: 'Read inbox', on: true },
  { name: 'Search mail', on: true },
  { name: 'Create draft', on: true },
  { name: 'Send email', on: false },
  { name: 'Delete mail', on: false },
];

const BARS = [34, 52, 41, 66, 48, 78, 58, 88];

export default function Controls() {
  return (
    <section className="controls" id="governance">
      <div className="container">
        <div className="section-label reveal">{'{'} <span className="accent">SECURITY</span> {'}'}</div>
        <h2 className="section-title reveal">Security and governance.</h2>
        <p className="ct-sub reveal">
          Decide who can reach what — connections shared by the org, tools
          narrowed per team, budgets enforced at the gateway.
        </p>

        <div className="hs-canvas gv-canvas reveal" aria-hidden="true">
          <div className="gv-frame">
            {/* Org connections, each with its toggle. */}
            <div className="gv-pane gv-conns">
              <div className="gv-pane-head">Connections</div>
              {CONNECTIONS.map((c) => (
                <div className={`gv-conn${c.selected ? ' gv-conn-sel' : ''}`} key={c.name}>
                  <img src={favicon(c.d)} alt="" />
                  <span className="gv-conn-name">{c.name}</span>
                  <span className={`gv-switch${c.on ? ' on' : ''}`} />
                </div>
              ))}
            </div>

            {/* The chosen connection: its tools, narrowed. */}
            <div className="gv-pane gv-tools">
              <div className="gv-pane-head"><img src={favicon('mail.google.com')} alt="" />Gmail · Tools</div>
              {TOOLS.map((t) => (
                <div className="gv-tool" key={t.name}>
                  <span className={`gv-check${t.on ? ' on' : ''}`}>{t.on ? '✓' : ''}</span>
                  <span className={`gv-tool-name${t.on ? '' : ' off'}`}>{t.name}</span>
                </div>
              ))}
              <div className="gv-tools-note">3 of 22 tools allowed</div>
            </div>

            {/* Usage against the budget the gateway enforces. */}
            <div className="gv-pane gv-usage">
              <div className="gv-pane-head">Usage</div>
              <div className="gv-chart">
                <span className="gv-budget"><em>budget</em></span>
                {BARS.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="gv-usage-note">credits · by day</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
