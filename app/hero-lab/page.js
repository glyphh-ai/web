import { Unbounded, Orbitron, Syncopate, Michroma, Chakra_Petch, Big_Shoulders, Space_Grotesk, Audiowide } from 'next/font/google';

// A scratch page (2026-10-01): the home headline in candidate display faces,
// so he can pick one. Delete once a face is chosen.

const unbounded = Unbounded({ subsets: ['latin'], weight: ['500', '600', '700', '900'] });
const orbitron = Orbitron({ subsets: ['latin'], weight: ['500', '600', '700', '900'] });
const syncopate = Syncopate({ subsets: ['latin'], weight: ['700'] });
const michroma = Michroma({ subsets: ['latin'], weight: ['400'] });
const chakra = Chakra_Petch({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['italic'] });
const shoulders = Big_Shoulders({ subsets: ['latin'], weight: ['900'] });
const grotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'] });
const audiowide = Audiowide({ subsets: ['latin'], weight: ['400'] });

export const metadata = { title: 'Hero lab', robots: { index: false } };

const OPTIONS = [
  ['E1', 'Chakra Petch italic 700 (as before)', chakra.className, { fontSize: '8vw', letterSpacing: '-0.02em', fontWeight: 700 }],
  ['E2', 'Chakra Petch italic 600', chakra.className, { fontSize: '8vw', letterSpacing: '-0.02em', fontWeight: 600 }],
  ['E3', 'Chakra Petch italic 500', chakra.className, { fontSize: '8vw', letterSpacing: '-0.02em', fontWeight: 500 }],
  ['E4', 'Chakra Petch italic 400', chakra.className, { fontSize: '8vw', letterSpacing: '-0.02em', fontWeight: 400 }],
  ['A1', 'Unbounded 900 (as before)', unbounded.className, { fontSize: '6.4vw', letterSpacing: '-0.04em', fontWeight: 900 }],
  ['A2', 'Unbounded 700', unbounded.className, { fontSize: '6.4vw', letterSpacing: '-0.04em', fontWeight: 700 }],
  ['A3', 'Unbounded 600', unbounded.className, { fontSize: '6.4vw', letterSpacing: '-0.04em', fontWeight: 600 }],
  ['A4', 'Unbounded 500', unbounded.className, { fontSize: '6.4vw', letterSpacing: '-0.04em', fontWeight: 500 }],
  ['B1', 'Orbitron 900 (as before)', orbitron.className, { fontSize: '6.6vw', letterSpacing: '-0.01em', fontWeight: 900 }],
  ['B2', 'Orbitron 700', orbitron.className, { fontSize: '6.6vw', letterSpacing: '-0.01em', fontWeight: 700 }],
  ['B3', 'Orbitron 600', orbitron.className, { fontSize: '6.6vw', letterSpacing: '-0.01em', fontWeight: 600 }],
  ['B4', 'Orbitron 500', orbitron.className, { fontSize: '6.6vw', letterSpacing: '-0.01em', fontWeight: 500 }],
  ['C', 'Syncopate 700', syncopate.className, { fontSize: '5.6vw', letterSpacing: '-0.04em' }],
  ['D', 'Michroma', michroma.className, { fontSize: '5.6vw', letterSpacing: '-0.03em' }],
  ['F', 'Big Shoulders 900', shoulders.className, { fontSize: '10.5vw', letterSpacing: '-0.01em' }],
  ['G', 'Space Grotesk 700', grotesk.className, { fontSize: '8vw', letterSpacing: '-0.05em' }],
  ['H', 'Audiowide', audiowide.className, { fontSize: '6.6vw', letterSpacing: '-0.02em' }],
];

export default function HeroLab() {
  return (
    <main className="hero-lab">
      {OPTIONS.map(([key, name, cls, style]) => (
        <section key={key}>
          <p className="hero-lab-key">{key} &middot; {name}</p>
          <h1 className={`${cls} hero-lab-h`} style={style}>
            <span>AI AT BUILD TIME.</span>
            <span><em>Not</em> RUNTIME.</span>
          </h1>
        </section>
      ))}
    </main>
  );
}
