import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Glyphh Office — the office suite that writes itself',
  description:
    'Slides, Docs, Sheets and Drive — except you don\u2019t write them. Say what you want, get real documents back, approve what ships. Everything lives in your org, runs on any model you choose, and shares one memory with your conversations.',
};

/* The suite's filled marks — the same SVGs the desktop ships. */
const ICONS = {
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
  sheets: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="#10b981" />
      <rect x="6" y="5.6" width="12" height="2.4" rx="1.2" fill="#ffffff" />
      <rect x="6" y="10" width="5.4" height="3.6" rx="1" fill="#a7f3d0" />
      <rect x="12.6" y="10" width="5.4" height="3.6" rx="1" fill="#ffffff" />
      <rect x="6" y="14.8" width="5.4" height="3.6" rx="1" fill="#ffffff" />
      <rect x="12.6" y="14.8" width="5.4" height="3.6" rx="1" fill="#a7f3d0" />
    </svg>
  ),
  drive: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.1 4.6A2.5 2.5 0 0 1 8.4 3h7.2a2.5 2.5 0 0 1 2.3 1.6L21.5 12h-19z" fill="#2dd4bf" />
      <path d="M2.5 12h19v5.5A2.5 2.5 0 0 1 19 20H5a2.5 2.5 0 0 1-2.5-2.5z" fill="#0f766e" />
      <circle cx="6.8" cy="16" r="1.25" fill="#ffffff" />
      <circle cx="10.6" cy="16" r="1.25" fill="#5eead4" />
    </svg>
  ),
};

/* ── CSS mockups — the products, drawn in the site's own language ── */

function SlidesMock() {
  return (
    <div className="op-mock op-mock-slides" aria-hidden="true">
      <div className="op-slide-stage">
        <div className="op-slide-kicker">GLYPHH OFFICE</div>
        <div className="op-slide-title">Q3, in nine slides</div>
        <div className="op-slide-sub">built by your agent · presented by you</div>
        <div className="op-slide-prog" />
      </div>
      <div className="op-slide-rail">
        <span className="on" /><span /><span /><span />
      </div>
    </div>
  );
}

function DocsMock() {
  return (
    <div className="op-mock op-mock-docs" aria-hidden="true">
      <div className="op-doc-review">
        <span className="op-doc-review-dot" /> 1 edit to review — <em>Approve</em>
      </div>
      <div className="op-doc-h1" />
      <div className="op-doc-line w90" />
      <div className="op-doc-line w75" />
      <div className="op-doc-line w85" />
      <div className="op-doc-h2" />
      <div className="op-doc-line w80" />
      <div className="op-doc-line w60" />
    </div>
  );
}

function SheetsMock() {
  return (
    <div className="op-mock op-mock-sheets" aria-hidden="true">
      <div className="op-sheet-fx"><span>B7</span><em>fx</em> =SUM(B2:B6)</div>
      <div className="op-sheet-grid">
        <div className="op-sheet-hrow"><span>Expense</span><span>Amount</span><span className="ai">✦ Category</span></div>
        <div className="op-sheet-row"><span>Fly.io</span><span>$212</span><span>Infra</span></div>
        <div className="op-sheet-row"><span>Figma</span><span>$45</span><span>Design</span></div>
        <div className="op-sheet-row sel"><span>Claude API</span><span>$389</span><span>Models</span></div>
        <div className="op-sheet-row total"><span>Total</span><span>$646</span><span /></div>
      </div>
      <div className="op-sheet-stats">Rows: 3 · Sum: 646 · Avg: 215.33</div>
    </div>
  );
}

function DriveMock() {
  return (
    <div className="op-mock op-mock-drive" aria-hidden="true">
      <div className="op-drive-search">Search Drive…</div>
      <div className="op-drive-row">{ICONS.slides}<span>q3-review</span><em>Slides</em></div>
      <div className="op-drive-row">{ICONS.docs}<span>offer-letter</span><em>Docs</em></div>
      <div className="op-drive-row">{ICONS.sheets}<span>budget-2026</span><em>Sheets</em></div>
    </div>
  );
}

const MODELS = ['Claude', 'Mistral', 'Kimi', 'Llama · Groq', 'Your own keys'];

const PRODUCTS = [
  {
    key: 'slides',
    icon: ICONS.slides,
    name: 'Slides',
    color: '#8c3bf2',
    title: 'Presentations you direct, not design.',
    body:
      'Say what the deck should argue and your agent authors it — real slides on a fixed 16:9 stage with build steps, keyboard navigation, and a presenter mode that floods the whole app until you hit Esc. Hide slides for one audience, export the deck as a page-per-slide PDF, pop it out into its own window for the second screen.',
    mock: <SlidesMock />,
  },
  {
    key: 'docs',
    icon: ICONS.docs,
    name: 'Docs',
    color: '#3b82f6',
    title: 'Paper that reads like paper.',
    body:
      'Documents are markdown underneath and typeset paper on screen — table of contents, templates for the documents people actually need, print and PDF from the File menu. The edit model is the point: while you draft together the agent writes freely, and once a document is done it can only propose. Every change arrives as a review card — you approve it or it never happens.',
    mock: <DocsMock />,
  },
  {
    key: 'sheets',
    icon: ICONS.sheets,
    name: 'Sheets',
    color: '#10b981',
    title: 'A grid with a brain.',
    body:
      'A real spreadsheet — formulas from SUM to IF, an fx bar, drag a range and watch Sum · Avg · Count land in the footer, resize, sort, undo. Then the part no legacy suite has: ✦ AI columns. Give a column a prompt — “categorize this expense” — and your agent fills every row with a real, stored value. Nothing recomputes behind your back; refreshing a column is a decision, not a surprise on your bill.',
    mock: <SheetsMock />,
  },
  {
    key: 'drive',
    icon: ICONS.drive,
    name: 'Drive',
    color: '#14b8a6',
    title: 'One place. Zero copies.',
    body:
      'Every deck, document and workbook your org makes, in folders you control — with search across all of it and recents up top. Drive entries are pointers to the single canonical file, never copies, so there is no “final_v2 (1)” in this universe. Open anything and it lands in the right app.',
    mock: <DriveMock />,
  },
];

export default function OfficePage() {
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
              GLYPHH OFFICE
            </div>
            <h1 className="page-hero-title">
              The office suite that <span className="hero-accent">writes itself</span><span className="dot">.</span>
            </h1>
            <p className="page-hero-sub">
              Slides, Docs, Sheets and Drive — built for the age of agents. You describe, your agent
              authors, you review and present. Every document lives in your org, on every surface,
              and shares one memory with your conversations.
            </p>
            <div className="hero-ctas">
              <a href="/#download" className="btn btn-primary btn-lg group">
                <span className="btn-label">Get Glyphh Desktop — Free</span>
                <span className="btn-fill"></span>
              </a>
            </div>
          </div>

          {/* The suite — the four marks around the glyphh core and its memory. */}
          <div className="op-collage reveal" aria-hidden="true">
            <div className="op-icon-tile op-it-slides">{ICONS.slides}<span>Slides</span></div>
            <div className="op-icon-tile op-it-docs">{ICONS.docs}<span>Docs</span></div>
            <div className="op-icon-tile op-it-sheets">{ICONS.sheets}<span>Sheets</span></div>
            <div className="op-icon-tile op-it-drive">{ICONS.drive}<span>Drive</span></div>
            <div className="op-hub">
              <span className="op-hub-ring" />
              <img src="/glyphh-mascot-square.png" alt="" width="72" height="72" />
              <span className="op-hub-mem">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="2.4" fill="currentColor" />
                  <circle cx="5" cy="6.5" r="1.6" fill="currentColor" opacity="0.7" />
                  <circle cx="19" cy="6.5" r="1.6" fill="currentColor" opacity="0.7" />
                  <circle cx="12" cy="20" r="1.6" fill="currentColor" opacity="0.7" />
                  <path d="M6.3 7.4 10.4 11M17.7 7.4 13.6 11M12 14.6V18" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
                </svg>
                memory
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── MODELS ── */}
      <section className="op-models">
        <div className="container">
          <span className="rp-eyebrow">{'{'} any model {'}'}</span>
          <h2 className="section-title">Written by whichever model you trust today.</h2>
          <p className="op-models-sub">
            Office runs on the Glyphh gateway, so every document is authored by the model your org
            chose — swap it mid-conversation and your documents don&apos;t care who wrote the last
            paragraph. Governed, metered, and yours.
          </p>
          <div className="op-model-chips">
            {MODELS.map((m) => (
              <span key={m} className="op-model-chip">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PRODUCTS ── */}
      <section className="op-products" id="products">
        <div className="container">
          {PRODUCTS.map((p, i) => (
            <div key={p.key} className={`op-prod reveal ${i % 2 ? 'op-prod-flip' : ''}`}>
              <div className="op-prod-copy">
                <div className="op-prod-mark">{p.icon}<span style={{ color: p.color }}>{p.name}</span></div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
              <div className="op-prod-mock">{p.mock}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMORY ── */}
      <section className="op-memory" id="memory">
        <div className="container">
          <span className="rp-eyebrow">{'{'} one memory {'}'}</span>
          <h2 className="section-title">Your documents remember. Together.</h2>
          <p className="op-memory-sub">
            Every save embeds the document&apos;s meaning into your org&apos;s memory plane — the same
            vector memory your agent&apos;s conversations live in. Ask <em>“what did we decide about Q3
            pricing?”</em> and recall ranks the deck, the doc, the budget sheet and the conversation
            where you decided it, side by side. The suite doesn&apos;t just store your work; it can be
            asked about it.
          </p>
          <div className="op-memory-diagram reveal" aria-hidden="true">
            <div className="op-mem-node op-mem-center">
              <span className="op-mem-core" />
              one memory
            </div>
            <div className="op-mem-orbit">
              <div className="op-mem-sat">{ICONS.slides}<span>decks</span></div>
              <div className="op-mem-sat">{ICONS.docs}<span>documents</span></div>
              <div className="op-mem-sat">{ICONS.sheets}<span>workbooks</span></div>
              <div className="op-mem-sat">{ICONS.drive}<span>drive</span></div>
              <div className="op-mem-sat op-mem-chat"><span className="op-mem-bubble">“…”</span><span>conversations</span></div>
            </div>
          </div>
          <div className="op-memory-points">
            <div className="op-memory-point">
              <h4>Org-scoped, always</h4>
              <p>Vectors live in your organization&apos;s own schema. One org&apos;s memory can never touch another&apos;s.</p>
            </div>
            <div className="op-memory-point">
              <h4>Every surface, one shelf</h4>
              <p>Desktop, web, cloud sessions — the same library, the same memory, the same recall.</p>
            </div>
            <div className="op-memory-point">
              <h4>Found, then read</h4>
              <p>Recall finds the file; the agent reads the live version. Answers come from documents as they are, not as they were.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Stop editing<span className="dot">.</span> Start directing<span className="dot">.</span></h2>
            <p>Glyphh Office ships inside <span className="compose-cmd">Glyphh Desktop</span> — free, with the models you already trust.</p>
            <div className="cta-buttons">
              <a href="/#download" className="btn btn-white btn-lg group">
                <span className="btn-label">Download for Mac — Free</span>
                <span className="btn-fill btn-fill-dark"></span>
              </a>
              <a href="/pricing" className="btn btn-ghost-white btn-lg group">
                <span className="btn-label">See Pricing</span>
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
