import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import FinalCTA from '../../components/FinalCTA';
import {
  DesktopShot, TerminalShot, TerminalMock,
  StrategyMock, InstallTabs, RelayMock, PillarCard,
} from './mocks';

// Glyphh Code (his order, 2026-09-21; rewritten 2026-09-29 when the CLI lanes,
// subscriptions and BYOK went): the desktop coding agent and the CLI. One loop
// of our own, every model the team allows through the Glyphh Router, working in
// the folder you pick and nowhere else, sub-agents in parallel, and the relay:
// your machine, driven from the web. Router page grammar, direct copy.
//
// The two screenshot slots hold MOCKUPS (DesktopShot, TerminalShot). Swap each
// for <ExpandableShot src="/screen-shots/v2/…" /> when the real images land.

export const metadata = {
  title: 'Glyphh Code — one loop, every model, your folder',
  description:
    'The desktop coding agent and CLI. Our own agent loop, no vendor in it, on every model your team allows through the Glyphh Router, auto-routed per request. It works in the folder you pick and nowhere else, hands work to sub-agents in parallel, and runs on your machine, reachable from the web.',
};

const LOCAL = ['your folder', 'files + shell', 'sub-agents'];
const ROUTED = ['auto-router', 'every model', 'one budget'];

/* ── The hero stage: your folder on one side, the router on the other, Glyphh Code between ── */
function CodeStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">your machine</div>
        {LOCAL.map((l) => <div key={l} className="apx-node">{l}</div>)}
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-hub mcx-hub">
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <div className="mcx-orbit-b" />
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
        <span className="apx-hub-label">Glyphh Code</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">the glyphh router</div>
        {ROUTED.map((r) => <div key={r} className="apx-node">{r}</div>)}
      </div>
    </div>
  );
}

const PILLARS = [
  {
    tag: 'your folder',
    title: 'It works where you point it. Only there.',
    desc: 'A Code session works in the folder you pick. File tools refuse anything outside it, reads included, and the shell can write only inside it. Change the folder and the session keeps the new one.',
  },
  {
    tag: 'every model',
    title: 'Every model your team allows.',
    desc: 'Frontier and open weights, through the Glyphh Router, on every plan.',
  },
  {
    tag: 'semantic routing',
    title: 'Route by what the request is.',
    desc: 'An auto-router reads the request. A rename lands on the cheapest model that passes. A migration design lands on Fable. You never pick. The request does.',
  },
];

const LOOP = [
  {
    name: 'The Glyphh loop',
    title: 'Our own loop. No vendor in it.',
    desc: 'The Glyphh loop speaks the Messages API and MCP, and nothing else. No vendor package, no vendor login, no vendor model list. It runs any model the router allows, open weights included, and it is the same engine in the desktop panel and in the CLI. Change the vendor. Keep the loop.',
    mock: <TerminalMock />,
  },
  {
    name: 'Strategies',
    title: 'Semantic routing, tailored off auto-routing.',
    desc: 'The Glyphh Router picks a model per request when the org builds an auto-router. Semantic reads what the request is; auto sorts it light, mid or heavy. Or skip the router and every turn runs on the model you picked. Set once by the org. Applied on every turn.',
    mock: <StrategyMock />,
  },
  {
    name: 'The CLI',
    title: 'The same loop, in any terminal.',
    desc: 'One install and the loop runs in-process on your org\'s login: permission modes, a slash menu, the model picker on your team\'s list, and your last chat one flag away. Or point Claude Code at the router with a key from the console. Three doors, one engine, one budget.',
    mock: <InstallTabs />,
  },
];

export default function CodePage() {
  return (
    <div className="office-page design-page gcx-page">
      <Reveal />
      <Nav />

      {/* ── HERO ── */}
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH CODE
            </div>
            <h1 className="page-hero-title">
              One loop<span className="dot">.</span>{' '}
              <span className="hero-accent">Every model</span><span className="dot">.</span>{' '}
              Your folder<span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              The desktop coding agent and CLI. Our own agent loop, no vendor in it, on every model
              your team allows through the <strong>Glyphh Router</strong>, auto-routed per request,
              every token on the books. It works in the folder you pick and nowhere else, hands work
              to sub-agents in parallel, and runs on your machine, reachable from the web.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop</span>
                <span className="btn-fill"></span>
              </a>
              <a href="https://docs.glyphh.ai/cli" className="btn btn-secondary btn-lg group">
                <span className="btn-label">Install the CLI</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><CodeStage /></div>
        </div>
      </header>

      {/* ── THE PITCH IN THREE ── */}
      <section className="od-extract">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">THE PITCH</span>{'}'}</div>
          <h2 className="section-title reveal">Point it at a folder. Pick a model, or let the request pick.</h2>
          <div className="od-extract-grid">
            {PILLARS.map((p) => <PillarCard key={p.tag} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── THE SHOTS — mockups until the real screenshots land ── */}
      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><DesktopShot /></div>
            <div className="reveal"><TerminalShot /></div>
          </div>
        </div>
      </section>

      {/* ── THE GLYPHH LOOP — the core, independent of any vendor ── */}
      <section className="od-extract gcx-band">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">THE CORE</span>{'}'}</div>
          <h2 className="section-title reveal">An agent loop that belongs to no vendor.</h2>
          <p className="section-subtitle reveal">
            The Glyphh loop is ours: the Messages API, MCP, and the router. It runs in the desktop
            and in the terminal as one engine, on any model your team allows, with an auto-router
            deciding which one on every turn if you want it to.
          </p>
        </div>
      </section>
      <section className="op-products">
        <div className="container">
          {LOOP.map((c, i) => (
            <div className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`} key={c.name}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{c.name}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="op-prod-mock">{c.mock}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE RELAY — code on your machine, from the web ── */}
      <section className="od-extract gcx-band">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">FROM ANYWHERE</span>{'}'}</div>
          <h2 className="section-title reveal">Your machine, from the web dev platform.</h2>
        </div>
      </section>
      <section className="op-products gcx-relay-band">
        <div className="container">
          <div className="op-prod reveal">
            <div className="op-prod-copy">
              <div className="op-prod-mark">The relay</div>
              <h3>The loop runs where the code is. You run it from anywhere.</h3>
              <p>
                Your desktop dials out to Glyphh and stays attached. Open the web dev platform on a
                laptop or a phone, pick the machine, and send a turn. The relay carries it down the
                socket the desktop opened, the loop runs on your files with your tools, and every
                frame streams back to the browser. Nothing dials in. Nothing leaves the machine but
                the answer.
              </p>
            </div>
            <div className="op-prod-mock"><RelayMock /></div>
          </div>
        </div>
      </section>

      {/* ── THE CLOSE ── */}
      <section className="od-extract">
        <div className="container">
          <h2 className="section-title reveal">A coding agent should not be a subscription with a terminal attached.</h2>
          <p className="section-subtitle reveal">
            Route each request to the model that earns it. Keep the loop, the skills, and the
            folder through all of it, on your machine, from wherever you are. Never per seat, per
            model or per install.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>One loop<span className="dot">.</span> Every model<span className="dot">.</span> Your folder<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh</span>, or install the CLI and sign in to your org. Free on your own machines.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop' }}
        secondary={{ href: '/products/router', label: 'See Glyphh Router' }}
      />
      <Footer />
    </div>
  );
}
