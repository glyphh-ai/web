import Nav from './components/Nav';
import Reveal from './components/Reveal';
import HomeHero from './components/HomeHero';
import AppMarquee from './components/AppMarquee';
import HomeDemo from './components/HomeDemo';
import ProductFace from './components/ProductFace';
import ShipsBand from './components/ShipsBand';
import TrustLayer from './components/TrustLayer';
import HomeClose from './components/HomeClose';
import Footer from './components/Footer';

// One narrative, nine sections: pitch → apps → demo → the three faces of
// the one workspace → it ships → the trust layer → pricing + close. The
// desktop page owns the depth; this page's job is the pitch.

// The three faces share one template on purpose. The dev-flavored model
// trio lives ONLY in the coding face; the hero carries the user-flavored
// one. TODO(chris): swap the autopilot shot for a loop's results feed /
// completed-overnight view when it exists — not a builder UI.
const FACES = [
  {
    title: 'Ask it to handle the quote.',
    body: 'It finds the Slack thread, pulls the record from Salesforce, and drafts the email — across the apps you already use, without you switching between them. You approve; it sends.',
    tags: ['agents', 'connections', 'the relay'],
    shot: '/screen-shots/glyphh-workspace.png',
    alt: 'The assistant mid-task — working across Gmail and Calendar, open beside the chat',
  },
  {
    title: 'The plan from Claude, the architecture from GPT, the grunt work from Mistral.',
    body: 'A full coding agent with every model on tap — frontier when it matters, open weights when it doesn’t. Same thread, same context, no re-explaining the project when you switch.',
    tags: ['model slots', 'skills', 'open weights'],
    shot: '/screen-shots/glyphh-builders.png',
    alt: 'The coding workspace — files, editor, terminal, and the coding agent side by side',
  },
  {
    title: 'Work that finished while you slept.',
    body: 'Set up a repeatable job once — a report, a triage pass, a follow-up — and it runs on schedule, results waiting when you sit down. Deterministic, auditable, yours.',
    tags: ['loops', 'skills', 'RPA'],
    shot: '/screen-shots/glyphh-app-home.png',
    alt: 'The workspace at sit-down — overnight results waiting',
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <Reveal />
      <Nav />
      <HomeHero />
      <AppMarquee />
      <HomeDemo />
      {FACES.map((f, i) => (
        <ProductFace key={f.title} {...f} flip={i === 1} />
      ))}
      <ShipsBand />
      <TrustLayer />
      <HomeClose />
      <Footer />
    </div>
  );
}
