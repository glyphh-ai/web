import Nav from '../../components/Nav';
import Reveal from '../../components/Reveal';
import CliHero from '../../components/CliHero';
import CliDemo from '../../components/CliDemo';
import CliHeadless from '../../components/CliHeadless';
import CliBridge from '../../components/CliBridge';
import CliClose from '../../components/CliClose';
import Footer from '../../components/Footer';

// The dev-flavored translation of the one-workspace pitch — not a second
// story. Two jobs: proof it's the real agent, and a frictionless install.

const TITLE = 'Glyphh CLI — The whole agent, in your terminal.';
const DESCRIPTION =
  'The same agents, loops, and governance as Desktop. The plan from Claude, the architecture from GPT, the grunt work from Mistral — full-screen TUI, or headless in your pipe.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function GlyphhCliPage() {
  return (
    <>
      <Reveal />
      <Nav />
      <CliHero />
      <CliDemo />
      <CliHeadless />
      <CliBridge />
      <CliClose />
      <Footer />
    </>
  );
}
