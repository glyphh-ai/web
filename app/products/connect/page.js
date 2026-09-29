import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';
import ExpandableShot from '../../components/ExpandableShot';
import FinalCTA from '../../components/FinalCTA';
import { WayCard } from '../router/mocks';

// Glyphh Connect (his order, 2026-09-18): the connections product, on its own
// page, in the router page's grammar. Direct copy, no framing.

export const metadata = {
  title: 'Glyphh Connect — 3,500+ services as tools for any loop',
  description:
    'Connect Gmail, Slack, Salesforce, GitHub, Notion, and 3,500+ more once. Every loop on the desktop can call them as tools, with org-shared or personal auth. RPA reaches what has no API.',
};

const SERVICES = [
  'slack.com', 'mail.google.com', 'salesforce.com', 'github.com', 'notion.so',
  'figma.com', 'linear.app', 'stripe.com', 'vercel.com', 'discord.com',
  'zoom.us', 'asana.com', 'airtable.com', 'dropbox.com', 'shopify.com',
  'hubspot.com', 'atlassian.net', 'docs.google.com', 'calendly.com', 'intercom.com',
];

const LOOPS = ['Claude Code', 'Codex', 'Gemini', 'Glyphh loop'];

function ConnectStage() {
  return (
    <div className="apx-stage mcx-stage gwx-hero-stage" aria-hidden="true">
      <div className="apx-col">
        <div className="apx-col-label">the loops</div>
        {LOOPS.map((l) => <div key={l} className="apx-node">{l}</div>)}
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-hub mcx-hub">
        <div className="mcx-apps">
          <span className="mcx-apps-label">3,500+ services</span>
          <div className="mcx-apps-track">
            {[...SERVICES, ...SERVICES].map((d, i) => (
              <span key={d + i} className="mcx-app">
                <img src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width="16" height="16" loading="lazy" />
              </span>
            ))}
          </div>
        </div>
        <div className="mcx-vflows">
          <div className="mcx-vflow"><i /><i /></div>
          <div className="mcx-vflow mcx-vflow-up"><i /><i /></div>
        </div>
        <div className="apx-glow" />
        <div className="apx-orbit" />
        <div className="mcx-orbit-b" />
        <img src="/glyphh-mascot-square-black.png" alt="" className="apx-mascot" width="88" height="88" />
        <span className="apx-hub-label">Glyphh Connect</span>
      </div>
      <div className="mcx-flows">
        <div className="apx-flow"><i /><i /><i /></div>
        <div className="apx-flow mcx-flow-back"><i /><i /></div>
      </div>
      <div className="apx-col">
        <div className="apx-col-label">as tools</div>
        <div className="apx-node">org-shared auth</div>
        <div className="apx-node">personal auth</div>
        <div className="apx-node">RPA beyond APIs</div>
      </div>
    </div>
  );
}

const WAYS = [
  { tag: 'CONNECT', title: 'Connect once', desc: 'Sign in to a service one time. It appears as a set of tools in every loop on the desktop, and in every app that asks for it through the framework.' },
  { tag: 'SHARE', title: 'Org-shared or personal', desc: 'An admin connects a service for the whole organization, or each person connects their own. The tool is the same; the auth is whose you chose.' },
  { tag: 'REACH', title: 'RPA for the rest', desc: 'When a service has no API, the desktop drives it on screen: a field map, a step sequence, resolve, act, verify, heal.' },
];

export default function ConnectPage() {
  return (
    <div className="office-page design-page">
      <Reveal />
      <Nav />
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH CONNECT
            </div>
            <h1 className="page-hero-title">
              3,500+ services<span className="dot">.</span>{' '}
              <span className="hero-accent">Tools for any loop</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              Connect Gmail, Slack, Salesforce, GitHub, Notion, and thousands more once.
              Every loop on the desktop can call them. Org-shared or personal auth,
              your choice. RPA reaches what has no API.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><ConnectStage /></div>
        </div>
      </header>

      <section className="od-extract">
        <div className="container">
          <div className="section-label reveal">{'{'}<span className="accent">THREE WAYS IN</span>{'}'}</div>
          <h2 className="section-title reveal">Connect once. Call from anywhere.</h2>
          <div className="od-extract-grid">
            {WAYS.map((w) => <WayCard key={w.tag} tag={w.tag} title={w.title} desc={w.desc} />)}
          </div>
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <div className="shots-grid">
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-connections-1.jpg" alt="Connections in Glyphh: Gmail, Google Calendar and Google Drive connected" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
            <div className="reveal"><ExpandableShot src="/screen-shots/v2/settings-connections-2.jpg" alt="Gmail tool permissions: Always allow for reads, approval for the rest" crop={{ pos: '50% 48%', zoom: 1.9 }} /></div>
          </div>
        </div>
      </section>

      <section className="od-extract">
        <div className="container">
          <h2 className="section-title reveal">A connection is a tool, not an integration.</h2>
          <p className="section-subtitle reveal">
            The loop sees a tool with a name and a schema. It does not see OAuth, tokens,
            or a vendor SDK. Swap the model and the tools are still there. Swap the loop
            and the tools are still there. That is the whole point of putting them behind
            the harness instead of inside one client.
          </p>
        </div>
      </section>

      <FinalCTA
        title={<h2>Connect it once<span className="dot">.</span> Every loop gets it<span className="dot">.</span></h2>}
        text={<p>Download <span className="compose-cmd">Glyphh</span> free and connect your first service in a minute.</p>}
        primary={{ href: '/#download', label: 'Get Glyphh Desktop' }}
        secondary={{ href: '/products/router', label: 'See Glyphh Router' }}
      />
      <Footer />
    </div>
  );
}
