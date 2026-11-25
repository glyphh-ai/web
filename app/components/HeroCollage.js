/**
 * The home page's hero wall: three columns of things we have made (app screens, the games, the old Glyphh router and
 * engine line art) drifting up and down at different speeds, tilted in perspective behind the headline. Pure CSS
 * motion (studio.css .hc-*), stopped for people who ask for reduced motion. Every image is one already on the site.
 */
const COLUMNS = [
  [
    { src: '/collage/hero_design.jpg', alt: 'The Glyphh desktop app with design work open' },
    { src: '/art/router.webp', alt: 'The Glyphh router: many requests in, one decision out', art: true },
    { src: '/projects/crabby-knife-fight/place-1.webp', alt: 'Crabby Knife Fight' },
    { src: '/collage/home_glyphh-home-2.jpg', alt: 'The Glyphh app with a map and research side by side' },
    { src: '/projects/send-a-carol/christmas-cover.jpg', alt: 'Send a Carol' },
    { src: '/art/semantic.webp', alt: 'Semantic data: records to vectors to a graph', art: true },
  ],
  [
    { src: '/projects/free-flow/race.jpg', alt: 'Free Flow, a downhill longboard race' },
    { src: '/collage/hero_code.jpg', alt: 'The Glyphh app writing code' },
    { src: '/art/rrotor.webp', alt: 'rrotor', art: true },
    { src: '/projects/bams-and-brags/look-rooftop.webp', alt: 'Bams & Brags mah jongg' },
    { src: '/collage/glyphh-command-palette.jpg', alt: 'The Glyphh command palette' },
    { src: '/projects/free-fall-frank/rock-card.jpg', alt: 'Free Fall Frank' },
  ],
  [
    { src: '/art/connect.webp', alt: 'Connections', art: true },
    { src: '/projects/glyphh-bot/2-rich-chat.jpg', alt: 'Glyphh Bot' },
    { src: '/collage/home_glyphh-home-4.jpg', alt: 'A page built in the Glyphh app' },
    { src: '/projects/drip/game-snake.jpg', alt: 'Drip games in Claude' },
    { src: '/art/govern.webp', alt: 'Governance', art: true },
    { src: '/collage/v2_chat-1.jpg', alt: 'The Glyphh app chatting with a map' },
  ],
];

export default function HeroCollage() {
  return (
    <div className="hc" aria-hidden="true">
      <div className="hc-tilt">
        {COLUMNS.map((col, i) => (
          <div key={i} className={`hc-col hc-col-${i}`}>
            {/* each column twice over, so the drift loops without a seam */}
            {[...col, ...col].map((t, j) => (
              <div key={j} className={t.art ? 'hc-tile art' : 'hc-tile'}>
                <img src={t.src} alt="" loading={j < 3 ? 'eager' : 'lazy'} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// What it is built with: the tools under the projects on this site (icons from Simple Icons, CC0).
export const TECH = [
  ['claude', 'Claude'], ['anthropic', 'Anthropic'], ['python', 'Python'], ['typescript', 'TypeScript'],
  ['javascript', 'JavaScript'], ['nextdotjs', 'Next.js'], ['react', 'React'], ['threedotjs', 'three.js'],
  ['nodedotjs', 'Node.js'], ['postgresql', 'PostgreSQL'], ['docker', 'Docker'], ['flydotio', 'Fly.io'],
  ['github', 'GitHub'], ['numpy', 'NumPy'], ['pytorch', 'PyTorch'], ['huggingface', 'Hugging Face'],
];

export function TechStrip() {
  return (
    <ul className="hc-tech" aria-label="Built with">
      {TECH.map(([file, name]) => (
        <li key={file} title={name}>
          <span className="hc-icon" style={{ WebkitMaskImage: `url(/tech/${file}.svg)`, maskImage: `url(/tech/${file}.svg)` }} />
          <span className="hc-tech-name">{name}</span>
        </li>
      ))}
    </ul>
  );
}
