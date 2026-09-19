import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { GROUPS } from './content';
import DocsSidebar from './DocsSidebar';

export const metadata = {
  title: { default: 'Glyphh Docs', template: '%s — Glyphh Docs' },
  description: 'How Glyphh works: the desktop, the agent, skills, tasks, connections, the router, and the console.',
};

export default function DocsLayout({ children }) {
  return (
    <div className="office-page dx">
      <Nav />
      <div className="container dx-shell">
        <DocsSidebar groups={GROUPS} />
        <main className="dx-main">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
