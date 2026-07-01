'use client';

// Note: keeps the `cypher-*` class names — they're the section's internal
// CSS hooks in globals.css. Only the copy and anchors changed.
function SwarmDiagram() {
  return (
    <div className="cypher-diagram">
      <svg viewBox="0 0 800 680" fill="none" xmlns="http://www.w3.org/2000/svg" className="cypher-diagram-svg">
        <defs>
          <filter id="glow-g" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feFlood floodColor="#9b3cf6" floodOpacity="0.35" result="c" />
            <feComposite in="c" in2="b" operator="in" result="g" />
            <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-b" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feFlood floodColor="#64b5f6" floodOpacity="0.3" result="c" />
            <feComposite in="c" in2="b" operator="in" result="g" />
            <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-y" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feFlood floodColor="#ffb400" floodOpacity="0.3" result="c" />
            <feComposite in="c" in2="b" operator="in" result="g" />
            <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connection spines */}
        <path d="M400,90 L400,190" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M400,250 Q310,290 220,340" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M400,250 Q490,290 580,340" stroke="#1a1a1a" strokeWidth="2" />
        <path d="M220,400 Q170,430 120,460" stroke="#151515" strokeWidth="1.5" />
        <path d="M220,400 Q270,430 320,460" stroke="#151515" strokeWidth="1.5" />
        <path d="M580,400 Q530,430 480,460" stroke="#151515" strokeWidth="1.5" />
        <path d="M580,400 Q630,430 680,460" stroke="#151515" strokeWidth="1.5" />

        {/* Animated flowing dashes */}
        <path d="M400,90 L400,190" stroke="#9b3cf6" strokeWidth="2" strokeDasharray="8 12" className="cypher-flow-line" />
        <path d="M400,250 Q310,290 220,340" stroke="#9b3cf6" strokeWidth="2" strokeDasharray="8 12" className="cypher-flow-line" style={{ animationDelay: '0.3s' }} />
        <path d="M400,250 Q490,290 580,340" stroke="#9b3cf6" strokeWidth="2" strokeDasharray="8 12" className="cypher-flow-line" style={{ animationDelay: '0.6s' }} />
        <path d="M220,400 Q170,430 120,460" stroke="#4caf50" strokeWidth="1.5" strokeDasharray="6 10" className="cypher-flow-line" style={{ animationDelay: '0.9s' }} />
        <path d="M220,400 Q270,430 320,460" stroke="#4caf50" strokeWidth="1.5" strokeDasharray="6 10" className="cypher-flow-line" style={{ animationDelay: '1.1s' }} />
        <path d="M580,400 Q530,430 480,460" stroke="#4caf50" strokeWidth="1.5" strokeDasharray="6 10" className="cypher-flow-line" style={{ animationDelay: '1.3s' }} />
        <path d="M580,400 Q630,430 680,460" stroke="#4caf50" strokeWidth="1.5" strokeDasharray="6 10" className="cypher-flow-line" style={{ animationDelay: '1.5s' }} />

        {/* Data packets traveling down the hierarchy */}
        <circle r="3.5" fill="#9b3cf6" className="cypher-packet">
          <animateMotion dur="2s" repeatCount="indefinite" path="M400,90 L400,190" />
        </circle>
        <circle r="3" fill="#9b3cf6" className="cypher-packet">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s" path="M400,250 Q310,290 220,340" />
        </circle>
        <circle r="3" fill="#9b3cf6" className="cypher-packet">
          <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M400,250 Q490,290 580,340" />
        </circle>
        <circle r="2.5" fill="#4caf50" className="cypher-packet">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s" path="M220,400 Q170,430 120,460" />
        </circle>
        <circle r="2.5" fill="#4caf50" className="cypher-packet">
          <animateMotion dur="2s" repeatCount="indefinite" begin="2s" path="M220,400 Q270,430 320,460" />
        </circle>
        <circle r="2.5" fill="#4caf50" className="cypher-packet">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.8s" path="M580,400 Q530,430 480,460" />
        </circle>
        <circle r="2.5" fill="#4caf50" className="cypher-packet">
          <animateMotion dur="2s" repeatCount="indefinite" begin="2.3s" path="M580,400 Q630,430 680,460" />
        </circle>

        {/* Glyphh agent pulsing rings */}
        <circle cx="400" cy="60" r="40" fill="none" stroke="#9b3cf6" strokeWidth="1" className="cypher-ring" />
        <circle cx="400" cy="60" r="40" fill="none" stroke="#9b3cf6" strokeWidth="1" className="cypher-ring" style={{ animationDelay: '1.5s' }} />
        <circle cx="400" cy="60" r="40" fill="none" stroke="#9b3cf6" strokeWidth="1" className="cypher-ring" style={{ animationDelay: '3s' }} />

        {/* ── Nodes ── */}

        {/* Glyphh agent — spawns the swarm */}
        <g className="cypher-node" filter="url(#glow-g)">
          <rect x="332" y="30" width="136" height="60" rx="14" fill="#0a0a0a" stroke="#9b3cf6" strokeWidth="2" />
          <circle cx="364" cy="60" r="8" fill="#9b3cf6" opacity="0.12" />
          <circle cx="364" cy="60" r="4" fill="#9b3cf6" className="cypher-dot-pulse" />
          <text x="382" y="58" fill="#e8e8e8" fontSize="13" fontWeight="600" fontFamily="var(--font-mono)">Glyphh agent</text>
          <text x="382" y="73" fill="#555" fontSize="9" fontFamily="var(--font-mono)">spawns the swarm</text>
        </g>

        {/* Leader */}
        <g className="cypher-node" filter="url(#glow-y)">
          <rect x="330" y="190" width="140" height="60" rx="14" fill="#0a0a0a" stroke="#ffb400" strokeWidth="1.5" />
          <circle cx="360" cy="220" r="6" fill="#ffb400" className="cypher-dot-pulse" style={{ animationDelay: '0.5s' }} />
          <text x="375" y="225" fill="#e8e8e8" fontSize="13" fontWeight="500" fontFamily="var(--font-mono)">leader</text>
          <text x="345" y="242" fill="#555" fontSize="9" fontFamily="var(--font-mono)">decomposes goal</text>
        </g>

        {/* Sub-leader Left */}
        <g className="cypher-node" filter="url(#glow-b)">
          <rect x="145" y="340" width="150" height="60" rx="14" fill="#0a0a0a" stroke="#64b5f6" strokeWidth="1.5" />
          <circle cx="175" cy="370" r="6" fill="#64b5f6" className="cypher-dot-pulse" style={{ animationDelay: '1s' }} />
          <text x="190" y="375" fill="#e8e8e8" fontSize="13" fontWeight="500" fontFamily="var(--font-mono)">sub-leader</text>
          <text x="160" y="392" fill="#555" fontSize="9" fontFamily="var(--font-mono)">coordinates branch</text>
        </g>

        {/* Sub-leader Right */}
        <g className="cypher-node" filter="url(#glow-b)">
          <rect x="505" y="340" width="150" height="60" rx="14" fill="#0a0a0a" stroke="#64b5f6" strokeWidth="1.5" />
          <circle cx="535" cy="370" r="6" fill="#64b5f6" className="cypher-dot-pulse" style={{ animationDelay: '1.2s' }} />
          <text x="550" y="375" fill="#e8e8e8" fontSize="13" fontWeight="500" fontFamily="var(--font-mono)">sub-leader</text>
          <text x="520" y="392" fill="#555" fontSize="9" fontFamily="var(--font-mono)">coordinates branch</text>
        </g>

        {/* Workers */}
        {[[70, 460], [270, 460], [430, 460], [630, 460]].map(([x, y], i) => (
          <g key={i} className="cypher-node">
            <rect x={x} y={y} width="100" height="50" rx="10" fill="#0a0a0a" stroke="#1e1e1e" strokeWidth="1" />
            <circle cx={x + 20} cy={y + 25} r="4" fill="#4caf50" className="cypher-dot-pulse" style={{ animationDelay: `${1.5 + i * 0.2}s` }} />
            <text x={x + 30} y={y + 29} fill="#999" fontSize="11" fontFamily="var(--font-mono)">worker</text>
          </g>
        ))}

        {/* Fading worker rows suggesting depth */}
        {[[100, 530, 80, 38, 0.5], [240, 530, 80, 38, 0.5], [380, 530, 80, 38, 0.5], [520, 530, 80, 38, 0.5], [660, 530, 80, 38, 0.5]].map(([x, y, w, h, op], i) => (
          <g key={`r1-${i}`} opacity={op}>
            <rect x={x} y={y} width={w} height={h} rx="8" fill="none" stroke="#1a1a1a" strokeWidth="1" />
            <circle cx={x + 16} cy={y + h / 2} r="3" fill="#4caf50" className="cypher-dot-pulse" style={{ animationDelay: `${2 + i * 0.15}s` }} />
            <text x={x + 24} y={y + h / 2 + 3} fill="#666" fontSize="9" fontFamily="var(--font-mono)">worker</text>
          </g>
        ))}
        {[[140, 578, 60, 30, 0.25], [260, 578, 60, 30, 0.25], [380, 578, 60, 30, 0.25], [500, 578, 60, 30, 0.25], [620, 578, 60, 30, 0.25]].map(([x, y, w, h, op], i) => (
          <g key={`r2-${i}`} opacity={op}>
            <rect x={x} y={y} width={w} height={h} rx="6" fill="none" stroke="#141414" strokeWidth="1" />
            <circle cx={x + 12} cy={y + h / 2} r="2" fill="#4caf50" className="cypher-dot-pulse" style={{ animationDelay: `${2.5 + i * 0.15}s` }} />
          </g>
        ))}
        <text x="400" y="660" textAnchor="middle" fill="#9b3cf6" fontSize="12" fontWeight="500" fontFamily="var(--font-mono)" className="cypher-scale-text">
          all local — your machine, your keys, your agents
        </text>
      </svg>
    </div>
  );
}

export default function Swarm() {
  return (
    <section className="cypher-section" id="swarm">
      <div className="container">
        <div className="command-section" style={{ padding: 0 }}>
          <h2 className="command-hero-title reveal">
            <span className="dot dot-hidden" data-dot-anchor id="cmd-swarm">.</span>Swarm
          </h2>
          <p className="command-hero-tagline reveal" style={{ marginBottom: 0 }}>Many agents, one goal — all on your machine.</p>
        </div>
        <p className="section-subtitle reveal" style={{ maxWidth: '720px', margin: '1rem auto 3rem' }}>
          Tell the Glyphh agent what you want and it spins up a swarm — a roster
          of your own agents working the goal together. A leader decomposes it and assigns tasks
          over an in-process bus; the rest execute and report back. No server, no sign-ups, no shared
          billing. Your agents, your API keys, your sandbox — and the whole thing streams inline as
          it happens.
        </p>

        <div className="cypher-how reveal">
          <h3 className="cypher-how-title">How it works</h3>
          <div className="cypher-steps">
            <div className="cypher-step">
              <div className="cypher-step-num">1</div>
              <div>
                <h4>Set the goal</h4>
                <p>Switch the Glyphh agent into swarm mode and state what you
                want — research a topic, refactor a module, ship a feature. It picks the right agents
                from your library.</p>
              </div>
            </div>
            <div className="cypher-step">
              <div className="cypher-step-num">2</div>
              <div>
                <h4>The leader decomposes</h4>
                <p>The first agent leads — it breaks the goal into concrete tasks and assigns one to
                each worker over the bus. Deep work nests under sub-leaders.</p>
              </div>
            </div>
            <div className="cypher-step">
              <div className="cypher-step-num">3</div>
              <div>
                <h4>Agents work in parallel</h4>
                <p>Each agent runs locally — read-only for a one-shot take, or a full agent loop with
                tools and files. They coordinate, accept, report, and complete over the bus.</p>
              </div>
            </div>
            <div className="cypher-step">
              <div className="cypher-step-num">4</div>
              <div>
                <h4>Watch it land</h4>
                <p>Every assignment, message, and result streams inline into your Glyphh
                conversation. The leader consolidates, and the work hits your files.</p>
              </div>
            </div>
          </div>
        </div>

        <SwarmDiagram />
      </div>
    </section>
  );
}
