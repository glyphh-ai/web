import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import FinalCTA from '../../components/FinalCTA';
import {
  LaneSwitch, DesktopShot, TerminalShot, BridgeMock, TerminalMock,
  StrategyMock, InstallTabs, RelayMock, PillarCard,
} from './mocks';

// Glyphh Code (his order, 2026-09-21): the desktop coding agent and the CLI.
// Code on the subscription you already pay for, flip to the Glyphh Router in
// one switch, route by strategy. Then the Glyphh view and the CLI bridge in
// outline, the Glyphh loop as a vendor-free core, and the relay: your machine,
// driven from the web dev platform. Router page grammar, direct copy.
//
// The two screenshot slots hold MOCKUPS (DesktopShot, TerminalShot). Swap each
// for <ExpandableShot src="/screen-shots/v2/…" /> when the real images land.

export const metadata = {
  title: 'Glyphh Code — your subscription, our router, one loop',
  description:
    'The desktop coding agent and CLI. Run Claude Code or Codex on the seat you already pay for, then flip to the Glyphh Router in one switch and route every request by strategy. Our own loop underneath, no vendor in it. Code on your machine from the web over the relay.',
};

const LOGINS = ['Claude Code', 'Codex', 'Gemini'];
const ROUTED = ['semantic routing', 'auto-router', 'any model'];

/* ── The hero stage: your logins on one side, the router on the other, Glyphh Code between ── */
function CodeStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">your subscription</div>
        {LOGINS.map((l) => <div key={l} className="apx-node">{l}</div>)}
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
    tag: 'your seat',
    title: 'Code on the plan you already pay for.',
    desc: 'Claude Code, Codex, Gemini: run them inside Glyphh on their own login. The vendor bills the seat. Glyphh brings the panels, the skills, the connections, and the memory around it.',
  },
  {
    tag: 'one switch',
    title: 'Flip to the router. Nothing else moves.',
    desc: 'One switch sends the same loop through the Glyphh Router instead. Same folder, same chat, same skills. Now it is the org\'s models, the org\'s budget, and every token on the books.',
  },
  {
    tag: 'semantic routing',
    title: 'Route by what the request is.',
    desc: 'Strategies tailored off the router\'s auto-routing. A rename lands on the cheapest model that passes. A migration design lands on Fable. You never pick. The request does.',
  },
];

const BRIDGE = [
  {
    name: 'The Glyphh view',
    title: 'The vendor\'s CLI, inside your desktop.',
    desc: 'Claude Code and Codex run in the Agent panel beside your files, your terminal, your mail, and your apps. Glyphh owns the composer, the panels, the skills, and the connections. The CLI is the engine that runs the turn. Swap engines mid-day. The room stays the same.',
    mock: <DesktopShot />,
  },
  {
    name: 'The CLI bridge',
    title: 'One switch, and the desktop rewires the lane.',
    desc: 'Pick the lane and the desktop writes it for the loop: the org\'s endpoint and your member key on the router, nothing at all on your own login. It is rewritten whole on every launch, never typed into a terminal, never left in the CLI\'s config. Log out and it is gone.',
    mock: <BridgeMock />,
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
    desc: 'The Glyphh Router already picks a model per request when the org turns on auto-routing. Strategies shape that pick for code: semantic reads what the request is, burn down spends your subscription first, reserved keeps the heavy models on your seat. Set once by the org. Applied on every turn.',
    mock: <StrategyMock />,
  },
  {
    name: 'The CLI',
    title: 'The same loop, in any terminal.',
    desc: 'One install and the loop runs in-process on your org\'s login: permission modes, a slash menu, the model picker on the org\'s roster, and your last chat one flag away. Or keep the vendor\'s CLI and hand it the router with two variables. Three doors, one engine.',
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
              Your subscription<span className="dot">.</span>{' '}
              <span className="hero-accent">Our router</span><span className="dot">.</span>{' '}
              One loop<span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              The desktop coding agent and CLI. Run Claude Code or Codex on the seat you already
              pay for, inside a desktop that brings the panels, skills, and connections. Flip one
              switch and the same loop rides the <strong>Glyphh Router</strong>: every model the org
              allows, routed by strategy, every token on the books. Underneath it all, our own
              agent loop with no vendor in it, on your machine, reachable from the web.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
              <a href="/docs/cli" className="btn btn-secondary btn-lg group">
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
          <div className="section-label reveal">{'{'}<span className="accent">THE SWITCH</span>{'}'}</div>
          <h2 className="section-title reveal">Start on your seat. Switch to the router when it pays.</h2>
          <div className="od-extract-grid">
            {PILLARS.map((p) => <PillarCard key={p.tag} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── THE LANE, IN ONE FRAME ── */}
      <section className="od-contract-band">
        <div className="container op-prod">
          <div className="op-prod-copy">
            <div className="op-prod-mark">Glyphh Code</div>
            <h3>Two lanes. One line changes.</h3>
            <p>
              On your subscription the loop is the vendor&rsquo;s CLI and the vendor bills the seat.
              On the router the same loop calls the org&rsquo;s endpoint: the org&rsquo;s models, the
              org&rsquo;s budget, the org&rsquo;s strategy. Everything you built around it, the folder,
              the skills, the chat, the connections, does not know the difference.
            </p>
          </div>
          <div className="op-prod-mock reveal"><LaneSwitch /></div>
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

      {/* ── THE GLYPHH VIEW + THE CLI BRIDGE, in outline ── */}
      <section className="od-extract gcx-band">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">HOW IT PLUGS IN</span>{'}'}</div>
          <h2 className="section-title reveal">The vendor is the engine. Glyphh is the harness.</h2>
        </div>
      </section>
      <section className="op-products">
        <div className="container">
          {BRIDGE.map((c, i) => (
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

      {/* ── THE GLYPHH LOOP — the core, independent of any vendor ── */}
      <section className="od-extract gcx-band">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">THE CORE</span>{'}'}</div>
          <h2 className="section-title reveal">An agent loop that belongs to no vendor.</h2>
          <p className="section-subtitle reveal">
            Vendor CLIs come and go. The Glyphh loop is ours: the Messages API, MCP, and the
            router. It runs in the desktop and in the terminal as one engine, on any model the
            org allows, with strategies deciding which one on every turn.
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
            Use the seat while it pays. Switch to the router when it does not. Route each request
            to the model that earns it. Keep the loop, the skills, and the folder through all of
            it, on your machine, from wherever you are.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>Your seat<span className="dot">.</span> Our router<span className="dot">.</span> One switch<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh</span> free, or install the CLI and sign in to your org.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop — Free' }}
        secondary={{ href: '/products/router', label: 'See Glyphh Router' }}
      />
      <Footer />
    </div>
  );
}
