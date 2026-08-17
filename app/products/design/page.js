import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Design — a design system for everything you ship',
  description:
    'Spin up a real design system for anything — a marketing site, a web app, a client build. Ripped from a site, read off a logo, or conjured from one sentence; compiled to CSS; remembered by your org so everything built on it stays on-system.',
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
    title: 'Point it at any site you love.',
    desc: 'Glyphh pulls the page and its stylesheets and counts what they actually use — every color by frequency, every font family, every radius. Evidence, not vibes: it picks the real system out of the noise instead of worshipping every gray it found.',
  },
  {
    tag: 'from an image',
    title: 'Throw it a logo.',
    desc: 'It reads the image and cross-checks itself against a cold, deterministic palette read — dominant colors, quantized, with their share of the frame. A logo beats a screenshot, and it will say so.',
  },
  {
    tag: 'from a sentence',
    title: 'Or just say it.',
    desc: '“Warm, editorial, serif.” Done. You get a coherent system — a primary, an accent, neutrals that hold up, named palette roles — with a note on why every choice was made. Provenance travels with the system.',
  },
];

const CONSUMERS = [
  {
    icon: ICONS.apps,
    name: 'Web & app dev',
    title: 'Start every project past the boring part.',
    desc: 'This is the point. Build a web app, a dashboard, a product for customers — and it starts already styled, because the system arrives as a live CSS contract: one :root block of --design-* variables any stack maps its own styles onto. No default Bootstrap, no re-picking the same purple in the fourth codebase. Change the system once and the next build follows.',
  },
  {
    icon: ICONS.design,
    name: 'Client work',
    title: 'One system per client. Zero brand bleed.',
    desc: 'You build for other people. Keep a shelf of systems — one per client, per product, per experiment — and every project recalls its own. Switch from the fintech client to the record label and the whole toolchain switches brains with you: right palette, right type, right tone, no leftovers.',
  },
  {
    icon: ICONS.slides,
    name: 'Marketing & Office',
    title: 'The launch page matches the product. So does the deck.',
    desc: 'The same system that styles the app styles the landing page, the pitch deck, and the proposal doc — Slides and Docs pull it from memory instead of guessing. Your own company brand? That’s just one more system on the shelf, not the product.',
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
              Every build gets a <span className="hero-accent">design system</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              The marketing site, the web app, the client gig, the weekend hack — each one gets its
              own real system: colors, fonts, type, styles, compiled to one CSS contract. Show it a
              site you love, a logo, or a sentence. Everything built on it ships on-system.
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
              A design system here isn&rsquo;t a mood board or a 60-page PDF nobody opens —
              it&rsquo;s a document with a wire format. Every system renders as one CSS block of
              <code> --design-*</code> variables: colors, font stacks, type scale, radius, shadow,
              gradient. Sites hot-link it, codebases map onto it, the studio edits it live —
              change the primary once and everything downstream follows.
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
          <h2 className="section-title">A style guide that talks back.</h2>
          <p className="op-memory-sub">
            Every system is embedded into your org&rsquo;s <em>one memory plane</em> the moment
            it&rsquo;s saved — beside your decks, documents, workbooks and conversations. Start
            building anything, anywhere in Glyphh, and the right system is already in the room.
            Ask &ldquo;what font does the fintech project use?&rdquo; and the answer comes back
            like a memory, because it is one.
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
              <h4>A shelf, not a file</h4>
              <p>Hundreds of systems per org if you want them — per client, per product, per mood. They live in your org, not on someone&rsquo;s laptop, and every member builds from the same shelf.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card reveal">
            <h2>Build the system. Then build everything else.</h2>
            <p>Glyphh Design ships with Glyphh Desktop — rip your first system from a site in one sentence.</p>
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
