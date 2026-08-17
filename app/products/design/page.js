import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Design — brand guidelines your agent actually follows',
  description:
    'One design system per org — colors, fonts, type and styles — extracted by your agent from a site, an image, or a sentence. Stored in memory, consumed as a live CSS contract by the apps you build, your slide decks, and your documents.',
};

/* The suite's filled marks — Design leads, the Office consumers follow. */
const ICONS = {
  design: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5a9.5 9.5 0 1 0 0 19h1.2a2 2 0 0 0 1.5-3.3 1.6 1.6 0 0 1 1.2-2.7h2.1A3.5 3.5 0 0 0 21.5 12 9.6 9.6 0 0 0 12 2.5z" fill="#ec4899" />
      <circle cx="8" cy="9" r="1.5" fill="#ffffff" />
      <circle cx="12.5" cy="6.8" r="1.5" fill="#f9a8d4" />
      <circle cx="16.4" cy="9.4" r="1.5" fill="#ffffff" />
      <circle cx="7.2" cy="13.8" r="1.5" fill="#f9a8d4" />
    </svg>
  ),
  slides: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="3.5" width="20" height="13" rx="2.5" fill="#8c3bf2" />
      <path d="M11 16.5h2v2.2h3.2a.9.9 0 1 1 0 1.8H7.8a.9.9 0 1 1 0-1.8H11z" fill="#6d28d9" />
      <path d="M10 7.2 15.4 10 10 12.8z" fill="#ffffff" />
    </svg>
  ),
  docs: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2h7L20 7.5v12A2.5 2.5 0 0 1 17.5 22h-10A2.5 2.5 0 0 1 5 19.5z" fill="#3b82f6" />
      <path d="M14.5 2 20 7.5h-4A1.5 1.5 0 0 1 14.5 6z" fill="#1d4ed8" />
      <rect x="8" y="10.6" width="8" height="1.7" rx="0.85" fill="#ffffff" />
      <rect x="8" y="14" width="8" height="1.7" rx="0.85" fill="#ffffff" />
      <rect x="8" y="17.4" width="5.2" height="1.7" rx="0.85" fill="#ffffff" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="8.6" height="8.6" rx="2" fill="#8c3bf2" />
      <rect x="12.9" y="2.5" width="8.6" height="8.6" rx="2" fill="#a78bfa" />
      <rect x="2.5" y="12.9" width="8.6" height="8.6" rx="2" fill="#a78bfa" />
      <rect x="12.9" y="12.9" width="8.6" height="8.6" rx="2" fill="#8c3bf2" />
    </svg>
  ),
};

/* ── The studio, drawn in CSS — the shots.so-shaped editor itself ── */
function StudioMock() {
  return (
    <div className="od-studio" aria-hidden="true">
      <div className="od-studio-bar">
        <span className="od-studio-back">‹ Designs</span>
        <span className="od-studio-name">Acme Brand</span>
        <span className="od-studio-saved">Saved</span>
      </div>
      <div className="od-studio-split">
        <div className="od-stage">
          <div className="od-shot">
            <div className="od-shot-card">
              <span className="od-shot-kicker">CONFIDENT · WARM</span>
              <span className="od-shot-h">Ship the vibe.</span>
              <span className="od-shot-line" />
              <span className="od-shot-line short" />
              <div className="od-shot-btns"><i /><i className="ghost" /></div>
              <div className="od-shot-swatches"><i /><i /><i /><i /></div>
            </div>
            <div className="od-shot-spec">Aa</div>
          </div>
        </div>
        <div className="od-rail">
          <div className="od-rail-sec">COLORS</div>
          <div className="od-rail-row"><span>Primary</span><i style={{ background: '#8c3bf2' }} /><em>#8c3bf2</em></div>
          <div className="od-rail-row"><span>Accent</span><i style={{ background: '#ec4899' }} /><em>#ec4899</em></div>
          <div className="od-rail-row"><span>Surface</span><i style={{ background: '#17171d' }} /><em>#17171d</em></div>
          <div className="od-rail-sec">TYPOGRAPHY</div>
          <div className="od-rail-row"><span>Display</span><em className="od-font">Sora</em></div>
          <div className="od-rail-row"><span>Body</span><em className="od-font">Inter</em></div>
          <div className="od-rail-sec">STYLES</div>
          <div className="od-rail-row"><span>Radius</span><b className="od-slider"><u /></b><em>14</em></div>
          <div className="od-rail-row"><span>Shadow</span><em>medium</em></div>
        </div>
      </div>
    </div>
  );
}

/* The consumable contract — the CSS block, verbatim shape. */
function ContractMock() {
  return (
    <div className="od-contract" aria-hidden="true">
      <div className="od-contract-tab">design css acme-brand</div>
      <pre className="od-contract-code">{`/* Glyphh Design — Acme */
:root {
  --design-primary: #8c3bf2;
  --design-accent: #ec4899;
  --design-background: #0e0e12;
  --design-surface: #17171d;
  --design-font-display: "Sora", sans-serif;
  --design-font-body: "Inter", sans-serif;
  --design-radius: 14px;
  --design-shadow: 0 8px 28px rgba(0,0,0,.18);
  --design-gradient: linear-gradient(135deg,
      #8c3bf2, #ec4899);
}`}</pre>
    </div>
  );
}

const EXTRACT = [
  {
    tag: 'from a site',
    title: 'Point it at your homepage.',
    desc: 'The agent fetches the page and its stylesheets and counts what they actually use — every color by frequency, every font family, every radius. Evidence first: it picks your true brand colors out of the noise, not every gray it found.',
  },
  {
    tag: 'from an image',
    title: 'Hand it your logo.',
    desc: 'The agent looks at the image and cross-checks its eye against a deterministic palette read — the dominant colors, quantized, with their share of the frame. A logo beats a screenshot; it will ask for one if the brand matters.',
  },
  {
    tag: 'from a sentence',
    title: 'Or just describe it.',
    desc: '“Warm, editorial, serif.” That’s enough. The agent authors a coherent system — a primary, an accent, neutrals that hold up, named palette roles — and records why it chose what it chose. Provenance travels with the system.',
  },
];

const CONSUMERS = [
  {
    icon: ICONS.apps,
    name: 'Apps',
    title: 'Every app your org builds ships on brand.',
    desc: 'This is the point. When your agent builds an app — an internal dashboard or a product your team ships to customers — it checks for the org’s design system first and styles with it by default. The system arrives as a live CSS contract: one :root block of --design-* variables the app maps its own styles onto. Change the system, and the next build follows.',
  },
  {
    icon: ICONS.slides,
    name: 'Slides',
    title: 'Decks that look like they came from your company.',
    desc: 'When the agent authors a deck, the system’s palette, fonts and tone are already in its hands — recalled from memory, not pasted in. Your quarterly review and your customer pitch stop looking like two different companies.',
  },
  {
    icon: ICONS.docs,
    name: 'Docs & everything else',
    title: 'Brand guidelines the agent actually follows.',
    desc: 'A traditional brand-guidelines PDF is a promise nobody keeps. A Glyphh design system is enforced by the author itself: documents, proposals, whatever the agent writes next — the tone words steer the voice, the type rules shape the page.',
  },
];

export default function DesignPage() {
  return (
    <div className="office-page">
      <Reveal />
      <Nav />

      {/* ── HERO ── */}
      <header className="page-hero page-hero-tight op-hero">
        <div className="container op-hero-inner">
          <div className="op-hero-copy">
            <div className="hero-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              GLYPHH DESIGN
            </div>
            <h1 className="page-hero-title">
              Your brand, <span className="hero-accent">extracted</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              One design system per org — colors, fonts, type and styles — pulled by your agent
              from your site, your logo, or a sentence. Stored in your org&rsquo;s memory and
              consumed by everything it builds: apps first, then slides, docs, and whatever comes next.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
          <div className="od-hero-mock reveal"><StudioMock /></div>
        </div>
      </header>

      {/* ── EXTRACTION ── */}
      <section className="od-extract">
        <div className="container">
          <span className="rp-eyebrow">{'{'} three ways in {'}'}</span>
          <h2 className="section-title">You don&rsquo;t design it. You show it.</h2>
          <div className="od-extract-grid">
            {EXTRACT.map((e) => (
              <div className="od-extract-card reveal" key={e.tag}>
                <span className="od-extract-tag">{e.tag}</span>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CONTRACT ── */}
      <section className="od-contract-band">
        <div className="container op-prod">
          <div className="op-prod-copy">
            <div className="op-prod-mark">{ICONS.design} Glyphh Design</div>
            <h3>A brand kit that compiles.</h3>
            <p>
              A design system here isn&rsquo;t a mood board — it&rsquo;s a document with a wire
              format. Every system renders as one CSS block of <code>--design-*</code> variables:
              colors, font stacks, type scale, radius, shadow, gradient. Apps hot-link it,
              agents read it, and the studio edits it live — change the primary once and
              everything downstream follows.
            </p>
          </div>
          <div className="op-prod-mock reveal"><ContractMock /></div>
        </div>
      </section>

      {/* ── CONSUMERS ── */}
      <section className="op-products">
        <div className="container">
          {CONSUMERS.map((c, i) => (
            <div className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`} key={c.name}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{c.icon} {c.name}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
              <div className="op-prod-mock">
                <div className={`od-consumer od-consumer-${i}`} aria-hidden="true">
                  <span className="od-consumer-chip">--design-primary</span>
                  <span className="od-consumer-chip alt">--design-font-display</span>
                  <span className="od-consumer-chip">--design-radius</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMORY ── */}
      <section className="op-memory" id="memory">
        <div className="container">
          <span className="rp-eyebrow">{'{'} one memory {'}'}</span>
          <h2 className="section-title">Guidelines that are impossible to forget.</h2>
          <p className="op-memory-sub">
            Every design system is embedded into your org&rsquo;s <em>one memory plane</em> the
            moment it&rsquo;s saved — beside your decks, documents, workbooks and conversations.
            Ask &ldquo;what&rsquo;s our brand font?&rdquo; in any session and the answer comes back
            like a memory, because it is one. Build anything, anywhere in Glyphh, and the brand
            is already in the room.
          </p>
          <div className="op-memory-diagram reveal" aria-hidden="true">
            <div className="op-mem-center"><span className="op-mem-core" /> one memory</div>
            <div className="op-mem-orbit">
              <div className="op-mem-sat">{ICONS.design}<span>design</span></div>
              <div className="op-mem-sat">{ICONS.apps}<span>apps</span></div>
              <div className="op-mem-sat">{ICONS.slides}<span>decks</span></div>
              <div className="op-mem-sat">{ICONS.docs}<span>documents</span></div>
              <div className="op-mem-sat op-mem-chat"><span className="op-mem-bubble">&ldquo;…&rdquo;</span><span>conversations</span></div>
            </div>
          </div>
          <div className="op-memory-points">
            <div className="op-memory-point">
              <h4>Recalled, not attached</h4>
              <p>No one pastes the style guide into a prompt. The agent recalls the system from org memory the way it recalls any fact — automatically, in every session, on every surface.</p>
            </div>
            <div className="op-memory-point">
              <h4>Provenance included</h4>
              <p>Every system remembers where it came from — the site it was extracted from, the logo it was read off, the words that described it — so the next edit starts from evidence.</p>
            </div>
            <div className="op-memory-point">
              <h4>One source, org-wide</h4>
              <p>The system lives in your org, not on someone&rsquo;s laptop. Update it in the studio and every member&rsquo;s agent builds with the new brand from the next turn on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card reveal">
            <h2>Set the brand once. Build forever.</h2>
            <p>Glyphh Design ships with Glyphh Desktop — extract your first system in one sentence.</p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Download Glyphh</span>
                <span className="btn-fill"></span>
              </a>
              <a href="/products/office" className="btn btn-ghost btn-lg group">
                <span className="btn-label">See Glyphh Office</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
